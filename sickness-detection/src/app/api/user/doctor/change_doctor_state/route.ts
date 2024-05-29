import { Doctor, User } from "@/Models/UserModel/UserModel";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request){
    try{
        const { doctorID, state } = await request.json()
        console.log({ doctorID, state })
        const doctor = await User.findById(doctorID)
        if(!doctor){
            return NextResponse.json({message: "No doctor found with the provided ID"}, {status: 404})
        }
        const updatedDoctor = await Doctor.findOneAndUpdate({_id: doctorID}, {state: state}, {new: true})
        if(!updatedDoctor){
            return NextResponse.json({message: `Couldn't update doctor`}, {status: 400})
        }
        return NextResponse.json({message: `Doctor updated successfully`}, {status: 200})
    }catch(err){
        return NextResponse.json({message: `Internal server error: ${err}`}, {status: 500})
    }
}