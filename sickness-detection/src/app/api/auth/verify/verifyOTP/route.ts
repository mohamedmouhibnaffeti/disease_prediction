import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { checkOTP } from "@/lib/functions/otp";
import { isValidEmail } from "@/lib/functions/strings";

export async function POST(request: Request){
    try{
        const { otp, email } = await request.json()
        connectMongoDB()
        if(!email || !isValidEmail(email)){
            return NextResponse.json({ message: 'Invalid email, please go back to the previous page to insert your email...' }, { status: 400 });
        }
        if(!otp || otp?.length < 6 ){
            return NextResponse.json({ message: 'Verification code should be of 6 caracters long.' }, { status: 400 });
        }
        if(await checkOTP({email, otp}) === false){
            return NextResponse.json({ message: 'Invalid verification code.' }, { status: 400 });
        }
        return NextResponse.json({ message: 'Valid otp.' }, { status: 200 });
    }catch(err){
        return NextResponse.json({ message: `Internal server error: ${err}` })
    }
}