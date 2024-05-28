"use client"
import Link from "next/link"
import { Settings2Icon, Clock, LogOutIcon,LineChartIcon, CalendarCheckIcon, HeartIcon, User2Icon, ScanSearch, FileTextIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import Logo from "./Images/SymptoSense.png"
import DocAvatar from "./SVG/DocAvatar"
import DoctorIcon from "./SVG/DoctorIcon"

const AdminSideBarDash = () => {
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
                        className={`font-dashfont transition ease-in delay-100 flex items-center gap-3 px-3 py-2 ${pathname === "/admin" ? "bg-sickness-primaryText/50 text-white border-2 border-sickness-primaryText/50 " : "hover:bg-sickness-primaryText/30 "} rounded-lg mt-2`}
                        href="/admin"
                    >
                        <ApercuIcon />
                        Overview
                    </Link>
                    <Link
                        className={`font-dashfont transition ease-in delay-100 flex items-center gap-3 rounded-lg px-3 py-2 mt-2 ${pathname.startsWith("/admin/manage_doctors") ? "bg-sickness-primaryText/50 text-white border-2 border-sickness-primaryText/50 " : "hover:bg-sickness-primaryText/30 "}`}
                        href="/admin/manage_doctors"
                    >
                        <DoctorIcon className={`w-5 h-5 ${pathname.startsWith("/admin/manage_doctors") ? "fill-white" : "fill-sickness-primaryText"}`} />
                        Doctors
                    </Link>
                    <Link
                        className={`font-dashfont transition ease-in delay-100 flex items-center gap-3 rounded-lg px-3 py-2 mt-2 ${pathname.startsWith("/admin/profile") ? "bg-sickness-primaryText/50 text-white border-2 border-sickness-primaryText/50 " : "hover:bg-sickness-primaryText/30 "}`}
                        href="/admin/manage_users"
                    >
                        <User2Icon className="h-5 w-5" />
                        Users
                    </Link>
                    <Link
                        className={`font-dashfont transition ease-in delay-100 flex items-center gap-3 rounded-lg px-3 py-2 mt-2 ${pathname.startsWith("/admin/scraper") ? "bg-sickness-primaryText/50 text-white border-2 border-sickness-primaryText/50 " : "hover:bg-sickness-primaryText/30 "}`}
                        href="/admin/scraper"
                    >
                        <ScanSearch className="h-5 w-5" />
                        Web Scraper
                    </Link>
                    <Link
                        className={`font-dashfont transition ease-in delay-100 flex items-center gap-3 rounded-lg px-3 py-2 mt-2 ${pathname.startsWith("/admin/insert-file") ? "bg-sickness-primaryText/50 text-white border-2 border-sickness-primaryText/50 " : "hover:bg-sickness-primaryText/30 "}`}
                        href="/admin/file-insert"
                    >
                        <FileTextIcon className="h-5 w-5" />
                        Data Processing
                    </Link>
                    <p className="text-[#999999] font-semibold mt-4"> Me </p>
                    <Link
                        className={`font-dashfont transition ease-in delay-100 flex items-center gap-3 rounded-lg px-3 py-2 mt-2 ${pathname.startsWith("/admin/profile") ? "bg-sickness-primaryText/50 text-white border-2 border-sickness-primaryText/50 " : "hover:bg-sickness-primaryText/30 "}`}
                        href="/admin/profile"
                    >
                        <Settings2Icon className="h-5 w-5" />
                        My Profile
                    </Link>
                    <Link
                        className={`font-dashfont transition ease-in delay-100 flex items-center gap-3 rounded-lg px-3 py-2 mt-2 ${pathname.startsWith("/admin/history") ? "bg-sickness-primaryText/50 text-white border-2 border-sickness-primaryText/50 " : "hover:bg-sickness-primaryText/30 "}`}
                        href="/admin/history"
                    >
                        <Clock className="h-5 w-5" />
                        History
                    </Link>
                </nav>
            </div>
            </div>
            <p className="mt-[28rem] px-4 text-sm text-red-500 flex gap-2 cursor-pointer hover:text-red-500/80"> <LogOutIcon className="-translate-y-[2px]" /> Logout </p>
        </div>
    )
}

export default AdminSideBarDash

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
