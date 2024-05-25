import { CircleEllipsisIcon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AppointmentDetailsCard({appointemntDetails}: { appointemntDetails: any }) {
    return(
        <div className="flex flex-col gap-2 border border-sickness-border shadow-md rounded-md pb-2 w-full h-fit">
            <div className="flex gap-2">
                <div className="border border-sickness-border rounded-full p-2 text-xl bg-sickness-orange text-white w-fit h-fit my-2 ml-2">
                    <p> {`${appointemntDetails.patient.name[0]}${appointemntDetails.patient.lastname[0]}`} </p>
                </div>
                <div className="flex flex-col gap-2  my-2 mx-2">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-sickness-primaryText"> {`${appointemntDetails.patient.name} ${appointemntDetails.patient.lastname}`} </h3>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <CircleEllipsisIcon className="w-7 h-7 text-sickness-gray cursor-pointer transition delay-100 ease-in hover:rotate-90 self-end" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer text-sickness-primaryText font-[510]">
                                    Finish Appointment
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer text-sickness-primaryText font-[510]">
                                    Postpone appointment
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <p className="font-semibold text-sickness-primaryText"> {`${appointemntDetails.patient.gender}, ${appointemntDetails.patient.age} years old`} </p>
                    <p className="font-semibold text-sickness-primaryText"> Phone Number: <span className="font-normal text-sickness-gray"> +{appointemntDetails.patient.phone} </span> </p>
                </div>
            </div>
            <div className="w-full h-[1px] bg-sickness-border" />
            <p className="font-semibold text-sickness-primaryText text-center self-center flex"> Last Checked: <span className="font-normal text-sickness-gray"> First visit </span> </p>
        </div>
    )
}