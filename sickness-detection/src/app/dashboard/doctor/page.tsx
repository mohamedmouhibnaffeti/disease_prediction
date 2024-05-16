"use client"
import SideBarDash from "@/components/SideBarDash"
import NavBarDash from "@/components/NavBarDash"
import StatsCard from "@/components/StatsCard"
import PendingAppointmentCard from "@/components/PendingAppointmentCard"
import { useState } from "react"
import PatientsOverallChart from "@/components/Charts/PatientsOverallChart"
import { PatientsTable } from "@/components/Tables/PatientsTable"

export default function Dashboard(){
    const [maxLen, setMaxLen] = useState(3)
    return (
        <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
            <SideBarDash /> 
        <div className="flex flex-col">
            <NavBarDash />
            <main className="flex-1 p-4 md:p-6">
                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> Good Morning Dr. Mouhib </h1>
                <div className="flex flex-col gap-2 mt-4">
                    <div className="grid lg:grid-cols-3 gap-2">
                        <StatsCard text="Accepted Appointments" value={120} />
                        <StatsCard text="Pending Appointments" value={20} />
                        <StatsCard text="Total Appointments" value={250} />
                    </div>
                    <div className="grid lg:grid-cols-3 gap-2">
                        <StatsCard text="My Patients" value={280} />
                        <StatsCard text="Total Patients" value={20} />
                        <StatsCard text="Total Doctors" value={250} />
                    </div>
                </div>
                <h1 className="md:text-xl text-lg font-semibold text-sickness-gray mt-4"> Pending Appointments </h1>
                <div className="flex flex-col gap-2 mt-2 w-fit">
                    <div className="grid lg:grid-cols-3 gap-2">
                    {
                        Array.from({ length: maxLen }).map((_, index) => (
                            <PendingAppointmentCard key={index} />
                        ))
                    }
                    </div>
                    { maxLen !== 9 && <button className="w-fit h-fit px-4 py-2 text-sm font-semibold bg-sickness-gray/30 rounded-md hover:bg-sickness-gray/50 transition delay-100 ease-in self-center" onClick={()=>{setMaxLen(9)}}> See All </button> }
                </div>
                <h1 className="lg:flex hidden md:text-xl text-lg font-semibold text-sickness-gray mt-4"> Patients </h1>
                <div className="lg:flex hidden max-w-screen-sm">
                    <PatientsOverallChart />
                </div>
                <h1 className="md:text-xl text-lg font-semibold text-sickness-gray mt-4"> Patients List </h1>
                <div className="overflow-x-scroll grid max-w-screen">
                    <PatientsTable />
                </div>
            </main>
        </div>
        </div>
    )
}

