import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { SymptomsCheckerContext } from "./SymptomsCheckerContext"
import { RecommendationsData } from "./data"
import { Progress } from "@/components/ui/progress"

export default () => {
    const [ResultLoading, setResultLoading] = useState(false)
    function simulateAPICall(delay = 500) {
        setResultLoading(false)
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log("res")
            setResultLoading(false)
          }, delay);
        });
      }
      
    useLayoutEffect(()=>{
        simulateAPICall(4000)
    }, [])
    const { changeEtatByName } = useContext(SymptomsCheckerContext)
    return (
        <div className="flex">
            <div className="w-[44rem] flex flex-col bg-white border-[1px] border-sickness-border shadow-md rounded-l-lg mt-[6rem] py-8 px-4">
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
                        <ul className="flex flex-col w-full gap-2 justify-center pl-2">
                            { RecommendationsData.map((result: string, index: number)=> {
                                return(
                                    <p className="font-semibold text-sickness-primaryText px-2 py-1 bg-sickness-lavenderGray rounded-md border-sickness-border border" key={index}><span className="font-bold">{index + 1}.</span>{result}</p>
                                )
                            }) }
                    </ul>
                        
                    }
                </div>
                {!ResultLoading && 
                <div className="flex justify-between w-full">
                    <button className="bg-none py-2 px-14 text-sickness-primary border-2 border-sickness-primary rounded-md font-semibold mt-6" onClick={()=>changeEtatByName('Conditions')}> Back </button>
                    <button className="bg-sickness-primary border-2 border-sickness-primary py-2 px-14 text-white rounded-md font-semibold mt-6" onClick={()=>changeEtatByName('doctors')}> Continue </button>
                </div>
                }
            </div>
            <div className="w-[30rem] flex flex-col bg-white border-[1px] border-l-0 border-sickness-border shadow-md rounded-r-lg mt-[6rem] py-8 px-4 items-center justify-center">
                <p className="text-center text-sickness-primaryText font-semibold self-center">
                    Please note that we won't recommend any medicines as it's out of our responsibilities, so we won't be responsible for you taking any kind of madicins based on our predictions, also please note that we urge you to seek a medical professional, it's not adviced to only follow our prediction.
                    <br />However don't worry in the next page we will provide you with a list with our trusted doctors so you can make an appointment as soon as possible.
                </p>
            </div>
        </div>
    )
}