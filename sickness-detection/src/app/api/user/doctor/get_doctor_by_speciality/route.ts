import connectMongoDB from "@/lib/mongodb";
import { User } from "@/Models/UserModel/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try{
        const speciality = (request.nextUrl.searchParams.get('speciality') || "")
        connectMongoDB()
        const Doctors: Array<any> = await User.find({speciality: speciality})
        return NextResponse.json({doctors: Doctors}, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: `Internal server error: ${err}` }, { status: 500 })
    }
}