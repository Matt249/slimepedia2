import PropTypes from 'prop-types';
import React from 'react';
import pink from '../assets/slimes/pink.png';
import phosphor from '../assets/slimes/phosphor.png';

export const Header = ({ dark }) => {
    return (
        <header className="slimepedia-header">
            <img src={dark ? phosphor : pink} className="slimepedia-logo" alt="Pink Slime Logo" />
            <h1>Slimepedia 2</h1>
        </header>
    );
}

Header.propTypes = {
    dark: PropTypes.bool
};