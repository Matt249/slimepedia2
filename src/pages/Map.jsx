import { useState, useRef, useEffect } from 'react';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import React from 'react';
import worldImg from '/src/assets/map/output.png';
import 'leaflet/dist/leaflet.css';
import '../css/Map.css';

export const Map = () => {
    const [center, setCenter] = useState([0, 0]);
    const [zoom, setZoom] = useState(1);
    const mapRef = useRef(null);
    const bounds = [[-90, -180], [90, 180]];

    useEffect(() => {
        if (!mapRef.current) return; 
        
        const map = mapRef.current;
        map.setView(center, zoom, { animate: false });
    }, [center, zoom]);

    const handleMoveEnd = () => {
        if (mapRef.current) {
            const map = mapRef.current;
            const center = map.getCenter();
            setCenter([center.lat, center.lng]);
            setZoom(map.getZoom());
        }
    };

    return (
        <MapContainer
            className="region-menu"
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            whenCreated={(mapInstance) => { mapRef.current = mapInstance; mapInstance.on('moveend', handleMoveEnd); }}
        >
            <ImageOverlay url={worldImg} bounds={bounds} />
        </MapContainer>
    );
}