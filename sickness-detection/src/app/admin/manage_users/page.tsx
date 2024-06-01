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
import { UsersTable } from "@/components/Tables/UsersTable"
import { getPatients } from "@/Store/admin/AdminSlice"
import withAuth from "@/components/HOC/AuthHOC"

const ManageUsers = () => {
    const [requestLoading, setRequestLoading] = useState(true)
    const { manageUsersData } = useSelector((state: RootState) => state.Admin)
    const dispatch = useDispatch<AppDispatch>()
    const fetchData = async () => {
        setRequestLoading(true)
        const response = await dispatch(getPatients())
        setRequestLoading(false)
    }
    useLayoutEffect(()=>{
        if(!manageUsersData){
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
                            manageUsersData && manageUsersData.status === 200 ?
                            <>
                                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> {Greeting()} </h1>
                                <div className="gap-2 mt-4 overflow-x-scroll grid max-w-screen">
                                    <UsersTable users={manageUsersData.patients} />
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

export default withAuth(ManageUsers, ["admin"])