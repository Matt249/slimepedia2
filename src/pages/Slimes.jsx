import { useState, useEffect } from 'react';
import '../assets/css/Pedia.css';
import { NavButton } from '../NavButton.jsx';
import { Biomes } from '../Biomes.jsx';
import { slimeNames, slimesList, slimesText, slimepedia, foodTypes } from '../assets/text/slimes.js';
import { foodList } from '../assets/text/food.js';
import largo from '../assets/misc/largo.png';
import none from '../assets/misc/none.png';
import pediaSlime from '../assets/misc/pediaslime.png';
import pediaRisks from '../assets/misc/pediarisks.png';
import pediaPlort from '../assets/misc/pediaplort.png';
import arrow from '../assets/misc/arrow.png';
import { toysList } from '../assets/text/toys.js';

export const Slimes = ({
    slime = 'pink',
    changePage = ({ args }) => { console.log('changePage not defined, args={', args, '}') }
}) => {
    const [topBtn, setTopBtn] = useState(false);
    const [currentSlime, setSlime] = useState(slime && slime in slimesList ? slime : 'pink');
    const updateSlime = (slime) => {
        setSlime(slime);
        setTopBtn(false);
    }
    const currentSlimeList = slimesList[currentSlime];
    const slimeName = currentSlimeList[0];
    const slimeIcon = require('../assets/' + (currentSlime === "none" ? "misc/none" : "slimes/" + currentSlime) + '.png');
    const plortIcon = require('../assets/' + (["none", "lucky", "tarr"].includes(currentSlime) ? "misc/none" : "plorts/" + currentSlime) + '.png');
    const foodTypeIcon = require('../assets/' + (currentSlimeList[1] === "none" ? "misc/none" : "food/" + currentSlimeList[1]) + '.png');
    const favFoodIcon = require('../assets/' + (currentSlimeList[2] === "none" ? "misc/none" : "food/" + currentSlimeList[2]) + '.png');
    const favToyIcon = require('../assets/' + (currentSlimeList[5] === "none" ? "misc/none" : "toys/" + currentSlimeList[5]) + '.png');
    const slimepediaEntry = slimepedia[currentSlime] ? slimepedia[currentSlime] : slimepedia['lorem'];
    const slimeToy = toysList[currentSlimeList[5]] ? toysList[currentSlimeList[5]] : 'none';

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
    console.log(slimeToy);
    return (
        <div className='box-layout slimes-menu'>
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
                    <div className="image-title">
                        <div className="info-title">
                            <h1>{slimeName}</h1>
                            <h2>{slimesText[currentSlime] ? slimesText[currentSlime] : ''}</h2>
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
                        className={'little-box box-fav' + (['none', 'ranchersnslimes'].includes(currentSlimeList[3]) ? '' : ' link-to-food')}
                        onClick={() => { if (!['none', 'ranchersnslimes'].includes(currentSlimeList[3])) changePage('food', 'food', currentSlimeList[2]) }}
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
                        className={'little-box box-toy' + (currentSlimeList[6] === 'none' ? '' : ' link-to-food')}
                        onClick={() => { if (currentSlimeList[6] !== 'none') changePage('items', 'toysList', currentSlimeList[5]) }}
                    >
                        <img src={favToyIcon} alt={slimeToy[0]} />
                        <div>
                            <h3>Favorite Toy</h3>
                            <h4>{slimeToy[0]}</h4>
                        </div>
                    </div>
                    <Biomes spawnList={currentSlimeList[4]} changePage={changePage} />
                </div>
                <div className={'arrow-btn ' + (topBtn ? 'top-btn' : 'bot-btn')} onClick={() => setTopBtn(!topBtn)}>
                    <img src={arrow} alt='Expand arrow' />
                </div>
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
            </div>
        </div>
    )
}