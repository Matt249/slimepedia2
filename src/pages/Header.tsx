import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const updateDarkMode = () => {
        const isDarkMode = localStorage.getItem('darkMode') === 'dark';        
        setDarkMode(isDarkMode);
    };
    
    useEffect(() => {
        updateDarkMode();
        window.addEventListener('darkModeChange', updateDarkMode);

        return () => {
            window.removeEventListener('darkModeChange', updateDarkMode);
        };
    }, []);

    return (
        <header className="slimepedia-header">
            <img src={`/assets/slimes/${darkMode ? 'phosphor' : 'pink'}.png`} className="slimepedia-logo" alt="Slime Logo" />
            <h1>Slimepedia 2</h1>
        </header>
    );
};

export default Header;