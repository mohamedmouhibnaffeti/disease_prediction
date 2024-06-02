"use client";
import Link from "next/link";
import { Clock10Icon, FileTextIcon, LogOutIcon, PlusIcon, ScanSearch, Settings2Icon, User2Icon, XIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { getRandomColor } from "@/lib/statics/Colors";
import useAuth from "@/lib/Hooks/useAuth";
import DoctorIcon from "../SVG/DoctorIcon";
import SideBarRoutes from "./SideBarRoutes";

export default function HamburgerMenu() {
    const pathname = usePathname()
    const color = getRandomColor()
    const role = useAuth()
    if(role){
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
                    <SideBarRoutes role={role || "" } pathname={pathname} />
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
