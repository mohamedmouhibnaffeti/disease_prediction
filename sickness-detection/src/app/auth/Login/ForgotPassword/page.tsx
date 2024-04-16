"use client"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { RootState, AppDispatch } from "@/Store/store"
import { ForgotPasswordOTP, setForgotPasswordData } from "@/Store/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"


export default function ForgotPassword() {
    const dispatch = useDispatch<AppDispatch>()
    const forgotpassworddata = useSelector((state: RootState) => state.Authentication.ForgotPasswordData)
    const Router = useRouter()
    const [ errorMsg, setErrorMsg ] = useState<string>("")
    const [requestLoading, setRequestLoading] = useState<boolean>(false)
    const handleNextClick = async() => {
        setRequestLoading(true)
        const reponse = await dispatch(ForgotPasswordOTP())
        if(reponse.payload?.status === 200){
            setRequestLoading(false)
            Router.push('/auth/Login/ForgotPassword/InsertOTP')
        }else{
            setErrorMsg(reponse.payload.message)
        }
        setRequestLoading(false)
    }
    return(
        <div className="w-full flex justify-center items-center h-screen px-8 py-4">
            <div className="w-[32rem] px-8 py-4 rounded-md border border-sickness-border bg-white flex flex-col gap-4 items-center">
                <h1 className="md:text-3xl text-lg font-semibold text-sickness-primaryText"> Forgot Password </h1>
                <div className="w-full">
                    <span className="text-sickness-gray md:text-lg text-md"> Email </span>
                    <input type="text" onChange={(e)=>{dispatch(setForgotPasswordData({ name: 'email', value: e.target.value })); setErrorMsg("")}} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 md:py-2 py-1 rounded-md w-full border-sickness-border" placeholder="example@gmail.com" value={forgotpassworddata.email} />
                </div>
                <button onClick={handleNextClick} className={`mt-4 w-full rounded-md text-white ${requestLoading ? "bg-sickness-primary/70" : "bg-sickness-primary hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText"} transition delay-75 duration-100 md:h-12 h-10 font-semibold flex justify-center items-center gap-1 md:text-md text-sm`} disabled={requestLoading}> Send verification code { requestLoading ? <div className="small-white-loader" /> : <ChevronRight /> } </button>
                <p className="text-sm text-red-500 break-words"> {errorMsg} </p>
            </div>
        </div>
    )
}