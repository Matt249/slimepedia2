import { useState, useEffect } from 'react';
import { mediaFetcher } from '../media-manager';
import React from 'react';
import '../css/NavButton.css';

interface NavButtonProps {
    name?: string;
    icon?: string;
    size?: number;
    action?: () => void;
    selected?: boolean;
    tilting?: string;
}

export const NavButton: React.FC<NavButtonProps> = ({
    name = "Slimes",
    icon = "slimes/pink",
    size = 100,
    action = () => { },
    selected = false,
    tilting = "random"
}) => {
    const [tiltingSafe, setTiltingSafe] = useState(['left', 'none', 'right', 'random'].includes(tilting) ? tilting : "random");

    useEffect(() => {
        setTiltingSafe(['left', 'none', 'right', 'random'].includes(tilting) ? tilting : "random");
    }, [tilting]);

    const paddingBtn = size / 10;
    const paddingFrame = size / 6.66;
    const buttonStyle = {
        padding: paddingBtn + 'px'
    }
    const imgStyle = {
        width: size + 'px',
        height: size + 'px'
    }
    const titleStyle = {
        margin: "5px -" + paddingBtn + "px 0 -" + paddingBtn + "px",
        width: (Number(size) + (2 * (paddingFrame + paddingBtn))) + 'px',
        fontSize: (size / 6) + 'px',
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
    return (
        <div className={"button" + (selected ? " btn-selected" : "")} onClick={action} onMouseLeave={() => setRandomNumber(randomHandler())} style={buttonStyle}>
            <div className='image-frame'>
                <img src={mediaFetcher(icon + '.png')} alt={name} className={'image-button img-btn-' + randomNumber} style={imgStyle} />
            </div>
            <p className='btn-name' style={titleStyle}>{name}</p>
        </div>
    );
}