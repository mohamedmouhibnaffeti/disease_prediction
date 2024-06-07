"use client";
import { ChevronsLeftIcon, UserPlusIcon } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Store/store';
import { setCurrentDoctorSignupPage, setSignupFormDataDoctor, DoctorSignup, RegisterOTP } from '@/Store/auth/authSlice';
import { DoctorSignupErrorsType } from '@/app/interfaces/interfaces';
import { useRouter } from 'next/navigation';
import VerifyEmail from './VeriyEmailModal';
import SmallWhiteLoader from '@/components/Loaders/WhiteButtonLoader';
import dynamic from 'next/dynamic';

// Dynamic imports for Leaflet components
const LeafletMap = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });



export default function Third({ Errors, setErrors }: { Errors: DoctorSignupErrorsType, setErrors: any }) {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState(false);
    const SignupFormData = useSelector((state: RootState) => state.Authentication.SignupFormDataDoctor);
    const Router = useRouter();
    const [SignupResponse, setSignupResponse] = useState<string>();
    const [open, setOpen] = useState<boolean>(false);
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            navigator.geolocation.getCurrentPosition((position) => {
                dispatch(setSignupFormDataDoctor({
                    name: "location",
                    value: [position.coords.latitude, position.coords.longitude]
                }));
            }, (error) => {
                console.error('Error getting current position:', error);
            });
            setRendered(true);
        }
    }, [dispatch]);

    const onDrop = useCallback((acceptedFiles: any) => {
        const imageFiles = acceptedFiles.filter((file: any, index: number) => file.type.startsWith('image/') && index < 2);
        dispatch(setSignupFormDataDoctor({ name: "images", value: imageFiles }));
    }, [dispatch]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleDoctorSignup = async () => {
        if (SignupFormData.images.length !== 2) {
            setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors, images: "Images should be exactly 2" }));
        } else {
            setIsLoading(true);
            const response = await dispatch(DoctorSignup());
            if (response.payload.status === 201) {
                const userString = JSON.stringify(response.payload.user);
                localStorage.setItem("user", userString);
                localStorage.setItem("AccessToken", response.payload?.AccessToken);
                localStorage.setItem("RefreshToken", response.payload?.RefreshToken);
                Router.push("/");
            }
            setIsLoading(false);
        }

        if (SignupFormData.location.length !== 2) {
            setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors, location: "Invalid location..." }));
        } else {
            setIsLoading(true);
            const response = await dispatch(RegisterOTP());
            if (response.payload.status === 200) {
                setIsLoading(false);
                setOpen(true);
            } else {
                setSignupResponse(response.payload.message);
                setIsLoading(false);
            }
            setIsLoading(false);
        }
    };

    const handleMarkerMove = (e: any) => {
        dispatch(setSignupFormDataDoctor({
            name: "location",
            value: [e.target.getLatLng().lat, e.target.getLatLng().lng]
        }));
        setErrors((prevErrors: DoctorSignupErrorsType) => ({ ...prevErrors, location: "" }));
    };

    if (!rendered) {
        return null;
    }

    return (
        <>
            <p className='text-sm text-sickness-gray text-center'>
                In this step you&apos;ll need to insert your <span className="text-sickness-primary font-semibold">Location</span>
            </p>
            <p className='text-sm text-sickness-gray text-center'>
                After creating your account you&apos;ll need to wait for us to verify your profile before you can create appointments. Meanwhile, feel free to check out our website 😊
            </p>
            <div className="w-full h-64">
                {SignupFormData.location && (
                    <LeafletMap center={SignupFormData.location} zoom={13} scrollWheelZoom={false} className='w-full h-full border-2 border-sickness-border rounded-lg shadow-lg z-10'>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={SignupFormData.location} draggable={true} eventHandlers={{ dragend: handleMarkerMove }}>
                            <Popup>My location</Popup>
                        </Marker>
                    </LeafletMap>
                )}
            </div>
            <p className='text-sm text-red-500 break-words'>{Errors.location}</p>
            <div className='flex flex-col gap-2 w-full mt-4'>
                <button
                    className="w-full rounded-md text-sickness-primary hover:text-white bg-none border-2 border-sickness-primary hover:border-inherit hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2"
                    onClick={() => dispatch(setCurrentDoctorSignupPage(2))}
                    disabled={isLoading}
                >
                    <ChevronsLeftIcon /> Back
                </button>
                <button
                    className={`w-full rounded-md text-white ${isLoading ? "bg-sickness-primary/70" : "bg-sickness-primary hover:border-inherit hover:bg-sickness-primaryText/70 active:bg-sickness-primaryText"} border-2 border-sickness-primary transition delay-75 duration-100 py-2 font-semibold flex justify-center items-center gap-2`}
                    onClick={handleDoctorSignup}
                    disabled={isLoading}
                >
                    Create Account {isLoading ? <SmallWhiteLoader /> : <UserPlusIcon className="h-5 w-5" />}
                </button>
                <p className="text-center self-center text-sm text-red-500">{SignupResponse}</p>
            </div>
            <VerifyEmail open={open} setOpen={setOpen} />
        </>
    );
}
