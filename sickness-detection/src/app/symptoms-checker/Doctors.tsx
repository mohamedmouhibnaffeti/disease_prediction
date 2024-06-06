"use client"
import { lazy, useEffect, useLayoutEffect, useState } from "react"
import { getRandomColor } from "@/lib/statics/Colors"
import { useDispatch, useSelector } from "react-redux"
import { changeEtatByNom } from "@/Store/Predict/PredictSlice"
import { AppDispatch, RootState } from "@/Store/store"
import { fetchDoctorsBySpeciality, updateDoctorsArray } from "@/Store/doctor/doctorSlice"
import { DistanceEuclidienne } from "@/lib/statics/distance"
import ThreeDotsLoader from "@/components/Loaders/ThreeDotsLoader"
import MainLoader from "@/components/Loaders/MainLoader"
const DoctorCard = lazy(()=>import('@/components/DoctorCard'))

export default function Doctors() {
    const dispatch = useDispatch<AppDispatch>()
    const { doctors, updatedDoctors, requestLoading } = useSelector((state: RootState) => state.Doctor)
    const [sickness, setSickness] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [rendered, setRendered] = useState(false)
    const fetchDoctors = async() => {
        setLoading(prev => true)
        await dispatch(fetchDoctorsBySpeciality({speciality: sickness?.Sickness?.speciality}))
        setLoading(prev => false)
    }
    useLayoutEffect(()=>{
        const stringSickness = localStorage.getItem("sickness") || ""
        setSickness((prevSickness: any) => JSON.parse(stringSickness))
        setRendered(prev => true)
        return ()=>{
            setRendered(prev => false)
        }
    }, [])
    useEffect(()=>{
        if(sickness){
            fetchDoctors()
        }
    }, [sickness])
    useEffect(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log({latitude, longitude})
                    const updatedDoctorsArray = doctors.map((doctor) => {
                        if (doctor.location) {
                            const distance = DistanceEuclidienne({
                                x1: latitude,
                                y1: longitude,
                                x2: doctor?.location[0]?.cordonnees[0],
                                y2: doctor?.location[0]?.cordonnees[1]
                            });
                            return { ...doctor, distance: distance };
                        }
                        return doctor
                    });
                    dispatch(updateDoctorsArray(updatedDoctorsArray));
                });
            } else {
                dispatch(updateDoctorsArray(doctors));
                console.log("Geolocation is not supported by this browser.");
            }
    }, [doctors]);

    return(
        <>
            {
                requestLoading
                ?
                    <div className="px-4 py-8 bg-white w-fit flex flex-col justify-center mt-[12rem] items-center border shadow-md rounded-md border-sickness-border">
                        <p className="font-semibold text-lg text-sickness-orange text-center"> Your appointment request is being processed please wait for us to pass it. </p>
                        <ThreeDotsLoader />
                    </div>
                :
                <div className="w-full mt-[2rem] sm:px-8 px-2 py-4 flex flex-col gap-4">
                    <h1 className="md:text-3xl text-xl font-bold text-sickness-primaryText self-center text-center"> Doctors for your sickness : </h1>
                    <div className="w-full flex flex-wrap justify-center items-center mt-8 gap-6">
                        {
                            loading ?
                                <div className="flex flex-col justify-center items-center gap-8">    
                                    <MainLoader />
                                    <p className="font-semibold text-sickness-primary mt-2 text-center"> We&apos;re fetching doctors for your specific disease... </p>
                                </div>
                            :
                            updatedDoctors.map((doctor: any, index: number)=>{
                                    return(
                                        <DoctorCard doctor={doctor} color={getRandomColor()} key={index} />
                                    )
                                })
                        }
                        
                    </div>
                    
                    { !loading && <button className="bg-none py-2 px-14 text-sickness-primary border-2 border-sickness-primary rounded-md font-semibold mt-6 self-center" onClick={()=>dispatch(changeEtatByNom('recommendations'))}> Back </button> }
                </div>
            }
        </>
    )
}