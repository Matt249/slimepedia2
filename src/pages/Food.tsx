import { useState, useEffect, useMemo } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { NavButton } from '../components/NavButton';
import { Biomes } from '../components/Biomes';
import { foodpedia, foodDescription, foodList, foodNames, foodSingular, foodTypesList } from '../text/food.js';
import { Tab } from '../components/Tab';
import { slimesList } from '../text/slimes';
import { mediaFetcher } from '../media-manager';
import React from 'react';
import pediaAbout from '/src/assets/misc/pediaabout.png';
import pediaQuestion from '/src/assets/misc/pediaquestion.png';
import noneImg from '/src/assets/misc/none.png';
import arrow from '/src/assets/misc/arrow.png';
import foodImg from '/src/assets/food/food.png';
import pinkImg from '/src/assets/slimes/pink.png';
import '../css/Pedia.css';

interface FoodTabsProps {
    filter: string;
    setFilter: (filter: string) => void;
}

const FoodTabs: React.FC<FoodTabsProps> = ({ filter, setFilter }) => (
    <div className='food-tabs'>
        <Tab
            title='All'
            icon={`food/food`}
            action={() => setFilter('any')}
            selected={filter === 'any'}
        />
        <Tab
            title='Fruits'
            icon={`food/fruits`}
            action={() => setFilter('fruits')}
            selected={filter === 'fruits'}
        />
        <Tab
            title='Veggies'
            icon={`food/veggies`}
            action={() => setFilter('veggies')}
            selected={filter === 'veggies'}
        />
        <Tab
            title='Meat'
            icon={`food/meat`}
            action={() => setFilter('meat')}
            selected={filter === 'meat'}
        />
        <Tab
            title='Special'
            icon={`food/honey`}
            action={() => setFilter('special')}
            selected={filter === 'special'}
        />
    </div>
);

interface FoodListProps {
    actualFoodList: string[];
    wideScreen: boolean;
    food: string | null;
    filter: string;
}

const FoodList: React.FC<FoodListProps> = ({ actualFoodList, wideScreen, food, filter }) => (
    <div className='list-food' style={{ borderRadius: `${filter === 'any' ? '0' : '20px'} ${filter === 'special' ? ' 0 ' : '20px'} 20px 20px` }}>
        {actualFoodList.map((foodId) => (
            <NavLink key={foodId} to={`/food/${foodId}`} style={{ textDecoration: 'none' }}>
                <NavButton
                    key={foodId}
                    icon={`food/${foodId}`}
                    name={foodList[foodId][0]}
                    size={wideScreen ? 125 : 100}
                    tilting={['ash', 'water'].includes(foodId) ? 'none' : 'random'}
                    selected={food === foodId}
                />
            </NavLink>
        ))}
    </div>
);

interface FoodDetailsProps {
    food: string | null;
    topBtn: boolean;
    setFilter: (filter: string) => void;
}

const FoodDetails: React.FC<FoodDetailsProps> = ({ food, topBtn, setFilter }) => {
    if (food === null)
        return (
            <div className={'food-presentation' + (topBtn ? ' hidden-infos' : '')}>
                <div className="image-title">
                    <div className="info-title">
                        <h1>Select food</h1>
                        <h2>Click on food to get it&apos;s information</h2>
                    </div>
                    <div className="image-container">
                        <img />
                    </div>
                </div>
                <div className='little-box food-type disabled'>
                    <img src={foodImg} alt='Food Icon' />
                    <div>
                        <h3>Food type</h3>
                        <h4>No food selected</h4>
                    </div>
                </div>
                <div className='little-box food-fav disabled'>
                    <img src={pinkImg} alt='None' />
                    <div>
                        <h3>Favorite of</h3>
                        <h4>No slime selected</h4>
                    </div>
                </div>
                <Biomes spawnList={[]} />
            </div>
        );
    const favSlimeCalc = (currentFood: string | null) => {
        if (currentFood === null)
            return null;
        for (const slime in slimesList)
            if (slimesList[slime][2] === currentFood)
                return slime;
        return null;
    };
    const favSlime = favSlimeCalc(food);
    return (
        <div className={'food-presentation' + (topBtn ? ' hidden-infos' : '')}>
            <div className="image-title">
                <div className="info-title">
                    <h1>{foodList[food][0]}</h1>
                    <h2>{foodDescription[food]}</h2>
                </div>
                <div className="image-container">
                    <img src={mediaFetcher(`food/${food}.png`)} className='img-main' alt={foodList[food][0]} />
                </div>
            </div>
            <div className={'little-box food-type link-to-food'} onClick={() => { setFilter(['veggies', 'meat', 'fruits'].includes(foodList[food][1]) ? foodList[food][1] : 'special') }}>
                <img src={foodList[food][1] === null ? noneImg : mediaFetcher(`food/${foodList[food][1]}.png`)} alt={foodSingular[foodList[food][1]]} />
                <div>
                    <h3>Food type</h3>
                    <h4>{foodSingular[foodList[food][1]]}</h4>
                </div>
            </div>
            {favSlime === null ?
                <div className='little-box food-fav'>
                    <img src={noneImg} alt='None' />
                    <div>
                        <h3>Favorite of</h3>
                        <h4>Nobody</h4>
                    </div>
                </div>
                :
                <NavLink to={`/slimes/${favSlime}`} style={{ textDecoration: 'none' }}>
                    <div className='little-box food-fav link-to-food'>
                        <img src={mediaFetcher(`slimes/${favSlime}.png`)} alt={slimesList[favSlime][0]} />
                        <div>
                            <h3>Favorite of</h3>
                            <h4>{slimesList[favSlime][0]}</h4>
                        </div>
                    </div>
                </NavLink>
            }
            <Biomes spawnList={foodList[food][2]} />
        </div>
    )
};

interface FoodDescriptionProps {
    food: string | null;
    topBtn: boolean;
}

const FoodDescription: React.FC<FoodDescriptionProps> = ({ food: foodName, topBtn }) => {
    if (foodName === null)
        return (
            <div className={'desc ' + (topBtn ? 'shown-desc' : 'hidden-desc')}>
                <div className='desc-title'>
                    <img src={pediaAbout} alt='Slimeology' />
                    <h3>About</h3>
                </div>
                <p>Select a food to get it&apos;s description</p>
                <div className='desc-title'>
                    <img src={pediaQuestion} alt='Rancher Risks' />
                    <h3>On the ranch</h3>
                </div>
                <p>Select a food to get it&apos;s description</p>
            </div>
        );
    const food = foodNames.includes(foodName) ? foodName : 'carrot';
    return (
        <div className={'desc ' + (topBtn ? 'shown-desc' : 'hidden-desc')}>
            <div className='desc-title'>
                <img src={pediaAbout} alt='Slimeology' />
                <h3>About</h3>
            </div>
            <p>{foodpedia[food][0]}</p>
            <div className='desc-title'>
                <img src={pediaQuestion} alt='Rancher Risks' />
                <h3>On the ranch</h3>
            </div>
            <p>{foodpedia[food][1]}</p>
        </div>
    )
};

export const Food = () => {
    const { food: foodName } = useParams<{ food: string }>();
    const navigate = useNavigate(); // Utilisez useNavigate pour la redirection
    const [filter, setFilter] = useState('any');
    const [food, setFood] = useState<string | null>(null);

    useEffect(() => {
        if (foodName) {
            if (foodName in foodTypesList) {
                setFood(foodTypesList[foodName][1]);
                setFilter(foodTypesList[foodName][0]);
            }
            else if (foodNames.includes(foodName))
                setFood(foodName);
            else {
                setFood('carrot');
                navigate('/food/carrot');
            }
        }
        else {
            setFood(null);
            navigate('/food');
        }
    }, [foodName, navigate]);

    const [topBtn, setTopBtn] = useState(false);

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

    const actualFoodList = useMemo(() => {
        switch (filter) {
            case 'fruits':
                return foodNames.filter(foodSearched => foodList[foodSearched][1] === 'fruits');
            case 'veggies':
                return foodNames.filter(foodSearched => foodList[foodSearched][1] === 'veggies');
            case 'meat':
                return foodNames.filter(foodSearched => foodList[foodSearched][1] === 'meat');
            case 'special':
                return foodNames.filter(foodSearched => !['veggies', 'fruits', 'meat'].includes(foodList[foodSearched][1]));
            default:
                return foodNames;
        }
    }, [filter]);

    return (
        <div>
            <div className='list-container'>
                <FoodTabs filter={filter} setFilter={setFilter} />
                <FoodList actualFoodList={actualFoodList} wideScreen={wideScreen} food={food} filter={filter} />
            </div>
            <div className='food-container box-layout-secondary'>
                <FoodDetails food={food} topBtn={topBtn} setFilter={setFilter} />
                <div className={'arrow-btn ' + (topBtn ? 'top-btn' : 'bot-btn')} onClick={() => setTopBtn(!topBtn)}>
                    <img src={arrow} alt='Arrow' />
                </div>
                <FoodDescription food={food} topBtn={topBtn} />
            </div>
        </div>
    );
};

export default Food;