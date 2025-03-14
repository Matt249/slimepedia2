import React, { useRef, useEffect, useState } from "react";
import '../css/Weather.css';
import { weatherList, weatherName, weatherPedia, weatherSpawn } from "../text/weather";
import { mediaFetcher } from "../media-manager";
import { Biomes } from "../components/Biomes";
import { Navigate, NavLink, useParams } from "react-router-dom";
import noneImg from '../assets/misc/none.png';

export const Weather: React.FC = () => {
    const [panel, setPanel] = useState<boolean>(true);
    const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
    const backgroundVideoRef = useRef<HTMLVideoElement>(null);
    const { weather } = useParams<{ weather: string }>();
    const weatherMusicRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (weatherMusicRef.current) {
            console.log("Audio ref updated:", weatherMusicRef.current);
        }
    }, [weather]);

    const handleMouseEnter = (weather: string) => {
        if (videoRefs.current[weather])
            videoRefs.current[weather]!.play();
    };

    const handleMouseLeave = (weatherName: string) => {
        if (weather !== weatherName && videoRefs.current[weatherName]) {
            setTimeout(() => {
                videoRefs.current[weatherName]!.pause();
            }, 300);
        }
    };

    if (weather === undefined || weatherName.indexOf(weather) === -1) {
        return (
            <Navigate to="/weather/rain" />
        );
    }

    const handleVideoLoaded = () => {
        backgroundVideoRef.current!.currentTime = videoRefs.current[weather]!.currentTime;
        backgroundVideoRef.current!.play();
    };

    const handleMusicPlay = () => {
        console.log(weatherMusicRef.current);
        if (weatherMusicRef.current) {
            if (weatherMusicRef.current.paused) {
                weatherMusicRef.current.volume = 0.1;
                weatherMusicRef.current.play();
            }
            else
                weatherMusicRef.current.pause();
        }
    };

    return (
        <div>
            <div className="top-buttons">
                {weatherList[weather][7] && <audio ref={weatherMusicRef} src={mediaFetcher(`music/${weather}.ogg`)} />}
                <div>
                    <img src={mediaFetcher('misc/mapCursor.png')} onClick={() => setPanel(!panel)} />
                    {weatherList[weather][7] && weatherMusicRef.current && <img src={mediaFetcher('misc/audio.png')} className={weatherMusicRef.current!.paused ? '' : 'music-played'} onClick={() => handleMusicPlay()} />}
                </div>
            </div>

            <div className="weather-list">
                {weatherName.map((weatherName: string) => (
                    <NavLink
                        to={`/weather/${weatherName}`}
                        key={weatherName}
                        className={"weather-element" + (weatherName === weather ? " selected" : "")}
                        onMouseEnter={() => handleMouseEnter(weatherName)}
                        onMouseLeave={() => handleMouseLeave(weatherName)}
                    >
                        <img src={mediaFetcher(`world/${weatherName}.png`)} />
                        <video
                            ref={(el) => (videoRefs.current[weatherName] = el)}
                            className={`video-${weatherName}`}
                            src={mediaFetcher(`videos/${weatherList[weatherName][1]}.webm`)}
                            muted
                            loop
                            disablePictureInPicture
                        />
                        <div className="weather-element-title"><h1>{weatherList[weatherName][0]}</h1></div>
                    </NavLink>
                ))}
            </div>
            <div className="weather-info">
                <video
                    className="video-weather"
                    src={mediaFetcher(`videos/${weatherList[weather][1]}.webm`)}
                    ref={backgroundVideoRef}
                    autoPlay
                    loop
                    muted
                    onLoadedData={handleVideoLoaded}
                />
                <div className={"weather-info-title" + (panel ? "" : " weather-title-hidden")}>
                    <img src={mediaFetcher(`world/${weather}.png`)} />
                    <h1>{weatherList[weather][0]}</h1>
                    <h2>{weatherList[weather][2]}</h2>
                    <p>{weatherPedia[weather]}</p>
                </div>
                <div className={"weather-info-content" + (panel ? "" : " weather-content-hidden")}>
                    <div className="weather-box effects-box">
                        <h2 className='weather-box-title'>Effects</h2>
                        <p>{weatherList[weather][3]}</p>
                    </div>
                    <div className="weather-box related-weater-box">
                        <h2 className='weather-box-title'>Related Weather</h2>
                        <NavLink to={`/weather/${weatherList[weather][5]}`}>
                            <img src={mediaFetcher(`world/${[weatherList[weather][5]]}.png`)} />
                        </NavLink>
                    </div>
                    <div className="weather-box spawning-slimes-box">
                        <h2 className='weather-box-title'>Slimes/Resources</h2>
                        {weatherList[weather][4].length !== 0 ? weatherList[weather][4].map((element) => (
                            <NavLink to={weatherSpawn[element][2]} key={element}>
                                <img src={mediaFetcher(weatherSpawn[element][1])} title={weatherSpawn[element][0]} />
                            </NavLink>
                        )) :
                            <img src={noneImg} />
                        }
                    </div>
                    <Biomes spawnList={weatherList[weather][6]} />
                </div>
            </div>
        </div>
    );
}

export default Weather;