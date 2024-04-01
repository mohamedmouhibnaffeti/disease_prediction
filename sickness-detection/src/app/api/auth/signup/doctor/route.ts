import connectMongoDB from "@/lib/mongodb";
import { Admin, Doctor, Patient } from "@/Models/UserModel/UserModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try{
        const {name, lastname, email, password, phone} = await request.json()
        await connectMongoDB()
        const res = await Admin.create({name, lastname, email, password})
        console.log(res)
        return NextResponse.json({ message: "Sickness Created" }, { status: 201 })
    }catch(err){
        console.log(err)
    }
}
