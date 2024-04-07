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
        port: process.env.SMTP_PORT,
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
        console.log(email)
        
        await sendOTPToEmail(email, otp);
        
        return NextResponse.json({ message: "OTP generated successfully and sent to email" }, { status: 200, headers: { 'Set-Cookie': setCookie } });
        
    } catch(err) {
        return NextResponse.json({ message: `Internal server error: ${err}` }, { status: 500 });
    }
}
