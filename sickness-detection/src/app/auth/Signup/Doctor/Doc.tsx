"use client"
import { useState } from "react"
import First from "./first"
import Second from "./second"
import { RootState } from "@/Store/store"
import { useSelector } from "react-redux"
import { DoctorSignupErrorsType } from "@/app/interfaces/interfaces"
export default () => {
    const currendDoctorSignupPage =useSelector((state: RootState) => state.Authentication.currentDoctorSignupPage )
    const [Errors, setErrors] = useState<DoctorSignupErrorsType>({ name: "", lastname: "", email: "", phone: "",password: "", confirmPassword: "", images: "" })
    return(
        <div className="w-[34rem] flex justify-center items-center rounded-lg flex-col border border-sickness-border bg-white px-8 py-4 sm:gap-4 sm:mt-[8rem] mt-[10rem]">
            <h1 className="font-semibold text-sickness-primaryText text-3xl"> Create Account </h1>
            <p className='text-sickness-gray'> Step <span className="text-sickness-primary font-semibold"> {currendDoctorSignupPage}/2 </span> </p>
            {
                currendDoctorSignupPage === 1
                ?
                <First Errors={Errors} setErrors={setErrors} />
                :
                <Second Errors={Errors} setErrors={setErrors} />
            }
            <p className="text-sickness-gray text-sm self-start mt-2"> Already have an account? <a href="/auth/Login" className="text-sickness-primaryText hover:underline font-semibold cursor-pointer"> Login! </a> </p>
        </div>
    )
}