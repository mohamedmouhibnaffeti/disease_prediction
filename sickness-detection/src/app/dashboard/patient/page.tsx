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
                                    <h1 className="md:text-xl text-lg font-semibold text-sickness-gray mt-4"> My Next Appointment </h1>
                                    <NextAppointmentCard />
                                    <h1 className="md:text-xl text-lg font-semibold text-sickness-gray mt-6"> Statistics </h1>
                                    <div className="gap-2 justify-between w-full lg:flex hidden">
                                        <SymptomsBarChart symptoms={sampleSymptoms} />
                                        <SicknessBarChart sicknesses={sampleSicknesses} />
                                    </div>
                                    <div className="lg:hidden flex flex-col text-red-500 items-center mt-20 w-full h-full gap-2 px-4 md:px-6">
                                        <MonitorXIcon className="w-48 h-48" />
                                        <p className="text-center text-sm font-semibold"> For a better user experience please open this page in a desktop screen </p>
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

