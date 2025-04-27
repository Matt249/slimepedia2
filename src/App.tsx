import React, { useEffect } from 'react';
import { slimeNames } from './text/slimes.js';
import Routes from './routes/index.jsx';
import 'overlayscrollbars/overlayscrollbars.css';
import './css/App.css';

function App() {
    document.title = "Slimepedia 2";

    useEffect(() => {
        const randomSlimeKey = slimeNames[Math.floor(Math.random() * Object.keys(slimeNames).length)];
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            (favicon as HTMLLinkElement).href = `/assets/slimes/${randomSlimeKey}.png`;
        }
    }, []);

    return (
        <div className="slimepedia-app">
            <Routes />
        </div>
    );
}

export default App;