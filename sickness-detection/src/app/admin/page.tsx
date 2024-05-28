"use client"
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
import { PatientDashMainPageData } from "@/Store/patient/PatientSlice"
import AdminSideBarDash from "@/components/AdminSideDash"
import AdminNavBarDash from "@/components/AdminDashNav"
import AdminOverViewStats from "@/components/AdminOverViewStats"
import PendingDoctorCard from "@/components/PendingDoctorCard"

const symptoms = [
    { title: 'Headache', count: 87 },
    { title: 'Cough', count: 45 },
    { title: 'Fever', count: 63 },
    { title: 'Fatigue', count: 74 },
    { title: 'Sore Throat', count: 56 },
    { title: 'Runny Nose', count: 29 },
    { title: 'Muscle Pain', count: 92 },
    { title: 'Shortness of Breath', count: 37 },
    { title: 'Nausea', count: 81 },
    { title: 'Dizziness', count: 53 },
];
  
const sicknesses = [
    { title: 'mridh', count: 100 },
    { title: 'AH', count: 85 },
    { title: 'Sabr', count: 63 },
    { title: 'TE3B', count: 54 },
    { title: 'WAYYY', count: 26 }
];
  

export default function Dashboard(){
    const [requestLoading, setRequestLoading] = useState(false)
    const [mainData, setMainData] = useState<any>()
    const dispatch = useDispatch<AppDispatch>()
    const fetchData = async () => {
        setRequestLoading(true)
        const response = await dispatch(PatientDashMainPageData({patientID: "6651af539b6651ea68e82453"}))
        setMainData(response.payload)
        setRequestLoading(false)
    }
    useLayoutEffect(()=>{
    }, [])
    return (
        <>
            <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
                <AdminSideBarDash /> 
                <div className="flex flex-col">
                    <AdminNavBarDash />
                    <main className="flex-1 p-4 md:p-6">
                    {
                        !requestLoading?
                        (
                            /*mainData && mainData.status */ 200 === 200 ?
                            <>
                                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> {Greeting()} </h1>
                                <div className="flex flex-col gap-2">
                                    <div className="grid grid-cols-1 gap-8 p-10 lg:grid-cols-2 xl:grid-cols-4">
                                        <AdminOverViewStats str="Doctors" val={50} />
                                        <AdminOverViewStats str="Patients" val={120} />
                                        <AdminOverViewStats str="Predicted Diseases" val={100} />
                                        <AdminOverViewStats str="Selected Symptoms" val={500} />
                                    </div>
                                    <h1 className="md:text-xl text-lg font-semibold text-sickness-gray mt-4"> Pending Doctors </h1>
                                    <p className="pl-4 text-sm text-sickness-ashGray font-semibold"> You'll find here a list of doctors who request joining the platform. </p>
                                    <div className="grid grid-cols-1 gap-8 px-10 py-2 lg:grid-cols-2 xl:grid-cols-4">
                                        <PendingDoctorCard />
                                        <PendingDoctorCard />
                                        <PendingDoctorCard />
                                        <PendingDoctorCard />
                                        <PendingDoctorCard />
                                        <PendingDoctorCard />
                                        <PendingDoctorCard />
                                    </div>
                                    <h1 className="md:text-xl text-lg font-semibold text-sickness-gray mt-4"> Statistics </h1>
                                    <div className="gap-2 justify-between w-full lg:flex hidden">
                                        <SymptomsBarChart symptoms={symptoms} />
                                        <SicknessBarChart sicknesses={sicknesses} />
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

