import React, { useState, useEffect, useMemo } from 'react';
import { Slime, slimesList, slimesText, slimepedia } from '../text/slimes.js';
import { NavButton } from '../components/NavButton';
import { Biomes } from '../components/Biomes.js';
import { foodList, foodTypeList, foodTypeBlacklist, foodBlackList } from '../text/food.js';
import { toyNames } from '../text/toys.js';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { FaAngleDown } from 'react-icons/fa6';
import '../css/Pedia.css';
import { getEnumValue } from '../App.js';
import { Region, regionElements, regionInfos } from '../text/regions.js';
import { Weather, weatherList } from '../text/weather.js';

const nonePath = '/assets/misc/none.png';
const nonPlortSlimes = [null, Slime.Lucky, Slime.Tarr];
interface SlimeDetailsProps {
    selectedSlime: Slime | null;
}

const getSlimeSpawnlist= (slime: Slime | null) => {
    if (slime === null)
        return [];
    const spawnList: string[] = [];
    for (const [region, regionElement] of Object.entries(regionElements))
        if (regionElement[0].includes(slime))
            spawnList.push(regionInfos[region as Region][1]);
    for (const [weather, weatherElement] of Object.entries(weatherList))
        if (weatherElement[4].includes(slime))
            spawnList.push(weatherList[weather as Weather][1]);
    return spawnList;
}

const EmptySlimeDetails: React.FC = () => (
                <>
                <div className="image-title">
                    <div className="info-title">
                        <h1>Select a slime</h1>
                        <h2>Click on a slime on the list to get their information</h2>
                    </div>
                    <div className='image-container'>
                    </div>
                </div>
                <div className='little-box box-food disabled'>
                    <img src='/assets/food/food.png' alt='No slime selected' />
                    <div>
                        <h3>Diet</h3>
                        <h4>No slime selected</h4>
                    </div>
                </div>
                <div className='little-box box-fav disabled'>
                    <img src='/assets/food/food.png' alt='No slime selected' />
                    <div>
                        <h3>Favorite Food</h3>
                        <h4>No slime selected</h4>
                    </div>
                </div>
                <div className='little-box box-largo disabled'>
                    <img src='/assets/misc/largo.png' alt='No slime selected' />
                    <div>
                        <h3>Largo-able</h3>
                        <h4>No slime selected</h4>
                    </div>
                </div>
                <div className='little-box box-toy disabled'>
                    <img src='/assets/misc/toys.png' alt='No slime selected' />
                    <div>
                        <h3>Favorite Toy</h3>
                        <h4>No slime selected</h4>
                    </div>
                </div>
                <Biomes spawnList={[]} />
            </>
);

const SlimeDetails: React.FC<SlimeDetailsProps> = ({ selectedSlime }) => {
    if (selectedSlime === null) {
        return <EmptySlimeDetails />;
    }
    const currentSlimeList = slimesList[selectedSlime];

    const slimeName = currentSlimeList[0];

    const foodTypeIcon = currentSlimeList[1] === null ? nonePath : `/assets/food/${currentSlimeList[1]}.png`;
    const foodTypeName = currentSlimeList[1] == null ? 'None' : foodTypeList[currentSlimeList[1]][0];

    const favFoodIcon = currentSlimeList[2] === null ? nonePath : `/assets/food/${currentSlimeList[2]}.png`;
    const favFoodName = currentSlimeList[2] == null ? 'None' : foodList[currentSlimeList[2]][0];

    const toyIcon = currentSlimeList[4] === null ? nonePath : `/assets/toys/${currentSlimeList[4]}.png`;
    const toyName = currentSlimeList[4] != null ? toyNames[currentSlimeList[4]][0] ?? null : null;

    return (
        <>
            <div className="image-title">
                <div className="info-title">
                    <h1>{slimeName}</h1>
                    <h2>{slimesText[selectedSlime]}</h2>
                </div>
                <div className='image-container'>
                    <img src={selectedSlime === null ? nonePath : `/assets/slimes/${selectedSlime}.png`} className='img-main' alt={'Picture of ' + slimeName} />
                </div>
                {!nonPlortSlimes.includes(selectedSlime) && <img src={`/assets/plorts/${selectedSlime}.png`} className='img-plort' alt={'Plort of ' + slimeName} />}
            </div>
            {currentSlimeList[1] && foodTypeBlacklist.includes(currentSlimeList[1]) ?
                <div className='little-box box-food'>
                    <img src={foodTypeIcon} alt={'Picture of ' + foodTypeName} />
                    <div>
                        <h3>Diet</h3>
                        <h4>{foodTypeName}</h4>
                    </div>
                </div>
                :
                <NavLink to={`/food/${currentSlimeList[1]}`} style={{ textDecoration: 'none' }}>
                    <div className='little-box box-food link-to-food'>
                        <img src={foodTypeIcon} alt={'Picture of ' + foodTypeName} />
                        <div>
                            <h3>Diet</h3>
                            <h4>{foodTypeName}</h4>
                        </div>
                    </div>
                </NavLink>
            }
            {foodBlackList.includes(currentSlimeList[2]) ?
                <div className='little-box box-fav'>
                    <img src={favFoodIcon} alt='None' />
                    <div>
                        <h3>Favorite Food</h3>
                        <h4>{favFoodName}</h4>
                    </div>
                </div>
                :
                <NavLink to={`/food/${currentSlimeList[2]}`} style={{ textDecoration: 'none' }}>
                    <div className='little-box box-fav link-to-food'>
                        <img src={favFoodIcon} alt={'Picture of ' + favFoodName} />
                        <div>
                            <h3>Favorite Food</h3>
                            <h4>{favFoodName}</h4>
                        </div>
                    </div>
                </NavLink>
            }
            <div className='little-box box-largo'>
                <img src={(currentSlimeList[3]) ? '/assets/misc/largo.png' : '/assets/misc/none.png'} alt={currentSlimeList[4] ? 'Largo-able' : 'Non largo-able'} />
                <div>
                    <h3>Largo-able</h3>
                    <h4>{(currentSlimeList[3]) ? "Yes" : "No"}</h4>
                </div>
            </div>
            {toyName === null ?
                <div className='little-box box-toy'>
                    <img src={toyIcon} alt='None' />
                    <div>
                        <h3>Favorite Toy</h3>
                        <h4>None</h4>
                    </div>
                </div>
                :
                <NavLink to={`/items/toys/${currentSlimeList[4]}`} style={{ textDecoration: 'none' }}>
                    <div className='little-box box-toy link-to-food'>
                        <img src={toyIcon} alt={toyName[0]} />
                        <div>
                            <h3>Favorite Toy</h3>
                            <h4>{toyName}</h4>
                        </div>
                    </div>
                </NavLink>

            }
            <Biomes spawnList={getSlimeSpawnlist(selectedSlime)} />
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
            <img src='/assets/misc/pediaslime.png' alt='Slimeology' />
            <h3>Slimeology</h3>
        </div>
        <p>{slimepediaEntry[0]}</p>
        <div className='desc-title'>
            <img src='/assets/misc/pediarisks.png' alt='Rancher Risks' />
            <h3>Rancher Risks</h3>
        </div>
        <p>{slimepediaEntry[1]}</p>
        <div className='desc-title'>
            <img src='/assets/misc/pediaplort.png' alt='Plortonomics' />
            <h3>Plortonomics</h3>
        </div>
        <p>{slimepediaEntry[2]}</p>
    </div>
);

export const Slimes = () => {
    const {slime: slimeName } = useParams();

    const slime = getEnumValue(Slime, slimeName);
    const [topBtn, setTopBtn] = useState(false);
    useEffect(() => setTopBtn(false), [slime]);
    const slimepediaEntry: [string, string, string] = useMemo(() => slime === null ? ['', '', ''] : slimepedia[slime], [slime]);
    if (slime === null && slimeName !== undefined) {
        return (
    <Navigate to='/slimes' replace />
    );
    }

    document.title = (slime ? slimesList[slime][0] : 'Slimes') + ' - Slimepedia 2';

    return (
    <div>
        <OverlayScrollbarsComponent
            className="list-slime"
            options={{
                scrollbars: {
                    autoHide: "move",
                    autoHideDelay: 500,
                },
            }}
            defer
        >
            {Object.values(Slime).map((slimeName) => (
                <NavLink to={`/slimes/${slimeName}`} style={{ textDecoration: 'none' }} key={slimeName}>
                    <NavButton
                        key={slimeName}
                        icon={`slimes/${slimeName}`}
                        size={1.25}
                        name={slimesList[slimeName][0]}
                        selected={slimeName === slime}
                    />
                </NavLink>
            ))}
        </OverlayScrollbarsComponent>
        <div className='slime-presentation box-layout-secondary'>
            <div className={'pedia-infos slime-infos' + (topBtn ? ' hidden-infos' : '')}>
                <SlimeDetails selectedSlime={slime} />
            </div>
            <a
                role='link'
                className={'arrow-btn ' + (topBtn ? 'top-btn' : 'bot-btn')}
                onClick={() => setTopBtn(!topBtn)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setTopBtn(!topBtn);
                    }
                }}
                tabIndex={0}
            >
                <FaAngleDown />
            </a>
            <SlimeDescription slimepediaEntry={slimepediaEntry} topBtn={topBtn} />
        </div>
    </div>
    );
};

    export default Slimes;