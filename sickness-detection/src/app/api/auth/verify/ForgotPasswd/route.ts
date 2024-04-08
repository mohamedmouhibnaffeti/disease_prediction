import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { User } from "@/Models/UserModel/UserModel";
import { encryptToken } from "@/lib/functions/strings";
import otpGn from "otp-generator"
import Otp from "@/Models/OtpModel/Otp";
import { sendOTPToEmail } from "../Register/route";

export async function POST(request: Request){
    try{
        const { email } = await request.json();
        connectMongoDB()
        const user = await User.findOne({ email });
        if(!user){
            return NextResponse.json({ message: "User not found, create an account first." }, { status: 400 });
        }
        const otp = otpGn.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        const encodedOtp = encryptToken(otp, process.env.SECRET_ENCRYPTION_KEY || "")
        await sendOTPToEmail(email, otp);
        const CreatedOtp = await Otp.create({ email, otp: encodedOtp })
        if(!CreatedOtp){
            return NextResponse.json({ message: "Error creating Otp." }, { status: 400 });
        }
        return NextResponse.json({ message: "OTP generated successfully and sent to email." }, { status: 200 });

        /*
        return NextResponse.json({ message: "OTP generated successfully and sent to email" }, { status: 200, headers: { "Set-Cookie": `otp=${encodedOtp};Max-Age=120` } });
        */
    }catch(err){
        return NextResponse.json({ message: `Internal Server error: ${err}` })
    }
}