import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { isToday, isYesterday } from "@/lib/functions/dates";
import { User } from "@/Models/UserModel/UserModel";
import Appointment from "@/Models/AppointmentModel/Appointment";

export async function GET(request: NextRequest) {
    try {
        const doctorID = request.nextUrl.searchParams.get("doctorID") || "";
        connectMongoDB();
        const appointments = await Appointment.find({ doctor: doctorID }).populate({ path: "patient", select: "name lastname age gender phone" });
        const todayAppointments = appointments.filter((appointment) => isToday(appointment.requestedAt));
        const yesterdayAppointments = appointments.filter((appointment) => isYesterday(appointment.requestedAt));
        const visitsToday = appointments.filter((appointment) => (isToday(appointment.requestedAt) && appointment.state === "pending"));
        const appointmentHistory = appointments.filter(
            (appointment) => appointment.state === "pending"
        );

        const FinishedAppointments = appointments.filter(
            (appointment) => appointment.state === "finished"
        );

        const updatedAppointmentHistory = appointmentHistory.map(historyAppointment => {
            // Find all matches in FinishedAppointments
            const matches = FinishedAppointments.filter(
                (finishedAppointment) => (finishedAppointment.patient._id.equals(historyAppointment.patient._id) && finishedAppointment.doctor.equals(historyAppointment.doctor))
            );

            // If there are matches, find the latest one
            if (matches.length > 0) {
                const latestMatch = matches.reduce((latest, current) =>
                    new Date(latest.finishedAt) > new Date(current.finishedAt) ? latest : current
                );

                // Return the updated historyAppointment with lastChecked object
                return {
                    _id: historyAppointment._id,
                    doctor: historyAppointment.doctor,
                    patient: {
                        _id: historyAppointment.patient._id,
                        name: historyAppointment.patient.name,
                        lastname: historyAppointment.patient.lastname,
                        phone: historyAppointment.patient.phone,
                        gender: historyAppointment.patient.gender,
                        age: historyAppointment.patient.age,
                    },
                    state: historyAppointment.state,
                    requestedAt: historyAppointment.requestedAt,
                    lastChecked: {
                        observation: latestMatch.observation || "No recorded observation",
                        finishedAt: latestMatch.finishedAt,
                        firstTime: false
                    }
                };
            } else {
                // If no matches, add "First Visit" to lastChecked
                return {
                    _id: historyAppointment._id,
                    doctor: historyAppointment.doctor,
                    patient: {
                        _id: historyAppointment.patient._id,
                        name: historyAppointment.patient.name,
                        lastname: historyAppointment.patient.lastname,
                        phone: historyAppointment.patient.phone,
                        gender: historyAppointment.patient.gender,
                        age: historyAppointment.patient.age,
                    },
                    state: historyAppointment.state,
                    requestedAt: historyAppointment.requestedAt,
                    lastChecked: {
                        message: "First Visit",
                        firstTime: true
                    }
                };
            }
        });

        const returnBody = {
            newPatients: {
                value: todayAppointments.length - yesterdayAppointments.length >= 0  ? todayAppointments.length - yesterdayAppointments.length : 0,
                etat: (todayAppointments.length - yesterdayAppointments.length) >= 0 ? "positive" : "negative"
            },
            yesterdayPatients: yesterdayAppointments.length,
            visitsToday: visitsToday.length,
            appointmentHistory: updatedAppointmentHistory
        };

        return NextResponse.json({ body: returnBody });
    } catch (err) {
        return NextResponse.json({ message: `Internal Server error: ${err}` }, { status: 500 });
    }
}
