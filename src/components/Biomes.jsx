import React, { useState, useRef, useEffect } from 'react';
import { regionsIds, spawnLocationsList } from '../text/regions';
import PropTypes from 'prop-types';
import '../css/Biomes.css';
import { mediaFetcher } from '../media-manager';

const light = true;

export const Biomes = ({
    spawnList = [],
    changePage = ({ args }) => { console.log('changePage not defined, args={', args, '}') }
}) => {
    const [listHovered, setListHovered] = useState(false);
    const videoRefs = useRef([]);
    const biomeBlacklist = ['pm', 'ps', 'ws'];

    useEffect(() => {
        // Mettre à jour les références des vidéos lorsque spawnList change
        videoRefs.current = spawnList.map((_, i) => videoRefs.current[i] || React.createRef());
    }, [spawnList]);

    return (
        <div className="spawn-list-container">
            <h3 className={listHovered ? 'hidden-title' : ''}>Found in</h3>
            <div
                className="spawn-list-hover"
                onMouseEnter={() => setListHovered(true)}
                onMouseLeave={() => setListHovered(false)}
            >
                {spawnList.map((biome, index) => (
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
                        onClick={() => {
                            if (!biomeBlacklist.includes(biome))
                                changePage('regions', regionsIds.includes(spawnLocationsList[biome][0]) ? 'regions' : 'ranch', spawnLocationsList[biome][0]);
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
                ))}
            </div>
        </div>
    );
};

Biomes.propTypes = {
    spawnList: PropTypes.array,
    changePage: PropTypes.func
}