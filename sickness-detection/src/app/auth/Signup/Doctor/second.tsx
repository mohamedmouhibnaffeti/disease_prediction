"use client"
import { ChevronsLeftIcon, ChevronsRightIcon, ImagePlusIcon } from 'lucide-react'
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/Store/store'
import { setCurrentDoctorSignupPage, setSignupFormDataDoctor } from '@/Store/auth/authSlice'
import Image from 'next/image'
import { DoctorSignupErrorsType } from '@/app/interfaces/interfaces'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { specialities_array } from '@/lib/statics/specialities'
  

export default ({ Errors, setErrors }: { Errors: DoctorSignupErrorsType, setErrors: any }) => {

    const dispatch = useDispatch<AppDispatch>()
    const [isLoading, setIsLoading] = useState(false)
    const SignupFormData = useSelector((state: RootState) => state.Authentication.SignupFormDataDoctor)
    const onDrop = useCallback((acceptedFiles: any) => {
        const imageFiles = acceptedFiles.filter((file: any, index: number) => file.type.startsWith('image/') && index < 2);
        dispatch(setSignupFormDataDoctor({ name: "images", value: imageFiles }));
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
      const [SignupResponse, setSignupResponse] = useState<string>()
      const handleDoctorSignup = async() => {
        /*
        if(SignupFormData.images.length !== 2){
            setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors, images: "Images should be exactly 2" }))
        }
        else{
            setIsLoading(true)
            const response = await dispatch(DoctorSignup())
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
        */
        if(SignupFormData.images.length !== 2){
            setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors, images: "Images should be exactly 2" }))
        }
        if(SignupFormData.speciality.length < 2){
            setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors, speciality: "Invalid speciality" }))
        }
        else{
            dispatch(setCurrentDoctorSignupPage(3))
        }
      }
    return (
        <>
            <p className='text-sm text-sickness-gray text-center'> In this step you'll need to insert your <span className="text-sickness-primary font-semibold"> Service card </span> and your <span className="text-sickness-primary font-semibold"> Identity Card </span> to verify your identity </p>
            <div className="w-full">
                <span className="text-sickness-gray text-lg"> Speciality </span>
                <Select onValueChange={(e)=>{dispatch(setSignupFormDataDoctor({name: "speciality", value: e})); setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors,  speciality: ""}))}}>
                    <SelectTrigger className="outline-none border focus:border-sickness-primary text-sickness-primaryText font-semibold pl-2 py-2 rounded-md w-full border-sickness-border">
                    <SelectValue placeholder="-- Select speciality" className="text-sickness-gray font-semibold" />
                    </SelectTrigger>
                    <SelectContent>
                         {
                            specialities_array.map((speciality, index) => (
                                <SelectItem className="text-sickness-gray font-semibold cursor-pointer" value={speciality} key={index}>{speciality}</SelectItem>
                            ))
                         }
                    </SelectContent>
                </Select>
                <p className='text-sm text-red-500 break-words self-center text-center'> { Errors.speciality } </p>
            </div>
            <div>   
                <div {...getRootProps()} className="cursor-pointer w-full h-fit mt-2 bg-[#D9D9D9]/50 hover:bg-[#D9D9D9]/70 flex justify-center items-center border-black border rounded-md flex-col py-2 gap-2 px-4">
                    <input {...getInputProps()} />
                    <ImagePlusIcon className='w-12 h-12' />
                    <p className='text-center'>Drag 'n' drop your <span className='font-semibold'> Service and Identity Cards</span> here, or click to select files</p>
                    <p className='text-center text-xs'> You should drop exactly <strong>2 pictures</strong> of type <strong>(JPEG, PNG, JPG, ...)</strong> </p>
                </div>
            </div>
            <p className='text-sm text-red-500 break-words'> { Errors.images } </p>
            <div className='flex gap-2 flex-wrap w-full justify-start'>
                {
                    SignupFormData.images?.map((image :any, index: boolean) => {
                        const imageUrl = URL.createObjectURL(image);
                        return(
                            <Image src={imageUrl} alt='' width={100} height={100} className="rounded-md border-sickness-border border w-[8rem] h-[6rem] object-cover" />
                        )
                    })
                }
            </div>
            <div className='flex flex-col gap-2 w-full mt-4'>
                <button className="w-full rounded-md text-sickness-primary hover:text-white bg-none border-2 border-sickness-primary hover:border-inherit hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2" onClick={()=>dispatch(setCurrentDoctorSignupPage(1))} disabled={isLoading} > <ChevronsLeftIcon /> Back  </button>
                <button className={`w-full rounded-md text-white ${isLoading ? "bg-sickness-primary/70" : "bg-sickness-primary hover:border-inherit hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText"} border-2 border-sickness-primary transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2`} onClick={handleDoctorSignup} disabled={isLoading} > Next <ChevronsRightIcon className="h-5 w-5" /> </button>
                <p className="text-center self-center text-sm text-red-500"> { SignupResponse} </p>
            </div>
        </>
      );
}