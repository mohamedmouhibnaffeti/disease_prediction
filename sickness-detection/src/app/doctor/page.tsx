"use client"
import { lazy, useEffect, useState } from "react"
import { NotebookPen } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Plus } from "lucide-react"

const Calendar = lazy(()=>import("@/components/Calendar"))
const Map = lazy(()=>import("@/components/Map"))

export default () => {

    const params = useSearchParams()
    const name = params.get("name") || ""
    const lastname = params.get("lastname") || ""
    const distance = parseFloat(params.get("distance") || "")
    const location = JSON.parse(params.get("location") || "")
    const phone = params.get("phone") || ""
    const email = params.get("email") || ""
    const speciality = params.get("speciality") || ""

    const [rendered, setRendered] = useState(false)

    useEffect(()=>{
        setRendered(prev => true)
        return () => {
            setRendered(prev => false )
        }
    })

    if(!rendered){
        return null
    }

    return(
        <div className="w-full flex gap-4  mt-[6rem] lg:px-24 pb-4 flex-wrap-reverse">
            <div className='lg:flex-[0.6] flex flex-col gap-8'>
                <Calendar />
            </div>
            <div className="lg:flex-[0.4] py-8 px-4 bg-sickness-primary/10 border border-sickness-primary rounded-lg ">
                <div className="w-full flex flex-col justify-center items-center">
                    <p className="font-semibold text-xl text-sickness-primaryText"> {`Dr. ${name} ${lastname}`}</p>
                    <p className="font-semibold mt-4 text-sickness-gray"> Speciality: <span className="text-sickness-orange"> {speciality} </span></p>
                </div>
                <div className="w-full flex justify-between mt-4">
                    <div className="flex gap-2 justify-start font-semibold">
                        <p className="text-sickness-gray"> Distance: </p>
                        <p className="text-sickness-primaryText"> {distance?.toFixed(2)} Km </p>
                    </div>
                </div>
                <p className="text-sickness-gray text-sm font-semibold mt-4"> Contact info. </p>
                <div className="w-full flex justify-between text-sm">
                    <div>
                        <p className="text-sickness-gray text-sm mt-4"> Email adress </p>
                        <p className="text-sickness-primaryText font-semibold"> {email} </p>
                    </div>
                    <div className="flex flex-col text-sm">
                        <p className="text-sickness-gray mt-4"> Phone number </p>
                        <p className="text-sickness-primaryText self-end font-semibold flex items-center"> <Plus className="text-sickness-primaryText w-4 h-4" /> {phone} </p>
                    </div>
                </div>
                <div className="h-[30rem] mt-4">
                    <Map location={location} />
                </div>
                <button className="w-full py-2 text-white bg-sickness-primary rounded-md flex gap-2 font-semibold mt-8 items-center justify-center"> Request Appointment <NotebookPen className="h-5 w-5" /> </button>
            </div>
        </div>
    )
}