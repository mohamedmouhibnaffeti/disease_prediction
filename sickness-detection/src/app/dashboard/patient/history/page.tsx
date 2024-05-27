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
import { AppointmentsTable } from "@/components/Tables/AppoitmentsHistoryTable"
import { fetchPatientHistoryData } from "@/Store/patient/PatientSlice"
import { PatientAppointmentsTable } from "@/components/Tables/PatientAppointmentsTable"
import PatientHistoryItemDetails from "@/components/PatientHistoryItemDetails"

export default function Dashboard(){
    const [AppointmentsData, setAppointmentsData] = useState<any>()
    const [requestLoading, setRequestLoading] = useState(true)
    const dispatch = useDispatch<AppDispatch>()
    const fetchData = async() => {
        const response = await dispatch(fetchPatientHistoryData({patientID: "6651af539b6651ea68e82453"}))
        setAppointmentsData(response.payload)
        setRequestLoading((prev) => false)
    }
    useLayoutEffect(()=>{
        fetchData()
    }, [])
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
                            AppointmentsData && AppointmentsData.status === 200 ?
                            <>
                                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> Your previous appointments </h1>
                                <div className="overflow-x-scroll grid max-w-screen mt-4 border border-sickness-border rounded-md">
                                    <PatientAppointmentsTable  appointments={AppointmentsData.appointments} />
                                </div>
                                <PatientHistoryItemDetails />
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

