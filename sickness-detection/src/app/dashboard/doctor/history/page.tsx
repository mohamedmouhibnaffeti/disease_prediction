"use client"
import SideBarDash from "@/components/SideBarDash"
import NavBarDash from "@/components/NavBarDash"
import StatsCard from "@/components/StatsCard"
import PendingAppointmentCard from "@/components/PendingAppointmentCard"
import { useLayoutEffect, useState } from "react"
import PatientsOverallChart from "@/components/Charts/PatientsOverallChart"
import { PatientsTable } from "@/components/Tables/PatientsTable"
import { AppointmentsTable } from "@/components/Tables/AppoitmentsHistoryTable"
import { fetchHistoryData } from "@/Store/doctor/doctorSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Store/store"
import ErrorFetching from "@/components/Errors/FailedFetching"
import MainLoader from "@/components/Loaders/MainLoader"
import withAuth from "@/components/HOC/AuthHOC"

const DoctorHistory = () => {
    const { historyData } = useSelector((state: RootState) => state.Doctor)
    const [requestLoading, setRequestLoading] = useState(true)
    const dispatch = useDispatch<AppDispatch>()
    const fetchData = async() => {
        const response = await dispatch(fetchHistoryData({doctorID: "6651ad919b6651ea68e8243c"}))
        setRequestLoading((prev) => false)
    }
    useLayoutEffect(()=>{
        if( !historyData ){
            fetchData()
        }else{
            setRequestLoading(false)
        }
    }, [])
    return (
        <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
            <SideBarDash /> 
        <div className="flex flex-col">
            <NavBarDash />
            <main className="flex-1 p-4 md:p-6">
                {
                    !requestLoading?
                    (
                        historyData && historyData.status === 200 ?
                        <>
                            <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> Appointments History </h1>
                            <div className="overflow-x-scroll grid max-w-screen mt-4 border border-sickness-border rounded-md">
                                <AppointmentsTable  appointments={historyData.appointments} />
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

export default withAuth(DoctorHistory, ["doctor"])