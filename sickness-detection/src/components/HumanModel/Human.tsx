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
import { Symptom } from "@/app/interfaces/interfaces"
import { useDispatch, useSelector } from "react-redux"
import { fetchSymptomsByFilter, resetSymptomsArray, selectSymptoms } from "@/Store/Predict/PredictSlice"
import { AppDispatch, RootState } from "@/Store/store"
import { returnSpecificBodyParts } from "@/lib/functions/strings"
import MainLoader from "../Loaders/MainLoader"

const DialogItem = (props: {etat: boolean, setDialogOpen: any, BodyPart: string, Symptoms: Array<Symptom>, selectedSymptoms: Array<string>, sex: string}) => {
    const {etat, setDialogOpen, BodyPart, Symptoms, selectedSymptoms, sex} = props
    const [selectedSpecificPart, selectSpecificPart] = useState("")
    const dispatch = useDispatch<AppDispatch>()
    const fetchSymptoms = async(filter: string, gender: string) => {
        setSymptomsLoading(prevState => true)
        const response = await dispatch(fetchSymptomsByFilter({filter, gender}))
        setSymptomsLoading(prevState => false)
    }
    const [symptomsLoading, setSymptomsLoading] = useState(false)
    const handleSpecificBodyPartClick = async(part: string) => {
        selectSpecificPart(prevState => part)
        fetchSymptoms(part, sex)
    }
    const handleFinish = () => {
        resetSymptomsArray()
        selectSpecificPart(prevState => "")
        setDialogOpen(false)
    }
    return(
        <Dialog open={etat}>
            <DialogContent className="sm:max-w-[425px]">
                {
                    !selectedSpecificPart ?
                        <>
                            <DialogHeader>
                            <DialogTitle> Specific Part </DialogTitle>
                            <DialogDescription>
                                Select on a specific body part from the list below.
                            </DialogDescription>
                            </DialogHeader>
                            <div className="w-full h-[14rem] overflow-y-auto grid grid-cols-2 gap-2 self-center">
                            {
                                returnSpecificBodyParts(BodyPart, sex).map((specific_body_part, index) => (
                                    <button className="text-white bg-sickness-primaryText h- py-2 px-2 rounded-md hover:bg-sickness-primaryText/80" key={index} onClick={()=>handleSpecificBodyPartClick(specific_body_part)} > {specific_body_part} </button>
                                ))
                            }
                            </div>
                            <DialogFooter>
                                <button className="px-4 py-2 bg-sickness-primary border-[1px] border-white text-white font-semibold rounded-md focus:outline-none active:bg-sickness-primary/70" onClick={()=>{setDialogOpen(false)}}>Cancel</button>
                            </DialogFooter>
                        </>
                        :
                        <>
                            <DialogHeader>
                            <DialogTitle>{BodyPart} Symptoms</DialogTitle>
                            <DialogDescription>
                                Check your <span className="font-semibold"> {BodyPart} </span> symptoms here, then click on <span className="font-semibold"> Validate symptoms </span> to add them to the list of symptoms.
                            </DialogDescription>
                            </DialogHeader>
                            <div className="w-full h-[14rem] overflow-y-auto">
                            {
                                symptomsLoading ?
                                <div className="flex justify-center items-center w-full h-full" >
                                    <MainLoader />
                                </div>
                                :
                                (
                                    Symptoms?.length > 0
                                    ?
                                    Symptoms?.map((symptom: Symptom, index: number)=>{
                                        return(
                                            <div className="flex items-center space-x-2 mt-2 gap-2 text-sickness-primaryText ml-6" key={index}>
                                                    <Checkbox id={symptom._id.toString()} 
                                                        onCheckedChange={(state)=>dispatch(selectSymptoms({etat: state, symptom: symptom.title}))} 
                                                        checked={selectedSymptoms.includes(symptom.title)}
                                                        />
                                                    <label
                                                        htmlFor={symptom._id.toString()}
                                                        className="text-sm font-medium leading-none"
                                                    >
                                                        {symptom.title}
                                                    </label>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className="flex justify-center items-center w-full h-full" >
                                        <p className="text-sickness-primary font-semibold text-lg self-center text-center"> No symptoms found for <span>{selectedSpecificPart}</span> </p>
                                    </div>
                                )
                                /*
                                data.map(([bodyPart, symptomsArray]) => (
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
                            ))
                                */
                            }
                            </div>
                            <DialogFooter>
                                <button className="px-4 py-2 bg-sickness-primary border-[1px] border-white text-white font-semibold rounded-md focus:outline-none active:bg-sickness-primary/70" onClick={handleFinish}>Validate symptoms</button>
                            </DialogFooter>
                        </>
                }
            </DialogContent>
        </Dialog>
    )
}

const Human = () => {
    const [DialogOpen, setDialogOpen] = useState<boolean>(false)
    const [BodyPart, setBodyPart] = useState<string>('')
    const [Side, setSide] = useState(false)
    const {Symptoms, sex} = useSelector((state: RootState)=>state.Predict)
    const SelectedSymptoms = useSelector((state: RootState)=>state.Predict.SelectedSymptoms)
    const dispatch = useDispatch<AppDispatch>()
    /*
    useEffect(()=>{
        dispatch(fetchSymptoms())
    }, [])
    */
    return (
        <div className="md:w-[34rem] w-[28rem] flex sm:flex-row flex-col">
            <DialogItem sex={sex} etat={DialogOpen} BodyPart={BodyPart} setDialogOpen={setDialogOpen} Symptoms={Symptoms} selectedSymptoms={SelectedSymptoms} />
            {
                sex === "Male"?
                    (
                        Side ? <MaleBack setDialogOpen={setDialogOpen} setBodyPart={setBodyPart} /> : <MaleFront setDialogOpen={setDialogOpen} setBodyPart={setBodyPart} />
                    )
                :
                sex === "Female"?
                (
                    Side ? <FemaleBack setDialogOpen={setDialogOpen} setBodyPart={setBodyPart} /> : <FemaleFront setDialogOpen={setDialogOpen} setBodyPart={setBodyPart} />
                )
                :
                ""
            }
            <div className="flex flex-col gap-3 mt-12">
                <button className="px-4 py-1 h-fit bg-sickness-primary hover:bg-sickness-primary/90 rounded-sm text-white" onClick={()=>setSide(prevside => !prevside)}> Rotate </button>
                <button className="px-4 py-1 h-fit bg-sickness-primaryText hover:bg-sickness-primaryText/80 rounded-sm text-white" onClick={()=>{ setDialogOpen(true); setBodyPart("skin") }} > Skin </button>
                <button className="px-4 py-1 h-fit bg-sickness-primaryText hover:bg-sickness-primaryText/80 rounded-sm text-white" onClick={()=>{ setDialogOpen(true); setBodyPart("systems") }} > Systems </button>
            </div>
        </div>
    )
}

export default Human