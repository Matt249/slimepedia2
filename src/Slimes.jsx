import { useState, useEffect } from 'react';
import './assets/css/Pedia.css';
import { NavButton } from './NavButton.jsx';
import { Biomes } from './Biomes.jsx';
import { slimesList, foodList, toys, foodTypes } from './listeSlimes.js';
import { slimesText, slimepedia } from './assets/text/slimepedia.js';
import largo from './assets/misc/largo.png';
import none from './assets/misc/none.png';
import pediaSlime from './assets/misc/pediaslime.png';
import pediaRisks from './assets/misc/pediarisks.png';
import pediaPlort from './assets/misc/pediaplort.png';
import arrow from './assets/misc/arrow.png';

export const Slimes = ({
    slime = 'pink',
    changePage = ({ args }) => { console.log('changePage not defined, args={', args, '}') }
}) => {
    const [topBtn, setTopBtn] = useState(false);
    const [slimeActuel, setSlime] = useState(slime && slime in slimesList ? slime : 'pink');
    const updateSlime = (slime) => {
        setSlime(slime);
        setTopBtn(false);
    }
    const currentSlime = slimesList[slimeActuel];
    const slimeName = currentSlime[1];
    const slimeIcon = require('./assets/' + (currentSlime[0] === "none" ? "misc/none" : "slimes/" + currentSlime[0]) + '.png');
    const plortIcon = require('./assets/' + (["none", "lucky", "tarr"].includes(currentSlime[0]) ? "misc/none" : "plorts/" + currentSlime[0]) + '.png');
    const foodTypeIcon = require('./assets/' + (currentSlime[2] === "none" ? "misc/none" : "food/" + currentSlime[2]) + '.png');
    const favFoodIcon = require('./assets/' + (currentSlime[3] === "none" ? "misc/none" : "food/" + currentSlime[3]) + '.png');
    const favToyIcon = require('./assets/' + (currentSlime[6] === "none" ? "misc/none" : "toys/" + currentSlime[6]) + '.png');
    let foodCheck = currentSlime[0] === "ranchersnslimes" ?
        ['ranchersnslimes', 'Ranchers and Slimes', 'ranchersandslimes', ['co', 'rf', 'ss', 'ev', 'pb']]
        : foodList.find(food => food[0] === currentSlime[3]);
    const currentFood = foodCheck ? foodCheck[1] : 'None';
    const slimepediaEntry = slimepedia[currentSlime[0]] ? slimepedia[currentSlime[0]] : slimepedia['lorem'];
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
        <div className='box-layout slimes-menu'>
            <div className='list-slime'>
                {Object.values(slimesList).map((slime) => (
                    <NavButton
                        key={slime[0]}
                        icon={`slimes/${slime[0]}`}
                        size={wideScreen ? 125 : 100}
                        name={slime[1]}
                        action={() => updateSlime(slime[0])}
                        selected={slimeActuel === slime[0]}
                    />
                ))}
            </div>
            <div className='slime-presentation box-layout-secondary'>
                <div className={'slime-infos' + (topBtn ? ' hidden-infos' : '')}>
                    <div className="image-title">
                        <div className="info-title">
                            <h1>{slimeName}</h1>
                            <h2>{slimesText[currentSlime[0]] ? slimesText[currentSlime[0]] : ''}</h2>
                        </div>
                        <div className='image-container'>
                            <img src={slimeIcon} className='img-main' alt={'Picture of ' + slimeName} />
                        </div>
                        <img src={plortIcon} className='img-plort' alt={'Plort of ' + slimeName} />
                    </div>
                    <div
                        className={'little-box box-food' + (!['none', 'ranchersnslimes'].includes(currentSlime[2]) ? ' link-to-food' : '')}
                        onClick={() => { if (!['none', 'ranchersnslimes'].includes(currentSlime[2])) changePage('food', currentSlime[2], (currentSlime[3] === 'none' ? 'carrot' : currentSlime[3])) }}
                    >
                        <img src={foodTypeIcon} alt={'Picture of ' + foodTypes[currentSlime[2]]} />
                        <div>
                            <h3>Diet</h3>
                            <h4>{foodTypes[currentSlime[2]]}</h4>
                        </div>
                    </div>
                    <div
                        className={'little-box box-fav' + (['none', 'ranchersnslimes'].includes(currentSlime[3]) ? '' : ' link-to-food')}
                        onClick={() => { if (!['none', 'ranchersnslimes'].includes(currentSlime[3])) changePage('food', 'food', currentSlime[3]) }}
                    >
                        <img src={favFoodIcon} alt={'Picture of ' + currentFood} />
                        <div>
                            <h3>Favorite Food</h3>
                            <h4>{currentFood}</h4>
                        </div>
                    </div>
                    <div className='little-box box-largo'>
                        <img src={(currentSlime[4]) ? largo : none} alt={currentSlime[4] ? 'Largo-able' : 'Non largo-able'} />
                        <div>
                            <h3>Largo-able</h3>
                            <h4>{(currentSlime[4]) ? "Yes" : "No"}</h4>
                        </div>
                    </div>
                    <div
                        className={'little-box box-toy' + (currentSlime[6] === 'none' ? '' : ' link-to-food')}
                        onClick={() => { if (currentSlime[6] !== 'none') changePage('items', 'toys', currentSlime[6]) }}
                    >
                        <img src={favToyIcon} alt={toys[currentSlime[6]]} />
                        <div>
                            <h3>Favorite Toy</h3>
                            <h4>{toys[currentSlime[6]]}</h4>
                        </div>
                    </div>
                    <Biomes spawnList={currentSlime[5]} changePage={changePage}/>
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