import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Appointment from "@/Models/AppointmentModel/Appointment";
import { User } from "@/Models/UserModel/UserModel";
import PredictedSickness from "@/Models/PredictedSicknessModel/PredictedSickness";

export async function GET(request: NextRequest){
    try{
        const doctorID = (request.nextUrl.searchParams.get('doctorID') || "")
        connectMongoDB()
        const MyAppointments = await Appointment.find({doctor: doctorID}).populate({ path: "patient", select: "name lastname email phone" })
        const Users = await User.find()
        
        const pendingAppointments: any = []
        const AcceptedAppointments: any = []
        const MyPatients: any = []
        MyAppointments.some((appointment) => {
            if(appointment.state === "pending"){
                pendingAppointments.push(appointment)
            }
            if(appointment.state === "accepted"){
                AcceptedAppointments.push(appointment)
            }
            if(/* (!MyPatients.some(((existingAppointment: any) => existingAppointment.patient._id === appointment.patient._id))) && */((appointment.state === "accepted" || appointment.state === "pending"))){
                MyPatients.push(appointment)
            }
        })

        const totalPatients: any = []
        const totalDoctors: any = []
        Users.some((user) => {
            if(user.role === "doctor"){
                totalDoctors.push(user)
            }
            if(user.role === "patient"){
                totalPatients.push(user)
            }
        })
        return NextResponse.json({ 
            acceptedAppointments: AcceptedAppointments.length,
            pendingAppointments: pendingAppointments, 
            totalAppointments: MyAppointments.length,
            myPatients: MyPatients,
            totalPatients: totalPatients.length,
            totalDoctors: totalDoctors.length 
        }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: `Internal server error: ${err}` }, { status: 500 })
    }
}