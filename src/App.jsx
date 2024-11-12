import { NavButton } from './components/NavButton.jsx';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { slimeNames } from './text/slimes.js';
import { Slimes } from './pages/Slimes';
import { Food } from './pages/Food.jsx';
import { Items } from './pages/Items';
import { Map } from './pages/Map';
import { Regions } from './pages/Regions';
import { Blueprints } from './pages/Blueprints';
import { Buildings } from './pages/Buildings';
import PropTypes from 'prop-types';
import houseDay from '/src/assets/wallpapers/houseDay.png';
import houseNight from '/src/assets/wallpapers/houseNight.png';
import pink from '/src/assets/slimes/pink.png';
import phosphor from '/src/assets/slimes/phosphor.png';
import './css/App.css';

const Header = ({ dark }) => {
    return (
        <header className="App-header">
            <img src={dark ? phosphor : pink} className="App-logo" alt="logo" />
            <h1>Slimepedia 2</h1>
        </header>
    );
}

Header.propTypes = {
    dark: PropTypes.bool
};

function App() {
    document.title = "Slimepedia 2";

    const [activeTab, setActiveTab] = useState('main');
    const [targetTab, setTargetTab] = useState(null);
    const [targetElement, setTargetElement] = useState(null);

    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });
    const themeIcon = 'misc/' + (darkMode ? 'moon' : 'sun');
    const [tabToRender, setTabToRender] = useState(null);
    const tabList = useMemo(() => ['slimes', 'food', 'items', 'map', 'regions', 'weather', 'blueprints', 'buildings'], []);

    const toggleTheme = () => { setDarkMode(!darkMode); };
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        var rootStyle = document.querySelector(':root').style;
        rootStyle.setProperty('--menu-color-0', darkMode ? '#222' : '#EFE7D4');
        rootStyle.setProperty('--menu-color-1', darkMode ? '#181818' : '#E9DDC7');
        rootStyle.setProperty('--item-color', darkMode ? '#000' : '#D2B394');
        rootStyle.setProperty('--text-color', darkMode ? '#fff' : '#000');
        rootStyle.setProperty('--background-color', darkMode ? '#000' : '#EFE7D4');
        document.body.style.backgroundImage = `url(${darkMode ? houseNight : houseDay})`;
    }, [darkMode]);

    const handleTabClick = useCallback((tab, target, element) => {
        if (tabList.includes(tab))
            setActiveTab(tab !== activeTab ? tab : 'main');
        else
            setActiveTab('main');
        setTargetTab(target ? target : null);
        setTargetElement(element ? element : null);
    }, [activeTab, tabList]);

    const [wideScreen, setWideScreen] = useState(window.matchMedia("(min-width: 2560px)").matches);
    useEffect(() => {
        const handleResize = () => {
            setWideScreen(window.matchMedia("(min-width: 2560px)").matches);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    var navBtnSize = wideScreen ? 125 : 100;

    useEffect(() => {
        switch (activeTab) {
            case 'main':
                setTabToRender(<Header dark={darkMode} />);
                break;
            case 'slimes':
                setTabToRender(<Slimes slime={targetTab === null ? "pink" : targetTab} changePage={handleTabClick} />);
                break;
            case 'food':
                setTabToRender(<Food food={targetElement === null ? "carrot" : targetElement} tab={targetTab === null ? "food" : targetTab} changePage={handleTabClick} />);
                break;
            case 'items':
                setTabToRender(<Items item={targetElement === null ? "brine" : targetElement} tab={targetTab === null ? "resources" : targetTab} changePage={handleTabClick} />);
                break;
            case 'map':
                setTabToRender(<Map />);
                break;
            case 'regions':
                setTabToRender(<Regions region={targetElement === null ? "fields" : targetElement} changePage={handleTabClick} />);
                break;
            case 'blueprints':
                setTabToRender(<Blueprints />);
                break;
            case 'buildings':
                setTabToRender(<Buildings />);
                break;
            default:
                setTabToRender(<Header />);
        }
    }, [activeTab, targetTab, darkMode, handleTabClick, targetElement]);

    useEffect(() => {
        const randomSlimeKey = slimeNames[Math.floor(Math.random() * Object.keys(slimeNames).length)];
        document.querySelector('link[rel="icon"]').href = `/src/assets/slimes/${randomSlimeKey}.png`;
    }, []);

    return (
        <div className="App">
            <nav className="box-layout">
                <NavButton name="Slimes" icon="slimes/pink" size={navBtnSize} action={() => handleTabClick('slimes')} selected={activeTab === 'slimes'} tilting="left" />
                <NavButton name="Food" icon="food/food" size={navBtnSize} action={() => handleTabClick('food')} selected={activeTab === 'food'} tilting="right" />
                <NavButton name="Items" icon="misc/res" size={navBtnSize} action={() => handleTabClick('items')} selected={activeTab === 'items'} tilting="left" />
                <NavButton name="Interactive Map" icon="misc/map" size={navBtnSize} action={() => handleTabClick('map')} selected={activeTab === 'map'} tilting="none" />
                <NavButton name="Regions" icon="misc/world" size={navBtnSize} action={() => handleTabClick('regions')} selected={activeTab === 'regions'} tilting="left" />
                <NavButton name="Weather" icon="misc/weather" size={navBtnSize} action={() => handleTabClick('weather')} selected={activeTab === 'weather'} tilting="none" />
                <NavButton name="Blueprints" icon="misc/blueprint" size={navBtnSize} action={() => handleTabClick('blueprints')} selected={activeTab === 'blueprints'} tilting="none" />
                <NavButton name="Buildings" icon="misc/patch" size={navBtnSize} action={() => handleTabClick('buildings')} selected={activeTab === 'buildings'} tilting="none" />
                <div className="theme-btn-container">
                    <NavButton name="Switch Theme" icon={themeIcon} size={navBtnSize} action={() => toggleTheme()} tilting="random" />
                </div>
            </nav>
            {tabToRender}
        </div>
    );
}

export default App;