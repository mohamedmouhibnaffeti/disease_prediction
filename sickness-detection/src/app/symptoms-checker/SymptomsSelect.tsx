"use client"
import Human from "@/components/HumanModel/Human"
import { CheckIcon, FrownIcon } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { changeEtatByNom } from "@/Store/Predict/PredictSlice"
import { AppDispatch, RootState } from "@/Store/store"
import { useEffect } from "react"
import Predict from "@/vendors/MachineLearning/Predict"

export default () => {
    const dispatch = useDispatch<AppDispatch>()
    const SelectedSymptoms = useSelector((state: RootState)=>state.Predict.SelectedSymptoms)
    const ClickContinue = async() => {
        dispatch(changeEtatByNom('Conditions'))
    }
    return (
        <div className="mt-[1rem] flex flex-col justify-center w-full px-8 py-4">
            <h1 className="text-center md:text-lg text-md text-sickness-primaryText font-semibold"> Select your symptoms from the human model below </h1>
            <p className="text-center text-sm text-sickness-ashGray font-semibold mt-2"> This model will help you select your symptoms accurately </p>
            <p className="text-center text-sm text-sickness-ashGray font-semibold sm:flex justify-center items-center hidden"> Please provide accurate symptoms so we can predict your sickness perfectly </p>
            <div className="flex justify-center gap-4 px-8 py-4 mt-[2rem] flex-wrap-reverse">
                <div className="bg-white shadow-md rounded-lg border-sickness-border border-[1px] md:flex-[0.5] w-fit flex-1 flex justify-around items-center px-8 py-6 flex-col">
                    <h1 className="text-3xl font-semibold uppercase"> Your <span className="text-sickness-primary">Symptoms</span> </h1>
                    <div className="mt-8 flex gap-2 flex-wrap justify-center">
                    {
                        SelectedSymptoms.length === 0 ?
                        <div className="flex flex-col w-full text-red-400 items-center gap-2">
                            <FrownIcon className="h-12 w-12" />
                            <p className="font-[550] text-center"> Please select symptoms from the human model to procceed with the prediction </p>
                        </div>
                        :
                        SelectedSymptoms.map((symptom, index)=>{
                            return(
                                <div className="flex gap-2 bg-sickness-lavenderBlue py-2 rounded-md h-fit w-fit px-4" key={index}> 
                                    <CheckIcon className="text-sickness-orange w-5 h-5" />
                                    <p className="font-[550] text-sm"> {symptom} </p>
                                </div>
                            )
                        })
                        /*
                        Object.entries(data).map(([bodyPart, symptomsArray]) => (
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
                    ))
                        */
                    }
                    </div>
                    <div className="flex justify-between w-full">
                        <button className="bg-none py-2 px-14 transition ease-in duration-100 delay-100 hover:bg-sickness-primary/90 hover:text-white text-sickness-primary border-2 border-sickness-primary rounded-md font-semibold mt-6" onClick={()=>dispatch(changeEtatByNom('informations'))}> Back </button>
                        <button className={` ${SelectedSymptoms.length === 0 ? "bg-sickness-primary/70 border-sickness-primary/60" : "bg-sickness-primary transition ease-in duration-100 delay-100 hover:bg-sickness-primary/90 border-sickness-primary"} border-2  py-2 px-14 text-white rounded-md font-semibold mt-6`} disabled={SelectedSymptoms.length === 0} onClick={()=>ClickContinue()}> Continue </button>
                    </div>
                </div>
                <div className="flex-[0.5]">
                    <Human />
                </div>
            </div>
        </div>
    )
}