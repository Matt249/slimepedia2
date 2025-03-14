import React, { useRef } from "react";
import '../css/Weather.css';
import { weatherList, weatherNames } from "../text/weather";
import { mediaFetcher } from "../media-manager";
import { Biomes } from "../components/Biomes";

export const Weather: React.FC = () => {
    const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

    const handleMouseEnter = (weather: string) => {
        if (videoRefs.current[weather]) {
            videoRefs.current[weather]!.play();
        }
    };

    const handleMouseLeave = (weather: string) => {
        if (videoRefs.current[weather]) {
            videoRefs.current[weather]!.pause();
        }
    };

    return (
        <div>
            <div className="weather-list">
                {weatherNames.map((weather: string) => (
                    <div
                        key={weather}
                        className="weather-element"
                        onMouseEnter={() => handleMouseEnter(weather)}
                        onMouseLeave={() => handleMouseLeave(weather)}
                    >
                        <img src={mediaFetcher(`world/${weather}.png`)} />
                        <video
                            ref={(el) => (videoRefs.current[weather] = el)}
                            className={`video-${weather}`}
                            src={mediaFetcher(`videos/${weatherList[weather][1]}.webm`)}
                            muted
                            loop
                            disablePictureInPicture
                        />
                        <div className="weather-element-title"><h1>{weatherList[weather][0]}</h1></div>
                    </div>
                ))}
            </div>
            <div className="weather-info">
                <video className="video-weather" src={mediaFetcher("videos/ra.webm")} autoPlay loop muted />
                <div className="weather-info-title">
                    <img src={mediaFetcher("world/rain.png")} />
                    <h1>Weather</h1>
                    <h2>Hold on to your plorts!</h2>
                    <p>
                        Even by the standards of Rainbow Island, slimefall is an unusual sight, with dozens of slimes raining down from the clouds above. As with many things, the slimes don&apos;t seem to be particularly bothered by it all, but a rancher would do well to remain cautious. With so many new slimes dropped into an area at once, slimefall can easily lead to Tarr outbreaks.
                    </p>
                </div>
                <div className="weather-info-content">
                    <div className="effects-box">effects</div>
                    <div className="related-weater-box">related weater</div>
                    <div className="spawning-slimes-box">spawning slimes</div>
                    <Biomes spawnList={['co', 'rf', 'ss', 'ev', 'pb', 'gl']} />
                </div>
            </div>
        </div>
    );
}

export default Weather;