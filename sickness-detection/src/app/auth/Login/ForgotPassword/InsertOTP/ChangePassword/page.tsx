"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"

export default function ChangePassword(){
    const Router = useRouter()
    const [requestLoading, setRequestLoading] = useState<boolean>(false)
    const [ errorMsgs, setErrorMsgs ] = useState<{ passwd: string, confirmPasswd: string, response: string }>({ passwd: "", confirmPasswd: "", response: "" })
    const ResetPassword = async() => {
        Router.push('/auth/Login')
    }
    return(
        <div className="w-full h-screen flex justify-center items-center px-8 py-4">
            <div className="w-[32rem] px-8 py-4 border border-sickness-border rounded-md flex flex-col gap-4 items-center">
            <h1 className="md:text-3xl text-lg font-semibold text-sickness-primaryText"> Reset Password </h1>
            <div className="w-full">
                <span className="text-sickness-gray md:text-lg text-md"> Password </span>
                <input type="text" className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 md:py-2 py-1 rounded-md w-full border-sickness-border" placeholder="●●●●●●●●" />
                <p className="text-sm text-red-500 break-words"> {errorMsgs.passwd} </p>
            </div>
            <div className="w-full">
                <span className="text-sickness-gray md:text-lg text-md"> Confirm Password </span>
                <input type="text" className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 md:py-2 py-1 rounded-md w-full border-sickness-border" placeholder="●●●●●●●●" />
                <p className="text-sm text-red-500 break-words"> {errorMsgs.confirmPasswd} </p>
            </div>
            <button className={`mt-4 w-full rounded-md text-white ${requestLoading ? "bg-sickness-primary/70" : "bg-sickness-primary hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText"} transition delay-75 duration-100 md:h-12 h-10 font-semibold flex justify-center items-center gap-1 md:text-md text-sm`} disabled={requestLoading} onClick={ResetPassword}> Send verification code { requestLoading ? <div className="small-white-loader" /> : <ChevronRight /> } </button>
            <p className="text-sm text-red-500 break-words"> {errorMsgs.response} </p>
            </div>
        </div>
    )
}