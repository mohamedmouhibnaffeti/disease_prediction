import { Patient, User } from "@/Models/UserModel/UserModel"
import { isValidEmail } from "@/lib/functions/strings"
import connectMongoDB from "@/lib/mongodb"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createAccessToken, createRefreshToken } from "@/lib/functions/auth"

export async function POST(request: Request){
    try{
        const { name, lastname, phone, email, password, confirmPassword, gender, age } = await request.json()
        await connectMongoDB()
        const salt = await bcrypt.genSalt(10)
        if(name.length < 5 || lastname.length < 5 || !isValidEmail(email) || password.length < 6 || confirmPassword < 6 || confirmPassword !== password || phone.length < 9 || gender.length === 0 || parseInt(age) < 15 ){
            return NextResponse.json({ message: "check patient form data" }, { status: 400 })
        }
        const existingPatient = await User.findOne({email: email})
        if(existingPatient){
            return NextResponse.json({message: "Email already exists in database." }, { status: 400 })
        }else{
            const hashedPassword = await bcrypt.hash(password, salt)
            const createdPatient = await Patient.create({ name, lastname, email, password: hashedPassword, phone, gender, age: parseInt(age) })
            if(createdPatient){
                const RefreshToken = createRefreshToken(createdPatient._id)
                const AccessToken = createAccessToken(createdPatient._id)
                return NextResponse.json({ message: "Patient Created", user: createdPatient, AccessToken: AccessToken, RefreshToken: RefreshToken }, { status: 201 })
            }else{
                return NextResponse.json({ message: "Patient not created" }, { status: 500 })
            }
        }
    }catch(err){
        return NextResponse.json({ message: "error signing up patient", error: err }, { status: 500 })
    }
}