import { useEffect } from 'react';
import { slimeNames } from './text/slimes.js';
import './css/App.css';
import { mediaFetcher } from './media-manager.js';
import Routes from './routes/index.jsx';
import houseDay from './assets/wallpapers/houseDay.png';

function App() {
    document.title = "Slimepedia 2";
    document.body.style.backgroundImage = `url(${houseDay})`;

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