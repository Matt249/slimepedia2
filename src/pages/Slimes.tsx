import { useState, useEffect, useMemo } from 'react';
import { slimeNames, slimesList, slimesText, slimepedia } from '../text/slimes.js';
import { NavButton } from '../components/NavButton';
import { Biomes } from '../components/Biomes.js';
import { foodList, foodNames, foodTypes, foodTypesNames } from '../text/food.js';
import { toyNames, toysList } from '../text/toys.js';
import { mediaFetcher } from '../media-manager.js';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import largo from '/src/assets/misc/largo.png';
import none from '/src/assets/misc/none.png';
import arrow from '/src/assets/misc/arrow.png';
import pediaSlime from '/src/assets/misc/pediaslime.png';
import pediaRisks from '/src/assets/misc/pediarisks.png';
import pediaPlort from '/src/assets/misc/pediaplort.png';
import React from 'react';
import '../css/Pedia.css';

interface SlimeDetailsProps {
    currentSlimeList: [string, string, string, boolean, string[], string];
    selectedSlime: string;
}

const SlimeDetails: React.FC<SlimeDetailsProps> = ({ currentSlimeList, selectedSlime }) => {
    const slimeName = currentSlimeList[0];
    const slimeIcon = selectedSlime === "none" ? none : mediaFetcher(`slimes/${selectedSlime}.png`);
    const plortIcon = ["none", "lucky", "tarr"].includes(selectedSlime) ? none : mediaFetcher(`plorts/${selectedSlime}.png`);
    const foodTypeIcon = currentSlimeList[1] === "none" ? none : mediaFetcher(`food/${currentSlimeList[1]}.png`);
    const favFoodIcon = currentSlimeList[2] === "none" ? none : mediaFetcher(`food/${currentSlimeList[2]}.png`);
    const favToyIcon = currentSlimeList[5] === "none" ? none : mediaFetcher(`toys/${currentSlimeList[5]}.png`);
    const slimeToy = toysList[currentSlimeList[5]] ? toysList[currentSlimeList[5]] : 'none';

    return (
        <>
            <div className="image-title">
                <div className="info-title">
                    <h1>{slimeName}</h1>
                    <h2>{slimesText[selectedSlime]}</h2>
                </div>
                <div className='image-container'>
                    <img src={slimeIcon} className='img-main' alt={'Picture of ' + slimeName} />
                </div>
                <img src={plortIcon} className='img-plort' alt={'Plort of ' + slimeName} />
            </div>
            {foodTypesNames.includes(currentSlimeList[1]) ?
                <NavLink to={`/food/${currentSlimeList[1]}`} style={{ textDecoration: 'none' }}>
                    <div className='little-box box-food link-to-food'>
                        <img src={foodTypeIcon} alt={'Picture of ' + foodTypes[currentSlimeList[2]]} />
                        <div>
                            <h3>Diet</h3>
                            <h4>{foodTypes[currentSlimeList[1]]}</h4>
                        </div>
                    </div>
                </NavLink>
                :
                <div className='little-box box-food'>
                    <img src={foodTypeIcon} alt={'Picture of ' + foodTypes[currentSlimeList[2]]} />
                    <div>
                        <h3>Diet</h3>
                        <h4>{foodTypes[currentSlimeList[1]]}</h4>
                    </div>
                </div>
            }
            {foodNames.includes(currentSlimeList[2]) ?
                <NavLink to={`/food/${currentSlimeList[2]}`} style={{ textDecoration: 'none' }}>
                    <div className='little-box box-fav link-to-food'>
                        <img src={favFoodIcon} alt={'Picture of ' + foodList[currentSlimeList[2]][0]} />
                        <div>
                            <h3>Favorite Food</h3>
                            <h4>{foodList[currentSlimeList[2]][0]}</h4>
                        </div>
                    </div>
                </NavLink>
                :
                <div className='little-box box-fav'>
                    <img src={favFoodIcon} alt='None' />
                    <div>
                        <h3>Favorite Food</h3>
                        <h4>{['ash', 'ranchersnslimes'].includes(currentSlimeList[2]) ? foodList[currentSlimeList[2]][0] : 'None'}</h4>
                    </div>
                </div>
            }
            <div className='little-box box-largo'>
                <img src={(currentSlimeList[3]) ? largo : none} alt={currentSlimeList[4] ? 'Largo-able' : 'Non largo-able'} />
                <div>
                    <h3>Largo-able</h3>
                    <h4>{(currentSlimeList[3]) ? "Yes" : "No"}</h4>
                </div>
            </div>
            {toyNames.includes(currentSlimeList[5]) ?
                <NavLink to={`/items/toys/${currentSlimeList[5]}`} style={{ textDecoration: 'none' }}>
                    <div className='little-box box-toy link-to-food'>
                        <img src={favToyIcon} alt={slimeToy[0]} />
                        <div>
                            <h3>Favorite Toy</h3>
                            <h4>{slimeToy[0]}</h4>
                        </div>
                    </div>
                </NavLink>
                :
                <div className='little-box box-toy'>
                    <img src={favToyIcon} alt='None' />
                    <div>
                        <h3>Favorite Toy</h3>
                        <h4>None</h4>
                    </div>
                </div>
            }
            <Biomes spawnList={currentSlimeList[4]} />
        </>
    );
};

interface SlimeDescriptionProps {
    slimepediaEntry: [string, string, string];
    topBtn: boolean;
}

const SlimeDescription: React.FC<SlimeDescriptionProps> = ({ slimepediaEntry, topBtn }) => (
    <div className={'desc ' + (topBtn ? 'shown-desc' : 'hidden-desc')}>
        <div className='desc-title'>
            <img src={pediaSlime} alt='Slimeology' />
            <h3>Slimeology</h3>
        </div>
        <p>{slimepediaEntry[0]}</p>
        <div className='desc-title'>
            <img src={pediaRisks} alt='Rancher Risks' />
            <h3>Rancher Risks</h3>
        </div>
        <p>{slimepediaEntry[1]}</p>
        <div className='desc-title'>
            <img src={pediaPlort} alt='Plortonomics' />
            <h3>Plortonomics</h3>
        </div>
        <p>{slimepediaEntry[2]}</p>
    </div>
);

export const Slimes = () => {
    const { slime: slimeName } = useParams();

    const slime = slimeName || 'pink';
    const [topBtn, setTopBtn] = useState(false);
    useEffect(() => setTopBtn(false), [slime]);
    const currentSlimeList = slimesList[slime];
    const slimepediaEntry = useMemo(() => slimepedia[slime] ? slimepedia[slime] : slimepedia['lorem'], [slime]);

    const [wideScreen, setWideScreen] = useState(window.matchMedia("(min-width: 2560px)").matches);
    useEffect(() => {
        const handleResize = () => {
            setWideScreen(window.matchMedia("(min-width: 2560px)").matches);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (slimeName && !slimeNames.includes(slimeName)) {
        return (
            <Navigate to='/slimes/pink' />
        );
    }

    return (
        <div>
            <div className='list-slime'>
                {slimeNames.map((slimeName) => (
                    <NavLink to={`/slimes/${slimeName}`} style={{ textDecoration: 'none' }} key={slimeName}>
                        <NavButton
                            key={slimeName}
                            icon={`slimes/${slimeName}`}
                            size={wideScreen ? 125 : 100}
                            name={slimesList[slimeName][0]}
                            selected={slimeName === slime}
                        />
                    </NavLink>
                ))}
            </div>
            <div className='slime-presentation box-layout-secondary'>
                <div className={'slime-infos' + (topBtn ? ' hidden-infos' : '')}>
                    <SlimeDetails currentSlimeList={currentSlimeList} selectedSlime={slime} />
                </div>
                <div className={'arrow-btn ' + (topBtn ? 'top-btn' : 'bot-btn')} onClick={() => setTopBtn(!topBtn)}>
                    <img src={arrow} alt='Expand arrow' />
                </div>
                <SlimeDescription slimepediaEntry={slimepediaEntry} topBtn={topBtn} />
            </div>
        </div>
    );
};

export default Slimes;