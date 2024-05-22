import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Appointment from "@/Models/AppointmentModel/Appointment";

export async function GET(request: NextRequest){
    try{
        const doctorID = (request.nextUrl.searchParams.get('doctorID') || "")
        connectMongoDB()
        const doctorAppointments = await Appointment.find({doctor: doctorID})
        return NextResponse.json({ message: doctorID }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: `Internal server error: ${err}` }, { status: 500 })
    }
}