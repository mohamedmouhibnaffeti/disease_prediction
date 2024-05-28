"use client"
import { useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/Store/store"
import MainLoader from "@/components/Loaders/MainLoader"
import ErrorFetching from "@/components/Errors/FailedFetching"
import { fetchPatientHistoryData } from "@/Store/patient/PatientSlice"
import PatientHistoryItemDetails from "@/components/PatientHistoryItemDetails"
import AdminSideBarDash from "@/components/AdminSideDash"
import AdminNavBarDash from "@/components/AdminDashNav"
import { ActionsTable } from "@/components/Tables/AdminHistory"

const sampleActions = [
    {
        _id: "1",
        state: "pending",
        patient: {
            name: "John",
            lastname: "Doe",
            email: "john.doe@example.com",
            phone: "1234567890"
        },
        requestedAt: "2023-05-14T10:00:00Z"
    },
    {
        _id: "2",
        state: "finished",
        patient: {
            name: "Jane",
            lastname: "Smith",
            email: "jane.smith@example.com",
            phone: "0987654321"
        },
        requestedAt: "2023-06-20T14:30:00Z"
    },
    {
        _id: "3",
        state: "refused",
        patient: {
            name: "Alice",
            lastname: "Johnson",
            email: "alice.johnson@example.com",
            phone: "1122334455"
        },
        requestedAt: "2023-07-01T09:15:00Z"
    },
    {
        _id: "4",
        state: "accepted",
        patient: {
            name: "Bob",
            lastname: "Brown",
            email: "bob.brown@example.com",
            phone: "5566778899"
        },
        requestedAt: "2023-08-22T16:45:00Z"
    }
];

export default function Dashboard(){
    const [AppointmentsData, setAppointmentsData] = useState<any>()
    const [requestLoading, setRequestLoading] = useState(true)
    const dispatch = useDispatch<AppDispatch>()
    const fetchData = async() => {
        const response = await dispatch(fetchPatientHistoryData({patientID: "6651af539b6651ea68e82453"}))
        setAppointmentsData(response.payload)
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
                            200 === 200 ?
                            <>
                                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> Actions History </h1>
                                <p className="pl-4 text-sm text-sickness-ashGray font-semibold"> You'll find here a list of all actions performed by all admins in the platform, from deleting a user, all the way to accepting a doctor. </p>
                                <div className="overflow-x-scroll grid max-w-screen mt-4 border border-sickness-border rounded-md">
                                    <ActionsTable actions={sampleActions} />
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

