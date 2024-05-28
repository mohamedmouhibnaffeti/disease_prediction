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

