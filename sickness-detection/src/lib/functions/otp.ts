import Otp from "@/Models/OtpModel/Otp"
import { decryptToken } from "./strings"

export const checkOTP = async({email, otp}: { email: string, otp: string }) => {
    try{
        const otpInstance = await Otp.findOne({ email: email }).sort({ createdAt: -1 })
        if(!otpInstance){
            return false
        }
        if(otp === decryptToken(otpInstance, process.env.SECRET_ENCRYPTION_KEY || "")){
            return true
        }
    }catch(err){
        return false
    }
}