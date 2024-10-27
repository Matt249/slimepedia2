import React, { useState, useRef, useEffect } from 'react';
import './assets/css/Biomes.css';
import { worldList } from './listeSlimes';
import { videosList } from './videosList';

const light = true;
const videoPath = './assets/videos/';
var videos = []

for (let video of videosList)
    videos.push([video, require('' + video)]);

const findVideo = (biome) => {
    for (let video of videos)
        if (video[0] === biome)
            return video[1];
    return videos[1][1];
}

export const Biomes = (props) => {
    const { spawnList } = props;
    const [listHovered, setListHovered] = useState(false);
    const videoRefs = useRef(new Array(spawnList.length).fill().map(() => React.createRef()));
    const lastSpawnListRef = useRef(spawnList);

    useEffect(() => {
        if (videoRefs.current.length !== spawnList.length)
            videoRefs.current = new Array(spawnList.length).fill().map((_, i) => videoRefs.current[i] || React.createRef());
        const hasSpawnListChanged = spawnList.some((biome, index) => biome !== lastSpawnListRef.current[index]);
        if (hasSpawnListChanged) {
            lastSpawnListRef.current = spawnList;
            videoRefs.current.forEach((ref, index) => {
                if (ref.current) {
                    ref.current.src = findVideo(videoPath + spawnList[index] + (light ? '.light' : '') + '.webm');
                }
            });
        }
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
                            try {
                                videoRefs.current[index].current.play();

                            } catch (e) {
                                console.error(e);
                                console.error(videoRefs, index);

                            }
                        }}
                        onMouseLeave={() => {
                            try {
                                videoRefs.current[index].current.pause();

                            } catch (e) {
                                alert('An error occurred, check logs for more information');
                                console.log(e);
                                console.log(videoRefs, index);

                            }
                        }}
                    >
                        <video
                            ref={videoRefs.current[index]}
                            className="biome-list-video"
                            src={findVideo('./assets/videos/' + biome + '.webm')}
                            preload='auto'
                            autoPlay
                            loop
                            muted
                            disablePictureInPicture
                            onMouseEnter={() => videoRefs.current[index].current.play()}
                            onMouseLeave={() => videoRefs.current[index].current.pause()}
                        />
                        <div className='biome-list-overlay'>
                            <img
                                className="biome-image"
                                src={require('./assets/world/' + worldList[biome][0] + '.png')}
                                alt={worldList[biome][1]}
                            />
                            <h4 className='biome-name'>{worldList[biome][1]}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};