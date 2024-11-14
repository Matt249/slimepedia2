import { NavLink } from "react-router-dom"
import { NavButton } from "./NavButton"
import { useState } from "react"

export const NavBar = () => {
    const navBtnSize = 100;
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? savedMode : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    const noLink={ textDecoration: 'none' };
    return (
        <nav className="box-layout">
            <NavLink style={noLink} to="/slimes">
                <NavButton name="Slimes" icon="slimes/pink" size={navBtnSize} tilting="left" /></NavLink>
            <NavLink style={noLink} to="/food">
                <NavButton name="Food" icon="food/food" size={navBtnSize} tilting="right" />
            </NavLink>
            <NavLink style={noLink} to="/items">
                <NavButton name="Items" icon="misc/res" size={navBtnSize} tilting="left" />
            </NavLink>
            <NavLink style={noLink} to="/map">
                <NavButton name="Interactive Map" icon="misc/map" size={navBtnSize} tilting="none" />
            </NavLink>
            <NavLink style={noLink} to="/regions">
                <NavButton name="Regions" icon="misc/world" size={navBtnSize} tilting="left" />
            </NavLink>
            <NavLink style={noLink} to="/weather">
                <NavButton name="Weather" icon="misc/weather" size={navBtnSize} tilting="none" />
            </NavLink>
            <NavLink style={noLink} to="/blueprints">
                <NavButton name="Blueprints" icon="misc/blueprint" size={navBtnSize} tilting="none" />
            </NavLink>
            <NavLink style={noLink} to="/buildings">
                <NavButton name="Buildings" icon="misc/patch" size={navBtnSize} tilting="none" />
            </NavLink>

            <div className="theme-btn-container">
                <NavButton name="Switch Theme" icon={darkMode ? 'misc/sun' : 'misc/moon'} size={navBtnSize} onClick={() => setDarkMode(!darkMode)} tilting="random" />
            </div>
        </nav>
    )
}