"use client"
import { ChevronsLeftIcon, ImagePlusIcon, UserPlusIcon } from 'lucide-react'
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/Store/store'
import { setCurrentDoctorSignupPage, setSignupFormDataDoctor, DoctorSignup, RegisterOTP } from '@/Store/auth/authSlice'
import Image from 'next/image'
import { DoctorSignupErrorsType } from '@/app/interfaces/interfaces'
import { useRouter } from 'next/navigation'
import VerifyEmail from './VeriyEmailModal'
import dynamic from 'next/dynamic'; // or any other library for dynamic imports
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Marker, Popup, TileLayer } from 'react-leaflet';
const LeafletMap = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
    ssr: false
  });

export default ({ Errors, setErrors }: { Errors: DoctorSignupErrorsType, setErrors: any }) => {


    const dispatch = useDispatch<AppDispatch>()
    const [isLoading, setIsLoading] = useState(false)
    const SignupFormData = useSelector((state: RootState) => state.Authentication.SignupFormDataDoctor)
    const onDrop = useCallback((acceptedFiles: any) => {
        const imageFiles = acceptedFiles.filter((file: any, index: number) => file.type.startsWith('image/') && index < 2);
    
        console.log(imageFiles);

        dispatch(setSignupFormDataDoctor({ name: "images", value: imageFiles }));
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
      const Router = useRouter()
      const [SignupResponse, setSignupResponse] = useState<string>()
      const [open, setOpen] = useState<boolean>(false)
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
        if(SignupFormData.location.length !== 2){
            setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors, location: "Invalid location..." }))
        }
        
        else{
            setIsLoading(true)
            const response = await dispatch(RegisterOTP())
            console.log(response.payload)
            if(response.payload.status === 200){
                setIsLoading(false)
                setOpen(true)
            }
            else{
                setSignupResponse(response.payload.message)
                setIsLoading(false)
            }
            setIsLoading(false)
        }
      }
      const handleMarkerMove = (e: any) => {
        dispatch(setSignupFormDataDoctor({
            name: "location",
            value: [e.target.getLatLng().lat, e.target.getLatLng().lng]
          }));
          
        setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors,  location: ""}))
      };
      console.log(SignupFormData)

    return (
        <>
            <p className='text-sm text-sickness-gray text-center'> In this step you'll need to insert your <span className="text-sickness-primary font-semibold"> Location </span> </p>
            <p className='text-sm text-sickness-gray text-center'> Afer creating your account you'll need to wait for us verify your profile before you can create appointments, meanwhile feel free checkout our website 😊 </p>
            <div className="w-full h-64">
            <LeafletMap center={SignupFormData.location} zoom={13} scrollWheelZoom={false} className='w-full h-full border-2 border-sickness-border rounded-lg shadow-lg z-10'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={SignupFormData.location} draggable={true} eventHandlers={{ dragend: handleMarkerMove }}>
                    <Popup>
                        My location
                    </Popup>
                </Marker>
            </LeafletMap>
            </div>
            <p className='text-sm text-red-500 break-words'> { Errors.location } </p>
            <div className='flex flex-col gap-2 w-full mt-4'>
                <button className="w-full rounded-md text-sickness-primary hover:text-white bg-none border-2 border-sickness-primary hover:border-inherit hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2" onClick={()=>dispatch(setCurrentDoctorSignupPage(2))} disabled={isLoading} > <ChevronsLeftIcon /> Back  </button>
                <button className={`w-full rounded-md text-white ${isLoading ? "bg-sickness-primary/70" : "bg-sickness-primary hover:border-inherit hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText"} border-2 border-sickness-primary transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2`} onClick={handleDoctorSignup} disabled={isLoading} > Create Account { isLoading ? <div className="small-white-loader" /> : <UserPlusIcon className="h-5 w-5" /> } </button>
                <p className="text-center self-center text-sm text-red-500"> { SignupResponse } </p>
            </div>
            <VerifyEmail open={open} setOpen={setOpen} />
        </>
      );
}