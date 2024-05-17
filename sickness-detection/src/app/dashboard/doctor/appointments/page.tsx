"use client"
import SideBarDash from "@/components/SideBarDash"
import NavBarDash from "@/components/NavBarDash"
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import DashboardCalendar from "@/components/DashboardCalendar"

export default function Dashboard(){
    return (
        <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
            <SideBarDash /> 
        <div className="flex flex-col">
            <NavBarDash />
            <main className="flex-1 p-4 md:p-6">
                <h1 className="md:text-2xl text-xl font-semibold text-sickness-primaryText"> Good Morning Dr. Mouhib </h1>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                    <div>
                        <div className="px-4 py-2 pb-4 mt-4 flex flex-col border border-sickness-border rounded-md shadow-md gap-6 lg:w-fit lg:h-fit w-full">
                            <p className="text-sickness-primary lg:text-2xl text-xl font-semibold"> Visits for today: <span> 100 </span> </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="px-4 py-2 flex flex-col border border-sickness-border rounded-sm shadow-sm">
                                    <h1 className="text-xl"> New Patients </h1>
                                    <p className="text-lg font-semibold flex gap-2 self-end"> 40 <TrendingUpIcon className="text-green-500" /> </p>
                                </div>
                                <div className="px-4 py-2 flex flex-col border border-sickness-border rounded-sm shadow-sm">
                                    <h1 className="text-xl"> Old Patients </h1>
                                    <p className="text-lg font-semibold flex gap-2 self-end"> 20 <TrendingDownIcon className="text-red-500" /> </p>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-2 pb-4 mt-4 flex flex-col border border-sickness-border rounded-md shadow-md gap-6">
                            <p className="text-sickness-primary lg:text-2xl text-xl font-semibold"> Visits for today: <span> 100 </span> </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="px-4 py-2 flex flex-col border border-sickness-border rounded-sm shadow-sm">
                                    <h1 className="text-xl"> New Patients </h1>
                                    <p className="text-lg font-semibold flex gap-2 self-end"> 40 <TrendingUpIcon className="text-green-500" /> </p>
                                </div>
                                <div className="px-4 py-2 flex flex-col border border-sickness-border rounded-sm shadow-sm">
                                    <h1 className="text-xl"> Old Patients </h1>
                                    <p className="text-lg font-semibold flex gap-2 self-end"> 20 <TrendingDownIcon className="text-red-500" /> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <DashboardCalendar />
                    </div>
                </div>
            </main>
        </div>
        </div>
    )
}

