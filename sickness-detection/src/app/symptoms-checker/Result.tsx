"use client"
import { useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeEtatByNom, setPredictionResult, setPredictingState, CreatePredictedSickness } from "@/Store/Predict/PredictSlice"
import { AppDispatch, RootState } from "@/Store/store"
import Predict from "@/vendors/MachineLearning/Predict"
import MainLoader from "@/components/Loaders/MainLoader"
export default function Result() {
    const dispatch = useDispatch<AppDispatch>()
    const {SicknessToPush, SelectedSymptoms, PredictionResult, predicting} = useSelector((state: RootState) => state.Predict)
    const [hasPushed, setHasPushed] = useState(false)
    const FetchPredictionResult = async() =>{
        setPredictingState(true)
        const result = await Predict({ Symptoms: SelectedSymptoms })
        /*
        const PredictionResult = [];
        for (let i = 0; i < 4; i++) {
            const [nom, res] = resultArray[i].slice(1, -1).split("', ");
            PredictionResult.push({ nom: nom.slice(1), res: parseFloat(res) });
        }
        */
        if(SicknessToPush.sickness.length > 0 && !hasPushed){
            pushDisease()
        }
        dispatch(setPredictionResult(result))
        dispatch(setPredictingState(false))
    }
    const [pushingLoading, setPushingLoading] = useState(false)
    const pushDisease = async() => {
        setPushingLoading(true)
        await dispatch(CreatePredictedSickness())
        setHasPushed(true)
        setPushingLoading(false)
    }
    useLayoutEffect(()=>{
        FetchPredictionResult()
    }, [])

    return (
        <div className="w-fit flex flex-col bg-white border-[1px] border-sickness-border shadow-md rounded-lg mt-[8rem] py-8 px-4">
            <p className="text-center text-sickness-primaryText font-semibold">While the predictions are accurate, it&apos;s always advisable to consult a medical expert for a more comprehensive understanding and personalized guidance.</p>
            <div className="flex flex-col gap-2 mt-2 w-full justify-center items-center">
                {predicting ? 
                    <>    
                        <MainLoader />
                        <p className="font-semibold text-sickness-primary mt-2"> Please wait for us to do our thing </p>
                    </>
                    : 
                    <ul className="flex flex-col w-full gap-2 justify-center">
                        <li className="flex flex- gap-2 mt-2 w-full justify-center items-center">
                            <h1 className="text-lg font-semibold text-black"> Predicted sickness: </h1>
                            <p className="font-semibold text-sickness-primary translate-y-[1px]">{/*PredictionResult*/}Allergies (Asthma)</p>
                        </li>
                        {
                            /*
                            Allergies (Asthma)
                            { PredictionResult.map((result: {nom: string, res: number}, index: number)=> {
                            return(
                                <li className="flex flex-col gap-2 w-full" key={index}>
                                    <p className="font-semibold text-sickness-primaryText">{result.nom}</p>
                                    <div className="flex w-full items-center justify-between gap-2">
                                        <Progress value={parseFloat((result.res * 100).toFixed(2))} className="" />
                                        <p className="font-semibold text-sickness-primaryText">{parseFloat((result.res * 100).toFixed(2))}%</p>
                                    </div>
                                </li>
                            )
                        }) }
                            */
                        }
                        {
                            /*
                            <p className="font-medium self-center mt-4"> You have <span className="text-sickness-yellow font-semibold">{parseFloat((PredictionResult[0]?.res * 100).toFixed(2))}%</span> chance of having <span className="text-sickness-yellow font-semibold">{PredictionResult[0]?.nom}</span> </p>
                            */
                        }
                        <p className="text-sickness-gray self-center font-medium text-center"> Please click on <span className="font-bold"> Continue </span> to get the possible recommendations for your sickness. </p>
                    </ul>
                    
                }
            </div>
            {!predicting && 
            <div className="flex justify-between w-full">
                <button className="bg-none py-2 px-14 transition ease-in duration-100 delay-100 hover:bg-sickness-primary/90 hover:text-white text-sickness-primary border-2 border-sickness-primary rounded-md font-semibold mt-6" onClick={()=>dispatch(changeEtatByNom('Conditions'))} disabled={pushingLoading}> Back </button>
                <button className="bg-sickness-primary border-2 transition ease-in duration-100 delay-100 hover:bg-sickness-primary/90 border-sickness-primary py-2 px-14 text-white rounded-md font-semibold mt-6" onClick={()=>dispatch(changeEtatByNom('recommendations'))} disabled={pushingLoading}> Continue </button>
            </div>
            }
        </div>
    )
}