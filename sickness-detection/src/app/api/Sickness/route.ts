import connectMongoDB from "@/lib/mongodb";
import Sickness from "@/Models/SicknessModel/Sickness";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    const { title, symptoms } = await request.json();
    await connectMongoDB();
    const res = await Sickness.create({ title: title, symptoms: symptoms });
    return NextResponse.json({ message: "Sickness Created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const Sicknesses = await Sickness.find();
    return NextResponse.json({ Sicknesses: Sicknesses });
}

// CORS preflight request handler
export async function OPTIONS() {
    return NextResponse.json({}, {status: 200});
}

