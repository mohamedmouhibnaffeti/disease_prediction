import AdminHistory from "@/Models/AdminHistoryModel/AdminHistoryModel";
import { Patient, User } from "@/Models/UserModel/UserModel";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request){
    try{
        const { patientID, state, adminID } = await request.json()
        const patient = await User.findById(patientID)
        if(!patient){
            return NextResponse.json({message: "No patient found with the provided ID"}, {status: 404})
        }
        const updatedpatient = await Patient.findOneAndUpdate({_id: patientID}, {state: state}, {new: true})
        if(!updatedpatient){
            return NextResponse.json({message: `Couldn't update patient`}, {status: 400})
        }
        const description = `${state} patient with name ${updatedpatient.name + " " + updatedpatient.lastname}.`
        const historyInstance = await AdminHistory.create({owner: adminID, description: description})
        return NextResponse.json({message: `patient updated successfully`}, {status: 200})
    }catch(err){
        return NextResponse.json({message: `Internal server error: ${err}`}, {status: 500})
    }
}