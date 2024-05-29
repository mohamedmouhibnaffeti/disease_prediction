import connectMongoDB from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { Admin, User } from "@/Models/UserModel/UserModel";
export async function PUT(request: Request){
    try{
        const { name, lastname, adminID, phone } = await request.json()
        connectMongoDB()
        const exisingAdmin = await Admin.findById(adminID)
        if(!exisingAdmin){
            return NextResponse.json({message: "Admin doesn't exist in database." }, { status: 400 })
        }

        const updatedAdmin = await Admin.findOneAndUpdate({_id: adminID}, { name, lastname, phone }, { new: true })
        if(updatedAdmin){
            return NextResponse.json({message: "Admin udpated successfully", admin: updatedAdmin}, { status: 200 })
        }
        return NextResponse.json({message: "Failed updating Admin"}, { status: 400 })
    }catch(err){
        return NextResponse.json({message: `Internal Server error: ${err}`}, {status: 500})
    }
}