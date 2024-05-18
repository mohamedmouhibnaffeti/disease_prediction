import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Appointment from "@/Models/AppointmentModel/Appointment";

export async function POST(request: Request) {
    try{
        const { from, to, appointmentID } = await request.json()
        const duration = from - to
        return NextResponse.json({ message: duration }, { status: 200 })
        //const updatedAppointment = await Appointment.findByIdAndUpdate({ _id: appointmentID }, { duration, from, to, state: "accepted" })
        connectMongoDB()
    }catch(err){
        return NextResponse.json({ message: `Internal server error: ${err}` }, { status: 500 })
    }
}