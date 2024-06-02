"use client"
import { useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Store/store"
import MainLoader from "@/components/Loaders/MainLoader"
import ErrorFetching from "@/components/Errors/FailedFetching"
import { Greeting } from "@/lib/functions/dates"
import SymptomsBarChart from "@/components/Charts/SymptomsBarChart"
import SicknessBarChart from "@/components/Charts/SicknessBarChat"
import { MonitorXIcon } from "lucide-react"
import { PatientDashMainPageData } from "@/Store/patient/PatientSlice"
import AdminSideBarDash from "@/components/AdminSideDash"
import AdminNavBarDash from "@/components/AdminDashNav"
import AdminOverViewStats from "@/components/AdminOverViewStats"
import PendingDoctorCard from "@/components/PendingDoctorCard"
import ModalComponent from "@/components/ImageModal"
import { fetchDashboardMainData } from "@/Store/admin/AdminSlice"
import DrawerComponent from "@/components/Drawer"
import withAuth from "@/components/HOC/AuthHOC"

const Dashboard = () => {
    const [requestLoading, setRequestLoading] = useState(true)
    const dispatch = useDispatch<AppDispatch>()
    const { MainPageData } = useSelector((state: RootState) => state.Admin)
    const fetchData = async () => {
        setRequestLoading(true)
        const response = await dispatch(fetchDashboardMainData())
        setRequestLoading(false)
    }
    useLayoutEffect(()=>{
        if(!MainPageData){
            fetchData()
        }else{
            setRequestLoading(false)
        }
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
                            MainPageData && MainPageData.status === 200 ?
                            <>
                                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> {Greeting()} </h1>
                                <div className="flex flex-col gap-2">
                                    <div className="grid grid-cols-1 gap-8 p-10 lg:grid-cols-2 xl:grid-cols-4">
                                        <AdminOverViewStats str="Doctors" val={MainPageData.body.doctors} />
                                        <AdminOverViewStats str="Patients" val={MainPageData.body.patients} />
                                        <AdminOverViewStats str="Predicted Diseases" val={MainPageData.body.totalPredictedDiseases} />
                                        <AdminOverViewStats str="Selected Symptoms" val={MainPageData.body.totalInsertedSymptoms} />
                                    </div>
                                    <h1 className="md:text-xl text-lg font-semibold text-sickness-gray mt-4"> Pending Doctors </h1>
                                    <p className="pl-4 text-sm text-sickness-ashGray font-semibold"> You'll find here a list of doctors who request joining the platform. </p>
                                    <div className="grid grid-cols-1 gap-8 px-10 py-2 lg:grid-cols-2 xl:grid-cols-4">
                                        {
                                            MainPageData.body.pendingDoctors.map((doctor: any, index: number) => {
                                                return(
                                                    <PendingDoctorCard doctor={doctor} key={index} />
                                                )
                                            })
                                        }
                                    </div>
                                    <h1 className="md:text-xl text-lg font-semibold text-sickness-gray mt-4"> Statistics </h1>
                                    <div className="gap-2 justify-between w-full lg:flex hidden">
                                        <SymptomsBarChart symptoms={MainPageData.body.trendingSymptoms} />
                                        <SicknessBarChart sicknesses={MainPageData.body.trendingSicknesses} />
                                    </div>
                                    <div className="lg:hidden flex flex-col text-red-500 items-center mt-20 w-full h-full gap-2 px-4 md:px-6">
                                        <MonitorXIcon className="w-48 h-48" />
                                        <p className="text-center text-sm font-semibold"> For a better user experience please open this page in a desktop screen </p>
                                    </div>
                                </div>
                                <DrawerComponent />
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

export default withAuth(Dashboard, ["admin"])