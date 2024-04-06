import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { User } from "@/Models/UserModel/UserModel";
import otpGn from "otp-generator";
import nodemailer from "nodemailer";
import { serialize } from "cookie"; // Import serialize from cookie package to set cookie
import { parse } from "cookie"; // Import parse from cookie package to parse cookie

// Function to send OTP to user's email
async function sendOTPToEmail(email: string, otp: any) {
    // Create a nodemailer transporter with your SMTP settings
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    let info = await transporter.sendMail({
        from: `"${process.env.SENDER_NAME}" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Signup verification code",
        text: `Your verification code is: ${otp}.
        
        SymptoSense technical support.
        `,
        headers: {
            'Brand-Indicators': 'bimi validate',
          },
    });

    console.log("Message sent: %s", info.messageId);
}

export async function POST(request: Request){
    try{
        const { email } = await request.json();
        /*
        connectMongoDB()
        const user = await User.findOne({ email });
        if(user){
            return NextResponse.json({ message: "Utilisateur existe déjà" }, { status: 400 });
        }
        
        */
        const otp = otpGn.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        const encodedOtp = encodeURIComponent(otp);

        const setCookie = serialize('otp', encodedOtp, {
            httpOnly: true,
            maxAge: 60 * 2,
            path: '/auth/signup',
        });

        // Send OTP to user's email
        await sendOTPToEmail(email, otp);
        
        return NextResponse.json({ message: "OTP generated successfully and sent to email" }, { status: 200, headers: { 'Set-Cookie': setCookie } });
        
    } catch(err) {
        return NextResponse.json({ message: `Internal server error: ${err}` }, { status: 500 });
    }
}
