"use client"
import SideBarDash from "@/components/SideBarDash"
import NavBarDash from "@/components/NavBarDash"
import GenderLineChart from "@/components/Charts/GenderPatients"

export default function Dashboard(){
    return (
        <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
            <SideBarDash /> 
        <div className="flex flex-col">
            <NavBarDash />
            <main className="flex-1 p-4 md:p-6">
                <GenderLineChart />
            </main>
        </div>
        </div>
    )
}
