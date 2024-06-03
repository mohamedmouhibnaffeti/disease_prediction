"use client"
import { useLayoutEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { RootState, AppDispatch } from "@/Store/store"
import { setForgotPasswordData, updatePasswd } from "@/Store/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { isValidEmail } from "@/lib/functions/strings"
import SmallWhiteLoader from "@/components/Loaders/WhiteButtonLoader"

export default function ChangePassword(){
    const Router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const forgotpassworddata = useSelector((state: RootState) => state.Authentication.ForgotPasswordData)
    useLayoutEffect(()=>{
        if(!forgotpassworddata.email || !isValidEmail(forgotpassworddata.email)){
            Router.push('/auth/Login/ForgotPassword')
        }
        if(!forgotpassworddata.otp || forgotpassworddata.otp.length !== 6){
            Router.push('/auth/Login/ForgotPassword/InsertOTP')
        }
    }, [])
    const [requestLoading, setRequestLoading] = useState<boolean>(false)
    const [ errorMsgs, setErrorMsgs ] = useState<string>("")
    const ResetPassword = async() => {
        setRequestLoading(true)
        const response = await dispatch(updatePasswd())
        console.log(response.payload)
        if(response.payload?.status === 200){
            setRequestLoading(false)
            Router.push('/auth/Login')
        }
        else{
            setErrorMsgs(response.payload.message)
        }
        setRequestLoading(false)
    }
    return(
        <div className="w-full h-screen flex justify-center items-center px-8 py-4">
            <div className="w-[32rem] px-8 py-4 border border-sickness-border rounded-md flex flex-col gap-4 items-center">
            <h1 className="md:text-3xl text-lg font-semibold text-sickness-primaryText"> Reset Password </h1>
            <div className="w-full">
                <span className="text-sickness-gray md:text-lg text-md"> Password </span>
                <input type="password" onChange={(e)=>{dispatch(setForgotPasswordData({ name: 'passwwd', value:e.target.value })); setErrorMsgs("")}} value={forgotpassworddata.passwwd} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 md:py-2 py-1 rounded-md w-full border-sickness-border" placeholder="●●●●●●●●" />
            </div>
            <div className="w-full">
                <span className="text-sickness-gray md:text-lg text-md"> Confirm Password </span>
                <input type="password" value={forgotpassworddata.confirmPasswd} onChange={(e)=>{dispatch(setForgotPasswordData({ name: 'confirmPasswd', value:e.target.value })); setErrorMsgs("")}} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 md:py-2 py-1 rounded-md w-full border-sickness-border" placeholder="●●●●●●●●" />
            </div>
            <button className={`mt-4 w-full rounded-md text-white ${requestLoading ? "bg-sickness-primary/70" : "bg-sickness-primary hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText"} transition delay-75 duration-100 md:h-12 h-10 font-semibold flex justify-center items-center gap-1 md:text-md text-sm`} disabled={requestLoading} onClick={ResetPassword}> Send verification code { requestLoading ? <SmallWhiteLoader /> : <ChevronRight /> } </button>
            <p className="text-sm text-red-500 break-words"> {errorMsgs} </p>
            </div>
        </div>
    )
}