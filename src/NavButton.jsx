import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './assets/css/NavButton.css';

export const NavButton = ({
    name = "Slimes",
    icon = "slimes/pink",
    size = 100,
    action = () => console.log("ça a cliqué"),
    selected = false,
    tilting = "random"
}) => {
    const [tiltingSafe, setTiltingSafe] = useState(['left', 'none', 'right', 'random'].includes(tilting) ? tilting : "random");

    useEffect(() => {
        setTiltingSafe(['left', 'none', 'right', 'random'].includes(tilting) ? tilting : "random");
    }, [tilting]);

    const paddingBtn = size / 10;
    const paddingImg = size / 6.66;
    const buttonStyle = {
        padding: paddingBtn + 'px'
    }
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
        fontSize: (size / 5) + 'px',
    }
    const randomHandler = () => {
        switch (tiltingSafe) {
            case 'left':
                return 0;
            case 'right':
                return 2;
            case 'random':
                return Math.floor(Math.random() * 3);
            default:
                return 1;
        }
    }
    const [randomNumber, setRandomNumber] = useState(randomHandler());
    const image = require(`./assets/${icon}.png`);
    return (
        <div className={"button" + (selected ? " selected" : "")} onClick={action} onMouseLeave={() => setRandomNumber(randomHandler())} style={buttonStyle}>
            <div className='image-frame' style={frameStyle}>
                <img src={image} alt={name} className={'image-bouton img-btn-' + randomNumber} style={imgStyle} />
            </div>
            <p className='btn-name' style={titleStyle}>{name}</p>
        </div>
    );
}

NavButton.propTypes = {
    name: PropTypes.string,
    icon: PropTypes.string,
    size: PropTypes.number,
    action: PropTypes.func,
    selected: PropTypes.bool,
    tilting: PropTypes.string
};