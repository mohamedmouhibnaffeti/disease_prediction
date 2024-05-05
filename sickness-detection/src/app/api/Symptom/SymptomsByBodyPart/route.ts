import Sickness from "@/Models/SicknessModel/Sickness";
import { Symptom } from "@/app/interfaces/interfaces";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import pluralize from "pluralize";

export async function GET(request: NextRequest) {
    try {
        const filter = (request.nextUrl.searchParams.get('filter') || "").toLowerCase()
        const gender = (request.nextUrl.searchParams.get('gender') || "").toLowerCase()
        let gender2 = ""
        if(gender === "male"){
            gender2 = "man"
        }
        else if(gender === "female"){
            gender2 = "woman"
        }
        await connectMongoDB()
        const sicknesses = await Sickness.find()
        const FilteredSymptoms: Array<Symptom> = []
        sicknesses?.forEach((sickness) => {
            sickness?.symptoms.forEach((symptom: Symptom) => {
                const singularFilter = pluralize.singular(filter)
                const singularGender = pluralize.singular(gender)
                const singularGender2 = pluralize.singular(gender2)
                if (
                    (symptom.body_part && 
                        (
                            symptom.body_part.toLowerCase().includes(singularFilter) ||
                            (singularFilter && symptom.body_part.toLowerCase().split(/[ ,\n]+/).includes(singularFilter))
                        )
                    ) &&
                    (
                        symptom.gender &&
                        (
                            symptom.gender.toLowerCase() === singularGender ||
                            symptom.gender.toLowerCase() === singularGender2 ||
                            (singularGender && symptom.gender.toLowerCase().split(/[ ,\n]+/).includes(singularGender)) ||
                            (singularGender2 && symptom.gender.toLowerCase().split(/[ ,\n]+/).includes(singularGender2)) ||
                            symptom.gender.toLowerCase() === "both" ||
                            ("both" && symptom.gender.toLowerCase().split(/[ ,\n]+/).includes("both"))
                        )
                    )
                ) {
                    const singularTitle = pluralize.singular(symptom.title)
                    const symptomExists = FilteredSymptoms.some((existingSymptom) => ((existingSymptom.title.toLowerCase().includes(singularTitle)) || (existingSymptom.title.toLowerCase().split(/[ ,\n]+/).includes(singularTitle)) || (symptom.title === existingSymptom.title) ))
                    if(!symptomExists){
                        FilteredSymptoms.push(symptom)
                    }
                }
            })
        })
        return NextResponse.json({ Symptoms: FilteredSymptoms }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: `Internal Server Error: ${err}` }, { status: 500 })
    }
}
