"use client"
import { useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Store/store"
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
import ModalComponent from "@/components/ImageModal"
import { DoctorsTable } from "@/components/Tables/DoctorsTable"

const doctorsData = [
    {
      name: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      speciality: "Cardiologist",
    },
    {
      name: "Jane",
      lastname: "Smith",
      email: "jane.smith@example.com",
      phone: "0987654321",
      speciality: "Dermatologist",
    },
    {
      name: "Emily",
      lastname: "Johnson",
      email: "emily.johnson@example.com",
      phone: "1122334455",
      speciality: "Neurologist",
    },
    {
        name: "Jane",
        lastname: "Smith",
        email: "jane.smith@example.com",
        phone: "0987654321",
        speciality: "Dermatologist",
    },
    {
    name: "Emily",
    lastname: "Johnson",
    email: "emily.johnson@example.com",
    phone: "1122334455",
    speciality: "Neurologist",
    },
]

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
                                    <DoctorsTable doctors={doctorsData} />
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

