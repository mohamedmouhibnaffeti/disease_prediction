"use client"
import { useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Store/store"
import MainLoader from "@/components/Loaders/MainLoader"
import ErrorFetching from "@/components/Errors/FailedFetching"
import { fetchPatientHistoryData } from "@/Store/patient/PatientSlice"
import PatientHistoryItemDetails from "@/components/PatientHistoryItemDetails"
import AdminSideBarDash from "@/components/AdminSideDash"
import AdminNavBarDash from "@/components/AdminDashNav"
import { ActionsTable } from "@/components/Tables/AdminHistory"
import { fetchActions } from "@/Store/admin/AdminSlice"
import withAuth from "@/components/HOC/AuthHOC"


const AdminHistory = () => {
    const [requestLoading, setRequestLoading] = useState(true)
    const { actionsData } = useSelector((state: RootState) => state.Admin)
    const dispatch = useDispatch<AppDispatch>()
    const fetchData = async() => {
        const response = await dispatch(fetchActions())
        setRequestLoading((prev) => false)
    }
    useLayoutEffect(()=>{
        fetchData()
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
                            actionsData && actionsData.status === 200 ?
                            <>
                                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> Actions History </h1>
                                <p className="pl-4 text-sm text-sickness-ashGray font-semibold"> You&apos;ll find here a list of all actions performed by all admins in the platform, from deleting a user, all the way to accepting a doctor. </p>
                                <div className="overflow-x-scroll grid max-w-screen mt-4 border border-sickness-border rounded-md">
                                    <ActionsTable actions={actionsData.actions} />
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

export default withAuth(AdminHistory, ["admin"])