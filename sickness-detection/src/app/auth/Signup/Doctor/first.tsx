"use client"
import { ChevronsRightIcon } from 'lucide-react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const ContainerStyle = {
    height: '2.7rem',
    marginTop: '1rem'
}

const InputStyle = {
    width: '100%',
    height: '2.7rem',
    paddingLeft: '5rem',
};

const ButtonStyle = {
    width: '4rem',
    display: 'flex',
    justifyContent: 'center'
}

import { AppDispatch, RootState } from '@/Store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDoctorSignupPage, setSignupFormDataDoctor } from '@/Store/auth/authSlice';

export default() => {
    const SignupFormData = useSelector((state: RootState) => state.Authentication.SignupFormDataDoctor)
    const dispatch = useDispatch<AppDispatch>()
    return(
        <>
        <div className="flex md:flex-row flex-col gap-2 w-full">
                <div className="w-full">
                    <span className="text-sickness-gray text-lg"> Firstname </span>
                    <input type="text" value={SignupFormData.name} onChange={(e)=>dispatch(setSignupFormDataDoctor({name: "name", value: e.target.value}))} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" />
                </div>
                <div className="w-full">
                    <span className="text-sickness-gray text-lg"> Lastname </span>
                    <input type="text" value={SignupFormData.lastname} onChange={(e)=>dispatch(setSignupFormDataDoctor({name: "lastname", value: e.target.value}))} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" />
                </div>
            </div>
            <div className="w-full">
                <span className="text-sickness-gray text-lg"> Email </span>
                <input type="text" value={SignupFormData.email} onChange={(e)=>dispatch(setSignupFormDataDoctor({name: "email", value: e.target.value}))} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" />
            </div>
            <PhoneInput country='tn' value={SignupFormData.phone} onChange={(e)=>dispatch(setSignupFormDataDoctor({name: "phone", value: e}))} inputStyle={InputStyle} buttonStyle={ButtonStyle} containerStyle={ContainerStyle}/>
            <div className="w-full mt-4">
                    <span className="text-sickness-gray text-lg"> Password </span>
                    <input type="password" value={SignupFormData.password} onChange={(e)=>dispatch(setSignupFormDataDoctor({name: "password", value: e.target.value}))} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" placeholder="●●●●●●●●" />
            </div>
            <div className="w-full mt-4">
                <span className="text-sickness-gray text-lg"> Confirm Password </span>
                <input type="password" value={SignupFormData.confirmPassword} onChange={(e)=>dispatch(setSignupFormDataDoctor({name: "confirmPassword", value: e.target.value}))} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" placeholder="●●●●●●●●" />
            </div>
            <button className="mt-4 w-full rounded-md text-white border-2 border-sickness-primary hover:border-inherit bg-sickness-primary hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2" onClick={()=>dispatch(setCurrentDoctorSignupPage(2))} > Next <ChevronsRightIcon className="h-5 w-5" /> </button>
        </>
    )
}