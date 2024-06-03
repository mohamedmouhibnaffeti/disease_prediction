"use client"
import { UserPlusIcon } from 'lucide-react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Store/store';
import { PatientSignup, setPatientSignupFormData } from '@/Store/auth/authSlice';
import { useState } from 'react';
import { PatientSignupErrorsType } from '@/app/interfaces/interfaces';
import { isValidEmail } from '@/lib/functions/strings';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@radix-ui/react-label"
import SmallWhiteLoader from '@/components/Loaders/WhiteButtonLoader';

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

export default () => {
    const [ErrorMessages, setErrorMessages] = useState<PatientSignupErrorsType>({name: "", lastname: "", email: "", phone: "",password: "", confirmPassword: "", age: "", gender: ""})
    const SignupFormData = useSelector((state: RootState) => state.Authentication.PatientSignupFormData)
    const dispatch = useDispatch<AppDispatch>()
    const [isLoading, setIsLoading] = useState(false)
    const Router = useRouter()
    const [SignupResponse, setSignupResponse] = useState<any>({})
    const handleSignup = async() => {
        if(SignupFormData.name?.length < 5 ){
            setErrorMessages((prevErrors: PatientSignupErrorsType) => ({ ...prevErrors, name: "Name should be longer than 4 caracters." }))
        }
        if(SignupFormData.lastname?.length < 5 ){
            setErrorMessages((prevErrors: PatientSignupErrorsType) => ({ ...prevErrors, lastname: "Lastname should be longer than 4 caracters." }))
        }
        if(SignupFormData.password?.length < 5 ){
            setErrorMessages((prevErrors: PatientSignupErrorsType) => ({ ...prevErrors, password: "Password should be longer than 4 caracters." }))
        }
        if(SignupFormData.phone?.length < 9 ){
            setErrorMessages((prevErrors: PatientSignupErrorsType) => ({ ...prevErrors, phone: "Phone should be longer than 8 caracters." }))
        }
        if(SignupFormData.password !== SignupFormData.confirmPassword ){
            setErrorMessages((prevErrors: PatientSignupErrorsType) => ({ ...prevErrors, confirmPassword: "Password and confirm password should be identical." }))
        }
        if(!isValidEmail(SignupFormData.email)){
            setErrorMessages((prevErrors: PatientSignupErrorsType) => ({ ...prevErrors, email: "Invalid email." }))
        }
        if(SignupFormData.gender.length === 0){
            setErrorMessages((prevErrors: PatientSignupErrorsType) => ({ ...prevErrors, gender: "Please select a gender." }))
        }
        if(parseInt(SignupFormData.age) < 15){
            setErrorMessages((prevErrors: PatientSignupErrorsType) => ({ ...prevErrors, age: "You should be older than 15 years old." }))
        }
        if((parseInt(SignupFormData.age) < 15) || (SignupFormData.gender.length === 0) || (!isValidEmail(SignupFormData.email)) || (SignupFormData.password !== SignupFormData.confirmPassword) || (SignupFormData.phone?.length < 9) || (SignupFormData.password?.length < 5) || (SignupFormData.name?.length < 5) || (SignupFormData.lastname?.length < 5)){
            return
        }else{
            setIsLoading(true)
            const response = await dispatch(PatientSignup())
            setSignupResponse(response.payload)
            if(response.payload.status === 201){
                const userString = JSON.stringify(response.payload.user)
                localStorage.setItem("user", userString)
                localStorage.setItem("AccessToken", response.payload?.AccessToken)
                localStorage.setItem("RefreshToken", response.payload?.RefreshToken)
                Router.push("/")
            }
            setIsLoading(false)
        }
    }

    console.log(SignupFormData)
    return(
        <div className="w-[34rem] flex justify-center items-center flex-col border border-sickness-border bg-white px-8 py-4 gap-4 rounded-lg sm:mt-[6rem] mt-[8rem] ">
            <h1 className="font-semibold text-sickness-primaryText text-3xl"> Create Account </h1>
            <div className="flex md:flex-row flex-col gap-2 w-full">
                <div className="w-full">
                    <span className="text-sickness-gray text-lg"> Firstname </span>
                    <input type="text" value={SignupFormData.name} onChange={(e)=>{ dispatch(setPatientSignupFormData({ name: "name", value: e.target.value })); setErrorMessages((prevErrors: PatientSignupErrorsType) => ({ ...prevErrors,  name: ""})) }} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" />
                    <p className="text-sm text-red-500 text-center break-words"> { ErrorMessages.name } </p>
                </div>
                <div className="w-full">
                    <span className="text-sickness-gray text-lg"> Lastname </span>
                    <input type="text" value={SignupFormData.lastname} onChange={(e)=>{ dispatch(setPatientSignupFormData({ name: "lastname", value: e.target.value })); setErrorMessages((prevErrors: PatientSignupErrorsType) => ({ ...prevErrors,  lastname: ""})) }} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" />
                    <p className="text-sm text-red-500 text-center break-words"> { ErrorMessages.lastname } </p>
                </div>
            </div>
            <div className="w-full">
                <span className="text-sickness-gray text-lg"> Email </span>
                <input type="text" value={SignupFormData.email} onChange={(e)=>{ dispatch(setPatientSignupFormData({ name: "email", value: e.target.value })); setErrorMessages((prevErrors: PatientSignupErrorsType) => ({ ...prevErrors,  email: ""})) }} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" />
                <p className="text-sm text-red-500 text-center break-words"> { ErrorMessages.email } </p>
            </div>
            <PhoneInput country='tn' value={SignupFormData.phone} inputStyle={InputStyle} buttonStyle={ButtonStyle} containerStyle={ContainerStyle} onChange={(e)=>{ dispatch(setPatientSignupFormData({ name: "phone", value: e })); setErrorMessages((prevErrors: PatientSignupErrorsType) => ({ ...prevErrors,  phone: ""})) }}/>
            <p className="text-sm text-red-500 text-center break-words"> { ErrorMessages.phone } </p>
            <div className="flex justify-between gap-2 w-full -translate-y-2">
                <div className="flex flex-col gap-3 justify-center items-center translate-y-3">
                    <p className="font-medium text-lg text-sickness-gray rounded-sm"> Age </p>
                    <input type="text" placeholder="18" value={SignupFormData.age || ""} onChange={(e)=>{ dispatch(setPatientSignupFormData({ name: "age", value: parseInt(e.target.value) || "" })); setErrorMessages((prevErrors: PatientSignupErrorsType) => ({ ...prevErrors,  age: ""})) }}  className="w-[4rem] py-2 pl-4 text-sickness-ashGray font-medium text-2xl focus:outline-none border-[1px] border-sicness-border focus:border-sickness-border rounded-md" />
                    <p className="text-sm text-red-500 text-center break-words"> { ErrorMessages.age } </p>
                </div>
                <div className="flex flex-col gap-3 mt-6 justify-center items-center">
                    <p className="font-medium text-sickness-gray text-lg rounded-sm self-start "> Gender </p>
                    <RadioGroup className="flex gap-2" onValueChange={(e)=>{ dispatch(setPatientSignupFormData({ name: "gender", value: e })); setErrorMessages((prevErrors: PatientSignupErrorsType) => ({ ...prevErrors,  age: ""})) }}  >
                        <div className="flex items-center py-2 space-x-4 px-4 w-full bg-settaFill border-[1px] border-settaBorder pl-2 rounded-md text-[#999999]">
                            <RadioGroupItem value="Male" id="r1" />
                            <Label htmlFor="r1">Male</Label>
                        </div>
                        <div className="flex items-center h-[3rem] space-x-4 px-4 bg-settaFill border-[1px] border-settaBorder py-3 rounded-md text-[#999999]">
                            <RadioGroupItem value="Female" id="r2" />
                            <Label htmlFor="r2">Female</Label>
                        </div>
                    </RadioGroup>
                    <p className="text-sm text-red-500 text-center break-words"> { ErrorMessages.gender } </p>
                </div>
            </div>
            <div className="w-full mt-2">
                    <span className="text-sickness-gray text-lg"> Password </span>
                    <input type="password" value={SignupFormData.password} onChange={(e)=>{ dispatch(setPatientSignupFormData({ name: "password", value: e.target.value })); setErrorMessages((prevErrors: PatientSignupErrorsType) => ({ ...prevErrors,  password: ""})) }} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" placeholder="●●●●●●●●" />
                    <p className="text-sm text-red-500 text-center break-words"> { ErrorMessages.password } </p>
            </div>
            <div className="w-full mt-4">
                <span className="text-sickness-gray text-lg"> Confirm Password </span>
                <input type="password" value={SignupFormData.confirmPassword} onChange={(e)=>{ dispatch(setPatientSignupFormData({ name: "confirmPassword", value: e.target.value })); setErrorMessages((prevErrors: PatientSignupErrorsType) => ({ ...prevErrors,  confirmPassword: ""})) }} className="outline-none border focus:border-sickness-primary text-sickness-gray text- pl-2 py-2 rounded-md w-full border-sickness-border" placeholder="●●●●●●●●" />
                <p className="text-sm text-red-500 text-center break-words"> { ErrorMessages.confirmPassword } </p>
            </div>
            <button className={`mt-4 w-full rounded-md text-white ${isLoading ? "bg-sickness-primary/70" : "bg-sickness-primary hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText"} transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2`} onClick={handleSignup} disabled={isLoading}> Create Account { isLoading ? <SmallWhiteLoader /> : <UserPlusIcon className="h-5 w-5 -translate-y-[2px]" /> } </button>
            <p className="text-center self-center text-sm text-red-500"> { SignupResponse?.message !== "Patient Created" && SignupResponse?.message } </p>
            <p className="text-sickness-gray text-sm self-start mt-2"> Already have an account? <a href="/auth/Login" className="text-sickness-primaryText hover:underline font-semibold cursor-pointer"> Login! </a> </p>
        </div>
    )
}