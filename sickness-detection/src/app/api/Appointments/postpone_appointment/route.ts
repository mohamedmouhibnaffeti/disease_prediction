import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Appointment from "@/Models/AppointmentModel/Appointment";

export async function POST(request: Request) {
    try {
        const { from, to, appointmentID } = await request.json();
        const fromDate = new Date(from);
        const toDate = new Date(to);
        const duration = toDate.getTime() - fromDate.getTime();
        const differenceInHours = duration / (1000 * 60 * 60);

        console.log({ from, to, appointmentID, differenceInHours });
        if(!from || !to){
            return NextResponse.json({ message: "Please select a valid date." }, { status: 400 });
        }
        await connectMongoDB();

        const currentAppointment = await Appointment.findById(appointmentID);
        if (!currentAppointment) {
            return NextResponse.json({ message: "Appointment not found." }, { status: 404 });
        }

        if (differenceInHours < 0.5 || differenceInHours > 2) {
            return NextResponse.json({ message: "Invalid appointment length, it should be longer than half an hour and shorter than 2 hours." }, { status: 400 });
        }

        const doctorID = currentAppointment.doctorID;

        const doctorAppointments = await Appointment.find({ doctorID });

        // Check for time conflicts
        const conflict = doctorAppointments.some(appointment => {
            const existingFrom = new Date(appointment.from);
            const existingTo = new Date(appointment.to);

            return (fromDate < existingTo && toDate > existingFrom);
        });

        if (conflict) {
            return NextResponse.json({ message: "The new appointment time conflicts with an existing appointment." }, { status: 409 });
        }

        const now = new Date();
        const minimumStartTime = new Date(now.getTime() + 60 * 60 * 1000);
    
        if (fromDate < minimumStartTime) {
            return NextResponse.json({ message: "Appointment must start at least one hour after the current time." }, { status: 400 });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            { _id: appointmentID },
            { from, to, duration: differenceInHours },
            { new: true }
        );

        console.log(updatedAppointment)

        if (updatedAppointment) {
            return NextResponse.json({ message: "Appointment accepted successfully." }, { status: 200 });
        }

        return NextResponse.json({ message: "Failed to accept appointment." }, { status: 400 });
    } catch (err) {
        return NextResponse.json({ message: `Internal server error: ${err}` }, { status: 500 });
    }
}
