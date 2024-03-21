"use client"
import Human from "@/components/HumanModel/Human"
import { data } from "./data"
import { CheckIcon } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { changeEtatByNom, fetchSymptoms } from "@/Store/InsertSymptoms/InsertSymptomsSlice"
import { AppDispatch, RootState } from "@/Store/store"
import { useEffect } from "react"

export default () => {
    const Symptoms = useSelector((state: RootState)=>state.insertSymptoms.Symptoms)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
        dispatch(fetchSymptoms())
    }, [])
    
    console.log(Symptoms)
    return (
        <div className="mt-[1rem] flex flex-col justify-center md:ml-0 ml-[12rem]">
            <h1 className="text-center md:text-lg text-md text-sickness-primaryText font-semibold"> Select your symptoms from the human model below </h1>
            <p className="text-center text-sm text-sickness-ashGray font-semibold mt-2"> This model will help you select your symptoms accurately </p>
            <p className="text-center text-sm text-sickness-ashGray font-semibold"> Please provide accurate symptoms so we can predict your sickness perfectly </p>
            <div className="flex justify-center gap-4 md:px-20 px-4 mt-[2rem] flex-wrap-reverse">
                <div className="bg-white shadow-md rounded-lg border-sickness-border border-[1px] md:flex-[0.5] flex-1 flex justify-center items-center md:px-8 px-2 py-6 flex-col">
                    <h1 className="text-3xl font-semibold uppercase"> Your <span className="text-sickness-primary">Symptoms</span> </h1>
                    <div className="mt-8 flex  gap-4 basis-[50%] flex-wrap justify-center">
                    {Object.entries(data).map(([bodyPart, symptomsArray]) => (
                        <div key={bodyPart} className="basis-[40%] flex gap-2 flex-col">
                            <h2 className="text-xl font-semibold text-sickness-orange">Symptoms for {bodyPart}:</h2>
                            <ul className="flex flex-col gap-2">
                                {symptomsArray.map((symptom, index) => (
                                <div className="flex gap-2 bg-sickness-lavenderBlue py-2 rounded-md" key={index}> 
                                    <CheckIcon className="text-sickness-orange w-5 h-5" />
                                    <p className="font-[550] text-sm"> {symptom} </p>
                                </div>
                                ))}
                            </ul>
                        </div>
                    ))}
                    </div>
                    <div className="flex justify-between w-full">
                        <button className="bg-none py-2 px-14 text-sickness-primary border-2 border-sickness-primary rounded-md font-semibold mt-6" onClick={()=>dispatch(changeEtatByNom('informations'))}> Back </button>
                        <button className="bg-sickness-primary border-2 border-sickness-primary py-2 px-14 text-white rounded-md font-semibold mt-6" onClick={()=>dispatch(changeEtatByNom('Conditions'))}> Continue </button>
                    </div>
                </div>
                <div className="flex-[0.5]">
                    <Human />
                </div>
            </div>
        </div>
    )
}