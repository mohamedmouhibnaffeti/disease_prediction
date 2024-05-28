import { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/Store/store"
import { changeEtatByNom } from "@/Store/Predict/PredictSlice"
import { fetchSicknessForPredictedSickness } from "@/Store/Predict/PredictSlice"
import {FrownIcon} from "lucide-react"
export default () => {
    const [ResultLoading, setResultLoading] = useState(true)
    const {PredictionResult, sicknessDetails} = useSelector((state: RootState) => state.Predict)
    const dispatch = useDispatch<AppDispatch>()
    const FetchSicknessDetails = async () => {
        setResultLoading(true)
        await dispatch(fetchSicknessForPredictedSickness({sicknessName: "Allergies (Asthma)"}))
        setResultLoading(false)
    }
    useLayoutEffect(()=>{
        FetchSicknessDetails()
    }, [])
    useEffect(()=>{
        localStorage.setItem("sickness", JSON.stringify(sicknessDetails))
    }, [sicknessDetails])
    return (
        <div className="flex flex-wrap md:py-4 pb-4">
            <div className="md:w-fit w-full flex flex-col bg-white border-[1px] border-sickness-border shadow-md md:rounded-l-lg rounded-lg md:mt-[6rem] mt-[2rem] py-8 px-4">
                <p className="text-center text-2xl text-sickness-primaryText font-semibold self-start">
                    Our Recommendations :
                </p>
                <div className="flex flex-col gap-2 mt-2 w-full justify-center items-center">
                    {ResultLoading ? 
                        <>    
                            <div className="ModelLoader mt-4" />
                            <p className="font-semibold text-sickness-primary mt-2"> Your recommendations are loading... </p>
                        </>
                        : 
                        (
                            sicknessDetails.status ===200 ?
                            <ul className="flex flex-col w-full gap-2 justify-center pl-2">
                                { sicknessDetails.Sickness?.recommendations?.split("\n").map((result: string, index: number)=> {
                                    return(
                                        <p className="font-semibold text-sickness-primaryText px-2 py-1 bg-sickness-lavenderGray rounded-md border-sickness-border border max-w-lg" key={index}><span className="font-bold">{index + 1}</span>{result}</p>
                                    )
                                }) }
                            </ul>
                            :
                            <>    
                                <FrownIcon className="w-12 h-12 text-red-500" />
                                <p className="font-semibold text-red-500 mt-2"> Sorry, we couldn't find any recommendations for your disease. </p>
                            </>
                        )
                        
                    }
                </div>
                {!ResultLoading && 
                <div className="flex justify-between w-full sm:flex-row flex-col">
                    <button className="bg-none py-2 px-14 transition ease-in duration-100 delay-100 hover:bg-sickness-primary/90 hover:text-white  text-sickness-primary border-2 border-sickness-primary rounded-md font-semibold mt-6" onClick={()=>dispatch(changeEtatByNom('Conditions'))}> Back </button>
                    <button className="bg-sickness-primary border-2 transition ease-in duration-100 delay-100 hover:bg-sickness-primary/90 border-sickness-primary py-2 px-14 text-white rounded-md font-semibold mt-6" onClick={()=>dispatch(changeEtatByNom('doctors'))}> Continue </button>
                </div>
                }
            </div>
            <div className="md:w-[30rem] w-full flex flex-col bg-white border-[1px] md:border-l-0 border-sickness-border shadow-md md:rounded-r-lg rounded-lg md:mt-[6rem] mt-[2rem] py-8 px-4 items-center justify-center">
                <p className="text-center text-sickness-primaryText font-semibold self-center py-4 px-2 border-2 border-sickness-orange bg-sickness-yellow/20 rounded-md">
                    Please note that we won't recommend any medicines as it's out of our responsibilities, so we won't be responsible for you taking any kind of madicins based on our predictions, also please note that we urge you to seek a medical professional, it's not adviced to only follow our prediction.
                    <br />However don't worry in the next page we will provide you with a list with our trusted doctors so you can make an appointment as soon as possible.
                </p>
            </div>
        </div>
    )
}