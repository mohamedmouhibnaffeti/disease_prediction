import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { BadgeCheckIcon, BanIcon, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import SmallWhiteLoader from "./Loaders/WhiteButtonLoader";
import { useState } from "react";
import { setFinishAppointmentOpen, FinishAppointment } from "@/Store/doctor/doctorSlice";
import { useToast } from "./ui/use-toast";

export default function FinishAppointmentDialog ({appointment}: {appointment: any}) {
    const { finishAppointmentState } = useSelector((state: RootState) => state.Doctor)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { toast } = useToast()
    const [prescription, setPrescription] = useState("")
    const [observation, setObservation] = useState("")

    const handleFinishAppointment = async() => {
        setLoading(true)
        const response = await dispatch(FinishAppointment({AppointmentID: appointment._id,prescription: prescription, observation: observation}))
        setLoading(false)
        if(response.payload.status === 204){
            toast({
                title: "Congratulations !",
                description: <p> You've finished the appointment with <span className="font-semibold"> {appointment.patient.name} {appointment.patient.lastname} </span> </p>,
            })
            dispatch(setFinishAppointmentOpen(false))
        }
        else if(response.payload.status === 400){
            toast({
                variant: "destructive",
                title: "Sorry.",
                description: <p> { response.payload.message } </p>,
              })
        }
        else if(response.payload.status === 500){
            toast({
                variant: "destructive",
                title: "Sorry.",
                description: <p> Couldn't finish an appointment with patient <span className="font-semibold"> {appointment.patient.name} {appointment.patient.lastname} </span>.Please try again later. </p>,
              })
        }
    }

    const date = new Date(appointment.requestedAt)
    return(
        <Dialog open={finishAppointmentState} >
        <DialogContent className='w-full flex justify-center flex-col'>
            <DialogHeader className='w-full flex justify-center'>
                <div className="self-end"  >
                    <X onClick={()=>dispatch(setFinishAppointmentOpen(false))} className="cursor-pointer hover:rotate-90 transition delay-100 ease-linear"/>
                </div>
                <DialogTitle className='w-full flex justify-center'>
                    Accept or Refuse Appointment
                </DialogTitle>
                <DialogDescription className='text-center'>
                    <p className="text-sickness-primaryText font-semibold text-base"> Patient Name: <span className="text-sickness-primary"> {appointment.patient.name} {appointment.patient.lastname} </span> </p>
                </DialogDescription>
            </DialogHeader>
            <div className='w-full flex justify-start items-center flex-col'>
                <div className="flex w-full justify-between items-center flex-wrap">
                    <p className="font-semibold text-sickness-primaryText text-sm"> Phone Number: <span className="text-sickness-gray"> { appointment.patient.phone } </span> </p>
                    <p className="font-semibold text-sickness-primaryText text-sm"> Request Date: <span className="text-sickness-gray"> {date.toDateString()} </span> </p>
                </div>
                <div className="h-[1px] bg-sickness-border w-full mt-3" />
                <p className="font-semibold mt-2 self-start">Observations <span className="text-red-500"> * </span> </p>
                <textarea onChange={(e)=>setObservation(e.target.value)} className="w-full rounded-md text-sm py-1 px-2 font-medium outline-none active:border-sickness-primary border-sickness-border border" />
                <p className="font-semibold mt-2 self-start"> Prescription <span className="text-red-500"> * </span> </p>
                <textarea onChange={(e)=>setPrescription(e.target.value)} className="w-full rounded-md text-sm font-medium py-1 px-2 outline-none active:border-sickness-primary border-sickness-border border" />
                <div className="h-[1px] bg-sickness-border w-full mt-3" />
                <button className={`w-full h-fit mt-3 py-2 px-4 ${loading ? "bg-green-500/70" : "bg-green-500 hover:bg-green-600" } text-white  transition delay-100 ease-in rounded-md`} disabled={loading} onClick={handleFinishAppointment}> Finish  { loading && <SmallWhiteLoader /> } </button>
            </div>
        </DialogContent>
    </Dialog>
    )
}