import { useState, useEffect, useMemo, useCallback } from 'react';
import { slimeNames, slimesList, slimesText, slimepedia, foodTypes } from '../text/slimes.js';
import { NavButton } from '../components/NavButton.jsx';
import { Biomes } from '../components/Biomes.jsx';
import { foodList } from '../text/food.js';
import { toysList } from '../text/toys.js';
import PropTypes from 'prop-types';
import largo from '/src/assets/misc/largo.png';
import none from '/src/assets/misc/none.png';
import arrow from '/src/assets/misc/arrow.png';
import pediaSlime from '/src/assets/misc/pediaslime.png';
import pediaRisks from '/src/assets/misc/pediarisks.png';
import pediaPlort from '/src/assets/misc/pediaplort.png';
import '../css/Pedia.css';
import { mediaFetcher } from '../media-manager.js';

const SlimeDetails = ({ currentSlimeList, selectedSlime, changePage }) => {
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
                    <h2>{slimesText[currentSlimeList[0]] ? slimesText[currentSlimeList[0]] : ''}</h2>
                </div>
                <div className='image-container'>
                    <img src={slimeIcon} className='img-main' alt={'Picture of ' + slimeName} />
                </div>
                <img src={plortIcon} className='img-plort' alt={'Plort of ' + slimeName} />
            </div>
            <div
                className={'little-box box-food' + (!['none', 'ranchersnslimes'].includes(currentSlimeList[2]) ? ' link-to-food' : '')}
                onClick={() => { if (!['none', 'ranchersnslimes'].includes(currentSlimeList[2])) changePage('food', currentSlimeList[1], (currentSlimeList[2] === 'none' ? 'carrot' : currentSlimeList[2])) }}
            >
                <img src={foodTypeIcon} alt={'Picture of ' + foodTypes[currentSlimeList[2]]} />
                <div>
                    <h3>Diet</h3>
                    <h4>{foodTypes[currentSlimeList[1]]}</h4>
                </div>
            </div>
            <div
                className={'little-box box-fav' + (['none', 'ranchersnslimes'].includes(currentSlimeList[2]) ? '' : ' link-to-food')}
                onClick={() => { if (!['none', 'ranchersnslimes'].includes(currentSlimeList[2])) changePage('food', 'food', currentSlimeList[2]); }}
            >
                <img src={favFoodIcon} alt={'Picture of ' + foodList[currentSlimeList[2]][0]} />
                <div>
                    <h3>Favorite Food</h3>
                    <h4>{foodList[currentSlimeList[2]][0]}</h4>
                </div>
            </div>
            <div className='little-box box-largo'>
                <img src={(currentSlimeList[3]) ? largo : none} alt={currentSlimeList[4] ? 'Largo-able' : 'Non largo-able'} />
                <div>
                    <h3>Largo-able</h3>
                    <h4>{(currentSlimeList[3]) ? "Yes" : "No"}</h4>
                </div>
            </div>
            <div
                className={'little-box box-toy' + (currentSlimeList[5] === 'none' ? '' : ' link-to-food')}
                onClick={() => { if (currentSlimeList[5] !== 'none') changePage('items', 'toys', currentSlimeList[5]) }}
            >
                <img src={favToyIcon} alt={slimeToy[0]} />
                <div>
                    <h3>Favorite Toy</h3>
                    <h4>{slimeToy[0]}</h4>
                </div>
            </div>
            <Biomes spawnList={currentSlimeList[4]} changePage={changePage} />
        </>
    );
};

SlimeDetails.propTypes = {
    currentSlimeList: PropTypes.arrayOf(PropTypes.any).isRequired,
    selectedSlime: PropTypes.string.isRequired,
    changePage: PropTypes.func.isRequired
};


const SlimeDescription = ({ slimepediaEntry, topBtn }) => (
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

SlimeDescription.propTypes = {
    slimepediaEntry: PropTypes.arrayOf(PropTypes.string).isRequired,
    topBtn: PropTypes.bool.isRequired
};

export const Slimes = ({
    slime = 'pink',
    changePage = ({ args }) => { console.log('changePage not defined, args={', args, '}') }
}) => {
    const [topBtn, setTopBtn] = useState(false);
    const [currentSlime, setSlime] = useState(slime && slime in slimesList ? slime : 'pink');
    const updateSlime = useCallback((slime) => {
        setSlime(slime);
        setTopBtn(false);
    }, []);
    const currentSlimeList = slimesList[currentSlime];
    const slimepediaEntry = useMemo(() => slimepedia[currentSlime] ? slimepedia[currentSlime] : slimepedia['lorem'], [currentSlime]);

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

    return (
        <div>
            <div className='list-slime'>
                {slimeNames.map((slime) => (
                    <NavButton
                        key={slime}
                        icon={`slimes/${slime}`}
                        size={wideScreen ? 125 : 100}
                        name={slimesList[slime][0]}
                        action={() => updateSlime(slime)}
                        selected={currentSlime === slime}
                    />
                ))}
            </div>
            <div className='slime-presentation box-layout-secondary'>
                <div className={'slime-infos' + (topBtn ? ' hidden-infos' : '')}>
                    <SlimeDetails currentSlimeList={currentSlimeList} changePage={changePage} selectedSlime={currentSlime} />
                </div>
                <div className={'arrow-btn ' + (topBtn ? 'top-btn' : 'bot-btn')} onClick={() => setTopBtn(!topBtn)}>
                    <img src={arrow} alt='Expand arrow' />
                </div>
                <SlimeDescription slimepediaEntry={slimepediaEntry} topBtn={topBtn} />
            </div>
        </div>
    );
};

Slimes.propTypes = {
    slime: PropTypes.string,
    changePage: PropTypes.func
};