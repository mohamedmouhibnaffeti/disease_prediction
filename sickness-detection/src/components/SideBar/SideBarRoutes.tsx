"use client";
import Link from "next/link";
import { CalendarCheckIcon, Clock10Icon, FileTextIcon, LineChartIcon, LogOutIcon, PlusIcon, ScanSearch, Settings2Icon, User2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { getRandomColor } from "@/lib/statics/Colors";
import useAuth from "@/lib/Hooks/useAuth";
import DoctorIcon from "../SVG/DoctorIcon";
import { ApercuIcon } from "./MainSideBar";

export default function SideBarRoutes({role, pathname}: {role: string, pathname: string}) {
    switch (role) {
        case "admin":
            return pathname.startsWith("/admin") ? (
                <>
                    <p className="text-sickness-gray font-semibold pl-2">General</p>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/admin"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/admin"
                        onClick={()=>{}}
                        >
                        <ApercuIcon />
                        Overview
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/admin/manage_doctors"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/admin/manage_doctors"
                        onClick={()=>{}}
                        >
                        <DoctorIcon className={`w-5 h-5 ${pathname.startsWith("/admin/manage_doctors") ? "fill-white" : "fill-sickness-primaryText"}`} />
                        Doctors
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/admin/manage_users"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/admin/manage_users"
                        onClick={()=>{}}
                        >
                        <User2Icon className="h-5 w-5" />
                        Users
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/admin/scraper"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/admin/scraper"
                        onClick={()=>{}}
                        >
                        <ScanSearch className="h-5 w-5" />
                        Scraper
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/admin/file-insert"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/admin/file-insert"
                        onClick={()=>{}}
                        >
                        <FileTextIcon className="h-5 w-5" />
                        Data Processing
                    </Link>
                    <p className="text-sickness-gray font-semibold pl-2 mt-3">Me</p>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/admin/profile"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/admin/profile"
                        onClick={()=>{}}
                        >
                        <Settings2Icon className="h-5 w-5" />
                        My Profile
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/admin/history"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/admin/history"
                        onClick={()=>{}}
                        >
                        <Clock10Icon className="h-5 w-5" />
                        History
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/admin"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/admin"
                        onClick={()=>{}}
                        >
                        <ApercuIcon />
                        Overview
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/admin/scraper"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/admin/scraper"
                        onClick={()=>{}}
                        >
                        <ScanSearch className="h-5 w-5" />
                        Scraper
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/admin/file-insert"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/admin/file-insert"
                        onClick={()=>{}}
                        >
                        <FileTextIcon className="h-5 w-5" />
                        Data Processing
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/admin/profile"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/admin/profile"
                        onClick={()=>{}}
                        >
                        <Settings2Icon className="h-5 w-5" />
                        My Profile
                    </Link>
                </>
            )
        case "doctor":
            return pathname.startsWith("/dashboard/doctor") ? (
                <>
                    <p className="text-sickness-gray font-semibold pl-2">General</p>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/dashboard/doctor"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/dashboard/doctor"
                        onClick={()=>{}}
                        >
                        <ApercuIcon />
                        Overview
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/dashbaord/doctor/appointments"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/dashbaord/doctor/appointments"
                        onClick={()=>{}}
                        >
                        <CalendarCheckIcon className="h-5 w-5" />
                        Appointments
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/dashbaord/doctor/statistics"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/dashbaord/doctor/statistics"
                        onClick={()=>{}}
                        >
                        <LineChartIcon className="h-5 w-5" />
                        Statistics
                    </Link>
                    <p className="text-sickness-gray font-semibold pl-2 mt-3">Me</p>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/dashbaord/doctor/profile"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/dashbaord/doctor/profile"
                        onClick={()=>{}}
                        >
                        <Settings2Icon className="h-5 w-5" />
                        My Profile
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/dashboard/doctor/history"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/dashboard/doctor/history"
                        onClick={()=>{}}
                        >
                        <Clock10Icon className="h-5 w-5" />
                        History
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/dashboard/doctor"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/dashboard/doctor"
                        onClick={()=>{}}
                        >
                        <ApercuIcon />
                        Overview
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/dashbaord/doctor/appointments"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/dashbaord/doctor/appointments"
                        onClick={()=>{}}
                        >
                        <CalendarCheckIcon className="h-5 w-5" />
                        Appointments
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/dashbaord/doctor/profile"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/dashbaord/doctor/profile"
                        onClick={()=>{}}
                        >
                        <Settings2Icon className="h-5 w-5" />
                        My Profile
                    </Link>
                </>
            )
        case "patient": return (
                <>
                    <p className="text-sickness-gray font-semibold pl-2">General</p>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/dashboard/patient"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/dashboard/patient"
                        onClick={()=>{}}
                        >
                        <ApercuIcon />
                        Overview
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/dashbaord/patient/profile"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="/dashbaord/patient/profile"
                        onClick={()=>{}}
                        >
                        <Settings2Icon className="h-5 w-5" />
                        My Profile
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2 font-semibold ${
                            pathname === "/dashboard/patient/history"
                            ? "bg-sickness-primaryText/50 border-2 border-sickness-primaryText text-white"
                            : "hover:bg-sickness-primaryText/30"
                        } rounded-lg mt-2`}
                        href="dashboard/patient/history"
                        onClick={()=>{}}
                        >
                        <Clock10Icon className="h-5 w-5" />
                        History
                    </Link>
                </>
            )
        default:
            return null
    }
}
