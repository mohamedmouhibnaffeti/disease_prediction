"use client"
import { lazy } from "react"
import { NotebookPen } from "lucide-react"

const Calendar = lazy(()=>import("@/components/Calendar"))
const Map = lazy(()=>import("@/components/Map"))

export default () => {
    const doctor = {
        "first_name": "John",
        "last_name": "Smith",
        "specialty": "Cardiologist",
        "years_of_experience": 15,
        "rating": 4.8,
        "hourlyPrice": 70,
        "email": "johnsmith@gmail.com",
        "phone": "92144354"
    }
    return(
        <div className="w-full flex gap-4  mt-[6rem] lg:px-24 pb-8 flex-wrap-reverse">
            <div className='lg:flex-[0.6] flex flex-col gap-8'>
                <Calendar />
            </div>
            <div className="lg:flex-[0.4] py-8 px-4 bg-sickness-primary/10 border border-sickness-primary rounded-lg ">
                <div className="w-full flex justify-between">
                    <p className="font-semibold text-xl text-sickness-primaryText"> {`Dr. ${doctor.first_name} ${doctor.last_name}`} <span className="text-sickness-gray font-medium">{`(${doctor.specialty})`}</span> </p>
                    <p className="font-medium text-sickness-gray translate-y-1 self-end text-end"> <span className="font-semibold text-sickness-primaryText">{doctor.years_of_experience}</span> Years of experience </p>
                </div>
                <div className="w-full flex justify-between mt-4">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <p className="font-bold text-gray-900 dark:text-white">{doctor.rating}</p>
                        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <a href="#" className="font-semibold text-gray-900 underline hover:no-underline dark:text-white ">73 reviews</a>
                    </div>
                    <p className="text-sickness-orange font-semibold"> {doctor.hourlyPrice} TND /Hour </p>
                </div>
                <p className="text-sickness-gray text-sm font-semibold mt-4"> Contact info. </p>
                <div className="w-full flex justify-between text-sm">
                    <div>
                        <p className="text-sickness-gray text-sm mt-4"> Email adress </p>
                        <p className="text-sickness-primaryText font-semibold"> {doctor.email} </p>
                    </div>
                    <div className="flex flex-col text-sm">
                        <p className="text-sickness-gray mt-4"> Phone number </p>
                        <p className="text-sickness-primaryText self-end font-semibold"> {doctor.phone} </p>
                    </div>
                </div>
                <div className="h-[30rem] mt-4">
                    <Map />
                </div>
                <button className="w-full py-2 text-white bg-sickness-primary rounded-md flex gap-2 font-semibold mt-8 items-center justify-center"> Make Appointment <NotebookPen className="h-5 w-5" /> </button>
            </div>
        </div>
    )
}