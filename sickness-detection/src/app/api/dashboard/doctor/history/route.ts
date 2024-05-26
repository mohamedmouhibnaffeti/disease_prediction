import Appointment from "@/Models/AppointmentModel/Appointment";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try{
        const doctorID = request.nextUrl.searchParams.get("doctorID") || ""
        connectMongoDB()
        const appointments = await Appointment.find({doctor: doctorID}).populate({path: "patient", select: "name lastname email phone gender age"})
        return NextResponse.json({appointments: appointments})
    }catch(err){
        return NextResponse.json({message: `Internal Server error: ${err}`}, {status: 500})
    }
}