"use client"
import SideBarDash from "@/components/SideBarDash"
import NavBarDash from "@/components/NavBarDash"
import StatsCard from "@/components/StatsCard"
import PendingAppointmentCard from "@/components/PendingAppointmentCard"
import { useState } from "react"
import PatientsOverallChart from "@/components/Charts/PatientsOverallChart"
import { PatientsTable } from "@/components/Tables/PatientsTable"
import { AppointmentsTable } from "@/components/Tables/AppoitmentsHistoryTable"

export default function Dashboard(){
    const [maxLen, setMaxLen] = useState(3)
    return (
        <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
            <SideBarDash /> 
        <div className="flex flex-col">
            <NavBarDash />
            <main className="flex-1 p-4 md:p-6">
                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> Appointments History </h1>
                <div className="overflow-x-scroll grid max-w-screen mt-4 border border-sickness-border rounded-md">
                    <AppointmentsTable />
                </div>
            </main>
        </div>
        </div>
    )
}

