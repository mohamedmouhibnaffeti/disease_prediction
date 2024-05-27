import Appointment from "@/Models/AppointmentModel/Appointment";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try{
        const patientID = request.nextUrl.searchParams.get("patiendID") || ""
        connectMongoDB()
        const appointments = await Appointment.find({patient: patientID}).populate({path: "doctor", select: "name lastname speciality phone"})
        return NextResponse.json({appointments: appointments})
    }catch(err){
        console.log(err)
        return NextResponse.json({message: `Internal Server error: ${err}`}, {status: 500})
    }
}