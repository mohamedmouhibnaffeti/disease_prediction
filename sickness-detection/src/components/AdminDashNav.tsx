"use client"
import { usePathname, useRouter } from "next/navigation"
import { ApercuIcon } from "./SideBarDash"
import { MenuIcon, User2Icon, ScanSearch, FileTextIcon, Settings2Icon, Clock10Icon } from "lucide-react"
import { ToggleHamMenu } from "@/Store/auth/authSlice";
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/Store/store"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DocAvatar from "./SVG/DocAvatar"
import DoctorIcon from "./SVG/DoctorIcon"


const ConditionalNavTitle = ({pathname}: {pathname: string}) => {
    return(
        <div className="md:-translate-x-0 -translate-x-4">
        {pathname === '/admin' ?
            <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                <div className="translate-y-[2px] font-dashfont"><ApercuIcon /></div>
                Overview
            </h1>
        :
        (
            pathname.startsWith('/admin/manage_users') ?
            <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                <div className="translate-y-[2px]"><User2Icon /></div>
                Users
            </h1>
            :
            (
                pathname.startsWith('/admin/manage_doctors') ?
                <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                    <div className="translate-y-[1px]"><DoctorIcon className="w-6 h-6" /></div>
                    Doctors
                </h1>
            :
                (
                    pathname.startsWith('/admin/scraper') ?
                    <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                        <div className="translate-y-[1px]"><ScanSearch /></div>
                        Web Scraper
                    </h1>
                    :   
                    pathname.startsWith('/admin/file-insert') ?
                        <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                            <div className="translate-y-[1px]"><FileTextIcon /></div>
                            Data Processing
                        </h1>
                    :
                    pathname.startsWith('/admin/profile') ?
                        <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                            <div className="translate-y-[1px]"><Settings2Icon /></div>
                            Profile
                        </h1>
                        :
                            pathname.startsWith('/admin/history') ?
                            <h1 className="font-semibold sm:text-lg text-md flex gap-1">
                                <div className="translate-y-[1px]"><Clock10Icon /></div>
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

const AdminNavBarDash = () => {
    const Router = useRouter()
    const pathname = usePathname()
    const dispatch = useDispatch<AppDispatch>()

    return(
        <header className="flex h-14 lg:h-[60px] items-center border-b border-sickness-border md:px-0 px-6 lg:px-8 justify-between z-20 bg-gray-200/40">
            <div className="w-full flex justify-between px-6 pr-2 items-center">
                <ConditionalNavTitle pathname={pathname} />
                <div className="flex sm:gap-8 gap-2 items-center justify-between">
                    <MenuIcon className={`md:hidden flex cursor-pointer `} onClick={() => dispatch(ToggleHamMenu(true))}  />
                    <NotificationBell />
                    <div className="md:flex hidden border border-sickness-border rounded-full p-2 text-lg bg-teal-500 text-white w-fit h-fit">
                        <p className="uppercase"> MN </p>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default AdminNavBarDash

const NotificationBell = () => {
    return(
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="md:flex hidden relative mt-1 cursor-pointer">
                        <svg className="w-[1.8rem] h-[1.8rem] text-teal-600 animate-wiggle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17"/></svg>
                        <div className="px-1 h-fit w-fit text-xs bg-teal-500 rounded-full text-center text-white text- absolute -top-2 -end-1">
                            3
                            <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full" ></div>
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuItem className="cursor-default text-sickness-primaryText font-[510] px-2 flex justify-between gap-1" /*onClick={()=>Router.push(`/doctor?name=${doctor.name}&lastname=${doctor.lastname}&distance=${doctor.distance}&location=${JSON.stringify(doctor?.location[0]?.cordonnees || [0, 0])}&phone=${doctor.phone}&email=${doctor.email}&speciality=${doctor.speciality}&id=${doctor._id}`)} */>
                        Notification 1 <button className="border border-sickness-border rounded-sm text-sickness-border hover:border-sickness-primary hover:text-sickness-primary transition ease-out delay-100 text-xs px-1 py-1"> MARK AS READ </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-default text-sickness-primaryText font-[510] px-2 flex justify-between gap-1" /*onClick={()=>Router.push(`/doctor?name=${doctor.name}&lastname=${doctor.lastname}&distance=${doctor.distance}&location=${JSON.stringify(doctor?.location[0]?.cordonnees || [0, 0])}&phone=${doctor.phone}&email=${doctor.email}&speciality=${doctor.speciality}&id=${doctor._id}`)} */>
                        Notification 2 <button className="border border-sickness-border rounded-sm text-sickness-border hover:border-sickness-primary hover:text-sickness-primary transition ease-out delay-100 text-xs px-1 py-1"> MARK AS READ </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-default text-sickness-primaryText font-[510] px-2 flex justify-between gap-1" /*onClick={()=>Router.push(`/doctor?name=${doctor.name}&lastname=${doctor.lastname}&distance=${doctor.distance}&location=${JSON.stringify(doctor?.location[0]?.cordonnees || [0, 0])}&phone=${doctor.phone}&email=${doctor.email}&speciality=${doctor.speciality}&id=${doctor._id}`)} */>
                        Notification 3 <button className="border border-sickness-border rounded-sm text-sickness-border hover:border-sickness-primary hover:text-sickness-primary transition ease-out delay-100 text-xs px-1 py-1"> MARK AS READ </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-default text-sickness-primaryText font-[510] px-2 flex justify-between gap-1" /*onClick={()=>Router.push(`/doctor?name=${doctor.name}&lastname=${doctor.lastname}&distance=${doctor.distance}&location=${JSON.stringify(doctor?.location[0]?.cordonnees || [0, 0])}&phone=${doctor.phone}&email=${doctor.email}&speciality=${doctor.speciality}&id=${doctor._id}`)} */>
                        Notification 4 <button className="border border-sickness-border rounded-sm text-sickness-border hover:border-sickness-primary hover:text-sickness-primary transition ease-out delay-100 text-xs px-1 py-1"> MARK AS READ </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
    )
}