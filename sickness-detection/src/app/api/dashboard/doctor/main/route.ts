import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/lib/mongodb";

export async function GET(request: NextRequest){
    try{
        const doctorID = (request.nextUrl.searchParams.get('doctorID') || "")
        
    }catch(err){
        return NextResponse.json({ message: `Internal server error: ${err}` }, { status: 500 })
    }
}