import Sickness from "@/Models/Sickness";
import { Symptom } from "@/app/interfaces/interfaces";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(){
    await connectMongoDB()
    const sicknesses = await Sickness.find().limit(20)
    const symptoms: Array<Symptom> = []
    sicknesses.forEach((sickness)=>{
        sickness?.symptoms?.forEach((symptom: Symptom)=>{
            symptoms.push(symptom)
        })
    })
    return NextResponse.json({ Symptoms: symptoms })
}