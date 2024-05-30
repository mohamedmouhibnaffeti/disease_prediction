"use client"
import { useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Store/store"
import MainLoader from "@/components/Loaders/MainLoader"
import ErrorFetching from "@/components/Errors/FailedFetching"
import { Greeting } from "@/lib/functions/dates"
import { PatientDashMainPageData } from "@/Store/patient/PatientSlice"
import AdminSideBarDash from "@/components/AdminSideDash"
import AdminNavBarDash from "@/components/AdminDashNav"
import { DoctorsTable } from "@/components/Tables/DoctorsTable"
import { getDoctors } from "@/Store/admin/AdminSlice"

export default function ManageDoctors(){
    const [requestLoading, setRequestLoading] = useState(true)
    const { manageDoctorsData } = useSelector((state: RootState) => state.Admin)
    const dispatch = useDispatch<AppDispatch>()
    const fetchData = async () => {
        setRequestLoading(true)
        const response = await dispatch(getDoctors())
        setRequestLoading(false)
    }
    useLayoutEffect(()=>{
        if(!manageDoctorsData){
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
                            manageDoctorsData && manageDoctorsData.status === 200 ?
                            <>
                                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> {Greeting()} </h1>
                                <div className="gap-2 mt-3 overflow-x-scroll grid max-w-screen">
                                    <DoctorsTable doctors={manageDoctorsData.doctors} />
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

