import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Appointment from "@/Models/AppointmentModel/Appointment";
import "@/Models/UserModel/UserModel"; // Ensure models are loaded

export async function GET(request: Request) {
    try {
        await connectMongoDB();
        const Appointments = await Appointment.find()
            .populate({ path: "patient", select: "name lastname" })

        return NextResponse.json({ Appointments }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: `Internal server error: ${err}` }, { status: 500 });
    }
}
