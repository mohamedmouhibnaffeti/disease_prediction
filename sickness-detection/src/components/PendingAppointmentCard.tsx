"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { X } from "lucide-react";
import { useState } from "react";
import { RootState, AppDispatch } from "@/Store/store"
import { useDispatch, useSelector } from "react-redux"
import { DateTimePicker } from "./DateTimePicker/DateTimePicker";
import { RefuseAppointment, acceptAppointment, setAcceptAppointmentOpen } from "@/Store/doctor/doctorSlice";
import { useToast } from "./ui/use-toast";
import SmallWhiteLoader from "./Loaders/WhiteButtonLoader";

export default function PendingAppointmentCard({appointment}: {appointment: any}) {
    const dispatch = useDispatch<AppDispatch>() 
    const { AcceptAppointmentState } = useSelector((state: RootState) => state.Doctor)
    const [selectedStartDate, setSelectedStartDate] = useState<Date>()
    const [selectedEndDate, setSelectedEndDate] = useState<Date>()

    const selectStartDate = (e: any) => {
        const newDate = new Date(e.year, e.month - 1, e.day, e.hour + 1, e.minute);
        setSelectedStartDate(newDate)
    }
    const selectEndDate = (e: any) => {
        const newDate = new Date(e.year, e.month - 1, e.day, e.hour + 1 , e.minute);
        setSelectedEndDate(newDate)
    }

    const [Acceptloading, AcceptsetLoading] = useState(false)
    const [Refuseloading, RefusesetLoading] = useState(false)

    const { toast } = useToast()

    const handleAcceptAppointment = async() => {
        AcceptsetLoading(true)
        const response = await dispatch(acceptAppointment({from: selectedStartDate, to: selectedEndDate, AppointmentID: appointment._id}))
        AcceptsetLoading(false)
        if(response.payload.status === 201){
            toast({
                title: "Congratulations !",
                description: <p> You've accepted the appointment with <span className="font-semibold"> {appointment.patient.name} {appointment.patient.lastname} </span> </p>,
              })
              
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
                description: <p> Couldn't accept an appointment with patient <span className="font-semibold"> {appointment.patient.name} {appointment.patient.lastname} </span>.Please try again later. </p>,
              })
        }
    }
    const handleRefuseAppointment = async() => {
        RefusesetLoading(true)
        const response = await dispatch(RefuseAppointment({AppointmentID: appointment._id}))
        RefusesetLoading(false)
        if(response.payload.status === 201){
            toast({
                title: "Congratulations !",
                description: <p> You've accepted the appointment with <span className="font-semibold"> {appointment.patient.name} {appointment.patient.lastname} </span> </p>,
              })
              
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
                description: <p> Couldn't accept an appointment with patient <span className="font-semibold"> {appointment.patient.name} {appointment.patient.lastname} </span>.Please try again later. </p>,
              })
        }
    }

    const date = new Date(appointment.requestedAt)

    return(
        
        <Dialog open={AcceptAppointmentState} >
            <DialogTrigger asChild className="w-full">
            <div className="flex gap-2 border border-sickness-border shadow-md rounded-md p-2 cursor-pointer hover:bg-sickness-primary/10 transition ease-in delay-100 w-full" onClick={()=>dispatch(setAcceptAppointmentOpen(true))}>
                <div className="border border-sickness-border rounded-full p-2 text-xl bg-sickness-orange text-white w-fit h-fit">
                    <p className="uppercase"> {`${appointment.patient.name[0]}${appointment.patient.lastname[0]}`} </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-sickness-primaryText"> {`${appointment.patient.name} ${appointment.patient.lastname}`} </h3>
                    <p className="font-semibold text-sickness-primaryText"> Phone number: <span className="font-normal text-sickness-gray"> +{ appointment.patient.phone } </span> </p>
                </div>
            </div>
            </DialogTrigger>
        <DialogContent className='w-full flex justify-center flex-col'>
            <DialogHeader className='w-full flex justify-center'>
                <div className="self-end"  >
                    <X onClick={()=>dispatch(setAcceptAppointmentOpen(false))} className="cursor-pointer hover:rotate-90 transition delay-100 ease-linear"/>
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
                    <p className="font-semibold text-sickness-primaryText text-sm"> Phone Number: <span className="text-sickness-gray"> +{ appointment.patient.phone } </span> </p>
                    <p className="font-semibold text-sickness-primaryText text-sm"> Request Date: <span className="text-sickness-gray"> {date.toDateString()} </span> </p>
                </div>
                <p className="font-semibold text-sickness-primaryText text-sm self-center mt-2"> Email: <span className="text-sickness-gray"> { appointment.patient.email } </span> </p>
                <div className="h-[1px] bg-sickness-border w-full mt-3" />
                <p className="font-semibold mt-2 self-start"> Start Time: </p>
                <DateTimePicker granularity={"minute"} onChange={(e)=>selectStartDate(e)} hourCycle={24}  />
                <p className="font-semibold mt-2 self-start"> End Time: </p>
                <DateTimePicker granularity={"minute"} onChange={(e)=>selectEndDate(e)} hourCycle={24} />
                <div className="h-[1px] bg-sickness-border w-full mt-3" />
                <div className="w-full justify-between flex gap-2 mt-3 font-semibold">
                    <button className={`w-fit h-fit py-2 px-4 ${Refuseloading ? "bg-red-500/70" : "bg-red-500 hover:bg-red-600" } text-white  transition delay-100 ease-in rounded-md`} disabled={Refuseloading} onClick={handleRefuseAppointment}> Refuse  { Refuseloading && <SmallWhiteLoader /> } </button>
                    <button className={`w-fit h-fit py-2 px-4 ${Acceptloading ? "bg-sickness-primary/70" : "bg-sickness-primary hover:bg-sickness-primary/80"} text-white text-whitetransition delay-100 ease-in rounded-md flex gap-2`} disabled={Acceptloading} onClick={handleAcceptAppointment} > Accept { Acceptloading && <SmallWhiteLoader /> } </button>
                </div>
            </div>
        </DialogContent>
    </Dialog>
    )
}