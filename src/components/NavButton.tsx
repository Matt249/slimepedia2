import React, { useState, useEffect } from 'react';
import { mediaFetcher } from '../media-manager';
import '../css/NavButton.css';

interface NavButtonProps {
    name?: string;
    icon?: string;
    size?: number;
    action?: () => void;
    selected?: boolean;
    tilting?: string;
    visible?: boolean;
}

export const NavButton: React.FC<NavButtonProps> = ({
    name = "Slimes",
    icon = "slimes/pink",
    size = 1,
    action = () => { },
    selected = false,
    tilting = "random",
    visible = true
}) => {
    const [tiltingSafe, setTiltingSafe] = useState(['left', 'none', 'right', 'random'].includes(tilting) ? tilting : 'random');

    useEffect(() => {
        setTiltingSafe(['left', 'none', 'right', 'random'].includes(tilting) ? tilting : 'random');
    }, [tilting]);

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
        <button
            className={"button" + (selected ? " btn-selected" : "")}
            onClick={action}
            onMouseLeave={() => setRandomNumber(randomHandler())}
            style={{ '--btn-size': `${size * 5}em`, visibility: visible ? 'shown' : 'hidden' } as React.CSSProperties}
        >
            <div className='image-frame'>
                <img src={mediaFetcher(icon + '.png')} alt={name} className={'image-button img-btn-' + randomNumber} />
            </div>
            <p>{name}</p>
        </button>
    );
}