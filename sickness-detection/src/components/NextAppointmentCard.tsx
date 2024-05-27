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
import { getHoursAndMinutes } from "@/lib/functions/dates";
import { useRouter } from "next/navigation";
import { DistanceEuclidienne } from "@/lib/statics/distance";
import { useEffect, useState } from "react";

export default function NextAppointmentCard({appointment}: {appointment: any}) {
    const date = new Date(appointment.requestedAt)
    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const hour = `${getHoursAndMinutes(date).hours}:${getHoursAndMinutes(date).minutes}`
    const [distance, setDistance] = useState<number>()
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log({latitude, longitude})
                if (appointment.doctor.location) {
                    const distance = DistanceEuclidienne({
                        x1: latitude,
                        y1: longitude,
                        x2: appointment.doctor?.location[0]?.cordonnees[0],
                        y2: appointment.doctor?.location[0]?.cordonnees[1]
                    });
                    setDistance((prevDistance: any) => distance)
                }
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
}, [appointment]);
    const Router = useRouter()
    return(
        <div className="flex flex-col gap-2 border border-sickness-border shadow-md rounded-md py-2 w-full">
            <div className="flex gap-2 px-4">
                <div className="border border-sickness-border rounded-full p-2 text-xl bg-sickness-orange text-white w-fit h-fit">
                    <p className="uppercase"> {`${appointment.doctor.name[0]}${appointment.doctor.lastname[0]}`} </p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex w-full justify-between">
                        <h3 className="font-semibold text-sickness-primaryText"> {`${appointment.doctor.name} ${appointment.doctor.lastname}`} </h3>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <CircleEllipsis className="w-6 h-6 text-sickness-primaryText cursor-pointer transition delay-100 ease-in hover:rotate-90" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuItem className="cursor-pointer text-sickness-primaryText font-[510]" onClick={()=>Router.push(`/doctor?name=${appointment.doctor.name}&lastname=${appointment.doctor.lastname}&distance=${distance}&location=${JSON.stringify(appointment.doctor?.location[0]?.cordonnees || [0, 0])}&phone=${appointment.doctor.phone}&email=${appointment.doctor.email}&speciality=${appointment.doctor.speciality}&id=${appointment.doctor._id}`)} >
                                    View Profile
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <p className="font-medium text-sm text-sickness-gray"> {appointment.doctor.speciality} </p>
                </div>
            </div>
            <div className="w-full h-[1px] bg-sickness-border" />
            <div className="flex w-full gap-2 justify-between px-4">
                <p className="font-semibold text-sm text-sickness-primaryText"> Date: <span className="text-sickness-gray"> {dateString} </span> </p>
                <p className="font-semibold text-sm text-sickness-primaryText"> Time: <span className="text-sickness-gray"> {hour} </span> </p>
            </div>
        </div>
    )
}