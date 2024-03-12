"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Checkbox } from "../ui/checkbox"
import { useState } from "react"
import MaleBack from "./MaleBack"
import MaleFront from "./MaleFront"
import FemaleBack from "./FemaleBack"
import FemaleFront from "./FemaleFront"
import { data } from "@/app/symptoms-checker/data"

const DialogItem = (props: {etat: boolean, setDialogOpen: any, BodyPart: string}) => {
    const {etat, setDialogOpen, BodyPart} = props
    return(
        <Dialog open={etat}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>{BodyPart} Symptoms</DialogTitle>
                <DialogDescription>
                    Check your <span className="font-semibold"> {BodyPart} </span> symptoms here, then click on <span className="font-semibold"> Validate symptoms </span> to add them to the list of symptoms.
                </DialogDescription>
                </DialogHeader>
                <div className="w-full h-[10rem] overflow-y-auto">
                {Object.entries(data).map(([bodyPart, symptomsArray]) => (
                            <ul className="flex flex-col gap-2" key={bodyPart}>
                                { bodyPart === BodyPart && symptomsArray.map((symptom, index) => (
                                <div className="flex items-center space-x-2 mt-2 gap-2 text-[#9D9D9D] ml-6" key={index}>
                                    <Checkbox id={symptom}/>
                                    <label
                                        htmlFor={symptom}
                                        className="text-sm font-medium leading-none"
                                    >
                                        {symptom}
                                    </label>
                                </div>
                                ))}
                            </ul>
                ))}
                </div>
                <DialogFooter>
                    <button className="px-4 py-2 bg-sickness-primary border-[1px] border-white text-white font-semibold rounded-md focus:outline-none active:bg-sickness-primary/70" onClick={()=>{setDialogOpen(false)}}>Validate symptoms</button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const Human = () => {
    const [DialogOpen, setDialogOpen] = useState<boolean>(false)
    const [BodyPart, setBodyPart] = useState<string>('')
    const [Side, setSide] = useState(false)
    return (
        <div className="w-[34rem] flex">
            <DialogItem etat={DialogOpen} BodyPart={BodyPart} setDialogOpen={setDialogOpen} />
            {Side ? <MaleBack /> : <MaleFront setDialogOpen={setDialogOpen} setBodyPart={setBodyPart} />}
            <div className="flex  flex-col gap-3 mt-12">
                <button className="px-4 py-1 h-fit bg-sickness-primary rounded-sm text-white" onClick={()=>setSide(prevside => !prevside)}> Rotate </button>
                <button className="px-4 py-1 h-fit bg-sickness-primary rounded-sm text-white"> Skin </button>
            </div>
        </div>
    )
}

export default Human