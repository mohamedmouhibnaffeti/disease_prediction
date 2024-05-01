import Otp from "@/Models/OtpModel/Otp"
import { decryptToken } from "./strings"

export const checkOTP = async({email, otp}: { email: string, otp: string }) => {
    try{
        const otpInstance = await Otp.findOne({ email: email }).sort({ createdAt: -1 })
        if(!otpInstance){
            return false
        }
        console.log(decryptToken(otpInstance.otp, process.env.SECRET_ENCRYPTION_KEY || ""))
        console.log({ insertedotp: otp })
        if(otp === decryptToken(otpInstance.otp, process.env.SECRET_ENCRYPTION_KEY || "")){
            return true
        }
        return false
    }catch(err){
        return false
    }
}