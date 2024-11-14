import { useState, useEffect } from 'react';
import { slimeNames } from './text/slimes.js';
import houseDay from '/src/assets/wallpapers/houseDay.png';
import houseNight from '/src/assets/wallpapers/houseNight.png';
import './css/App.css';
import { mediaFetcher } from './media-manager.js';
import Routes from './Routes/';

function App() {
    document.title = "Slimepedia 2";
    useEffect(() => {
        const darkMode = localStorage.getItem('darkMode')
        if (typeof darkMode === Boolean) {
            localStorage.setItem('darkMode', darkMode);
        } else {
            localStorage.setItem('darkMode', (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches));
        }
        var rootStyle = document.querySelector(':root').style;
        rootStyle.setProperty('--menu-color-0', darkMode ? '#222' : '#EFE7D4');
        rootStyle.setProperty('--menu-color-1', darkMode ? '#181818' : '#E9DDC7');
        rootStyle.setProperty('--item-color', darkMode ? '#000' : '#D2B394');
        rootStyle.setProperty('--text-color', darkMode ? '#fff' : '#000');
        rootStyle.setProperty('--background-color', darkMode ? '#000' : '#EFE7D4');
        document.body.style.backgroundImage = `url(${darkMode ? houseNight : houseDay})`;
    }, [localStorage]);

    useEffect(() => {
        const randomSlimeKey = slimeNames[Math.floor(Math.random() * Object.keys(slimeNames).length)];
        document.querySelector('link[rel="icon"]').href = mediaFetcher(`slimes/${randomSlimeKey}.png`);
    }, []);

    return (
        <div className="App">
            <Routes />
        </div>
    );
}

export default App;