import AdminHistory from "@/Models/AdminHistoryModel/AdminHistoryModel";
import { Doctor, User } from "@/Models/UserModel/UserModel";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request){
    try{
        const { doctorID, state, adminID } = await request.json()
        const doctor = await User.findById(doctorID)
        if(!doctor){
            return NextResponse.json({message: "No doctor found with the provided ID"}, {status: 404})
        }
        const updatedDoctor = await Doctor.findOneAndUpdate({_id: doctorID}, {state: state}, {new: true})
        if(!updatedDoctor){
            return NextResponse.json({message: `Couldn't update doctor`}, {status: 400})
        }
        const description = `${state} doctor with name ${updatedDoctor.name + " " + updatedDoctor.lastname}.`
        const historyInstance = await AdminHistory.create({owner: adminID, description: description})
        return NextResponse.json({message: `Doctor updated successfully`}, {status: 200})
    }catch(err){
        return NextResponse.json({message: `Internal server error: ${err}`}, {status: 500})
    }
}