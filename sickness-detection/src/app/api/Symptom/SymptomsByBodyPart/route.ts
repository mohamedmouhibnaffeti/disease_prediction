import Sickness from "@/Models/SicknessModel/Sickness";
import { Symptom } from "@/app/interfaces/interfaces";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    try{
        const filter = ""
        await connectMongoDB()
        const sicknesses = await Sickness.find()
        const FilteredSymptoms: Array<Symptom> = []
        sicknesses?.forEach((sickness) => {
            sickness?.symptoms.forEach((symptom: Symptom) => {
                if(symptom.body_part === filter){
                    FilteredSymptoms.push(symptom)
                }
            })
        })
        return NextResponse.json({ Symptoms: FilteredSymptoms }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: `Internal Server Error: ${err}` }, { status: 500 })
    }
}