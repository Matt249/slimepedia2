import React, { useState, useRef, useEffect } from 'react';
import { spawnLocationsList } from '../text/regions';
import { mediaFetcher } from '../media-manager';
import { NavLink } from 'react-router-dom';
import '../css/Biomes.css';
import { weatherID } from '../text/weather';

const light = true;
const animationDelay = 200;

interface BiomesProps {
    spawnList: string[];
}

export const Biomes: React.FC<BiomesProps> = ({
    spawnList = [],
}) => {
    const [listHovered, setListHovered] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const biomeBlacklist = ['pm'];

    useEffect(() => {
        videoRefs.current = spawnList.map((_, i) => videoRefs.current[i] || null);
    }, [spawnList]);

    const renderBiomeItem = (biome: string, index: number) => {
        const content = (
            <>
                <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="biome-list-video"
                    src={mediaFetcher(`videos/${biome}${light && '.light'}.webm`)}
                    preload="auto"
                    loop
                    muted
                    disablePictureInPicture
                />
                <div className="biome-list-overlay">
                    <img
                        className="biome-image"
                        src={mediaFetcher(`world/${spawnLocationsList[biome][0]}.png`)}
                        alt={spawnLocationsList[biome][1]}
                    />
                    <h4 className="biome-name">{spawnLocationsList[biome][1]}</h4>
                </div>
            </>
        );

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

        const handleMouseEnter = async () => {
            const videoRef = videoRefs.current[index];
            if (videoRef) {
                await handleVideoLoadAndPlay(videoRef);
            }
        };

        const handleMouseLeave = async () => {
            setTimeout(async () => {
                const videoRef = videoRefs.current[index];
                if (videoRef) {
                    try {
                        videoRef.pause();
                    } catch (error) {
                        console.error("Error pausing video:", error);
                    }
                }
            }, animationDelay);
        };

        if (biomeBlacklist.includes(biome)) {
            return (
                <div
                    key={biome}
                    className="biome-item"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {content}
                </div>
            );
        } else {
            return (
                <NavLink
                    key={biome}
                    to={`/${weatherID.includes(biome) ? 'weather' : 'regions'}/${spawnLocationsList[biome][0]}`}
                    style={{ textDecoration: 'none' }}
                >
                    <div
                        className="biome-item"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {content}
                    </div>
                </NavLink>
            );
        }
    };

    return (
        <div className="spawn-list-container">
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
        </div>
    );
};