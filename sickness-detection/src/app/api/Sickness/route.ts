import connectMongoDB from "@/lib/mongodb";
import Sickness from "@/Models/Sickness";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {title} = await request.json()
    await connectMongoDB()
    await Sickness.create({title})
    return NextResponse.json({ message: "Sickness Created" }, { status: 201 })
}

export async function GET(){
    await connectMongoDB()
    const Sicknesses = await Sickness.find()
    return NextResponse.json({ Sicknesses: Sicknesses })
}