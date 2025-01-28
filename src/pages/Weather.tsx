import React from "react";
import '../css/Weather.css';
import { weatherList, weatherNames } from "../text/weather";
import { mediaFetcher } from "../media-manager";

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
                        <video autoPlay loop muted className={`video-${weather}`}>
                            <source src={mediaFetcher(`videos/ps.webm`)} type="video/webm" />
                        </video>
                    </div>
                ))
                }
            </div>
            <div className="weather-info">weather infos</div>
        </div>
    );
}

export default Weather;