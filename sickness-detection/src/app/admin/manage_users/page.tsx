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


const samplePatients = [
    {
        name: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        gender: "Male",
        age: 30,
    },
    {
        name: "Jane",
        lastname: "Smith",
        email: "jane.smith@example.com",
        phone: "0987654321",
        gender: "Female",
        age: 25,
    },
    {
        name: "Robert",
        lastname: "Johnson",
        email: "robert.johnson@example.com",
        phone: "1122334455",
        gender: "Male",
        age: 40,
    },
    {
        name: "Emily",
        lastname: "Davis",
        email: "emily.davis@example.com",
        phone: "5566778899",
        gender: "Female",
        age: 35,
    },
  ];
export default function ManageUsers(){
    const [requestLoading, setRequestLoading] = useState(false)
    const [mainData, setMainData] = useState<any>()
    const dispatch = useDispatch<AppDispatch>()
    const fetchData = async () => {
        setRequestLoading(true)
        const response = await dispatch(PatientDashMainPageData({patientID: "6651af539b6651ea68e82453"}))
        setMainData(response.payload)
        setRequestLoading(false)
    }
    useLayoutEffect(()=>{
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
                            /*mainData && mainData.status */ 200 === 200 ?
                            <>
                                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> {Greeting()} </h1>
                                <div className="flex flex-col gap-2">
                                    <UsersTable users={samplePatients} />
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

