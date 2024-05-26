import { CircleEllipsis } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NextAppointmentCard() {
    return(
        <div className="flex flex-col gap-2 border border-sickness-border shadow-md rounded-md py-2 w-96">
            <div className="flex gap-2 px-4">
                <div className="border border-sickness-border rounded-full p-2 text-xl bg-sickness-orange text-white w-fit h-fit">
                    <p className="uppercase"> MN </p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex w-full justify-between">
                        <h3 className="font-semibold text-sickness-primaryText"> Mouhib Naffeti </h3>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <CircleEllipsis className="w-6 h-6 text-sickness-primaryText cursor-pointer transition delay-100 ease-in hover:rotate-90" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuItem className="cursor-pointer text-sickness-primaryText font-[510]" /*onClick={()=>Router.push(`/doctor?name=${doctor.name}&lastname=${doctor.lastname}&distance=${doctor.distance}&location=${JSON.stringify(doctor?.location[0]?.cordonnees || [0, 0])}&phone=${doctor.phone}&email=${doctor.email}&speciality=${doctor.speciality}&id=${doctor._id}`)} */>
                                    View Profile
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <p className="font-medium text-sm text-sickness-gray"> Cardiologist </p>
                </div>
            </div>
            <div className="w-full h-[1px] bg-sickness-border" />
            <div className="flex w-full gap-2 justify-between px-4">
                <p className="font-semibold text-sm text-sickness-primaryText"> Date: <span className="text-sickness-gray"> 17/11/2024 </span> </p>
                <p className="font-semibold text-sm text-sickness-primaryText"> Time: <span className="text-sickness-gray"> 10:15 </span> </p>
            </div>
        </div>
    )
}