import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { BadgeCheckIcon, BanIcon } from "lucide-react";
import { useEffect, useState } from "react";
import VerificationInput from "react-verification-input";
import { RootState, AppDispatch } from "@/Store/store"
import { DoctorSignup, RegisterOTP, setSignupFormDataDoctor } from "@/Store/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation";

export default function VerifyEmail({open, setOpen}: {open: boolean, setOpen :any}) {
    const dispatch = useDispatch<AppDispatch>()
    const Router = useRouter()
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const { SignupFormDataDoctor } = useSelector((state: RootState) => state.Authentication)
    const handleRegister = async() => {
        setLoading(true)
        const response = await dispatch(DoctorSignup())
        console.log(response)
        if(response.payload.status === 201){
            setLoading(false)
            const userString = JSON.stringify(response.payload.user)
            localStorage.setItem("user", userString)
            localStorage.setItem("AccessToken", response.payload?.AccessToken)
            localStorage.setItem("RefreshToken", response.payload?.RefreshToken)
            Router.push("/")
        }else{
            setError(response.payload.message)
        }
        setLoading(false)
    }

    return(
        <AlertDialog open={open}>
            <AlertDialogContent className='w-full flex justify-center flex-col'>
                <AlertDialogHeader className='w-full flex justify-center'>
                    <AlertDialogTitle className='w-full flex justify-center'>
                        Check your inbox!
                    </AlertDialogTitle>
                    <AlertDialogDescription className='text-sm text-center'>
                        We&apos;ve sent you an email containing a verification code which will expire in <span className='text-settaPrimary font-semibold'> {60} seconds </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className='w-full flex justify-center items-center flex-col'>
                    <VerificationInput onChange={(e)=>{dispatch(setSignupFormDataDoctor({ name: "otp", value: e })); setError("")}} value={SignupFormDataDoctor.otp} />
                    <p className="text-sm text-red-500 mt-2"> {error} </p> 
                </div>
                <div className='flex justify-between'>    
                    <button onClick={()=>setOpen(false)} className={`w-fit px-4 rounded-md text-sickness-primary hover:text-white bg-none border-2 border-sickness-primary hover:border-inherit hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2`} disabled={loading} > Annuler&nbsp;<BanIcon /> </button>
                    <button onClick={handleRegister} className={`w-fit px-4 rounded-md text-white ${loading || SignupFormDataDoctor.otp.length < 6 ? "bg-sickness-primary/70" : "bg-sickness-primary hover:border-inherit hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText"} border-2 cursor-pointer border-sickness-primary transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2`} disabled={loading || SignupFormDataDoctor.otp.length < 6}> Vérifier&nbsp;<BadgeCheckIcon /> </button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}