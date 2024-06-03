import connectMongoDB from "@/lib/mongodb";
import Appointment from "@/Models/AppointmentModel/Appointment";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: Request){
    try{
        const { AppointmentID, prescription, observation, from, to } = await request.json()
        const fromDate = new Date(from);
        const toDate = new Date(to);
        const duration = toDate.getTime() - fromDate.getTime();
        const differenceInHours = duration / (1000 * 60 * 60);
        const currentAppointment = await Appointment.findById(AppointmentID);
        if (!currentAppointment) {
            return NextResponse.json({ message: "Appointment not found." }, { status: 404 });
        }
        const doctorID = currentAppointment.doctor
        const patientID = currentAppointment.patient
        if (from || to) {
            if (!from || !to) {
                return NextResponse.json({ message: "You've selected only one date, please select both dates to schedule another appointment, or don't select any date." }, { status: 400 });
            }
            
            const now = new Date();
            const minimumStartTime = new Date(now.getTime() + 60 * 60 * 1000);
            
            if (fromDate < minimumStartTime) {
                return NextResponse.json({ message: "Appointment must start at least one hour after the current time." }, { status: 400 });
            }
            
            if (differenceInHours < 0.5 || differenceInHours > 2) {
                return NextResponse.json({ message: "Invalid appointment length, it should be longer than half an hour and shorter than 2 hours." }, { status: 400 });
            }
            const doctorAppointments = await Appointment.find({ doctorID, state: "accepted" });
            const conflict = doctorAppointments.some(appointment => {
                const existingFrom = new Date(appointment.from);
                const existingTo = new Date(appointment.to);
                return (from < existingTo && to > existingFrom);
            });
            if (conflict) {
                return NextResponse.json({ message: "The new appointment time conflicts with an existing appointment." }, { status: 409 });
            }
            const newAppointment = await Appointment.create({ from, to, state: "accepted", duration: differenceInHours, doctor: doctorID, patient: patientID });
            
        }
        
        const finishedAt = new Date()
        
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            { _id: AppointmentID },
            { state: "finished", finishedAt, prescription, observation },
            { new: true }
        );

        if (updatedAppointment) {
            return NextResponse.json({ message: "Appointment finished successfully." }, { status: 200 });
        }

        return NextResponse.json({ message: "Failed to finish appointment." }, { status: 400 });

    }catch(err){
        console.log(err)
        return NextResponse.json({message: `Internal server error: ${err}`}, { status: 500 })
    }
}