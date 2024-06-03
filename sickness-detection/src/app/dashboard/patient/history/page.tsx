"use client"
import PatientSideBarDash from "@/components/PatientSideBarDash"
import PatientNavBarDash from "@/components/PatientNavBarDash"
import { useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Store/store"
import MainLoader from "@/components/Loaders/MainLoader"
import ErrorFetching from "@/components/Errors/FailedFetching"
import { fetchPatientHistoryData } from "@/Store/patient/PatientSlice"
import { PatientAppointmentsTable } from "@/components/Tables/PatientAppointmentsTable"
import PatientHistoryItemDetails from "@/components/PatientHistoryItemDetails"
import withAuth from "@/components/HOC/AuthHOC"

const PatientHistory = () => {
    const { historyData } = useSelector((state: RootState) => state.Patient)
    const [requestLoading, setRequestLoading] = useState(true)
    const dispatch = useDispatch<AppDispatch>()
    const fetchData = async(id: string) => {
        const response = await dispatch(fetchPatientHistoryData({patientID: "6651af539b6651ea68e82453"}))
        setRequestLoading((prev) => false)
    }
    useLayoutEffect(()=>{
        if(!historyData){
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
                            historyData && historyData.status === 200 ?
                            <>
                                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> Your previous appointments </h1>
                                <div className="overflow-x-scroll grid max-w-screen mt-4 border border-sickness-border rounded-md">
                                    <PatientAppointmentsTable  appointments={historyData.appointments} />
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

export default withAuth(PatientHistory, ["patient"])