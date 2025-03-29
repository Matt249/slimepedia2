import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { NavButton } from "./NavButton";
import houseDay from '../assets/wallpapers/houseDay.png';
import houseNight from '../assets/wallpapers/houseNight.png';

export const NavBar = () => {
    const noLink = { textDecoration: 'none' };

    // Détecter la préférence initiale du mode sombre
    const getInitialDarkMode = () => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
            return savedDarkMode === 'true';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    const [darkMode, setDarkMode] = useState(getInitialDarkMode);

    useEffect(() => {
        // Basculer entre les thèmes en modifiant l'attribut data-theme
        const rootElement = document.documentElement;
        rootElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');

        // Mettre à jour l'image de fond
        document.body.style.backgroundImage = `url(${darkMode ? houseNight : houseDay})`;

        // Sauvegarder la préférence dans localStorage
        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            // Ne changer dynamiquement que si l'utilisateur n'a pas explicitement choisi un thème
            const savedDarkMode = localStorage.getItem('darkMode');
            if (savedDarkMode === null) {
                setDarkMode(e.matches);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
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
};

export default NavBar;