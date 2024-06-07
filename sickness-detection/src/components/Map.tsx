import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // or any other library for dynamic imports
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const LeafletMap = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });

export default function MyMap({ location }: { location: any }) {
    const [marketLocation, setMarketLocation] = useState<[number, number]>(location);

    return (
        <LeafletMap center={location} zoom={13} scrollWheelZoom={false} className='w-full h-full border-2 border-sickness-border rounded-lg shadow-lg z-10'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location} draggable={false}></Marker>
        </LeafletMap>
    );
}
