import { User } from "@/Models/UserModel/UserModel"
import connectMongoDB from "@/lib/mongodb"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createToken } from "@/lib/functions/auth"

export async function POST(request: Request){
    try{
        const { email, password } = await request.json()
        const user = await User.findOne({ email: email })
        if(!user){
            return NextResponse.json({ message: "User not found, please create an account first." }, { status: 400 })
        }
        const passwordsMatch = await bcrypt.compare(password, user.password)
        if(!passwordsMatch){
            return NextResponse.json({ message: "Wrong password." }, { status: 400 })
        }
        const token = createToken(user._id)
        return NextResponse.json({ message: "welcome", user: user, token: token }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: "Server error when signing in" }, { status: 500 })
    }
}