"use client"
import SideBarDash from "@/components/SideBarDash"
import NavBarDash from "@/components/NavBarDash"
import StatsCard from "@/components/StatsCard"
import PendingAppointmentCard from "@/components/PendingAppointmentCard"
import { useLayoutEffect, useState } from "react"
import PatientsOverallChart from "@/components/Charts/PatientsOverallChart"
import { PatientsTable } from "@/components/Tables/PatientsTable"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Store/store"
import { fetchDashboardMainData } from "@/Store/doctor/doctorSlice"
import MainLoader from "@/components/Loaders/MainLoader"
import ErrorFetching from "@/components/Errors/FailedFetching"
import { Greeting } from "@/lib/functions/dates"
import withAuth from "@/components/HOC/AuthHOC"

const DoctorDashboard = () => {
    const [maxLen, setMaxLen] = useState(3)
    const { mainData } = useSelector((state: RootState) => state.Doctor)
    const [requestLoading, setRequestLoading] = useState(true)
    const dispatch = useDispatch<AppDispatch>()
    const fetchData = async(id: string) => {
        const response = await dispatch(fetchDashboardMainData({doctorID: id}))
        setRequestLoading((prev) => false)
    }
    useLayoutEffect(()=>{
        if(!mainData){
            const userString = localStorage.getItem("user") || ""
            if(userString){
                const user = JSON.parse(userString)
                fetchData(user.id)
            }
        }else{
            setRequestLoading(false)
        }
    }, [])
    console.log(mainData)
    return (
        <>
            <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
                <SideBarDash /> 
                <div className="flex flex-col">
                    <NavBarDash />
                    <main className="flex-1 p-4 md:p-6">
                    {
                        !requestLoading?
                        (
                            mainData && mainData.status === 200 ?
                            <>
                                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> {Greeting()} </h1>
                                <div className="flex flex-col gap-2 mt-4">
                                    <div className="grid lg:grid-cols-3 gap-2">
                                        <StatsCard text="Accepted Appointments" value={mainData.acceptedAppointments} />
                                        <StatsCard text="Pending Appointments" value={mainData.pendingAppointments.length} />
                                        <StatsCard text="Total Appointments" value={mainData.totalAppointments} />
                                    </div>
                                    <div className="grid lg:grid-cols-3 gap-2">
                                        <StatsCard text="My Patients" value={mainData.myPatients.length} />
                                        <StatsCard text="Total Patients" value={mainData.totalPatients} />
                                        <StatsCard text="Total Doctors" value={mainData.totalDoctors} />
                                    </div>
                                </div>
                                <h1 className="md:text-xl text-lg font-semibold text-sickness-gray mt-4"> Pending Appointments </h1>
                                <div className="flex flex-col gap-2 mt-2 w-full">
                                    {
                                        mainData.pendingAppointments.length > 0 ?
                                        <div className="grid lg:grid-cols-3 gap-2 w-full">
                                        {
                                            mainData.pendingAppointments.map((appoinement: any,index: any) => {
                                                if(index < maxLen){
                                                    return(<PendingAppointmentCard key={index} appointment={appoinement} />)
                                                }
                                            })
                                        }
                                        </div>
                                        :
                                        <p className="md:text-lg text-base font-semibold text-sickness-primaryText"> You have no pending appointments. </p>
                                    }
                                    { (maxLen !== mainData.pendingAppointments.length && mainData.pendingAppointments.length > 3 ) && <button className="w-fit h-fit px-4 py-2 text-sm font-semibold bg-sickness-gray/30 rounded-md hover:bg-sickness-gray/50 transition delay-100 ease-in self-center" onClick={()=>{setMaxLen(mainData.pendingAppointments.length)}}> See All </button> }
                                </div>
                                <h1 className="lg:flex hidden md:text-xl text-lg font-semibold text-sickness-gray mt-4"> Patients </h1>
                                <div className="lg:flex hidden max-w-screen-sm">
                                    <PatientsOverallChart patients={mainData.myPatients} />
                                </div>
                                <h1 className="md:text-xl text-lg font-semibold text-sickness-gray mt-4"> Patients List </h1>
                                <div className="overflow-x-scroll grid max-w-screen">
                                    <PatientsTable patients={mainData.myPatients} />
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

export default withAuth(DoctorDashboard, ["doctor"])