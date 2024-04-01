import connectMongoDB from "@/lib/mongodb";
import Sickness from "@/Models/SicknessModel/Sickness";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {title, Symptoms} = await request.json()
    console.log(Symptoms)
    await connectMongoDB()
    const res = await Sickness.create({title: title, symptoms: Symptoms})
    console.log(res)
    return NextResponse.json({ message: "Sickness Created" }, { status: 201 })
}

export async function GET(){
    await connectMongoDB()
    const Sicknesses = await Sickness.find()
    return NextResponse.json({ Sicknesses: Sicknesses })
}
