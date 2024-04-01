import { Doctor, User } from "@/Models/UserModel/UserModel"
import { isValidEmail } from "@/lib/functions/strings"
import connectMongoDB from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function POST(request: Request){
    try{
        const { name, lastname, email, password, confirmPassword, id_images } = await request.json()
        await connectMongoDB()
        if(name.length < 6 || lastname.length < 6 || !isValidEmail(email) || password.length < 6 || confirmPassword < 6 || confirmPassword !== password || id_images.length !== 2 ){
            return NextResponse.json({ message: "Please check form data" }, { status: 400 })
        }
        const exisingDoctor = await User.findOne({email: email})
        if(exisingDoctor){
            return NextResponse.json({message: "Doctor already exists" }, { status: 400 })
        }else{
            const CreatedDoctor = await Doctor.create({ name, lastname, email, password, id_images })
            if(CreatedDoctor){
                return NextResponse.json({ message: "Doctor Created", doctor: CreatedDoctor }, { status: 201 })
            }else{
                return NextResponse.json({ message: "doctor not created" }, { status: 500 })
            }
        }
    }catch(err){
        return NextResponse.json({ message: "error signing up doctor", error: err }, { status: 500 })
    }
}