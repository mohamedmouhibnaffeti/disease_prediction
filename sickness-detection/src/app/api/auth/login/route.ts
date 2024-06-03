import { User } from "@/Models/UserModel/UserModel"
import connectMongoDB from "@/lib/mongodb"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createAccessToken, createRefreshToken } from "@/lib/functions/auth"

export async function POST(request: Request){
    try{
        const { email, password } = await request.json()
        connectMongoDB()
        const user = await User.findOne({email: email})
        if(!user){
            return NextResponse.json({ message: "No user found with the provided email." }, { status: 400 })
        }
        if(user && user.state === "archived"){
            return NextResponse.json({ message: "Your accound has been suspended by our admins." }, { status: 400 })
        }
        const passwordsMatch = await bcrypt.compare(password, user.password)
        if(!passwordsMatch){
            return NextResponse.json({ message: "Wrong password." }, { status: 400 })
        }
        const RefreshToken = createRefreshToken(user)
        const Accesstoken = createAccessToken(user)
        return NextResponse.json({ message: "welcome", user: user, AccessToken: Accesstoken, RefreshToken: RefreshToken }, { status: 200 })
    }catch(err){
        return NextResponse.json({ message: "Server error when signing in" }, { status: 500 })
    }
}