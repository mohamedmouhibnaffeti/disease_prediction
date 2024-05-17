"use client"

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Toaster } from "@/components/ui/toaster"
import { Skeleton } from "@/components/ui/skeleton"
import SideBarDash from '@/components/SideBarDash'
import NavBarDash from '@/components/NavBarDash'
import MyMap from '@/components/Map'

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
    justifyContent: 'center'
}
import dynamic from 'next/dynamic'; // or any other library for dynamic imports
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Marker, Popup, TileLayer } from 'react-leaflet';
const LeafletMap = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
    ssr: false
  });

export default function Parametres(){
    const handleMarkerMove = (e: any) => {
      };
    return (
        <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[280px_1fr]">
            <SideBarDash />
            <div className="flex flex-col">
                <NavBarDash />
                <main className="w-full flex-1 flex p-4 sm:p-6">
                    <div className="flex flex-col md:flex-[0.7] flex-1">
                        {
                            false ?
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
                                        <input type="text" className="border-2 border-[#C5C5C5] rounded-md h-12 focus:outline-none focus:border-sickness-primary pl-2 "/>
                                        <p className="text-sm text-red-500 self-center text-center">  </p>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <p className="text-sm text-black font-medium">Lastname</p>
                                        <input type="text" className="border-2 border-[#C5C5C5] rounded-md h-12 focus:outline-none focus:border-sickness-primary pl-2 " />
                                        <p className="text-sm text-red-500 self-center text-center">  </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 w-full mt-4">
                                    <p className="text-sm text-black font-medium">Email Address</p>
                                    <input type="email" className="border-2 border-[#C5C5C5] bg-[#C5C5C5]/20 rounded-md h-12 focus:outline-none] pl-2 " readOnly={true} />
                                </div>
                                <div className="flex flex-col gap-1 w-full mt-4 outline-none">
                                    <p className="text-sm text-black font-medium">Phone Number</p>
                                    <PhoneInput country='tn' inputStyle={InputStyle} buttonStyle={ButtonStyle} containerStyle={ContainerStyle} />
                                {/* <input type="text" className="border-2 border-[#C5C5C5] rounded-md w-full h-12 focus:outline-none focus:border-sickness-primary pl-2 " /> */}
                                <p className="text-sm text-red-500 self-center text-center">  </p>
                                </div>
                                <div className="flex flex-col gap-1 w-full mt-4">
                                    <p className="text-sm text-black font-medium">Office Location</p>
                                    <div className="w-full h-[20rem]">
                                        <LeafletMap center={[0, 0]} zoom={13} scrollWheelZoom={false} className='w-full h-full border-2 border-sickness-border rounded-lg shadow-lg z-10'>
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={[0, 0]} draggable={true} eventHandlers={{ dragend: handleMarkerMove }}>
                                                <Popup>
                                                    My location
                                                </Popup>
                                            </Marker>
                                        </LeafletMap>
                                        </div>
                                </div>
                                <button className={`w-fit px-4 py-2 bg-settaPrimary/70 bg-settaPrimary text-white font-semibold flex justify-center items-center rounded-md mt-6`}> Sauvegarder </button>
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

