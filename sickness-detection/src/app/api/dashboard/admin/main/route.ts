import PredictedSickness from "@/Models/PredictedSicknessModel/PredictedSickness";
import { Doctor } from "@/Models/UserModel/UserModel";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try{
        const adminID = request.nextUrl.searchParams.get("adminID")
        connectMongoDB()
        const predictedSicknesses = await PredictedSickness.find()
        const pendingDoctors = await Doctor.find({state: "pending"})
        const insertedSymptoms = []
        const trendingSymptoms: Array<{title: string, count: number}> = []
        const trendingSicknesses: Array<{title: string, count: number}> = []
        
        const findOrCreateTrending = (arr: any, title: any) => {
            let entry = arr.find((item: any) => item.title === title);
            if (!entry) {
            entry = { title, count: 0 };
            arr.push(entry);
            }
            return entry;
        };
        predictedSicknesses.forEach((sickness) => {
            const sicknessEntry = findOrCreateTrending(trendingSicknesses, sickness.title);
            sicknessEntry.count++;
            sickness.symptoms.forEach((symptom: any) => {
                insertedSymptoms.push(symptom)
                const symptomEntry = findOrCreateTrending(trendingSymptoms, symptom.title);
                symptomEntry.count++;
            })
        })

        trendingSymptoms.sort((a, b) => b.count - a.count);
        trendingSicknesses.sort((a, b) => b.count - a.count);

        const returnBody = {
            totalPredictedDiseases: predictedSicknesses.length,
            totalInsertedSymptoms: insertedSymptoms.length,
            trendingSicknesses: trendingSicknesses.slice(0, 6),
            trendingSymptoms: trendingSymptoms.slice(0, 6),
            pendingDoctors: pendingDoctors
        }
        return NextResponse.json({body: returnBody }, { status: 200 })
    }catch(err){
        return NextResponse.json({message: `Internal server error: ${err}`}, {status: 500})
    }
}