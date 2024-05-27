import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Appointment from "@/Models/AppointmentModel/Appointment";
import PredictedSickness from "@/Models/PredictedSicknessModel/PredictedSickness";

export async function GET(request: NextRequest){
    try{
        const patientID = request.nextUrl.searchParams.get("patientID")
        connectMongoDB()
        const Appointments = await Appointment.find({patient: patientID}).populate({path: "doctor"})
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const sicknesses = await PredictedSickness.find({ createdAt: { $gte: oneWeekAgo } })

        const trendingSymptoms: Array<{title: string, count: number}> = []
        const trendingSicknesses: Array<{title: string, count: number}> = []
        // Helper function to find or create a trending entry
        const findOrCreateTrending = (arr: any, title: any) => {
            let entry = arr.find((item: any) => item.title === title);
            if (!entry) {
            entry = { title, count: 0 };
            arr.push(entry);
            }
            return entry;
        }

        sicknesses.forEach(sickness => {
            const sicknessEntry = findOrCreateTrending(trendingSicknesses, sickness.title);
            sicknessEntry.count++;
        
            sickness.symptoms.forEach((symptom: any) => {
            const symptomEntry = findOrCreateTrending(trendingSymptoms, symptom.title);
            symptomEntry.count++;
            });
        });
        
        trendingSymptoms.sort((a, b) => b.count - a.count);
        trendingSicknesses.sort((a, b) => b.count - a.count);
        return NextResponse.json({Appointments: Appointments, trendingSymptoms: trendingSymptoms.slice(0, 6), trendingSicknesses: trendingSicknesses.slice(0, 6)})
    }catch(err){
        return NextResponse.json({message: `Internal Server error: ${err}`}, { status: 500 })
    }
}