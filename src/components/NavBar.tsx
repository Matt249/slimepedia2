import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavButton from "./NavButton";

const darkModeCheck = () => {
    const savedDarkMode: string | null = localStorage.getItem('darkMode');
    if (null === savedDarkMode) {
        console.info('No saved dark mode preference found. Checking system preference...');
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return savedDarkMode === "dark";
}

export const NavBar = () => {
    const noLink = { textDecoration: 'none' };
    const [darkMode, setDarkMode] = useState<boolean>(darkModeCheck());

    const darkModeHandle = () => {
        console.info('Dark mode handle triggered');
        const savedDarkMode: string | null = localStorage.getItem('darkMode');
        if (null === savedDarkMode) {
            console.info('No saved dark mode preference found. Checking system preference...');
            return setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        
        setDarkMode(savedDarkMode === "dark");
        console.log(localStorage.getItem('darkMode'));
    };

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode ? 'dark' : 'light');
        window.dispatchEvent(new Event('darkModeChange'));
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode])

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
                <NavButton
                    name="Switch Theme"
                    icon={darkMode ? 'misc/moon' : 'misc/sun'}
                    action={() => setDarkMode(!darkMode)}
                    tilting="random"
                    selected={false}
                />
            </div>
        </nav>
    );
};

export default NavBar;