import React, { useState, useEffect } from 'react';

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

    return (
        <header className="slimepedia-header">
            <img src={darkMode ? '../assets/slimes/phosphor.png' : '../assets/slimes/pink.png'} className="slimepedia-logo" alt="Slime Logo" />
            <h1>Slimepedia 2</h1>
        </header>
    );
}

export default Header;