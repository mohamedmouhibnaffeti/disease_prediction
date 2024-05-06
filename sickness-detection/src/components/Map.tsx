import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // or any other library for dynamic imports
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Marker, Popup, TileLayer } from 'react-leaflet';

const LeafletMap = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false
});

export default function MyMap() {
    const [marketLocation, setMarketLocation] = useState<[number, number]>([35.632401, 10.8959568]);

    const handleMarkerMove = (e: any) => {
        setMarketLocation(e.target.getLatLng());
    };
    return (
        <LeafletMap center={marketLocation} zoom={13} scrollWheelZoom={false} className='w-full h-full border-2 border-sickness-border rounded-lg shadow-lg z-10'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={marketLocation} draggable={true} eventHandlers={{ dragend: handleMarkerMove }}>
                <Popup>
                    Dr. Mouhib Naffeti
                </Popup>
            </Marker>
        </LeafletMap>
    );
}
