"use client"
import Link from "next/link"
import { Settings2Icon, Clock, LogOutIcon,LineChartIcon, CalendarCheckIcon, HeartIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import Logo from "./Images/SymptoSense.png"

const PatientSideBarDash = () => {
    const pathname = usePathname()
    const Router = useRouter()
    return(
        <div className="hidden border-r border-sickness-border bg-gray-200/40 text-sickness-primaryText md:block">
            <div className="flex flex-col gap-2">
            <div className="flex h-[60px] items-center px-6">
                <Image src={Logo} alt="" className="h-[70px] w-96 cursor-pointer" onClick={()=>{Router.push("/")}} />
            </div>
            <div className="flex-1">
                <nav className="grid items-start px-4 text-sm font-medium">
                    <p className="text-[#999999] font-semibold"> General </p>
                    <Link
                        className={`font-dashfont transition ease-in delay-100 flex items-center gap-3 px-3 py-2 ${pathname === "/dashboard/patient" ? "bg-sickness-primaryText/50 text-white border-2 border-sickness-primaryText/50 " : "hover:bg-sickness-primaryText/30 "} rounded-lg mt-2`}
                        href="/dashboard/patient"
                    >
                        <ApercuIcon />
                        Overview
                    </Link>
                    <p className="text-[#999999] font-semibold mt-4"> Me </p>
                    <Link
                        className={`font-dashfont transition ease-in delay-100 flex items-center gap-3 rounded-lg px-3 py-2 mt-2 ${pathname.startsWith("/dashboard/patient/profile") ? "bg-sickness-primaryText/50 text-white border-2 border-sickness-primaryText/50 " : "hover:bg-sickness-primaryText/30 "}`}
                        href="/dashboard/patient/profile"
                    >
                        <Settings2Icon className="h-5 w-5" />
                        My Profile
                    </Link>
                    <Link
                        className={`font-dashfont transition ease-in delay-100 flex items-center gap-3 rounded-lg px-3 py-2 mt-2 ${pathname.startsWith("/dashboard/patient/history") ? "bg-sickness-primaryText/50 text-white border-2 border-sickness-primaryText/50 " : "hover:bg-sickness-primaryText/30 "}`}
                        href="/dashboard/patient/history"
                    >
                        <Clock className="h-5 w-5" />
                        History
                    </Link>
                    <Link
                        className={`font-dashfont transition ease-in delay-100 flex items-center gap-3 rounded-lg px-3 py-2 mt-2 ${pathname.startsWith("/dashboard/patient/social_media") ? "bg-sickness-primaryText/50 text-white border-2 border-sickness-primaryText/50 " : "hover:bg-sickness-primaryText/30 "}`}
                        href="/dashboard/patient/social_media"
                    >
                        <HeartIcon className="h-5 w-5" />
                        Social Media Interactions
                    </Link>
                </nav>
            </div>
            </div>
            <p className="mt-[28rem] px-4 text-sm text-red-500 flex gap-2 cursor-pointer hover:text-red-500/80"> <LogOutIcon className="-translate-y-[2px]" /> Logout </p>
        </div>
    )
}

export default PatientSideBarDash

export function ApercuIcon(props: any){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-proportions h-5 w-5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M12 9v11"/><path d="M2 9h13a2 2 0 0 1 2 2v9"/></svg>
    )
}

export function CircleHelp (props: any) {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-help -translate-y-[2px]"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
    )
}
