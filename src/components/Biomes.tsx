import React, { useState, useRef, useEffect } from 'react';
import { spawnLocationsList } from '../text/regions';
import { NavLink } from 'react-router-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { weatherID } from '../text/weather';
import '../css/Biomes.css';

const light = true;
const animationDelay = 200;

interface BiomesProps {
    spawnList: string[];
}

export const Biomes: React.FC<BiomesProps> = ({ spawnList = [] }) => {
    const [listHovered, setListHovered] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const biomeBlacklist = ['pm'];

    useEffect(() => {
        videoRefs.current = spawnList.map((_, i) => videoRefs.current[i] ?? null);
    }, [spawnList]);

    const handleVideoLoadAndPlay = async (videoRef: HTMLVideoElement) => {
        try {
            if (videoRef.readyState < 3) {
                await new Promise<void>((resolve, reject) => {
                    videoRef.onloadeddata = () => resolve();
                    videoRef.onerror = () => reject(new Error(`Failed to load video: ${videoRef.src}`));
                });
            }
            await videoRef.play();
        } catch (error) {
            console.error("Error loading and playing video:", error);
        }
    };

    const handleMouseEnter = async (videoRef: HTMLVideoElement | null) => {
        if (videoRef) {
            await handleVideoLoadAndPlay(videoRef);
        }
    };

    const handleMouseLeave = async (videoRef: HTMLVideoElement | null) => {
        setTimeout(async () => {
            if (videoRef) {
                try {
                    videoRef.pause();
                } catch (error) {
                    console.error("Error pausing video:", error);
                }
            }
        }, animationDelay);
    };

    const renderBiomeItem = (biome: string, index: number) => {
        const videoRef = videoRefs.current[index];
        const content = (
            <>
                <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="biome-list-video"
                    src={`/assets/videos/${biome}${light && '.light'}.webm`}
                    preload="auto"
                    loop
                    muted
                    disablePictureInPicture
                />
                <div className="biome-list-overlay">
                    <img
                        className="biome-image"
                        src={`/assets/world/${spawnLocationsList[biome][0]}.png`}
                        alt={spawnLocationsList[biome][1]}
                    />
                    <h4 className="biome-name">{spawnLocationsList[biome][1]}</h4>
                </div>
            </>
        );

        const containerProps = {
            className: "biome-item",
            onMouseEnter: () => handleMouseEnter(videoRef),
            onMouseLeave: () => handleMouseLeave(videoRef),
        };

        if (biomeBlacklist.includes(biome)) {
            return (
                <div key={biome} {...containerProps}>
                    {content}
                </div>
            );
        }

        return (
            <NavLink
                key={biome}
                to={`/${weatherID.includes(biome) ? 'weather' : 'regions'}/${spawnLocationsList[biome][0]}`}
                style={{ textDecoration: 'none' }}
            >
                <div {...containerProps}>{content}</div>
            </NavLink>
        );
    };

    return (
        <OverlayScrollbarsComponent
            options={{
                scrollbars: {
                    autoHide: "move",
                    autoHideDelay: 500,
                },
            }}
            className="spawn-list-container"
            defer
        >
            <h3 className={listHovered ? 'hidden-title' : ''}>Found in</h3>
            <button
                className="spawn-list-hover"
                onMouseEnter={() => setListHovered(true)}
                onMouseLeave={() => setListHovered(false)}
                onClick={(e) => {
                    setListHovered((prev) => !prev);
                    e.preventDefault();
                }}
            >
                {spawnList.map((biome, index) => renderBiomeItem(biome, index))}
            </button>
        </OverlayScrollbarsComponent>
    );
};