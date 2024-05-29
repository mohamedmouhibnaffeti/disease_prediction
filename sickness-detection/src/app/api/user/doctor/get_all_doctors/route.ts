import { Doctor, User } from "@/Models/UserModel/UserModel";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try{
        connectMongoDB()
        const doctors = await User.find()
        return NextResponse.json({doctors: doctors}, {status: 200})
    }catch(err){
        console.log(err)
        return NextResponse.json({message: `Internal server error: ${err}`}, {status: 500})
    }
}