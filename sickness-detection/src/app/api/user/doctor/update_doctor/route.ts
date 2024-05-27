import connectMongoDB from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { Doctor, User } from "@/Models/UserModel/UserModel";
import Location from "@/Models/LocationModel/Location";
export async function PUT(request: Request){
    try{
        const { name, lastname, location, doctorID, phone } = await request.json()
        connectMongoDB()
        const exisingDoctor = await User.findById(doctorID)
        if(!exisingDoctor){
            return NextResponse.json({message: "Doctor doesn't exist in database." }, { status: 400 })
        }
        let locationObject
        if(location){
            locationObject = await Location.create({cordonnees: location})
        }
        const updatedDoctor = await Doctor.findOneAndUpdate({_id: doctorID}, { name, lastname, location: locationObject, phone }, { new: true })
        if(updatedDoctor){
            return NextResponse.json({message: "Doctor udpated successfully", doctor: updatedDoctor}, { status: 200 })
        }
        return NextResponse.json({message: "Failed updating doctor"}, { status: 400 })
    }catch(err){
        return NextResponse.json({message: `Internal Server error: ${err}`}, {status: 500})
    }
}