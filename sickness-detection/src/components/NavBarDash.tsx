"use client"
import { usePathname, useRouter } from "next/navigation"
import { ApercuIcon } from "./SideBarDash"
import { Settings2Icon, Clock, MenuIcon,LineChartIcon, CalendarCheckIcon } from "lucide-react"

const ConditionalNavTitle = ({pathname}: {pathname: string}) => {
    return(
        <div className="md:-translate-x-0 -translate-x-4">
        {pathname === '/dashboard/doctor' ?
            <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                <div className="translate-y-[2px] font-dashfont"><ApercuIcon /></div>
                Overview
            </h1>
        :
        (
            pathname.startsWith('/dashboard/doctor/statistics') ?
            <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                <div className="translate-y-[2px]"><LineChartIcon /></div>
                Statistics
            </h1>
            :
            (
                pathname.startsWith('/dashboard/doctor/appointments') ?
                <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                    <div className="translate-y-[1px]"><CalendarCheckIcon /></div>
                    Appointments
                </h1>
            :
                pathname.startsWith('/dashboard/doctor/profile') ?
                <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                    <div className="translate-y-[2px]"><Settings2Icon /></div>
                    Profile
                </h1>
            :
            (
                pathname.startsWith('/dashboard/doctor/history') ?
                <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                    <div className="translate-y-[2px]"><Clock /></div>
                    History
                </h1>
                :
                ""
            )
            
            )
        )
        }
        </div>
    )
}

const NavBarDash = () => {
    const Router = useRouter()
    const pathname = usePathname()

    return(
        <header className="flex h-14 lg:h-[60px] items-center border-b border-sickness-border md:px-0 px-6 lg:px-8 justify-between z-20 bg-gray-200/40">
            <div className="w-full flex justify-between px-6 pr-2 items-center">
                <ConditionalNavTitle pathname={pathname} />
                <div className="flex sm:gap-8 gap-2 items-center">
                    <MenuIcon className={`md:hidden flex cursor-pointer `} />
                </div>
            </div>
        </header>
    )
}
export default NavBarDash 