import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Sickness from "@/Models/SicknessModel/Sickness";
import pluralize from "pluralize";

export async function GET(request: NextRequest){
    try{
        const sicknessName = (request.nextUrl.searchParams.get('sickness') || "").toLowerCase()
        const singularSicknessName = pluralize.singular(sicknessName)
        connectMongoDB()
        const sicknesees = await Sickness.find()
        let SicknessToReturn
        sicknesees.forEach((sickness) => {
            const title = sickness?.title?.toLowerCase()
            const singularTitle = pluralize.singular(title)
            if(sicknessName === title){
                SicknessToReturn = sickness
            }else if(singularTitle === singularSicknessName){
                SicknessToReturn = sickness
            }else if(title.includes(singularSicknessName) || (title.split(/[ ,\n]+/).includes(singularSicknessName))){
                SicknessToReturn = sickness
            }else if(sicknessName.includes(singularTitle) || (sicknessName.split(/[ ,\n]+/).includes(singularTitle)) ){
                SicknessToReturn = sickness
            }
        })
        if(!SicknessToReturn){
            return NextResponse.json({message: "No sickness found for the provided sickness name"}, {status: 400})
        }
        return NextResponse.json({Sickness: SicknessToReturn}, {status: 200})
    }catch(err){
        return NextResponse.json({message: `Internal server error: ${err}`}, {status: 500})
    }
}