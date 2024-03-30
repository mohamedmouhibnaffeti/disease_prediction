"use client"
import { ChevronsLeftIcon, ImagePlusIcon, UserPlusIcon } from 'lucide-react'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/Store/store'
import { setCurrentDoctorSignupPage, setSignupFormData } from '@/Store/auth/authSlice'
import Image from 'next/image'

export default () => {

    const dispatch = useDispatch<AppDispatch>()
    const SignupFormData = useSelector((state: RootState) => state.Authentication.SignupFormData)
    const onDrop = useCallback((acceptedFiles: any) => {
        console.log(acceptedFiles)
        dispatch(setSignupFormData({ name: "images", value: acceptedFiles?.map((file: File)=>{return file}) }))
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
      console.log(SignupFormData)
    return (
        <>
            <p className='text-sm text-sickness-gray text-center'> In this step you'll need to insert your <span className="text-sickness-primary font-semibold"> Service card </span> and your <span className="text-sickness-primary font-semibold"> Identity Card </span> to verify your identity </p>
            <p className='text-sm text-sickness-gray text-center'> Afer creating your account you'll need to wait for us verify your profile before you can create appointments, meanwhile checkout our website 😊 </p>
            <div>   
                <div {...getRootProps()} className="cursor-pointer w-full h-fit mt-2 bg-[#D9D9D9]/50 hover:bg-[#D9D9D9]/70 flex justify-center items-center border-black border rounded-md flex-col py-2 gap-2 px-4">
                    <input {...getInputProps()} />
                    <ImagePlusIcon className='w-12 h-12' />
                    <p className='text-center'>Drag 'n' drop your <span className='font-semibold'> Service and Identity Cards</span> here, or click to select files</p>
                </div>
            </div>
            <div className='flex gap-2 flex-wrap w-full justify-start'>
                {
                    SignupFormData.images?.map((image, index) => {
                        const imageUrl = URL.createObjectURL(image);
                        return(
                            <Image src={imageUrl} alt='' width={100} height={100} className="rounded-md border-sickness-border border w-[8rem] h-[6rem] object-cover" />
                        )
                    })
                }
            </div>
            <div className='flex flex-col gap-2 w-full mt-4'>
                <button className="w-full rounded-md text-sickness-primary hover:text-white bg-none border-2 border-sickness-primary hover:border-inherit hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2" onClick={()=>dispatch(setCurrentDoctorSignupPage(1))} > <ChevronsLeftIcon /> Back  </button>
                <button className="w-full rounded-md text-white bg-sickness-primary border-2 border-sickness-primary hover:border-inherit hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2"> Create Account <UserPlusIcon className="h-5 w-5" /> </button>
            </div>
        </>
      );
}