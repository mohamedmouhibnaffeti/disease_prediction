import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Appointment from "@/Models/AppointmentModel/Appointment";
import { Doctor, Patient, User } from "@/Models/UserModel/UserModel";
import "@/Models/UserModel/UserModel"
export async function POST(request: Request){
    try{
        const { doctorID, patientID } = await request.json()
        connectMongoDB()
        const createdAppointment = await Appointment.create({doctor: doctorID, patient: patientID, state: "pending" })
        if(!createdAppointment){
            return NextResponse.json({message: "Error creating appointment"}, {status: 400})
        }
        return NextResponse.json({message: "Appointment requested successfully"}, {status: 201})
    }catch(err){
        return NextResponse.json({message: `Internal server error: ${err}`}, {status: 500})
    }
}

export async function GET(request: Request){
    try {
        connectMongoDB();
        const Appointments = await Appointment.find().populate({path: 'doctor', model: User}).populate({path: 'patient', model: User}) // Populate patient with name and lastname
        return NextResponse.json({ Appointments: Appointments }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: `Internal server error: ${err}` }, { status: 500 });
    }
}
