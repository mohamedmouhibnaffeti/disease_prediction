"use client";
import Link from "next/link";
import { Clock10Icon, FileTextIcon, LogOutIcon, PlusIcon, ScanSearch, Settings2Icon, User2Icon, XIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { getRandomColor } from "@/lib/statics/Colors";
import useAuth from "@/lib/Hooks/useAuth";
import DoctorIcon from "../SVG/DoctorIcon";

export default function HamburgerMenu() {
    const pathname = usePathname()
    const color = getRandomColor()
    const role = useAuth()
    const SideBarRoutes = () => {
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
                );
            case "doctor":
                return (
                    <>
                        <p>Overview</p>
                        <p>Patients</p>
                        <p>Appointments</p>
                        <p>Profile</p>
                    </>
                );
            case "user":
                return (
                    <>
                        <p>Overview</p>
                        <p>My Appointments</p>
                        <p>Profile</p>
                        <p>History</p>
                    </>
                );
            default:
                return null
        }
    }

    if(true){
        document.body.style.overflow = 'hidden';
    }

    return (
        <>
        {true && (
            <div className="md:hidden fixed top-0 right-0 flex w-screen z-[100] flex-col items-start border-r-2 border-settaBorder bg-white xsm:px-4 pt-4 h-screen overflow-hidden">
            <div className="flex flex-col gap-2 w-full">
                <div className="w-full flex justify-between px-4">
                    <Link href={"/"}>
                    <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-sickness-primaryText to-slate-700/80 text-2xl font-black translate-y-1">
                        SymptoSense
                    </h1>
                    </Link>
                <XIcon
                    className="cursor-pointer lg:hidden visible w-8 h-8"
                    onClick={()=>{}}
                />
                </div>
                <div className="flex-1 w-full">
                <div className="flex gap-2 items-center justify-center mt-4">
                    <div
                    className={`w-fit h-fit rounded-full flex justify-center items-center p-2`}
                    style={{ backgroundColor: `${color.bg}` }}
                    >
                    <p
                        className={`font-semibold text-[]`}
                        style={{ color: `${color?.text}` }}
                    >
                        MN
                    </p>
                    </div>
                    <p className="font-semibold">
                    {" "}
                    Mouhib Naffeti
                    </p>
                </div>
                <nav className="grid items-start font-medium mt-4 w-full text-sickness-primaryText text-sm">
                    <SideBarRoutes />
                </nav>
                </div>
            </div>
            <div className="mt-8 h-[2px] bg-settaBorder w-full"></div>
            <p
                className="mt-8 px-4 text-sm text-red-500 flex gap-2 cursor-pointer hover:text-red-500/80"
                onClick={() => {}}
            >
                {" "}
                <LogOutIcon className="-translate-y-[2px]" /> Logout{" "}
            </p>
            </div>
        )}
        </>
  );
};

export function ApercuIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-proportions h-5 w-5"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="M12 9v11" />
      <path d="M2 9h13a2 2 0 0 1 2 2v9" />
    </svg>
  );
}

export function CircleHelp(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-circle-help -translate-y-[2px]"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}
