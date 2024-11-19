import { NavLink } from 'react-router-dom';
import glitch from '../assets/slimes/glitch.png';

export const ErrorPage = () => {
    return (
        <header className="slimepedia-header">
            <img src={glitch} className="slimepedia-logo" alt="Pink Slime Logo" />
            <h1>404: Page not found</h1>
            <h2><NavLink to='/'>Go back to main menu</NavLink></h2>
        </header>
    );
}