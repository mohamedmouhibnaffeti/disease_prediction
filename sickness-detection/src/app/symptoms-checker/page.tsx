"use client"
import { useContext } from "react"
import Informations from "./Informations"
import { SymptomsCheckerContext } from "./SymptomsCheckerContext"
import SymptomsSelect from "./SymptomsSelect"
import Conditions from "./Conditions"
import Result from "./Result"
import Recommendations from "./Recommendations"
import Doctors from "./Doctors"

export default () => {
    const { ListItems, getEtatByName } = useContext(SymptomsCheckerContext)
    return (
        <div className="flex flex-col items-center">
            <div className="flex gap-8 mt-[8rem]"> 
                { ListItems.map((item: any, index: number)=>{
                    return(
                        <div className="flex flex-col gap-4" key={index}>
                            <p className="uppercase font-semibold text-sickness-primaryText"> {item.nom} </p>
                            {item.etat && <div className="h-[2px] bg-sickness-primaryText z-50 translate-y-[1.5px] rounded-full" />}
                        </div>
                    )
                }) } 
            </div>
            <div className="w-full h-[2px] bg-sickness-border -z-50" />
            { getEtatByName('informations') && <Informations />}
            { getEtatByName('Symptoms') && <SymptomsSelect />}
            { getEtatByName('Conditions') && <Conditions />}
            { getEtatByName('result') && <Result /> }
            { getEtatByName('recommendations') && <Recommendations /> }
            { getEtatByName('doctors') && <Doctors /> }
        </div>
    )
}