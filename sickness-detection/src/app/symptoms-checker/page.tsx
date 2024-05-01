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

import about from "../../components/Images/NavigationImages/about.svg"
import doctor from "../../components/Images/NavigationImages/doctor.svg"
import recommendations from "../../components/Images/NavigationImages/recommendations.svg"
import result from "../../components/Images/NavigationImages/result.svg"
import symptoms from "../../components/Images/NavigationImages/symptoms.svg"
import history from "../../components/Images/NavigationImages/history.svg"
import Image from "next/image"

export default () => {
    const ListItems = useSelector((state: RootState)=>state.Predict.listItems)
    const currentItem = useSelector((state: RootState)=>state.Predict.currentItem)
    return (
        <div className="flex flex-col items-center justify-center w-full px-8 py-4">
            <div className="md:flex hidden gap-8 mt-[8rem]"> 
                { ListItems.map((item: any, index: number)=>{
                    return(
                        <div className="flex flex-col gap-4" key={index}>
                            <p className="uppercase font-semibold text-sickness-primaryText"> {item.nom} </p>
                            {item.etat && <div className="h-[2px] bg-sickness-primaryText z-20 translate-y-[1.5px] rounded-full" />}
                        </div>
                    )
                }) } 
            </div>
            <div className="md:hidden flex sm:gap-8 gap-4 mt-[8rem]"> 
                { ListItems.map((item: any, index: number)=>{
                    return(
                        <div className="flex flex-col gap-4" key={index}>
                            {
                                item.nom === "informations" ?
                                    <Image src={about} alt="" width={100} height={100} className="w-8 h-8 translate-y-[2px]" />
                                    :
                                    item.nom === "Symptoms" ?
                                        <Image src={symptoms} alt="" width={100} height={100} className="w-11 h-11 -translate-y-[3px]" />
                                        :
                                        item.nom === "Conditions" ?
                                            <Image src={history} alt="" width={100} height={100} className="w-8 h-8 translate-y-[2px]" />
                                            :
                                            item.nom === "result" ?
                                                <Image src={result} alt="" width={100} height={100} className="w-8 h-8 translate-y-[2px]" />
                                                :
                                                item.nom === "recommendations" ?
                                                    <Image src={recommendations} alt="" width={100} height={100} className="w-8 h-8 translate-y-[2px]" />
                                                    :
                                                    item.nom === "doctors" ?
                                                        <Image src={doctor} alt="" width={100} height={100} className="w-8 h-8 translate-y-[2px]" />
                                                        :
                                                        ""
                            }
                            {item.etat && <div className="h-[2px] bg-sickness-primaryText z-20 translate-y-[1.5px] rounded-full" />}
                        </div>
                    )
                }) } 
            </div>
            <div className="w-screen overflow-x-hidden h-[2px] bg-sickness-border -z-50" />
            { currentItem === 'informations' && <Informations />}
            { currentItem === 'Symptoms' && <SymptomsSelect />}
            { currentItem === 'Conditions' && <Conditions />}
            { currentItem === 'result' && <Result /> }
            { currentItem === 'recommendations' && <Recommendations /> }
            { currentItem === 'doctors' && <Doctors /> }
        </div>
    )
}