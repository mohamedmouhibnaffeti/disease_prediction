import Sickness from "@/Models/SicknessModel/Sickness";
import { Symptom } from "@/app/interfaces/interfaces";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(){
    await connectMongoDB()
    const sicknesses = await Sickness.find()
    const BreastSymptoms: Array<Symptom> = []
    sicknesses?.forEach((sickness) => {
        sickness?.symptoms.forEach((symptom: Symptom) => {
            if(symptom.body_part === "breast"){
                BreastSymptoms.push(symptom)
            }
        })
    })
    return NextResponse.json({ Symptoms: BreastSymptoms }, { status: 200 })
}