import connectMongoDB from "@/lib/mongodb";
import Appointment from "@/Models/AppointmentModel/Appointment";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: Request){
    try{
        const { AppointmentID, prescription, observation } = await request.json()
        const finishedAt = new Date()
        const currentAppointment = await Appointment.findById(AppointmentID);

        if (!currentAppointment) {
            return NextResponse.json({ message: "Appointment not found." }, { status: 404 });
        }
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
        return NextResponse.json({message: `Internal server error: ${err}`}, { status: 500 })
    }
}