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

    return (
        <div className="spawn-list-container">
            <h3 className={listHovered ? 'hidden-title' : ''}>Found in</h3>
            <div
                className="spawn-list-hover"
                onMouseEnter={() => setListHovered(true)}
                onMouseLeave={() => setListHovered(false)}
            >
                {spawnList.map((biome, index) => {
                    return (biomeBlacklist.includes(biome) ?
                        <div
                            key={biome}
                            className="biome-item biome-item-hover"
                            onMouseEnter={() => {
                                const videoRef = videoRefs.current[index];
                                if (videoRef) {
                                    try {
                                        videoRef.play();
                                    } catch (e) {
                                        console.error(e);
                                        console.error(videoRefs, index);
                                    }
                                }
                            }}
                            onMouseLeave={() => {
                                setTimeout(() => {
                                    const videoRef = videoRefs.current[index];
                                    if (videoRef) {
                                        try {
                                            videoRef.pause();
                                        } catch (e) {
                                            console.error(e);
                                            console.error(videoRefs, index);
                                        }
                                    }
                                }, animationDelay); // Délai de 500 ms
                            }}
                        >
                            <video
                                ref={(el) => videoRefs.current[index] = el}
                                className="biome-list-video"
                                src={mediaFetcher(`videos/${biome}${light && '.light'}.webm`)}
                                preload='auto'
                                loop
                                muted
                                disablePictureInPicture
                            />
                            <div className='biome-list-overlay'>
                                <img
                                    className="biome-image"
                                    src={mediaFetcher(`world/${spawnLocationsList[biome][0]}.png`)}
                                    alt={spawnLocationsList[biome][1]}
                                />
                                <h4 className='biome-name'>{spawnLocationsList[biome][1]}</h4>
                            </div>
                        </div>
                        :
                        <NavLink key={biome} to={`/${weatherID.includes(biome) ? 'weather' : 'regions'}/${spawnLocationsList[biome][0]}`} style={{ textDecoration: 'none' }}>
                            <div
                                key={biome}
                                className="biome-item biome-item-hover"
                                onMouseEnter={() => {
                                    const videoRef = videoRefs.current[index];
                                    if (videoRef) {
                                        try {
                                            videoRef.play();
                                        } catch (e) {
                                            console.error(e);
                                            console.error(videoRefs, index);
                                        }
                                    }
                                }}
                                onMouseLeave={() => {
                                    setTimeout(() => {
                                        const videoRef = videoRefs.current[index];
                                        if (videoRef) {
                                            try {
                                                videoRef.pause();
                                            } catch (e) {
                                                console.error(e);
                                                console.error(videoRefs, index);
                                            }
                                        }
                                    }, 500); // Délai de 500 ms
                                }}
                            >
                                <video
                                    ref={(el) => videoRefs.current[index] = el}
                                    className="biome-list-video"
                                    src={mediaFetcher(`videos/${biome}${light && '.light'}.webm`)}
                                    preload='auto'
                                    loop
                                    muted
                                    disablePictureInPicture
                                />
                                <div className='biome-list-overlay'>
                                    <img
                                        className="biome-image"
                                        src={mediaFetcher(`world/${spawnLocationsList[biome][0]}.png`)}
                                        alt={spawnLocationsList[biome][1]}
                                    />
                                    <h4 className='biome-name'>{spawnLocationsList[biome][1]}</h4>
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    );
};