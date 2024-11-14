import { PropTypes } from 'prop-types';
import pink from '../assets/slimes/pink.png';
import phosphor from '../assets/slimes/phosphor.png';

export const Header = ({ dark }) => {
    return (
        <header className="App-header">
            <img src={dark ? phosphor : pink} className="App-logo" alt="logo" />
            <h1>Slimepedia 2</h1>
        </header>
    );
}

Header.propTypes = {
    dark: PropTypes.bool
};