"use client"
import SideBarDash from "@/components/SideBarDash"
import NavBarDash from "@/components/NavBarDash"
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import DashboardCalendar from "@/components/DashboardCalendar"
import TodayAppointmentsCard from "@/components/TodayAppointmentsCard"
import AppointmentDetailsCard from "@/components/AppointmentDetailsCard"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/Store/store"
import SelectDate from "@/components/SelectDate"
import { fetchAppointmentsData } from "@/Store/doctor/doctorSlice"
import MainLoader from "@/components/Loaders/MainLoader"
import { useState, useLayoutEffect, useEffect } from "react"
import ErrorFetching from "@/components/Errors/FailedFetching"
import { Greeting, compareDates } from "@/lib/functions/dates"
import { HeartPulse } from "lucide-react"

export default function Dashboard(){
    const [AppointmentsData, setAppointmentsData] = useState<any>()
    const [requestLoading, setRequestLoading] = useState(true)
    const dispatch = useDispatch<AppDispatch>()
    const fetchData = async() => {
        const response = await dispatch(fetchAppointmentsData({doctorID: "6651ad919b6651ea68e8243c"}))
        setAppointmentsData(response.payload)
        setRequestLoading((prev) => false)
    }
    useLayoutEffect(()=>{
        fetchData()
    }, [])
    const today = new Date()
    const [date, setDate] = useState<Date>(today)
    const [appointmentDetails, setAppointmentDetails] = useState<any>()
    const [detailsOpen, setDetailsOpen] = useState(false)
    return (
        <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
            <SideBarDash /> 
        <div className="flex flex-col">
            <NavBarDash />
            <main className="flex-1 p-4 md:p-6">
                {
                    !requestLoading ?
                    (
                        AppointmentsData && AppointmentsData.status === 200
                        ?
                        <>
                            <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> {Greeting()} </h1>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                                <div className="flex flex-col gap-4">
                                    <div className="px-4 py-2 pb-4 mt-4 flex flex-col border border-sickness-border rounded-md shadow-md gap-6 lg:w-fit lg:h-fit w-full">
                                        <p className="text-sickness-primary lg:text-2xl text-xl font-semibold"> Visits for today: <span> {AppointmentsData.body.visitsToday} </span> </p>
                                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
                                            <div className="px-4 py-2 flex w-full flex-col border border-sickness-border rounded-sm shadow-sm">
                                                <h1 className="text-xl"> New Patients </h1>
                                                <p className="text-lg font-semibold flex gap-2 self-end">  { AppointmentsData.body.newPatients.value } { AppointmentsData.body.newPatients.etat === "positive" ? <TrendingUpIcon className="text-green-500" /> : (AppointmentsData.body.newPatients.etat === "negative" ? <TrendingDownIcon className="text-red-500" /> : "" ) } </p>
                                            </div>
                                            <div className="px-4 py-2 flex w-full flex-col border border-sickness-border rounded-sm shadow-sm">
                                                <h1 className="text-xl"> Yesterday's Patients </h1>
                                                <p className="text-lg font-semibold flex gap-2 self-end"> { AppointmentsData.body.yesterdayPatients } <HeartPulse className="translate-y-[1.5px]" /> </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col border border-sickness-border rounded-md shadow-md px-4 py-2 pb-4 mt-4">
                                        <div className="flex w-full gap-6 items-center">
                                            <h1 className="md:text-xl text-lg font-semibold text-sickness-primaryText"> Appointments List </h1>
                                            <SelectDate date={date} setDate={setDate} />
                                        </div>
                                        <div className="grid xl:grid-cols-2 grid-cols-1 gap-2 w-full mt-4">
                                            <div className="flex flex-col gap-4">
                                                {
                                                    AppointmentsData.body.appointmentHistory.map((appointment: any) => {
                                                        const appointmentDate = new Date(appointment.requestedAt)
                                                        if(compareDates(appointmentDate, date)){
                                                            return(
                                                                <TodayAppointmentsCard appointment={appointment} setAppointmentDetails={setAppointmentDetails} setDetailsOpen={setDetailsOpen} />
                                                            )
                                                        }
                                                    } )
                                                }
                                            </div>
                                            { detailsOpen && <AppointmentDetailsCard appointemntDetails={appointmentDetails}  /> }
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <DashboardCalendar appointments={AppointmentsData.body.appointmentHistory} />
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
    )
}

