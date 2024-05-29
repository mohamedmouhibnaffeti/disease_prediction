import { Patient, User } from "@/Models/UserModel/UserModel";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try{
        connectMongoDB()
        const patients = await Patient.find()
        return NextResponse.json({patients: patients}, {status: 200})
    }catch(err){
        console.log(err)
        return NextResponse.json({message: `Internal server error: ${err}`}, {status: 500})
    }
}