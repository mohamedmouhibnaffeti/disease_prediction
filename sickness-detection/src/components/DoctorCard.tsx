import { useRouter } from "next/navigation"
import { CircleEllipsis } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
export default (props: {doctor: any, color: any}) => {
    const Router = useRouter()
    const {doctor, color} = props
    console.log(doctor)
    return(
        <div className="w-[20rem] min-h-[18rem] rounded-xl shadow-md border border-sickness-border flex flex-col pb-4 hover:shadow-xl shad hover:shadow-sickness-primary/70 transition delay-100 ease-in">
            <div className={`rounded-t-xl flex justify-end h-28`} style={{backgroundColor: `${color.bg}`}}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <CircleEllipsis className="mt-2 mr-2 w-7 h-7 text-white cursor-pointer transition delay-100 ease-in hover:rotate-90" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Dr.{` ${doctor.name[0]}.${doctor.lastname[0]}`.toUpperCase()}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-sickness-primaryText font-[510]" onClick={()=>Router.push(`/doctor?name=${doctor.name}&lastname=${doctor.lastname}&distance=${doctor.distance}&location=${JSON.stringify(doctor?.location[0]?.cordonnees || [0, 0])}&phone=${doctor.phone}&email=${doctor.email}`)}>
                        View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-sickness-primaryText font-[510]">
                        Request appointment
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
            <div className="self-center border-2 border-sickness-border rounded-full w-16 h-16 flex justify-center items-center shadow-xl z-30 -translate-y-8" style={{backgroundColor: `${color.bg}`}}> 
                <p className="font-semibold" style={{color: `${color.text}`}}>
                    {`${doctor.name[0]}${doctor.lastname[0]}`.toUpperCase()}
                </p> 
            </div>
            <p className="font-semibold self-center -translate-y-5 text-center"> {`${doctor.name} ${doctor.lastname}`} </p>
            <p className="font-medium text-sickness-gray self-center -translate-y-5 text-center"> {doctor.speciality} </p>
            <div className="w-full flex justify-center items-center px-1">
                <div className="flex items-center">
                    { !Number.isNaN(doctor.distance) && <p className="font-semibold text-sm text-sickness-gray "> distance <span className="text-sickness-primaryText">{doctor?.distance?.toFixed(2)} Km</span> </p>}
                </div>
            </div>
        </div>
    )
}