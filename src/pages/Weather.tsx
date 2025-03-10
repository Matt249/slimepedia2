import React from "react";
import '../css/Weather.css';
import { weatherList, weatherNames } from "../text/weather";
import { mediaFetcher } from "../media-manager";
import { Biomes } from "../components/Biomes";

export const Weather: React.FC = () => {
    return (
        <div>
            <div className="weather-list">
                {weatherNames.map((weather: string) => (
                    <div
                        key={weather}
                        className="weather-element"
                    >
                        <img src={mediaFetcher(`world/${weather}.png`)} />
                        <h1>{weatherList[weather][0]}</h1>
                        <video
                            className={`video-${weather}`}
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => e.currentTarget.pause()}
                            src={mediaFetcher(`videos/${weatherList[weather][1]}.webm`)}
                            muted
                        />
                    </div>
                ))
                }
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
                <div className="weather-info-content"><Biomes spawnList={['co', 'rf', 'ss', 'ev', 'pb', 'gl']} /></div>
            </div>
        </div>
    );
}

export default Weather;