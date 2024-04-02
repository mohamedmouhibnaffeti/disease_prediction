import { Patient, User } from "@/Models/UserModel/UserModel"
import { isValidEmail } from "@/lib/functions/strings"
import connectMongoDB from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function POST(request: Request){
    try{
        const { name, lastname, phone, email, password, confirmPassword } = await request.json()
        await connectMongoDB()
        if(name.length < 6 || lastname.length < 6 || !isValidEmail(email) || password.length < 6 || confirmPassword < 6 || confirmPassword !== password || phone.length < 6){
            return NextResponse.json({ message: "check patient form data" }, { status: 400 })
        }
        const existingPatient = await User.findOne({email: email})
        console.log(existingPatient)
        if(existingPatient){
            return NextResponse.json({message: "Patient already exists" }, { status: 400 })
        }else{
            const createdPatient = await Patient.create({ name, lastname, email, password, phone })
            if(createdPatient){
                return NextResponse.json({ message: "Patient Created", doctor: createdPatient }, { status: 201 })
            }else{
                return NextResponse.json({ message: "Patient not created" }, { status: 500 })
            }
        }
    }catch(err){
        return NextResponse.json({ message: "error signing up patient", error: err }, { status: 500 })
    }
}