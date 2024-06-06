import { useRouter } from "next/navigation"
import { CircleEllipsis } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { requestAppointment, setRequestLoading } from "@/Store/doctor/doctorSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/Store/store"
import { useLayoutEffect, useState } from "react"
import { useToast } from "./ui/use-toast"
  
export default function DoctorCard(props: {doctor: any, color: any}) {
    const Router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const [user, setUser] = useState<any>({})
    const {doctor, color} = props
    const { toast } = useToast()
    useLayoutEffect(()=>{
        const userString = localStorage.getItem("user") || ""
        setUser((prev: any) => JSON.parse(userString))
    }, [])
    console.log(user)
    const RequestAppointment = async() => {
        dispatch(setRequestLoading(true))
        const response = await dispatch(requestAppointment({doctorID: doctor?._id, patientID: user?._id}))
        dispatch(setRequestLoading(false))
        if(response.payload.status === 201){
            toast({
                title: "Congratulations !",
                description: <p> You&apos;ve requested an appointment with doctor <span className="font-semibold">{doctor?.name} {doctor?.lastname}</span> </p>,
              })
        }else if(response.payload.status === 500){
            toast({
                variant: "destructive",
                title: "Sorry.",
                description: <p> Couldn&apos;t request an appointment with doctor <span className="font-semibold"> {doctor?.name} {doctor?.lastname} </span>.Please try again later. </p>,
              })
        }
    }

    return(
            <div className="sm:w-[20rem] w-full min-h-[18rem] rounded-xl shadow-md border border-sickness-border flex flex-col pb-4 hover:shadow-xl shad hover:shadow-sickness-primary/70 transition delay-100 ease-in">
                <div className={`rounded-t-xl flex justify-end h-28`} style={{backgroundColor: `${color.bg}`}}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <CircleEllipsis className="mt-2 mr-2 w-7 h-7 text-white cursor-pointer transition delay-100 ease-in hover:rotate-90" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Dr.{` ${doctor.name[0]}.${doctor.lastname[0]}`.toUpperCase()}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-sickness-primaryText font-[510]" onClick={()=>Router.push(`/doctor?name=${doctor.name}&lastname=${doctor.lastname}&distance=${doctor.distance}&location=${JSON.stringify(doctor?.location[0]?.cordonnees || [0, 0])}&phone=${doctor.phone}&email=${doctor.email}&speciality=${doctor.speciality}&id=${doctor._id}`)}>
                            View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-sickness-primaryText font-[510]" onClick={RequestAppointment}>
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