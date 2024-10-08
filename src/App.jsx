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

  const tabList = useMemo(() => ['slimes', 'food', 'items', 'regions', 'weather', 'blueprints', 'buildings', 'map'], []); const toggleTheme = () => { setDarkMode(!darkMode); };

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
        setTabToRender(<Slimes slime={targetTab === null ? "pink" : targetTab} changePage={handleTabClick} />);
        break;
      case 'food':
        setTabToRender(<Food food={targetElement === null ? "carrot" : targetElement} tab={targetTab === null ? "food" : targetTab} changePage={handleTabClick} />);
        break;
      case 'items':
        setTabToRender(<Items item={targetElement === null ? "brine" : targetElement} tab={targetTab === null ? "resources" : targetTab} changePage={handleTabClick} />);
        break;
      case 'regions':
        setTabToRender(<Regions />);
        break;
      case 'buildings':
        setTabToRender(<Buildings />);
        break;
      default:
        setTabToRender(<Header />);
    }
  }, [activeTab, targetTab, darkMode, handleTabClick, targetElement]);

  useEffect(() => {
    const randomSlimeKey = slimesList[Object.keys(slimesList)[Math.floor(Math.random() * Object.keys(slimesList).length)]][0];
    document.querySelector('link[rel="icon"]').href = require(`./assets/slimes/${randomSlimeKey}.png`);
  }, []);

  return (
    <div className="App">
      <nav className="box-layout">
        <NavButton name="Slimes" icon="slimes/pink" action={() => handleTabClick('slimes')} selected={activeTab === 'slimes'} />
        <NavButton name="Food" icon="food/food" action={() => handleTabClick('food')} selected={activeTab === 'food'} />
        <NavButton name="Items" icon="misc/res" action={() => handleTabClick('items')} selected={activeTab === 'items'} />
        <NavButton name="Regions" icon="misc/world" action={() => handleTabClick('regions')} selected={activeTab === 'regions'} />
        <NavButton name="Weather" icon="misc/weather" action={() => handleTabClick('weather')} selected={activeTab === 'weather'} />
        <NavButton name="Blueprints" icon="misc/blueprint" action={() => handleTabClick('blueprints')} selected={activeTab === 'blueprints'} />
        <NavButton name="Buildings" icon="misc/building" action={() => handleTabClick('buildings')} selected={activeTab === 'buildings'} />
        {/*<BoutonNav name="World Map" icon="misc/map" action={() => handleTabClick('map')} selected={activeTab === 'map'} />*/}
        <div className="theme-btn-container">
          <NavButton name="Switch Theme" icon={themeIcon} action={() => toggleTheme()} />
        </div>
      </nav>
      {tabToRender}
    </div>
  );
}

export default App;