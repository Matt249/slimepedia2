import { NavLink } from "react-router-dom";
import { NavButton } from "./NavButton";
import { useEffect, useState } from "react";
import React from "react";
import houseDay from '../assets/wallpapers/houseDay.png';
import houseNight from '../assets/wallpapers/houseNight.png';
import { mediaFetcher } from "../media-manager";

export const NavBar = () => {
    const noLink = { textDecoration: 'none' };

    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

    useEffect(() => {
        const rootElement = document.querySelector(':root') as HTMLElement | null;
        if (rootElement) {
            const rootStyle: CSSStyleDeclaration = (rootElement as HTMLElement).style;
            rootStyle.setProperty('--background-color', darkMode ? '#000' : '#EFE7D4');
            rootStyle.setProperty('--menu-color-0', darkMode ? '#000' : '#EFE7D4');
            rootStyle.setProperty('--menu-color-1', darkMode ? '#181818' : '#E9DDC7');
            rootStyle.setProperty('--item-color', darkMode ? '#222' : '#D2B394');
            rootStyle.setProperty('--text-color', darkMode ? '#fff' : '#000');
            rootStyle.setProperty('--pointer-style', 'url(' + (mediaFetcher('ui/map.png')) + '), pointer');
            rootStyle.setProperty('--link-color', darkMode ? 'lightskyblue' : '252466');
        }
        document.body.style.backgroundImage = `url(${darkMode ? houseNight : houseDay})`;
        localStorage.setItem('darkMode', darkMode.toString());
        window.dispatchEvent(new Event('darkModeChange'));
    }, [darkMode]);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
        window.dispatchEvent(new Event('darkModeChange'));
    };

    return (
        <nav className="box-layout">
            <NavLink style={noLink} to="/slimes">
                {({ isActive }) => (
                    <NavButton name="Slimes" icon="slimes/pink" tilting="left" selected={isActive} />
                )}
            </NavLink>
            <NavLink style={noLink} to="/food">
                {({ isActive }) => (
                    <NavButton name="Food" icon="food/food" tilting="right" selected={isActive} />
                )}
            </NavLink>
            <NavLink style={noLink} to="/items">
                {({ isActive }) => (
                    <NavButton name="Items" icon="misc/res" tilting="left" selected={isActive} />
                )}
            </NavLink>
            <NavLink style={noLink} to="/map">
                {({ isActive }) => (
                    <NavButton name="Interactive Map" icon="misc/map" tilting="none" selected={isActive} />
                )}
            </NavLink>
            <NavLink style={noLink} to="/regions/fields">
                {({ isActive }) => (
                    <NavButton name="Regions" icon="misc/world" tilting="left" selected={isActive} />
                )}
            </NavLink>
            <NavLink style={noLink} to="/weather">
                {({ isActive }) => (
                    <NavButton name="Weather" icon="misc/weather" tilting="none" selected={isActive} />
                )}
            </NavLink>
            <NavLink style={noLink} to="/blueprints">
                {({ isActive }) => (
                    <NavButton name="Blueprints" icon="misc/blueprint" tilting="none" selected={isActive} />
                )}
            </NavLink>
            <NavLink style={noLink} to="/buildings">
                {({ isActive }) => (
                    <NavButton name="Buildings" icon="misc/patch" tilting="none" selected={isActive} />
                )}
            </NavLink>

            <div className="theme-btn-container">
                <NavButton name="Switch Theme" icon={darkMode ? 'misc/sun' : 'misc/moon'} action={toggleDarkMode} tilting="random" selected={false} />
            </div>
        </nav>
    );
}

export default NavBar;