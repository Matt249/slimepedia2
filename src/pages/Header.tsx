import React, { useState, useEffect } from 'react';
import pink from '../assets/slimes/pink.png';
import phosphor from '../assets/slimes/phosphor.png';

export const Header: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(localStorage.getItem('darkMode') === 'true');

    useEffect(() => {
        const handleStorageChange = () => {
            setDarkMode(localStorage.getItem('darkMode') === 'true');
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const handleDarkModeChange = () => {
            setDarkMode(localStorage.getItem('darkMode') === 'true');
        };

        window.addEventListener('darkModeChange', handleDarkModeChange);

        return () => {
            window.removeEventListener('darkModeChange', handleDarkModeChange);
        };
    }, []);

    console.log('Header rendered', darkMode);

    return (
        <header className="slimepedia-header">
            <img src={darkMode ? phosphor : pink} className="slimepedia-logo" alt="Slime Logo" />
            <h1>Slimepedia 2</h1>
        </header>
    );
}

export default Header;