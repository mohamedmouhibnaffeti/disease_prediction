import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { SymptomsCheckerContext } from "./SymptomsCheckerContext"
import { ModelResult } from "./data"
import { Progress } from "@/components/ui/progress"

export default () => {
    const [ResultLoading, setResultLoading] = useState(false)
    function simulateAPICall(delay = 500) {
        setResultLoading(true)
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
        <div className="w-[44rem] flex flex-col bg-white border-[1px] border-sickness-border shadow-md rounded-lg mt-[8rem] py-8 px-4">
            <p className="text-center text-sickness-primaryText font-semibold">While the predictions are accurate, it's always advisable to consult a medical expert for a more comprehensive understanding and personalized guidance.</p>
            <div className="flex flex-col gap-2 mt-2 w-full justify-center items-center">
                {ResultLoading ? 
                    <>    
                        <div className="ModelLoader mt-4" />
                        <p className="font-semibold text-sickness-primary mt-2"> Please wait for us to do our thing </p>
                    </>
                    : 
                    <ul className="flex flex-col w-full gap-2 justify-center">
                        { ModelResult.map((result: {nom: string, res: number}, index: number)=> {
                            return(
                                <li className="flex flex-col gap-2 w-full" key={index}>
                                    <p className="font-semibold text-sickness-primaryText">{result.nom}</p>
                                    <div className="flex w-full items-center justify-between gap-2">
                                        <Progress value={result.res} className="" />
                                        <p className="font-semibold text-sickness-primaryText">{result.res}%</p>
                                    </div>
                                </li>
                            )
                        }) }
                        <p className="font-medium self-center mt-4"> You have <span className="text-sickness-yellow font-semibold">{ModelResult[0].res}%</span> chance of having <span className="text-sickness-yellow font-semibold">{ModelResult[0].nom}</span> </p>
                        <p className="text-sickness-gray self-center font-medium"> Please click on <span className="font-bold"> Continue </span> to get the possible recommendations for your sickness. </p>
                    </ul>
                    
                }
            </div>
            {!ResultLoading && 
            <div className="flex justify-between w-full">
                <button className="bg-none py-2 px-14 text-sickness-primary border-2 border-sickness-primary rounded-md font-semibold mt-6" onClick={()=>changeEtatByName('Conditions')}> Back </button>
                <button className="bg-sickness-primary border-2 border-sickness-primary py-2 px-14 text-white rounded-md font-semibold mt-6" onClick={()=>changeEtatByName('recommendations')}> Continue </button>
            </div>
            }
        </div>
    )
}