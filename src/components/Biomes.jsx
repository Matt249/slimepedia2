import { useState, useRef, useEffect, createRef } from 'react';
import { spawnLocationsList } from '../text/regions';
import { mediaFetcher } from '../media-manager';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/Biomes.css';

const light = true;

export const Biomes = ({
    spawnList = [],
}) => {
    const [listHovered, setListHovered] = useState(false);
    const videoRefs = useRef([]);
    const biomeBlacklist = ['pm', 'ps', 'ws'];

    useEffect(() => {
        videoRefs.current = spawnList.map((_, i) => videoRefs.current[i] || createRef());
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
                            key={index}
                            className="biome-item biome-item-hover"
                            onMouseEnter={() => {
                                const videoRef = videoRefs.current[index];
                                if (videoRef && videoRef.current) {
                                    try {
                                        videoRef.current.play();
                                    } catch (e) {
                                        console.error(e);
                                        console.error(videoRefs, index);
                                    }
                                }
                            }}
                            onMouseLeave={() => {
                                const videoRef = videoRefs.current[index];
                                if (videoRef && videoRef.current) {
                                    try {
                                        videoRef.current.pause();
                                    } catch (e) {
                                        console.error(e);
                                        console.error(videoRefs, index);
                                    }
                                }
                            }}
                        >
                            <video
                                ref={videoRefs.current[index]}
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
                        <NavLink key={index} to={`/regions/${spawnLocationsList[biome][0]}`} style={{ textDecoration: 'none' }}>
                            <div
                                key={index}
                                className="biome-item biome-item-hover"
                                onMouseEnter={() => {
                                    const videoRef = videoRefs.current[index];
                                    if (videoRef && videoRef.current) {
                                        try {
                                            videoRef.current.play();
                                        } catch (e) {
                                            console.error(e);
                                            console.error(videoRefs, index);
                                        }
                                    }
                                }}
                                onMouseLeave={() => {
                                    const videoRef = videoRefs.current[index];
                                    if (videoRef && videoRef.current) {
                                        try {
                                            videoRef.current.pause();
                                        } catch (e) {
                                            console.error(e);
                                            console.error(videoRefs, index);
                                        }
                                    }
                                }}
                            >
                                <video
                                    ref={videoRefs.current[index]}
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

Biomes.propTypes = {
    spawnList: PropTypes.array,
}