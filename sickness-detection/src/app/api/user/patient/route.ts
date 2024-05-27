import connectMongoDB from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { Patient, User } from "@/Models/UserModel/UserModel";
export async function PUT(request: Request){
    try{
        const { name, lastname, patientID, phone } = await request.json()
        connectMongoDB()
        const exisingPatient = await User.findById(patientID)
        if(!exisingPatient){
            return NextResponse.json({message: "Patient doesn't exist in database." }, { status: 400 })
        }

        const updatedPatient = await Patient.findOneAndUpdate({_id: patientID}, { name, lastname, phone }, { new: true })
        if(updatedPatient){
            return NextResponse.json({message: "Patient udpated successfully", patient: updatedPatient}, { status: 200 })
        }
        return NextResponse.json({message: "Failed updating Patient"}, { status: 400 })
    }catch(err){
        return NextResponse.json({message: `Internal Server error: ${err}`}, {status: 500})
    }
}