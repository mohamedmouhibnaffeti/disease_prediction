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
import { DoctorSignupErrorsType } from '@/app/interfaces/interfaces';
import { isValidEmail } from '@/lib/functions/strings';

export default({ Errors, setErrors }: { Errors: DoctorSignupErrorsType, setErrors: any }) => {
    const SignupFormData = useSelector((state: RootState) => state.Authentication.SignupFormDataDoctor)
    const dispatch = useDispatch<AppDispatch>()

    const handleNextClick = () => {
        if(SignupFormData.name?.length < 5 ){
            setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors, name: "Name should be longer than 4 caracters." }))
        }
        if(SignupFormData.lastname?.length < 5 ){
            setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors, lastname: "Lastname should be longer than 4 caracters." }))
        }
        if(SignupFormData.password?.length < 5 ){
            setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors, password: "Password should be longer than 4 caracters." }))
        }
        if(SignupFormData.phone?.length < 9 ){
            setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors, phone: "Phone should be longer than 8 caracters." }))
        }
        if(SignupFormData.password !== SignupFormData.confirmPassword ){
            setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors, confirmPassword: "Password and confirm password should be identical." }))
        }
        if(!isValidEmail(SignupFormData.email)){
            setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors, email: "Invalid email." }))
        }
        if((!isValidEmail(SignupFormData.email)) || (SignupFormData.password !== SignupFormData.confirmPassword) || (SignupFormData.phone?.length < 9) || (SignupFormData.password?.length < 5) || (SignupFormData.name?.length < 5) || (SignupFormData.lastname?.length < 5)){
            return
        }else{
            dispatch(setCurrentDoctorSignupPage(2))
        }
    }

    return(
        <>
        <div className="flex md:flex-row flex-col gap-2 w-full">
                <div className="w-full">
                    <span className="text-sickness-gray text-lg"> Firstname </span>
                    <input type="text" value={SignupFormData.name} onChange={(e)=>{dispatch(setSignupFormDataDoctor({name: "name", value: e.target.value})); setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors,  name: ""}))}} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" />
                    <p className='text-sm text-red-500 break-words self-center text-center'> { Errors.name } </p>
                </div>
                <div className="w-full">
                    <span className="text-sickness-gray text-lg"> Lastname </span>
                    <input type="text" value={SignupFormData.lastname} onChange={(e)=>{dispatch(setSignupFormDataDoctor({name: "lastname", value: e.target.value})); setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors,  lastname: ""}))}} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" />
                    <p className='text-sm text-red-500 break-words self-center text-center'> { Errors.lastname } </p>
                </div>
            </div>
            <div className="w-full">
                <span className="text-sickness-gray text-lg"> Email </span>
                <input type="text" value={SignupFormData.email} onChange={(e)=>{dispatch(setSignupFormDataDoctor({name: "email", value: e.target.value})); setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors,  email: ""}))}} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" />
                <p className='text-sm text-red-500 break-words self-center text-center'> { Errors.email } </p>
            </div>
            <PhoneInput country='tn' value={SignupFormData.phone} onChange={(e)=>{dispatch(setSignupFormDataDoctor({name: "phone", value: e})); setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors,  phone: ""}))}} inputStyle={InputStyle} buttonStyle={ButtonStyle} containerStyle={ContainerStyle}/>
            <p className='text-sm text-red-500 break-words self-center text-center'> { Errors.phone } </p>
            <div className="w-full mt-2">
                <span className="text-sickness-gray text-lg"> Password </span>
                <input type="password" value={SignupFormData.password} onChange={(e)=>{dispatch(setSignupFormDataDoctor({name: "password", value: e.target.value})); setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors,  password: ""}))}} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" placeholder="●●●●●●●●" />
                <p className='text-sm text-red-500 break-words self-center text-center'> { Errors.password } </p>
            </div>
            <div className="w-full mt-2">
                <span className="text-sickness-gray text-lg"> Confirm Password </span>
                <input type="password" value={SignupFormData.confirmPassword} onChange={(e)=>{dispatch(setSignupFormDataDoctor({name: "confirmPassword", value: e.target.value})); setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors,  confirmPassword: ""}))}} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" placeholder="●●●●●●●●" />
                <p className='text-sm text-red-500 break-words self-center text-center'> { Errors.confirmPassword } </p>
            </div>
            <button className="mt-2 w-full rounded-md text-white border-2 border-sickness-primary hover:border-inherit bg-sickness-primary hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2" onClick={handleNextClick} > Next <ChevronsRightIcon className="h-5 w-5" /> </button>
        </>
    )
}