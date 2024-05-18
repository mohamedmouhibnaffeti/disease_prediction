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

export default function AcceptAppointment({open, setOpen}: {open: boolean, setOpen :any}) {
    return(
        <AlertDialog open={open}>
            <AlertDialogContent className='w-full flex justify-center flex-col'>
                <AlertDialogHeader className='w-full flex justify-center'>
                    <AlertDialogTitle className='w-full flex justify-center'>
                        Accept or Refuse Appoitnment
                    </AlertDialogTitle>
                    <AlertDialogDescription className='text-center'>
                        <p className="text-sickness-primaryText font-semibold text-base"> Patient Name: <span className="text-sickness-primary"> Mouhib Naffeti </span> </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className='w-full flex justify-center items-center flex-col'>
                    <p className="font-semibold text-sickness-primaryText text-sm"> Symptoms: <span className="text-sickness-gray"> Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom, Symptom</span> </p>
                    
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}