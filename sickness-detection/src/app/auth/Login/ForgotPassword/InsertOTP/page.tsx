"use client"
import { ChevronRight } from "lucide-react"
import { useLayoutEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ReactCodeInput from 'react-verification-code-input'
import { RootState, AppDispatch } from "@/Store/store"
import { setForgotPasswordData, VerifyOTPForForgotPasswd } from "@/Store/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { isValidEmail } from "@/lib/functions/strings"

export default function InsertOTP() {
    const Router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const forgotpassworddata = useSelector((state: RootState) => state.Authentication.ForgotPasswordData)
    useLayoutEffect(()=>{
        if(!forgotpassworddata.email || !isValidEmail(forgotpassworddata.email)){
            Router.push('/auth/Login/ForgotPassword')
        }
    }, [])
    const [ errorMsg, setErrorMsg ] = useState<string>("")
    const [requestLoading, setRequestLoading] = useState<boolean>(false)
    const SendOTP = async () => {
        setRequestLoading(true)
        const response = await dispatch(VerifyOTPForForgotPasswd())
        if(response.payload.status === 200){
            setRequestLoading(false)
            Router.push('/auth/Login/ForgotPassword/InsertOTP/ChangePassword')
        }else{
            setErrorMsg(response.payload.message)
        }
        setRequestLoading(false)
    }
    return(
        <div className="w-full flex justify-center items-center h-screen px-8 py-4">
            <div className="w-[32rem] px-8 py-4 rounded-md border border-sickness-border bg-white flex flex-col gap-4 items-center">
                <h1 className="md:text-3xl text-lg font-semibold text-sickness-primaryText"> Forgot Password </h1>
                <p className="text-sickness-gray font-medium md:text-xsm text-sm"> <span className="text-sickness-primaryText font-semibold"> {60} seconds </span> until verification code expires. </p>
                <ReactCodeInput className="self-center w-full md:gap-8 gap-0 flex" values={forgotpassworddata.otp.split("")} onChange={e=>{ dispatch(setForgotPasswordData({ name: 'otp', value: e })); setErrorMsg("") }} />
                <button className={`mt-4 w-full rounded-md text-white ${requestLoading ? "bg-sickness-primary/70" : "bg-sickness-primary hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText"} transition delay-75 duration-100 md:h-12 h-10 font-semibold flex justify-center items-center gap-1 md:text-md text-sm`} disabled={requestLoading} onClick={SendOTP}> Send verification code { requestLoading ? <div className="small-white-loader" /> : <ChevronRight /> } </button>
                <p className="text-sm text-red-500 break-words text-center self-center"> {errorMsg} </p>
            </div>
        </div>
    )
}