"use client"
import PatientSideBarDash from "@/components/PatientSideBarDash"
import PatientNavBarDash from "@/components/PatientNavBarDash"
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
import withAuth from "@/components/HOC/AuthHOC"

const PatientDashboard = () => {
    const [requestLoading, setRequestLoading] = useState(false)
    const { mainData } = useSelector((state: RootState) => state.Patient)
    const dispatch = useDispatch<AppDispatch>()
    const fetchData = async (id: string) => {
        setRequestLoading(true)
        const response = await dispatch(PatientDashMainPageData({patientID: id}))
        setRequestLoading(false)
    }
    useLayoutEffect(()=>{
        if(!mainData){
            const userString = localStorage.getItem("user") || ""
            if(userString){
                const user = JSON.parse(userString)
                fetchData(user._id)
            }
        }else{
            setRequestLoading(false)
        }
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
                            mainData && mainData.status === 200 ?
                            <>
                                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> {Greeting()} </h1>
                                <div className="flex flex-col gap-2">
                                    <h1 className="md:text-xl text-lg font-semibold text-sickness-gray mt-4"> My Next Appointments </h1>
                                    {
                                        mainData.Appointments.length > 0 ?
                                            <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-2">
                                               { mainData.Appointments.map((appointment: any, index: number) => {
                                                    return(
                                                        <NextAppointmentCard appointment={appointment} />
                                                    )
                                                })}
                                            </div>
                                        :
                                        <h1 className="md:text-lg text-md font-semibold text-sickness-primary mt-4"> You have no accepted appointment in the moment. </h1>
                                    }
                                    <h1 className="md:text-xl text-lg font-semibold text-sickness-gray mt-6"> Statistics </h1>
                                    <div className="gap-2 justify-between w-full lg:flex hidden">
                                        <SymptomsBarChart symptoms={mainData.trendingSymptoms} />
                                        <SicknessBarChart sicknesses={mainData.trendingSicknesses} />
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

export default withAuth(PatientDashboard, ["patient"])