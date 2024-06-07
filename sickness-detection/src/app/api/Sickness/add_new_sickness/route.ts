import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import PredictedSickness from "@/Models/PredictedSicknessModel/PredictedSickness";
import { pathToFileURL } from "url";
import Symptom from "@/Models/SymptomsModel/Symptom";

export async function POST(request: Request){
    try{
        const { sickness, symptoms, age, sex, conditions } = await request.json()
        connectMongoDB()
        const SymptomsObjects = symptoms.map((symptom: string) => new Symptom({title: symptom}))
        if(sickness){
            const createdSickness = await PredictedSickness.create({ title: sickness, symptoms: SymptomsObjects, age: age, sex: sex, conditions: conditions })
            if(!createdSickness){
                return NextResponse.json({ message: "Failed to create predicted sickness" }, { status: 400 })
            }
            return NextResponse.json({ message: "Created predicted sickness successfully" }, { status: 201 })
        }
        return NextResponse.json({ message: "Error" }, { status: 400 })
    }catch(err){
        return NextResponse.json({message: `Internal server error: ${err}`}, { status: 500 })
    }
}