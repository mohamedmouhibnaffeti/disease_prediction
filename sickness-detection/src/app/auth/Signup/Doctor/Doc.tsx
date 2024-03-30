import First from "./first"
import Second from "./second"
import { AppDispatch, RootState } from "@/Store/store"
import { UseDispatch, useDispatch, useSelector } from "react-redux"
import { setCurrentSignupPage } from "@/Store/auth/authSlice"

export default () => {
    const currendDoctorSignupPage = ((state: RootState) => state.Authentication.currentDoctorSignupPage )
    return(
        <div className="w-[34rem] flex justify-center items-center flex-col border border-sickness-border bg-white px-8 py-4 sm:gap-4 sm:mt-[8rem] mt-[10rem]">
            <h1 className="font-semibold text-sickness-primaryText text-3xl"> Create Account </h1>
            <p className='text-sickness-gray'> Step <span className="text-sickness-primary font-semibold"> {1}/2 </span> </p>
            <Second />
            <p className="text-sickness-gray text-sm self-start mt-2"> Already have an account? <a href="/auth/Login" className="text-sickness-primaryText hover:underline font-semibold cursor-pointer"> Login! </a> </p>
        </div>
    )
}