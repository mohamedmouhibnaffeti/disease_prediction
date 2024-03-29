"use client"
import { ImagePlusIcon, UserPlusIcon } from 'lucide-react'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default () => {
    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
        <>
            <p className='text-sm text-sickness-gray text-center'> In this step you'll need to insert your <span className="text-sickness-primary font-semibold"> Service card </span> and your <span className="text-sickness-primary font-semibold"> Certificate </span> to verify your identity </p>
            <p className='text-sm text-sickness-gray text-center'> Afer creating your account you'll need to wait for us verify your profile before you can create appointments, meanwhile checkout our website 😊 </p>
            <div>
                <p className="md:text-lg text-sickness-gray"> Service card </p>
                <div {...getRootProps()} className="cursor-pointer w-full h-fit  bg-[#D9D9D9]/50 hover:bg-[#D9D9D9]/70 flex justify-center items-center border-black border rounded-md flex-col py-2 gap-2 px-4">
                    <input {...getInputProps()} />
                    <ImagePlusIcon className='w-12 h-12' />
                    <p className='text-center'>Drag 'n' drop your <span className='font-semibold'> Service or Identity Card </span> here, or click to select files</p>
                </div>
            </div>
            <div>
                <p className="sm:text-lg text-sickness-gray"> Certificate </p>
                <div {...getRootProps()} className="cursor-pointer w-full h-fit bg-[#D9D9D9]/50 hover:bg-[#D9D9D9]/70 flex justify-center items-center border-black border rounded-md flex-col py-2 gap-2 px-4">
                    <input {...getInputProps()} />
                    <ImagePlusIcon className='w-12 h-12' />
                    <p className='text-center'>Drag 'n' drop your <span className='font-semibold'> Working Certificate </span> here, or click to select files</p>
                </div>
            </div>
            <button className="mt-4 w-full rounded-md text-white bg-sickness-primary hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2"> Create Account <UserPlusIcon className="h-5 w-5" /> </button>
        </>
      );
}