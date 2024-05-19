import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { BadgeCheckIcon, BanIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ReactCodeInput from "react-verification-code-input";
import { RootState, AppDispatch } from "@/Store/store"
import { DoctorSignup, RegisterOTP, setSignupFormDataDoctor } from "@/Store/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation";
import { DateTimePicker } from "./DateTimePicker/DateTimePicker";
import { acceptAppointment } from "@/Store/doctor/doctorSlice";
import { useToast } from "./ui/use-toast";

export default function AcceptAppointment({open, setOpen}: {open: boolean, setOpen :any}) {
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

    const dispatch = useDispatch<AppDispatch>()
    const [loading, setLoading] = useState(false)

    const { toast } = useToast()

    const handleAcceptAppointment = async() => {
        setLoading(true)
        const response = await dispatch(acceptAppointment({from: selectedStartDate, to: selectedEndDate, AppointmentID: "66380c35f709c277ef1545bf"}))
        setLoading(false)
        if(response.payload.status === 201){
            toast({
                title: "Congratulations !",
                description: <p> You've accepted the appointment with <span className="font-semibold"> Mouhib Naffeti </span> </p>,
              })
        }else if(response.payload.status === 500){
            toast({
                variant: "destructive",
                title: "Sorry.",
                description: <p> Couldn't accept an appointment with patient <span className="font-semibold"> Mouhib Naffeti </span>.Please try again later. </p>,
              })
        }
    }
    return(
        <AlertDialog open={open}>
            <AlertDialogContent className='w-full flex justify-center flex-col'>
                <AlertDialogHeader className='w-full flex justify-center'>
                    <AlertDialogTitle className='w-full flex justify-center'>
                        Accept or Refuse Appointment
                    </AlertDialogTitle>
                    <AlertDialogDescription className='text-center'>
                        <p className="text-sickness-primaryText font-semibold text-base"> Patient Name: <span className="text-sickness-primary"> Mouhib Naffeti </span> </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className='w-full flex justify-center items-center flex-col'>
                    <p className="font-semibold text-sickness-primaryText text-sm"> Symptoms: <span className="text-sickness-gray"> Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom</span> </p>
                    <div className="h-[1px] bg-sickness-border w-full mt-3" />
                    <p className="font-semibold mt-2 self-start"> Start Time: </p>
                    <DateTimePicker granularity={"minute"} onChange={(e)=>selectStartDate(e)} hourCycle={24}  />
                    <p className="font-semibold mt-2 self-start"> End Time: </p>
                    <DateTimePicker granularity={"minute"} onChange={(e)=>selectEndDate(e)} hourCycle={24} />
                    <div className="h-[1px] bg-sickness-border w-full mt-3" />
                    <div className="w-full justify-between flex gap-2 mt-3 font-semibold">
                        <button className="w-fit h-fit py-2 px-4 bg-red-500 text-white hover:bg-red-600 transition delay-100 ease-in rounded-md"> Refuse </button>
                        <button className={`w-fit h-fit py-2 px-4 ${loading ? "bg-sickness-primary/70" : "bg-sickness-primary hover:bg-sickness-primary/80"} text-white text-whitetransition delay-100 ease-in rounded-md flex gap-2`} disabled={loading} onClick={handleAcceptAppointment} > Accept { loading && <div className="small-white-loader" /> } </button>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}