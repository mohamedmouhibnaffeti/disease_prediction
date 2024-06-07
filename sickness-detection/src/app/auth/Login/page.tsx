"use client"
import { LogInIcon } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Store/store"
import { setLoginFormData, Login } from "@/Store/auth/authSlice"
import { useState } from "react"
import { useRouter } from "next/navigation"
import SmallWhiteLoader from "@/components/Loaders/WhiteButtonLoader"

export default function Authenticate() {
    const Router = useRouter()
    const LoginData = useSelector((state: RootState) => state.Authentication.LoginFormData)
    const [requestLoading, setRequestLoading] = useState(false)
    const [loginErrors, setLoginErrors] = useState({ email: "", password: "" })
    const [LoginResponse, setLoginResponse] = useState<any>({})
    const dispatch = useDispatch<AppDispatch>()
    const handleLogin = async () => {
        setRequestLoading(prevstate => true)
        if(LoginData.email.length === 0){
            setLoginErrors({...loginErrors, email: "Please insert email"})
        }
        if(LoginData.password.length === 0){
            setLoginErrors(prevErrors => ({...prevErrors, password: "Please insert password"}))
        }
        if(LoginData.password.length === 0 || LoginData.email.length === 0){
            return
        }else{
            const resp = await dispatch(Login())
            setLoginResponse((prevResp: any) => resp.payload)
            if(resp.payload?.user){
                const StringifiedUser = JSON.stringify(resp.payload?.user)
                localStorage.setItem("user", StringifiedUser)
                localStorage.setItem("AccessToken", resp.payload?.AccessToken)
                localStorage.setItem("RefreshToken", resp.payload?.RefreshToken)
                window.location.href = "/"
            }
        }
        setRequestLoading(prevstate => false)
    }

    return(
        <main className="w-screen h-screen flex items-center justify-center px-8 py-4">
            <div className="w-[32rem] px-8 py-4 rounded-md shadow-lg border-sickness-border border bg-white flex flex-col gap-4 items-center">
                <h1 className="font-semibold text-sickness-primaryText md:text-3xl text-lg"> Welcome back! </h1>
                <div className="w-full">
                    <span className="text-sickness-gray md:text-lg text-md"> Email </span>
                    <input type="text" value={LoginData.email} onChange={(e)=>{dispatch(setLoginFormData({ name: "email", value: e.target.value  })); setLoginErrors(prevErrors => ({...prevErrors, email: ""}))}} className="outline-none border focus:border-sickness-primary text-sickness-gray pl-2 md:py-2 py-1 rounded-md w-full border-sickness-border" placeholder="example@gmail.com" />
                    <p className="text-sm text-red-500 break-words"> {loginErrors.email} </p>
                </div>
                <div className="w-full mt-4">
                    <span className="text-sickness-gray md:text-lg text-md"> Password </span>
                    <input type="password" value={LoginData.password} onChange={(e)=>{dispatch(setLoginFormData({ name: "password", value: e.target.value  })); setLoginErrors(prevErrors => ({...prevErrors, password: ""}))}} className="outline-none border focus:border-sickness-primary text-sickness-gray pl-2 md:py-2 py-1 rounded-md w-full border-sickness-border" placeholder="●●●●●●●●" />
                    <p className="text-sm text-red-500 break-words"> {loginErrors.password} </p>
                </div>
                <button className={`mt-4 w-full rounded-md text-white ${requestLoading ? "bg-sickness-primary/70" : "bg-sickness-primary hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText"} transition delay-75 duration-100 md:h-12 h-10 font-semibold flex justify-center items-center gap-1 md:text-md text-sm`} onClick={handleLogin} disabled={requestLoading}> Login { requestLoading ? <SmallWhiteLoader /> : <LogInIcon /> } </button>
                <p className="text-center self-center text-sm text-red-500"> { LoginResponse?.message !== "welcome" && LoginResponse?.message } </p>
                <a className="text-sm font-semibold text-sickness-gray self-start" href="/auth/Login/ForgotPassword"> Forgot password? <span className="cursor-pointer hover:underline text-sickness-primaryText"> Create new password! </span> </a>
                <p className="text-sickness-gray text-sm self-start mt-2"> Don&apos;t have an account? <a href="/auth/Signup" className="text-sickness-primaryText hover:underline font-semibold cursor-pointer"> Create account! </a> </p>
            </div>
        </main>
    )
}