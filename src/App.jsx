import houseDay from './assets/wallpapers/houseDay.png';
import houseNight from './assets/wallpapers/houseNight.png';
import { Header } from './Header';
import { NavButton } from './NavButton';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Slimes } from './Slimes';
import { Food } from './Food';
import { slimesList } from './listeSlimes';
import { Items } from './Items';
import { Regions } from './Regions';
import './assets/css/App.css';
import { Buildings } from './Buildings';

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
  const tabList = useMemo(() => ['slimes', 'food', 'items', 'regions', 'weather', 'blueprints', 'buildings'], []);
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

  useEffect(() => {
    switch (activeTab) {
      case 'main':
        setTabToRender(<Header dark={darkMode} />);
        break;
      case 'slimes':
        setTabToRender(<Slimes slime={targetTab === null ? "pink" : targetTab} changePage={handleTabClick} tilting="left" />);
        break;
      case 'food':
        setTabToRender(<Food food={targetElement === null ? "carrot" : targetElement} tab={targetTab === null ? "food" : targetTab} changePage={handleTabClick} tilting="right" />);
        break;
      case 'items':
        setTabToRender(<Items item={targetElement === null ? "brine" : targetElement} tab={targetTab === null ? "resources" : targetTab} changePage={handleTabClick} tilting="left" />);
        break;
      case 'regions':
        setTabToRender(<Regions tilting="left" />);
        break;
      case 'buildings':
        setTabToRender(<Buildings tilting="none" />);
        break;
      default:
        setTabToRender(<Header tilting="none" />);
    }
  }, [activeTab, targetTab, darkMode, handleTabClick, targetElement]);

  useEffect(() => {
    const randomSlimeKey = slimesList[Object.keys(slimesList)[Math.floor(Math.random() * Object.keys(slimesList).length)]][0];
    document.querySelector('link[rel="icon"]').href = require(`./assets/slimes/${randomSlimeKey}.png`);
  }, []);

  return (
    <div className="App">
      <nav className="box-layout">
        <NavButton name="Slimes" icon="slimes/pink" action={() => handleTabClick('slimes')} selected={activeTab === 'slimes'} tilting="left" />
        <NavButton name="Food" icon="food/food" action={() => handleTabClick('food')} selected={activeTab === 'food'} tilting="right" />
        <NavButton name="Items" icon="misc/res" action={() => handleTabClick('items')} selected={activeTab === 'items'} tilting="left" />
        <NavButton name="Regions" icon="misc/world" action={() => handleTabClick('regions')} selected={activeTab === 'regions'} tilting="left" />
        <NavButton name="Weather" icon="misc/weather" action={() => handleTabClick('weather')} selected={activeTab === 'weather'} tilting="none" />
        <NavButton name="Blueprints" icon="misc/blueprint" action={() => handleTabClick('blueprints')} selected={activeTab === 'blueprints'} tilting="none" />
        <NavButton name="Buildings" icon="misc/patch" action={() => handleTabClick('buildings')} selected={activeTab === 'buildings'} tilting="none" />
        <div className="theme-btn-container">
          <NavButton name="Switch Theme" icon={themeIcon} action={() => toggleTheme()} tilting="random" />
        </div>
      </nav>
      {tabToRender}
    </div>
  );
}

export default App;