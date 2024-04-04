import { Doctor, User } from "@/Models/UserModel/UserModel"
import { isValidEmail } from "@/lib/functions/strings"
import connectMongoDB from "@/lib/mongodb"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { createToken } from "@/lib/functions/auth"

export async function POST(request: Request){
    try{
        const { name, lastname, phone, email, password, confirmPassword, id_images } = await request.json()
        console.log({ name, lastname, phone, email, password, confirmPassword, id_images })
        await connectMongoDB()
        const salt = await bcrypt.genSalt(10)
        if(name.length < 6 || lastname.length < 6 || !isValidEmail(email) || password.length < 6 || confirmPassword < 6 || confirmPassword !== password || id_images.length !== 2, phone.length < 5 ){
            return NextResponse.json({ message: "Please check form data" }, { status: 400 })
        }
        const exisingDoctor = await User.findOne({email: email})
        if(exisingDoctor){
            return NextResponse.json({message: "Doctor already exists" }, { status: 400 })
        }else{
            const hashedPassword = await bcrypt.hash(password, salt)
            const CreatedDoctor = await Doctor.create({ name, lastname, phone, email, password: hashedPassword, id_images })
            if(CreatedDoctor){
                const token = createToken(CreatedDoctor._id)
                return NextResponse.json({ message: "Doctor Created", doctor: CreatedDoctor, token: token }, { status: 201 })
            }else{
                return NextResponse.json({ message: "doctor not created" }, { status: 500 })
            }
        }
    }catch(err){
        return NextResponse.json({ message: "error signing up doctor", error: err }, { status: 500 })
    }
}