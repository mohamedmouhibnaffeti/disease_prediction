"use client"

import { lazy } from "react"
import {  useSelector } from "react-redux"
import { RootState } from "@/Store/store"

const Informations = lazy(()=>import("./Informations"))
const Conditions = lazy(()=>import("./Conditions"))
const Result = lazy(()=>import("./Result"))
const Recommendations = lazy(()=>import("./Recommendations"))
const Doctors = lazy(()=>import("./Doctors"))
const SymptomsSelect = lazy(()=>import("./SymptomsSelect"))

export default () => {
    const ListItems = useSelector((state: RootState)=>state.insertSymptoms.listItems)
    const currentItem = useSelector((state: RootState)=>state.insertSymptoms.currentItem)
    console.log(currentItem)
    return (
        <div className="flex flex-col items-center">
            <div className="flex gap-8 mt-[8rem]"> 
                { ListItems.map((item: any, index: number)=>{
                    return(
                        <div className="flex flex-col gap-4" key={index}>
                            <p className="uppercase font-semibold text-sickness-primaryText"> {item.nom} </p>
                            {item.etat && <div className="h-[2px] bg-sickness-primaryText z-20 translate-y-[1.5px] rounded-full" />}
                        </div>
                    )
                }) } 
            </div>
            <div className="w-full h-[2px] bg-sickness-border -z-50" />
            { currentItem === 'informations' && <Informations />}
            { currentItem === 'Symptoms' && <SymptomsSelect />}
            { currentItem === 'Conditions' && <Conditions />}
            { currentItem === 'result' && <Result /> }
            { currentItem === 'recommendations' && <Recommendations /> }
            { currentItem === 'doctors' && <Doctors /> }
        </div>
    )
}