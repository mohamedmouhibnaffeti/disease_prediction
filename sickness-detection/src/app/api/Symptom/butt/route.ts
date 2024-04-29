import Sickness from "@/Models/SicknessModel/Sickness";
import { Symptom } from "@/app/interfaces/interfaces";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(){
    await connectMongoDB()
    const sicknesses = await Sickness.find()
    const ButtSymptoms: Array<Symptom> = []
    sicknesses?.forEach((sickness) => {
        sickness?.symptoms.forEach((symptom: Symptom) => {
            if(symptom.body_part === "butt"){
                ButtSymptoms.push(symptom)
            }
        })
    })
    return NextResponse.json({ Symptoms: ButtSymptoms }, { status: 200 })
}