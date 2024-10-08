import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import worldImg from './assets/map/output.png';
import './assets/css/Regions.css';

export const Regions = () => {
    const [center, setCenter] = useState([0, 0]);
    const [zoom, setZoom] = useState(1);
    const mapRef = useRef(null);
    const bounds = [[-90, -180], [90, 180]];

    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current;
            map.setView(center, zoom, { animate: false });
        }
    }, [center, zoom]);

    const handleMoveEnd = () => {
        if (mapRef.current) {
            const map = mapRef.current;
            setCenter(map.getCenter());
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