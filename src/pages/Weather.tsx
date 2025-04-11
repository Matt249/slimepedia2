import React, { useRef, useState } from "react";
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

    const handleMouseEnter = (weather: string) => {
        if (videoRefs.current[weather])
            videoRefs.current[weather].play();
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
        if (weatherMusicRef.current) {
            if (weatherMusicRef.current.paused) {
                weatherMusicRef.current.volume = 0.1;
                weatherMusicRef.current.play();
            }
            else
                weatherMusicRef.current.pause();
        }
    };

    document.title = weatherList[weather][0] + ' - Slimepedia 2';

    return (
        <div>
            <div className="top-buttons">
                <audio ref={weatherMusicRef} src={mediaFetcher(`music/${weatherList[weather][7] ? weather : 'fields-day-theme'}.ogg`)}>
                    <track kind="captions" src="data:text/vtt,WEBVTT%0A%0A00:00:00.000%20--%3E%2000:00:10.000%0AWeather%20Music" srcLang="en" label="English captions" />
                </audio>
                <div>
                    <button onClick={() => setPanel(!panel)}>
                        <img src={mediaFetcher('misc/mapCursor.png')} alt="Toggle fullscreen" />
                    </button>
                    {weatherList[weather][7] && weatherMusicRef.current &&
                        <button onClick={() => handleMusicPlay()} className={'music-player' + weatherMusicRef.current.paused ? '' : ' music-played'}>
                            <img src={mediaFetcher('misc/audio.png')} alt='Play weather music' />
                        </button>
                    }
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
                        <img src={mediaFetcher(`world/${weatherName}.png`)} alt={weatherList[weatherName][0] + ' icon'} />
                        <video
                            ref={(el) => (videoRefs.current[weatherName] = el)}
                            className={`video-${weatherName}`}
                            src={mediaFetcher(`videos/${weatherList[weatherName][1]}.light.webm`)}
                            muted
                            loop
                            disablePictureInPicture
                            autoPlay={weatherName === weather}
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
                    <img src={mediaFetcher(`world/${weather}.png`)} alt={weatherList[weather][0] + ' icon'} />
                    <h1>{weatherList[weather][0]}</h1>
                    <h2>{weatherList[weather][2]}</h2>
                    <p>{weatherPedia[weather]}</p>
                </div>
                <div className={"weather-info-content" + (panel ? "" : " weather-content-hidden")}>
                    <div className="weather-box effects-box">
                        <h2 className='weather-box-title'>Effects</h2>
                        <p>WIP</p>
                    </div>
                    <div className="weather-box related-weater-box">
                        <h2 className='weather-box-title'>Related Weather</h2>
                        <NavLink to={`/weather/${weatherList[weather][5]}`}>
                            <img src={mediaFetcher(`world/${weatherList[weather][5]}.png`)} alt={weatherList[weatherList[weather][5]][0] + ' icon'} />
                        </NavLink>
                    </div>
                    <div className="weather-box spawning-slimes-box">
                        <h2 className='weather-box-title'>Slimes/Resources</h2>
                        {weatherList[weather][4].length !== 0 ? weatherList[weather][4].map((element) => (
                            <NavLink to={weatherSpawn[element][2]} key={element}>
                                <img src={mediaFetcher(weatherSpawn[element][1])} title={weatherSpawn[element][0]} alt={weatherSpawn[element][0]} />
                            </NavLink>
                        )) :
                            <img src={noneImg} alt='No effects' />
                        }
                    </div>
                    <Biomes spawnList={weatherList[weather][6]} />
                </div>
            </div>
        </div>
    );
}

export default Weather;