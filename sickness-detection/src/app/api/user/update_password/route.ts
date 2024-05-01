import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { User } from "@/Models/UserModel/UserModel";
import { isValidEmail } from "@/lib/functions/strings";
import bcrypt from "bcryptjs"
import { checkOTP } from "@/lib/functions/otp";
import Otp from "@/Models/OtpModel/Otp";

export async function PUT(request: Request){
    try{
        const {password, confirmPassword, otp, email} = await request.json()
        if(!password || password.length < 6){
            return NextResponse.json({ message: 'Password must should be longer of 5 caracters.' }, { status: 400 });
        }
        if(!confirmPassword || confirmPassword !== password ){
            return NextResponse.json({ message: 'Password and confirm password must be identical.' }, { status: 400 });
        }
        if(!email || !isValidEmail(email)){
            return NextResponse.json({ message: 'Invalid email.' }, { status: 400 });
        }
        connectMongoDB()
        if(!otp || otp?.length < 6 ){
            return NextResponse.json({ message: 'Verification code should be of 6 caracters long.' }, { status: 400 });
        }
        const user = await User.findOne({email: email})
        if(!user){
            return NextResponse.json({ message: 'No user registred with the provided email.' }, { status: 400 });
        }
        if(await checkOTP({email, otp}) === false){
            return NextResponse.json({ message: 'Invalid verification code.' }, { status: 400 });
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const updatedUser = await User.findOneAndUpdate({email: email}, { password: hashedPassword }, {new: true})
        if(!updatedUser){
            return NextResponse.json({ message: 'Password not changed.' }, { status: 400 });   
        }
        await Otp.findOneAndDelete({email: email})
        return NextResponse.json({ message: 'Password changed.' }, { status: 200 });
    }catch(err){
        return NextResponse.json({ message: `Internal server error: ${err}` }, { status: 500 });
    }
}