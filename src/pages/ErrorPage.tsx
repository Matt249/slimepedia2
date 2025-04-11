import { NavLink } from 'react-router-dom';
import React from 'react';

export const ErrorPage = () => {

    document.title = '404: Page not found';

    return (
        <header className="slimepedia-header">
            <img src='/assets/slimes/glitch.png' className="slimepedia-logo" alt="Pink Slime Logo" />
            <h1>404: Page not found</h1>
            <h2><NavLink to='/'>Go back to main menu</NavLink></h2>
        </header>
    );
}

export default ErrorPage;