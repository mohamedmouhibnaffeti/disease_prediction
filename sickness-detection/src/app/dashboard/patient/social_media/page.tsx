"use client"
import PatientSideBarDash from "@/components/PatientSideBarDash"
import PatientNavBarDash from "@/components/PatientNavBarDash"
import { useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/Store/store"
import MainLoader from "@/components/Loaders/MainLoader"
import ErrorFetching from "@/components/Errors/FailedFetching"
import { Greeting } from "@/lib/functions/dates"
import NextAppointmentCard from "@/components/NextAppointmentCard"
import SymptomsBarChart from "@/components/Charts/SymptomsBarChart"
import SicknessBarChart from "@/components/Charts/SicknessBarChat"
import { MonitorXIcon } from "lucide-react"
import DashLikeCard from "@/components/DashLikeCard"
import DashCommentCard from "@/components/DashCommentCard"

const sampleSymptoms = [
    { title: 'Headache', count: 120 },
    { title: 'Fever', count: 95 },
    { title: 'Cough', count: 85 },
    { title: 'Fatigue', count: 70 },
    { title: 'Sore Throat', count: 65 },
    { title: 'Shortness of Breath', count: 50 },
];
const sampleSicknesses = [
    { title: 'Common Cold', count: 140 },
    { title: 'Influenza', count: 120 },
    { title: 'Stomach Flu', count: 90 },
    { title: 'Bronchitis', count: 75 },
    { title: 'COVID-19', count: 200 },
    { title: 'Pneumonia', count: 60 },
];

export default function Dashboard(){
    const [requestLoading, setRequestLoading] = useState(false)
    return (
        <>
            <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
                <PatientSideBarDash /> 
                <div className="flex flex-col">
                    <PatientNavBarDash />
                    <main className="flex-1 p-4 md:p-6">
                    {
                        !requestLoading?
                        (
                            200 === 200 ?
                            <>
                                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> {Greeting()} </h1>
                                <div className="flex flex-col gap-2">
                                    <h1 className="md:text-xl text-lg font-semibold text-sickness-gray mt-6"> Likes </h1>
                                    <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-2">
                                        <DashLikeCard />
                                        <DashLikeCard />
                                        <DashLikeCard />
                                        <DashLikeCard />
                                        <DashLikeCard />
                                        <DashLikeCard />
                                        <DashLikeCard />
                                    </div>
                                    <h1 className="md:text-xl text-lg font-semibold text-sickness-gray mt-6"> Comments </h1>
                                    <div className="grid lg:grid-cols-3 gap-2">
                                        <DashCommentCard />
                                    </div>
                                </div>
                            </>
                            :
                            <ErrorFetching />
                        )
                        :
                        <div className="w-full h-full flex justify-center items-center">
                            <MainLoader />
                        </div>
                    }
                    </main>
                </div>
            </div>
        </>
    )
}

