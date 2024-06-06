"use client"

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Toaster } from "@/components/ui/toaster"
import { Skeleton } from "@/components/ui/skeleton"
import SideBarDash from '@/components/SideBarDash'
import NavBarDash from '@/components/NavBarDash'

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
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Marker, Popup, TileLayer } from 'react-leaflet';
import { useState, useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/Store/store'
import { updateDoctor } from '@/Store/doctor/doctorSlice'
import { useToast } from '@/components/ui/use-toast'
import SmallWhiteLoader from '@/components/Loaders/WhiteButtonLoader'
import withAuth from '@/components/HOC/AuthHOC'
const LeafletMap = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
    ssr: false
  });

const DoctorParametres = () => {
    const dispatch = useDispatch<AppDispatch>()
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
    const [rendering, setRendering] = useState(true)
    useLayoutEffect(()=>{
        const stringUser = localStorage.getItem("user") || ""
        const parsedUser = JSON.parse(stringUser)
        if(parsedUser){
            setUser({
                name: parsedUser.name,
                lastname: parsedUser.lastname,
                phone: parsedUser.phone,
                userID: parsedUser._id,
                location: parsedUser.location[0].cordonnees,
                email: parsedUser.email
            })
        }
        setRendering(false)
    },[])
    const handleMarkerMove = (e: any) => {
        setUser({...user, location: [e.target.getLatLng().lat, e.target.getLatLng().lng]})
    };
    const handleFieldChange = ({val, name}: {val: string, name: keyof {name: string, lastname: string, userID: string, phone: string, location: [number, number]}}) => {
        setUser({...user, [name]: val})
    }
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const handleUpdateDoctor = async() => {
        if(user.name.length < 4){
            setError({...error, name: "Name should be longer than 4 caracters."})
        }
        if(user.lastname.length < 4){
            setError({...error, lastname: "Lastname should be longer than 4 caracters."})
        }
        if(user.phone.length < 9){
            setError({...error, phone: "Phone number should be longer than 9 caracters"})
        } 
        if((user.phone.length < 9) || (user.lastname.length < 4) || (user.name.length < 4)){
            return
        }
        setLoading(true)
        const response = await dispatch(updateDoctor({doctorID: user.userID, name: user.name, lastname: user.lastname, phone: user.phone, location: user.location}))
        console.log(response)
        setLoading(false)
        if(response.payload.status === 204){
            toast({
                title: "Congratulations !",
                description: <p> You&apos;ve updated your profile successfully</p>,
              })
              
        }
        else if(response.payload.status === 400){
            toast({
                variant: "destructive",
                title: "Sorry.",
                description: <p> { response.payload.message } </p>,
              })
        }
        else if(response.payload.status === 500){
            toast({
                variant: "destructive",
                title: "Sorry.",
                description: <p> Couldn&apos;t update profile, Please try again later. </p>,
              })
        }
    }
    if(typeof window === "undefined"){
        return null
    }
    return (
        <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
            <SideBarDash />
            <div className="flex flex-col">
                <NavBarDash />
                <main className="w-full flex-1 flex p-4 sm:p-6">
                    <div className="flex flex-col md:flex-[0.7] flex-1">
                        {
                            rendering ?
                            <>
                                <Skeleton className="w-[100px] h-8 rounded-md" />
                                <div className="flex gap-3 w-full mt-8">
                                    <Skeleton className="w-full rounded-md h-12" />
                                    <Skeleton className="w-full rounded-md h-12" />
                                </div>
                                <Skeleton className="w-full rounded-md h-12 mt-8" />
                                <Skeleton className="w-full rounded-md h-12 mt-8" />
                                <Skeleton className="w-full rounded-md h-12 mt-8" />
                                <Skeleton className="w-full rounded-md h-28 mt-8" />
                                <div className="flex gap-3 w-full mt-8">
                                    <Skeleton className="w-full rounded-md h-12" />
                                    <Skeleton className="w-full rounded-md h-12" />
                                </div>
                                <Skeleton className="w-[150px] rounded-md h-12 mt-8" />
                            </>
                            :
                            <>  
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
                                    <PhoneInput country='tn' value={user.phone} onChange={(e)=>{handleFieldChange({val: e, name: "phone"}); setError({...error, phone: ""})}}  inputStyle={InputStyle} buttonStyle={ButtonStyle} containerStyle={ContainerStyle} />
                                {/* <input type="text" className="border-2 border-[#C5C5C5] rounded-md w-full h-12 focus:outline-none focus:border-sickness-primary pl-2 " /> */}
                                <p className="text-sm text-red-500 self-center text-center"> {error.phone} </p>
                                </div>
                                <div className="flex flex-col gap-1 w-full mt-4">
                                    <p className="text-sm text-black font-medium">Office Location</p>
                                    <div className="w-full h-[20rem]">
                                        <LeafletMap center={user.location} zoom={13} scrollWheelZoom={false} className='w-full h-full border-2 border-sickness-border rounded-lg shadow-lg z-10'>
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={user.location} draggable={true} eventHandlers={{ dragend: handleMarkerMove }}>
                                                <Popup>
                                                    My location
                                                </Popup>
                                            </Marker>
                                        </LeafletMap>
                                        </div>
                                </div>
                                <button onClick={handleUpdateDoctor} className={`md:w-fit w-full px-8 py-2 ${loading ? "bg-sickness-primary/50" : "bg-sickness-primary/70 hover:bg-sickness-primary active:bg-sickness-primary/50"} transition delay-100 ease-in bg-settaPrimary text-white font-semibold flex gap-2 justify-center items-center rounded-md mt-6 self-end`} > Update {loading && <SmallWhiteLoader />} </button>
                            </>
                        }
                    </div>
                    <div className="md:flex hidden md:flex-[0.3]"></div>
                </main>
            </div>
            <Toaster />
        </div>

    )
}

export default withAuth(DoctorParametres, ["doctor"])