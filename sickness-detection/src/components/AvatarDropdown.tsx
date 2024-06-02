import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getRandomColor } from "@/lib/statics/Colors"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/Store/store"
import { Logout } from "@/Store/auth/authSlice"
  
export default function AvatarDropdown({user, role}: {user: any, role: string}) {
    const color = getRandomColor()
    const Router = useRouter()
    const navigate = (path: string) =>{
        Router.push(path)
    }
    const MenuItems = () => {
        switch(role) {
            case "admin" : return(
                <>
                    <DropdownMenuItem className="cursor-pointer font-semibold text-sickness-primaryText" onClick={()=>navigate("/admin")}>Overview</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer font-semibold text-sickness-primaryText" onClick={()=>navigate("/admin/scraper")}>Scraper</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer font-semibold text-sickness-primaryText" onClick={()=>navigate("/admin/file-insert")}>Data Processing</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer font-semibold text-sickness-primaryText" onClick={()=>navigate("/admin/profile")}>Profile</DropdownMenuItem>
                </>
            )
            case "doctor" : return(
                <>
                    <DropdownMenuItem className="cursor-pointer font-semibold text-sickness-primaryText" onClick={()=>navigate("/dashboard/doctor")}>Overview</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer font-semibold text-sickness-primaryText" onClick={()=>navigate("/dashboard/doctor/appointments")}>Appointments</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer font-semibold text-sickness-primaryText" onClick={()=>navigate("/dashboard/doctor/profile")}>Profile</DropdownMenuItem>
                </>
            )
            case "patient" : return(
                <>
                    <DropdownMenuItem className="cursor-pointer font-semibold text-sickness-primaryText" onClick={()=>navigate("/dashboard/patient")}>Overview</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer font-semibold text-sickness-primaryText" onClick={()=>navigate("/dashboard/patient/history")}>history</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer font-semibold text-sickness-primaryText" onClick={()=>navigate("/dashboard/patient/profile")}>Profile</DropdownMenuItem>
                </>
            )
        }
    }
    const dispatch = useDispatch<AppDispatch>()
    return(
        <DropdownMenu>
        <DropdownMenuTrigger className="md:flex hidden">
            <Avatar>
                <AvatarFallback className={`font-semibold flex justify-center items-center`} style={{backgroundColor: color.bg, color: color.text}} >{`${user.name[0]}${user.lastname[0]}`}</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <MenuItems />
            <DropdownMenuItem onClick={()=>dispatch(Logout())} className="cursor-pointer bg-red-500 transition hover:text-red-500 hover:border-red-500 border delay-75 ease-in text-white font-semibold flex justify-center items-center gap-2">Logout <LogOutIcon className="w-5 h-5" /></DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}