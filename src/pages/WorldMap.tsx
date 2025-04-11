import React, { useRef, useEffect } from 'react';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import worldImg from '../assets/map/output.png';
import 'leaflet/dist/leaflet.css';
import '../css/Map.css';

export const WorldMap = () => {
    const center: [number, number] = [0, 0];
    const zoom: number = 1;
    const mapRef = useRef<L.Map | null>(null);
    const bounds: [[number, number], [number, number]] = [[-90, -180], [90, 180]];

    useEffect(() => {
        if (!mapRef.current) return;

        const map = mapRef.current;
        map.setView(center, zoom, { animate: false });
    }, [center, zoom]);

    document.title = 'Interactive Map - Slimepedia 2';

    return (
        <MapContainer
            className="region-menu"
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
        >
            <ImageOverlay url={worldImg} bounds={bounds} />
        </MapContainer>
    );
}

export default WorldMap;