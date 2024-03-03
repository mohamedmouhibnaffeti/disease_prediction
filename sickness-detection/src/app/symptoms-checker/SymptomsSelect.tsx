"use client"
import Human from "@/components/HumanModel/Human"
import { data } from "./data"
import { CheckIcon } from "lucide-react"
export default () => {
    return (
        <div className="mt-[4rem] flex justify-center gap-4 px-20">
            <div className="bg-white shadow-md rounded-lg border-sickness-border border-[1px] flex-[0.5] flex justify-center items-center px-8  py-6 flex-col">
                <h1 className="text-3xl font-semibold"> Your Symptoms </h1>
                <div className="mt-8 flex  gap-4 basis-[50%] flex-wrap justify-center">
                {Object.entries(data).map(([bodyPart, symptomsArray]) => (
                        <div key={bodyPart} className="basis-[40%] flex gap-2 flex-col">
                        <h2 className="text-xl font-medium text-sickness-rosyBrown">Symptoms for {bodyPart}:</h2>
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
    )
}