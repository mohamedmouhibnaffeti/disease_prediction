import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { isToday, isYesterday } from "@/lib/functions/dates";
import { User } from "@/Models/UserModel/UserModel";
import Appointment from "@/Models/AppointmentModel/Appointment";

export async function GET(request: NextRequest){
    try{
        const doctorID = request.nextUrl.searchParams.get("doctorID") || ""
        connectMongoDB()
        const appointments = await Appointment.find({ doctor: doctorID }).populate({path: "patient", select: "name lastname"})
        const todayAppointments = appointments.filter((appointment) => isToday(appointment.requestedAt))
        const yesterdayAppointments = appointments.filter((appointment) => isYesterday(appointment.requestedAt))
        const visitsToday = appointments.filter((appointment) => (isToday(appointment.requestedAt) && appointment.state === "pending" ))
        const appointmentHistory = appointments.filter((appointment) => appointment.state === "pending" || "finished")

        const returnBody = {
            newPatients: { value: todayAppointments.length - yesterdayAppointments.length, etat: (todayAppointments.length - yesterdayAppointments.length) >= 0 ? "positive" : "negative" },
            yesterdayPatients: yesterdayAppointments.length,
            visitsToday: visitsToday,
            appointmentHistory: appointmentHistory
        }
        return NextResponse.json({body: returnBody})
    }catch(err){
        return NextResponse.json({ message: `Internal Server error: ${err}` }, { status: 500 })
    }
}