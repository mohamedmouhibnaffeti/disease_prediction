"use client"
import SideBarDash from "@/components/SideBarDash"
import NavBarDash from "@/components/NavBarDash"
import { useLayoutEffect, useState } from "react"
import GenderLineChart from "@/components/Charts/GenderPatients"
import AgeLineChart from "@/components/Charts/AgePatients"
import { MonitorXIcon } from "lucide-react"
import SymptomsBarChart from "@/components/Charts/SymptomsBarChart"
import SicknessBarChart from "@/components/Charts/SicknessBarChat"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/Store/store"
import { fetchStatisticsData } from "@/Store/doctor/doctorSlice"
import MainLoader from "@/components/Loaders/MainLoader"
import ErrorFetching from "@/components/Errors/FailedFetching"

export default function Dashboard(){
    const [statisticsData, setstatisticsData] = useState<any>()
    const [requestLoading, setRequestLoading] = useState(true)
    const dispatch = useDispatch<AppDispatch>()
    const fetchData = async() => {
        const response = await dispatch(fetchStatisticsData({doctorID: "6651ad919b6651ea68e8243c"}))
        setstatisticsData(response.payload)
        setRequestLoading((prev) => false)
    }
    useLayoutEffect(()=>{
        fetchData()
    }, [])
    console.log(statisticsData)
    console.log(requestLoading)
    return (
        <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
            <SideBarDash /> 
            <div className="flex flex-col">
                <NavBarDash />
                <main className="flex-1 py-4 md:py-6">
                        {
                            !requestLoading ?
                            (statisticsData && statisticsData.status === 200 ?
                                <>
                                    <div className="lg:flex lg:flex-col hidden">
                                        <div className="flex lg:flex-row flex-col mx-2 gap-2  px-4 md:px-6">
                                            <GenderLineChart patients={statisticsData.MyPatients} />
                                            <AgeLineChart patients={statisticsData.MyPatients} />
                                        </div>
                                        <div className="w-full h-[2px] bg-sickness-primary/50" />
                                        <div className="flex lg:flex-row flex-col mx-2 gap-2 mt-5  px-4 md:px-6   ">
                                            <SymptomsBarChart symptoms={statisticsData.TrendingSymptoms} />
                                            <SicknessBarChart sicknesses={statisticsData.TrendingSicknesses} />
                                        </div>
                                    </div>
                                    <div className="lg:hidden flex flex-col text-red-500 items-center mt-20 w-full h-full gap-2 px-4 md:px-6">
                                        <MonitorXIcon className="w-48 h-48" />
                                        <p className="text-center text-sm font-semibold"> For a better user experience please open this page in a desktop screen </p>
                                    </div>
                                </>
                                :
                                <ErrorFetching />)
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

