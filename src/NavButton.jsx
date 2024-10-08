import { useState } from 'react';
import PropTypes from 'prop-types';
import './assets/css/NavButton.css';

export const NavButton = ({
    name = "Slimes",
    icon = "slimes/pink",
    size = 100,
    action = () => console.log("ça a marché"),
    selected = false
}) => {
    const paddingBtn = 10;
    const paddingImg = 15;
    const frameStyle = {
        padding: paddingImg + 'px',
        borderRadius: size / 3 + 'px'
    }
    const imgStyle = {
        width: size + 'px',
        height: size + 'px'
    }
    const titleStyle = {
        margin: "5px -" + paddingBtn + "px 0 -" + paddingBtn + "px",
        width: (Number(size) + (2 * (paddingImg + paddingBtn))) + 'px',
        fontSize: (17) + 'px',
    }
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 3));
    const image = require(`./assets/${icon}.png`);
    return (
        <div className={"bouton" + (selected ? " selected" : "")} onClick={action} onMouseLeave={() => setRandomNumber(Math.floor(Math.random() * 3))}>
            <div className='image-frame' style={frameStyle} >
                <img src={image} alt={name} className={'image-bouton img-btn-' + randomNumber} style={imgStyle} />
            </div>
            <p className='btn-name' style={titleStyle}>{name}</p>
        </div>
    );
}

NavButton.propTypes = {
    name: PropTypes.string,
    icon: PropTypes.string,
    action: PropTypes.func,
    size: PropTypes.number
};