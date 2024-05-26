"use client"
import PatientSideBarDash from "@/components/PatientSideBarDash"
import PatientNavBarDash from "@/components/PatientNavBarDash"
import { useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/Store/store"
import MainLoader from "@/components/Loaders/MainLoader"
import ErrorFetching from "@/components/Errors/FailedFetching"
import { Greeting } from "@/lib/functions/dates"
import NextAppointmentCard from "@/components/NextAppointmentCard"
import SymptomsBarChart from "@/components/Charts/SymptomsBarChart"
import SicknessBarChart from "@/components/Charts/SicknessBarChat"
import { MonitorXIcon } from "lucide-react"
import SmallWhiteLoader from "@/components/Loaders/WhiteButtonLoader"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@radix-ui/react-label"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
const ContainerStyle = {
    height: '3rem'
}

const InputStyle = {
    width: '100%',
    height: '3rem',
    paddingLeft: '5rem',
    
}

const ButtonStyle = {
    width: '4rem',
    display: 'flex',
    justifyContent: 'center',
    zIndex: "20"
}
export default function Dashboard(){
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<{name: string, lastname: string, userID: string, phone: string, location: [number, number], email: string}>({
        name: "",
        lastname: "",
        phone: "",
        userID: "",
        location: [0, 0],
        email: ""
    });
    const [error, setError] = useState<{name: string, lastname: string, phone: string}>({
        name: "",
        lastname: "",
        phone: ""
    });
    const handleFieldChange = ({val, name}: {val: string, name: keyof {name: string, lastname: string, userID: string, phone: string, location: [number, number]}}) => {
        setUser({...user, [name]: val})
    }
    return (
        <>
            <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
                <PatientSideBarDash /> 
                <div className="flex flex-col">
                    <PatientNavBarDash />
                    <main className="w-full flex-1 flex p-4 sm:p-6">
                        <div className="flex flex-col md:flex-[0.7] flex-1">
                            <h1 className="text-xl font-semibold text-sickness-primaryText">Profile Settings</h1>
                            <div className="flex md:flex-row flex-col gap-3 w-full mt-4">
                                <div className="flex flex-col gap-1 w-full">
                                    <p className="text-sm text-black font-medium">Name</p>
                                    <input type="text" value={user.name} onChange={(e)=>{handleFieldChange({val: e.target.value, name: "name"}); setError({...error, name: ""})}} className="border-2 border-[#C5C5C5] rounded-md h-12 focus:outline-none focus:border-sickness-primary pl-2 "/>
                                    <p className="text-sm text-red-500 self-center text-center">  </p>
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <p className="text-sm text-black font-medium">Lastname</p>
                                    <input type="text" value={user.lastname} onChange={(e)=>{handleFieldChange({val: e.target.value, name: "lastname"}); setError({...error, name: ""})}}  className="border-2 border-[#C5C5C5] rounded-md h-12 focus:outline-none focus:border-sickness-primary pl-2 " />
                                    <p className="text-sm text-red-500 self-center text-center">  </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full mt-4">
                                <p className="text-sm text-black font-medium">Email Address</p>
                                <input type="email" value={user.email} className="border-2 border-[#C5C5C5] bg-[#C5C5C5]/20 rounded-md h-12 focus:outline-none] pl-2 " readOnly={true} />
                            </div>
                            <div className="flex flex-col gap-1 w-full mt-4 outline-none">
                                <p className="text-sm text-black font-medium">Phone Number</p>
                                <PhoneInput country='tn' value={user.phone} onChange={(e)=>{handleFieldChange({val: e, name: "phone"}); setError({...error, name: ""})}}  inputStyle={InputStyle} buttonStyle={ButtonStyle} containerStyle={ContainerStyle} />
                            {/* <input type="text" className="border-2 border-[#C5C5C5] rounded-md w-full h-12 focus:outline-none focus:border-sickness-primary pl-2 " /> */}
                            <p className="text-sm text-red-500 self-center text-center">  </p>
                            <div className="flex md:flex-row flex-col gap-3 w-full mt-4">
                                <div className="flex flex-col gap-1 w-full">
                                    <p className="text-sm text-black font-medium">Age</p>
                                    <input type="text" value={user.name} onChange={(e)=>{handleFieldChange({val: e.target.value, name: "name"}); setError({...error, name: ""})}} className="border-2 border-[#C5C5C5] rounded-md h-12 focus:outline-none focus:border-sickness-primary pl-2 "/>
                                    <p className="text-sm text-red-500 self-center text-center">  </p>
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <p className="text-sm text-black font-medium">Gender</p>
                                    <RadioGroup className="flex gap-2">
                                        <div className="flex items-center h-[3rem] space-x-4 px-4 w-full bg-settaFill border-[1px] border-settaBorder py-3 pl-2 rounded-md text-[#999999]">
                                            <RadioGroupItem value="Male" id="r1" />
                                            <Label htmlFor="r1">Male</Label>
                                        </div>
                                        <div className="flex items-center h-[3rem] space-x-4 px-4 w-full bg-settaFill border-[1px] border-settaBorder py-3 rounded-md text-[#999999]">
                                            <RadioGroupItem value="Female" id="r2" />
                                            <Label htmlFor="r2">Female</Label>
                                        </div>
                                    </RadioGroup>
                                    <p className="text-sm text-red-500 self-center text-center">  </p>
                                </div>
                            </div>
                            </div>
                            <button className={`md:w-fit w-full px-8 py-2 ${loading ? "bg-sickness-primary/50" : "bg-sickness-primary/70 hover:bg-sickness-primary active:bg-sickness-primary/50"} transition delay-100 ease-in bg-settaPrimary text-white font-semibold flex gap-2 justify-center items-center rounded-md mt-6 self-end`} > Update {loading && <SmallWhiteLoader />} </button>
                        </div>
                        <div className="md:flex hidden md:flex-[0.3]"></div>
                    </main>
                </div>
            </div>
        </>
    )
}

