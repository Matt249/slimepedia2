import { useEffect } from 'react';
import { slimeNames } from './text/slimes.js';
import { mediaFetcher } from './media-manager.js';
import React from 'react';
import Routes from './routes/index.jsx';
import './css/App.css';

function App() {
    document.title = "Slimepedia 2";
    document.body.style.backgroundImage = `url(${mediaFetcher('wallpapers/houseDay.png')})`;

    useEffect(() => {
        const randomSlimeKey = slimeNames[Math.floor(Math.random() * Object.keys(slimeNames).length)];
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            (favicon as HTMLLinkElement).href = mediaFetcher(`slimes/${randomSlimeKey}.png`);
        }
    }, []);

    return (
        <div className="slimepedia-app">
            <Routes />
        </div>
    );
}

export default App;