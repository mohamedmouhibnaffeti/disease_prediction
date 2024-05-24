import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Appointment from "@/Models/AppointmentModel/Appointment";

export async function DELETE(request: NextRequest) {
    try {
        const appointmentID = request.nextUrl.searchParams.get("appointmentID") || ""

        await connectMongoDB();

        const currentAppointment = await Appointment.findById(appointmentID);
        if (!currentAppointment) {
            return NextResponse.json({ message: "Appointment not found." }, { status: 404 });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            { _id: appointmentID },
            { state: "refused" },
            { new: true }
        );

        console.log(updatedAppointment)

        if (updatedAppointment) {
            return NextResponse.json({ message: "Appointment refused successfully." }, { status: 204 });
        }

        return NextResponse.json({ message: "Failed to refuse appointment." }, { status: 400 });
    } catch (err) {
        return NextResponse.json({ message: `Internal server error: ${err}` }, { status: 500 });
    }
}
