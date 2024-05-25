import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import PredictedSickness from "@/Models/PredictedSicknessModel/PredictedSickness";
import Appointment from "@/Models/AppointmentModel/Appointment";
import { User } from "@/Models/UserModel/UserModel";


export async function GET(request: NextRequest){
    try{
        const doctorID = request.nextUrl.searchParams.get("doctorID") || ""
        connectMongoDB()
        const appoitnemnts = await Appointment.find({ doctor: doctorID }).populate({ path: "patient", select: "gender age" })

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
        };
        const myPatients: any = [];
        appoitnemnts.forEach((appointment) => {
            if (
                (appointment.state === "accepted" || appointment.state === "pending") 
                /* && !myPatients.some((existingAppointment: any) => existingAppointment.patient.equals(appointment.patient)) */
            ) {
                myPatients.push(appointment);
            }
        });


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
        
        return NextResponse.json({ TrendingSicknesses: trendingSicknesses.slice(0, 6), TrendingSymptoms: trendingSymptoms.slice(0, 6), MyPatients: myPatients })
    }catch(err){
        console.log(err)
        return NextResponse.json({ message: `Internal server error: ${err}` }, { status: 500 })
    }
}