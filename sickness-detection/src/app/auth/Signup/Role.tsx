"use client"
import DocAvatar from "@/components/SVG/DocAvatar"
import PatientAvatar from "@/components/SVG/patientAvatar"
import { AppDispatch } from "@/Store/store"
import { useDispatch } from "react-redux"
import { setCurrentSignupPage } from "@/Store/auth/authSlice"

export default function Role() {
    const dispatch = useDispatch<AppDispatch>()
    return(
        <div className="w-[32rem] shadow-md rounded-lg flex justify-center items-center flex-col gap-4 py-4 px-8 bg-white border border-sickness-border">
            <h1 className="text-sickness-primaryText text-3xl font-semibold"> Signup as... </h1>
            <button className="mt-4 w-full rounded-md text-lg text-white bg-sickness-primary hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2" onClick={()=>dispatch(setCurrentSignupPage("patient"))} > Patient <PatientAvatar /> </button>
            <button className="mt-4 w-full rounded-md text-lg text-white bg-sickness-primary hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2" onClick={()=>dispatch(setCurrentSignupPage("doctor"))} > Doctor <DocAvatar /> </button>
        </div>
    )
}