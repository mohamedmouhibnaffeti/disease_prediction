"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { X } from "lucide-react";
import { RootState, AppDispatch } from "@/Store/store"
import { useDispatch, useSelector } from "react-redux"
import { setPatientHistoryItem, setPatientHistoryItemOpen } from "@/Store/patient/PatientSlice";
export default function PatientHistoryItemDetails(){
    const { PatientHistoryItem, PatientHistoryItemOpen } = useSelector((state: RootState) => state.Patient)
    const dispatch = useDispatch<AppDispatch>()
    const date = new Date(PatientHistoryItem?.finishedAt)
    const dateString = `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
    return( 
        <Dialog open={PatientHistoryItemOpen} >
            <DialogContent className='w-full flex justify-center flex-col'>
                <DialogHeader className='w-full flex justify-center'>
                    <div className="self-end"  >
                        <X className="cursor-pointer hover:rotate-90 transition delay-100 ease-linear" onClick={()=>{dispatch(setPatientHistoryItem(null)); dispatch(setPatientHistoryItemOpen(false))}} />
                    </div>
                    <DialogTitle className='w-full flex justify-center -translate-y-4'>
                        Appointment Details
                    </DialogTitle>
                    <DialogDescription className='flex gap-3 items-center'>
                        <div className="border border-sickness-border rounded-full p-2 text-lg bg-teal-500 text-white w-fit h-fit">
                            <p className="uppercase"> MN </p>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex w-full justify-between gap-2">
                                <p className="text-sickness-primaryText font-semibold text-base"> {PatientHistoryItem?.doctor?.name} {PatientHistoryItem?.doctor?.lastname}  </p>
                                <p className="text-sickness-primaryText font-semibold text-sm"> {dateString} </p>
                            </div>
                            <p className="text-sickness-gray font-semibold text-sm"> {PatientHistoryItem?.doctor?.speciality} </p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <p className="text-sm text-sickness-gray font-semibold mx-2 "> Observations </p>
                <div className="mx-2 border border-slate-700/50 rounded-sm shadow-sm py-2 bg-gray-200/70 font-medium -mt-2">
                    <p className="px-2 text-sm">
                        {PatientHistoryItem?.observation} 
                    </p>
                </div>
                <p className="text-sm text-sickness-gray font-semibold mx-2 -mt-1"> Prescription </p>
                <div className="mx-2 my-2 border border-slate-700/50 rounded-sm shadow-sm py-2 bg-gray-200/70 font-medium -mt-3">
                    <p className="px-2 text-sm">
                        {PatientHistoryItem?.prescription} 
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}