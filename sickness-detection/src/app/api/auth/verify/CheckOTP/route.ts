import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Otp from "@/Models/OtpModel/Otp";
import { decryptToken } from "@/lib/functions/strings";

export async function POST(request: Request){
    try{
        const { otp, email } = await request.json()
        connectMongoDB()
        const OtpInstance = await Otp.findOne({ email: email }).sort({ createdAt: -1 })
        if(!OtpInstance){
            return NextResponse.json({ message: "Invalid key provided." }, { status: 400 })
        }
        if(otp === decryptToken(OtpInstance.otp, process.env.SECRET_ENCRYPTION_KEY || "")){
            return NextResponse.json({ message: "Valid key." }, { status: 200 })
        }
        return NextResponse.json({ message: "Invalid key." }, { status: 400 })
    }catch(err){
        return NextResponse.json({ message: `Internal Server Error: ${err}` })
    }
}