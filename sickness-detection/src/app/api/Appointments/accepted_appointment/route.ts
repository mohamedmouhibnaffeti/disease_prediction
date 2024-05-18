import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Appointment from "@/Models/AppointmentModel/Appointment";

export async function POST(request: Request) {
    try{
        const { from, to, appointmentID } = await request.json()
        const fromDate = new Date(from)
        const toDate = new Date(to)
        const duration = toDate.getTime() - fromDate.getTime()
        const differenceInHours: number = duration / (1000 * 60 * 60);
        console.log({ from, to, appointmentID, differenceInHours })
        //connectMongoDB()
        //const updatedAppointment = await Appointment.findByIdAndUpdate({ _id: appointmentID }, { from, to, state: "accepted", duration })
        return NextResponse.json({ message: duration }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: `Internal server error: ${err}` }, { status: 500 })
    }
}