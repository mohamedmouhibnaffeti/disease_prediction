import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Appointment from "@/Models/AppointmentModel/Appointment";
import { Doctor, Patient } from "@/Models/UserModel/UserModel";
import "@/Models/UserModel/UserModel"
export async function GET(request: Request){
    try {
        connectMongoDB();
        const Appointments = await Appointment.find().populate('User', 'name lastname') // Populate patient with name and lastname
        return NextResponse.json({ Appointments: Appointments }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: `Internal server error: ${err}` }, { status: 500 });
    }
}
