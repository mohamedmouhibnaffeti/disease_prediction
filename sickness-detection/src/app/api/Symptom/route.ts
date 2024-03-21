import Symptom from "@/Models/Symptom";
import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";

export async function GET(){
    await connectMongoDB()
    const symptoms = await Symptom.find()
    return NextResponse.json({ Symptoms: symptoms })
}

