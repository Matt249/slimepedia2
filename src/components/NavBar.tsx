import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import NavButton from "./NavButton";

export const NavBar = () => {
    const noLink = { textDecoration: 'none' };

    const isDarkMode = () => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
            return savedDarkMode === 'true';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode();
        localStorage.setItem('darkMode', String(newDarkMode));
        document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
        window.dispatchEvent(new Event('darkModeChange'));
    };

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode !== null)
            document.documentElement.setAttribute('data-theme', savedDarkMode === 'true' ? 'dark' : 'light');
        else
            document.documentElement.setAttribute('data-theme',
                window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            );
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

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
                    icon={isDarkMode() ? 'misc/sun' : 'misc/moon'}
                    action={toggleDarkMode}
                    tilting="random"
                    selected={false}
                />
            </div>
        </nav>
    );
};

export default NavBar;