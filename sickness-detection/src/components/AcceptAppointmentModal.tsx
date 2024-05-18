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

export default function AcceptAppointment({open, setOpen}: {open: boolean, setOpen :any}) {
    const [selectedDate, setSelectedDate] = useState<Date>()
    console.log(selectedDate)
    const selectDate = (e: any) => {
        console.log(e)
        const newDate = new Date(e.year, e.month - 1, e.day, e.hour, e.minute);
        console.log(newDate);  // Should output: Thu Dec 14 2023 02:03:00 GMT+0100 (Central European Standard Time)
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
                    <DateTimePicker granularity={"minute"} onChange={(e)=>selectDate(e)} hourCycle={24}  />
                    <p className="font-semibold mt-2 self-start"> End Time: </p>
                    <DateTimePicker granularity={"minute"}  />
                    <div className="h-[1px] bg-sickness-border w-full mt-3" />
                    <div className="w-full justify-between flex gap-2 mt-3 font-semibold">
                        <button className="w-fit h-fit py-2 px-4 bg-red-500 text-white hover:bg-red-600 transition delay-100 ease-in rounded-md"> Refuse </button>
                        <button className="w-fit h-fit py-2 px-4 bg-sickness-primary text-white hover:bg-sickness-primary/80 transition delay-100 ease-in rounded-md"> Accept </button>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}