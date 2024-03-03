"use client"
import Human from "@/components/HumanModel/Human"
import { data } from "./data"
import { CheckIcon } from "lucide-react"
export default () => {
    return (
        <div className="mt-[1rem] flex flex-col justify-center">
            <h1 className="text-center text-lg text-sickness-primaryText font-semibold"> Select your symptoms from the human model below </h1>
            <p className="text-center text-sm text-sickness-ashGray font-semibold mt-2"> This model will help you select your symptoms accurately </p>
            <p className="text-center text-sm text-sickness-ashGray font-semibold"> Please provide accurate symptoms so we can predict your sickness perfectly </p>
            <div className="flex justify-center gap-4 px-20 mt-[2rem]">
                <div className="bg-white shadow-md rounded-lg border-sickness-border border-[1px] flex-[0.5] flex justify-center items-center px-8  py-6 flex-col">
                    <h1 className="text-3xl font-semibold uppercase"> Your <span className="text-sickness-primary">Symptoms</span> </h1>
                    <div className="mt-8 flex  gap-4 basis-[50%] flex-wrap justify-center">
                    {Object.entries(data).map(([bodyPart, symptomsArray]) => (
                            <div key={bodyPart} className="basis-[40%] flex gap-2 flex-col">
                            <h2 className="text-xl font-semibold text-sickness-orange">Symptoms for {bodyPart}:</h2>
                            <ul className="flex flex-col gap-2">
                                {symptomsArray.map((symptom, index) => (
                                <div className="flex gap-2 bg-sickness-lavenderBlue py-2 rounded-md" key={index}> 
                                    <CheckIcon className="text-sickness-mayaBlue" />
                                    <p> {symptom} </p>
                                </div>
                                ))}
                            </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-[0.5]">
                    <Human />
                </div>
            </div>
        </div>
    )
}