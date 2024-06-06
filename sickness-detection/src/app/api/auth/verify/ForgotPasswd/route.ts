import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { User } from "@/Models/UserModel/UserModel";
import { encryptToken } from "@/lib/functions/strings";
import otpGn from "otp-generator"
import Otp from "@/Models/OtpModel/Otp";

async function sendOTPToEmail(email: string, otp: any, type: string) {
    // Create a nodemailer transporter with your SMTP settings
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: false
        },
    });

    let info = await transporter.sendMail({
        from: `"${process.env.SENDER_NAME}" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `${type}`,
        html: `
        <html>
            <head>
                <style>
                    /* Add your CSS styles here */
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                    .header {
                        background-color: #007bff;
                        color: #fff;
                        text-align: center;
                        padding: 10px 0;
                        border-top-left-radius: 5px;
                        border-top-right-radius: 5px;
                    }
                    .content {
                        padding: 20px;
                    }
                    .footer {
                        text-align: center;
                        padding-top: 20px;
                        color: #888;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Signup Verification Code</h2>
                    </div>
                    <div class="content">
                        <p>Your verification code is: <strong>${otp}</strong>.</p>
                        <p> The code expires in <strong> 2 minutes </strong>. </p>
                        <p><em>SymptoSense technical support.</em></p>
                    </div>
                    <div class="footer">
                        <p>This email was sent by SymptoSense. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
        </html>
    `,
        headers: {
            'Brand-Indicators': 'bimi validate',
          },
    });
}
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
        await sendOTPToEmail(email, otp, "Forgot password verification code");
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