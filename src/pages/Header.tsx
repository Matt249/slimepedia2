import React from 'react';
import pink from '../assets/slimes/pink.png';
import phosphor from '../assets/slimes/phosphor.png';

interface HeaderProps {
    dark: boolean;
}

export const Header: React.FC<HeaderProps> = ({ dark }) => {
    return (
        <header className="slimepedia-header">
            <img src={dark ? phosphor : pink} className="slimepedia-logo" alt="Pink Slime Logo" />
            <h1>Slimepedia 2</h1>
        </header>
    );
}

export default Header;