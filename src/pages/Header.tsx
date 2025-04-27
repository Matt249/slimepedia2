import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(localStorage.getItem('darkMode') === 'true');

    useEffect(() => {
        const updateDarkMode = () => {
            const isDarkMode = localStorage.getItem('darkMode') === 'true';
            setDarkMode(isDarkMode);
            console.log('Dark mode updated:', isDarkMode);
        };

        // Surveille les modifications locales et les événements personnalisés
        window.addEventListener('storage', updateDarkMode);
        window.addEventListener('darkModeChange', updateDarkMode);

        return () => {
            window.removeEventListener('storage', updateDarkMode);
            window.removeEventListener('darkModeChange', updateDarkMode);
        };
    }, []);

    return (
        <header className="slimepedia-header">
            <img src={darkMode ? '/assets/slimes/phosphor.png' : '/assets/slimes/pink.png'} className="slimepedia-logo" alt="Slime Logo" />
            <h1>Slimepedia 2</h1>
        </header>
    );
};

export default Header;