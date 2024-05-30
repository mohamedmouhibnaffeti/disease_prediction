import connectMongoDB from "@/lib/mongodb";
import AdminHistory from "@/Models/AdminHistoryModel/AdminHistoryModel";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    try{
        connectMongoDB()
        const Actions = await AdminHistory.find().populate({path: "owner", select: "email name lastname"})
        return NextResponse.json({actions: Actions}, {status: 200})
    }catch(err){
        return NextResponse.json({message: `Internal server error: ${err}`}, {status: 500})
    }
}