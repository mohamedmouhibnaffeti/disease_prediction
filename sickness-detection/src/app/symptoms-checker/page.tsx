"use client"
import { useContext } from "react"
import Informations from "./Informations"
import { SymptomsCheckerContext } from "./SymptomsCheckerContext"
import SymptomsSelect from "./SymptomsSelect"

export default () => {
    const { ListItems } = useContext(SymptomsCheckerContext)
    return (
        <div className="flex flex-col items-center">
            <div className="flex gap-8 mt-[8rem]"> 
                { ListItems.map((item: any, index: number)=>{
                    return(
                        <div className="flex flex-col gap-4" key={index}>
                            <p className="uppercase font-semibold"> {item.nom} </p>
                            {item.etat && <div className="h-[2px] bg-black z-50 translate-y-[1.5px] rounded-full" />}
                        </div>
                    )
                }) } 
            </div>
            <div className="w-full h-[2px] bg-sickness-border -z-50" />
            <SymptomsSelect />
        </div>
    )
}