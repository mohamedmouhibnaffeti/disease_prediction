import Sickness from "@/Models/SicknessModel/Sickness";
import { Symptom } from "@/app/interfaces/interfaces";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectMongoDB()
        const sicknesses = await Sickness.find()
        const LegSymptoms: Array<Symptom> = []
        sicknesses?.forEach((sickness) => {
            sickness?.symptoms.forEach((symptom: Symptom) => {
                if(symptom.body_part === "legs"){
                    LegSymptoms.push(symptom)
                }
            })
        })
        return NextResponse.json({ Symptoms: LegSymptoms }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: `Internal Server Error: ${err}` }, { status: 500 })
    }
}