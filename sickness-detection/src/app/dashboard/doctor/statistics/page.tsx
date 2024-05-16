"use client"
import SideBarDash from "@/components/SideBarDash"
import NavBarDash from "@/components/NavBarDash"
import StatsCard from "@/components/StatsCard"
import PendingAppointmentCard from "@/components/PendingAppointmentCard"
import { useState } from "react"
import PatientsOverallChart from "@/components/Charts/PatientsOverallChart"
import { PatientsTable } from "@/components/Tables/PatientsTable"
import GenderLineChart from "@/components/Charts/GenderPatients"
import AgeLineChart from "@/components/Charts/AgePatients"
import { MonitorXIcon } from "lucide-react"
import SymptomsBarChart from "@/components/Charts/SymptomsBarChart"
import SicknessBarChart from "@/components/Charts/SicknessBarChat"

export default function Dashboard(){
    return (
        <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
            <SideBarDash /> 
        <div className="flex flex-col">
            <NavBarDash />
            <main className="flex-1 py-4 md:py-6">
                <div className="lg:flex lg:flex-col hidden">
                    <div className="flex lg:flex-row flex-col mx-2 gap-2  px-4 md:px-6">
                        <GenderLineChart />
                        <AgeLineChart />
                    </div>
                    <div className="w-full h-[2px] bg-sickness-primary/50" />
                    <div className="flex lg:flex-row flex-col mx-2 gap-2 mt-5  px-4 md:px-6   ">
                        <SymptomsBarChart />
                        <SicknessBarChart />
                    </div>
                </div>
                <div className="lg:hidden flex flex-col text-red-500 items-center mt-20 w-full h-full gap-2 px-4 md:px-6">
                    <MonitorXIcon className="w-48 h-48" />
                    <p className="text-center text-sm font-semibold"> For a better user experience please open this page in a desktop screen </p>
                </div>
            </main>
        </div>
        </div>
    )
}

