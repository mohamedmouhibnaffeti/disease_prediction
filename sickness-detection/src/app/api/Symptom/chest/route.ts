import Sickness from "@/Models/SicknessModel/Sickness";
import { Symptom } from "@/app/interfaces/interfaces";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(){
    await connectMongoDB()
    const sicknesses = await Sickness.find()
    const ChestSymptoms: Array<Symptom> = []
    sicknesses?.forEach((sickness) => {
        sickness?.symptoms.forEach((symptom: Symptom) => {
            if(symptom.body_part === "chest"){
                ChestSymptoms.push(symptom)
            }
        })
    })
    return NextResponse.json({ Symptoms: ChestSymptoms }, { status: 200 })
}