import { NavLink } from "react-router-dom"
import { NavButton } from "./NavButton"
import { useEffect, useState } from "react"
import React from "react";
import houseDay from '../assets/wallpapers/houseDay.png';
import houseNight from '../assets/wallpapers/houseNight.png';
import { mediaFetcher } from "../media-manager";

export const NavBar = () => {
    const navBtnSize = undefined //100;
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
        }
        document.body.style.backgroundImage = `url(${darkMode ? houseNight : houseDay})`;
        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);
    return (
        <nav className="box-layout">
            <NavLink style={noLink} to="/slimes">
                <NavButton name="Slimes" icon="slimes/pink" size={navBtnSize} tilting="left" />
            </NavLink>
            <NavLink style={noLink} to="/food">
                <NavButton name="Food" icon="food/food" size={navBtnSize} tilting="right" />
            </NavLink>
            <NavLink style={noLink} to="/items">
                <NavButton name="Items" icon="misc/res" size={navBtnSize} tilting="left" />
            </NavLink>
            <NavLink style={noLink} to="/map">
                <NavButton name="Interactive Map" icon="misc/map" size={navBtnSize} tilting="none" />
            </NavLink>
            <NavLink style={noLink} to="/regions/fields">
                <NavButton name="Regions" icon="misc/world" size={navBtnSize} tilting="left" />
            </NavLink>
            <NavLink style={noLink} to="/weather">
                <NavButton name="Weather" icon="misc/weather" size={navBtnSize} tilting="none" />
            </NavLink>
            <NavLink style={noLink} to="/blueprints">
                <NavButton name="Blueprints" icon="misc/blueprint" size={navBtnSize} tilting="none" />
            </NavLink>
            <NavLink style={noLink} to="/buildings/corral">
                <NavButton name="Buildings" icon="misc/patch" size={navBtnSize} tilting="none" />
            </NavLink>

            <div className="theme-btn-container">
                <NavButton name="Switch Theme" icon={darkMode ? 'misc/sun' : 'misc/moon'} size={navBtnSize} action={() => setDarkMode(!darkMode)} tilting="random" />
            </div>
        </nav>
    )
}