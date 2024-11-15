import { useState, useEffect, useMemo, useRef, } from 'react';
import { NavButton } from '../components/NavButton.jsx';
import { Biomes } from '../components/Biomes.jsx';
import { foodpedia, foodDescription, foodList, foodNames, foodSingular } from '../text/food.js';
import { Tab } from '../components/Tab.jsx';
import { slimesList } from '../text/slimes.js';
import { mediaFetcher } from '../media-manager.js';
import PropTypes from 'prop-types';
import pediaAbout from '/src/assets/misc/pediaabout.png';
import pediaQuestion from '/src/assets/misc/pediaquestion.png';
import noneImg from '/src/assets/misc/none.png';
import arrow from '/src/assets/misc/arrow.png';
import '../css/Pedia.css';
import { NavLink } from 'react-router-dom';

const FoodTabs = ({ filter, setFilter }) => (
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

FoodTabs.propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired
};

const FoodList = ({ actualFoodList, wideScreen, food, filter }) => (
    <div className='list-food' style={{ borderRadius: (filter === 'any' ? '0' : '20px') + ' 20px 20px 20px' }}>
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

FoodList.propTypes = {
    actualFoodList: PropTypes.arrayOf(PropTypes.any).isRequired,
    wideScreen: PropTypes.bool.isRequired,
    updateFood: PropTypes.func.isRequired,
    food: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired
};

const FoodDetails = ({ food, topBtn, setFilter }) => {
    const favSlimeCalc = () => {
        for (let slime in slimesList)
            if (slimesList[slime][2] === food)
                return slime;
        return 'none';
    };
    const favSlime = favSlimeCalc();
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
                <img src={mediaFetcher(`food/${foodList[food][1]}.png`)} alt={foodSingular[foodList[food][1]]} />
                <div>
                    <h3>Food type</h3>
                    <h4>{foodSingular[foodList[food][1]]}</h4>
                </div>
            </div>
            {favSlime === 'none' ?
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

FoodDetails.propTypes = {
    food: PropTypes.string.isRequired,
    topBtn: PropTypes.bool.isRequired,
    setFilter: PropTypes.func.isRequired
};

const FoodDescription = ({ food, topBtn }) => (
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
);

FoodDescription.propTypes = {
    food: PropTypes.string.isRequired,
    topBtn: PropTypes.bool.isRequired
};

export const Food = ({
    food: foodAttr,
}) => {
    const [filter, setFilter] = useState('any');
    const foodRef = useRef('carrot');
    useEffect(() => {
        switch (foodAttr) {
            case 'ash':
                foodRef.current = 'ash';
                setFilter('special');
                break;
            case 'water':
                foodRef.current = 'water';
                setFilter('special');
                break;
            case 'nectar':
                foodRef.current = 'nectar';
                setFilter('special');
                break;
            case 'any':
                foodRef.current = 'carrot';
                setFilter('any');
                break;
            case 'meat':
                foodRef.current = 'hen';
                setFilter('meat');
                break;
            case 'veggies':
                foodRef.current = 'carrot';
                setFilter('veggies');
                break;
            case 'fruits':
                foodRef.current = 'pogofruit';
                setFilter('fruits');
                break;
            default:
                foodRef.current = foodNames.includes(foodAttr) ? foodAttr : 'carrot';
                setFilter(['meat', 'veggies', 'fruits'].includes(foodList[foodRef.current][1]) ? foodList[foodRef.current][1] : 'special');
                break;
        }
    }, [foodAttr]);
    const [topBtn, setTopBtn] = useState(false);
    console.log(foodList[foodRef.current][1], filter);
    useState(() => setTopBtn(false), [foodRef.current]);

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
                <FoodList actualFoodList={actualFoodList} wideScreen={wideScreen} food={foodRef.current} filter={filter} />
            </div>
            <div className='food-container box-layout-secondary'>
                <FoodDetails food={foodRef.current} topBtn={topBtn} setFilter={setFilter} />
                <div className={'arrow-btn ' + (topBtn ? 'top-btn' : 'bot-btn')} onClick={() => setTopBtn(!topBtn)}>
                    <img src={arrow} alt='arrow' />
                </div>
                <FoodDescription food={foodRef.current} topBtn={topBtn} />
            </div>
        </div>
    );
};

Food.propTypes = {
    food: PropTypes.string,
};