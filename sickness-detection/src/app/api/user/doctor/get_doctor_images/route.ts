import { User } from "@/Models/UserModel/UserModel";
import connectMongoDB from "@/lib/mongodb";
import { readFileSync } from "fs";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try{
        const doctorID = request.nextUrl.searchParams.get("doctorID") || ""
        connectMongoDB()
        const doctor = await User.findById(doctorID)
        if(!doctor){
            return NextResponse.json({message: `No doctor found with the provided ID`}, {status: 400})
        }
        const images: Array<any> = []
        doctor.id_images.forEach((imageString: string, index: number)=>{
            const image = readFileSync(imageString)
            const imageBuffer = Buffer.from(image).toString("base64")
            images.push({index: index, image: imageBuffer})
        })
        return NextResponse.json({images: images}, {status: 200})
    }catch(err){
        return NextResponse.json({message: `Internal server error: ${err}`}, {status: 500})
    }
}