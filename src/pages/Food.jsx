import { useState, useEffect, useMemo, useCallback } from 'react';
import { NavButton } from '../components/NavButton.jsx';
import { Biomes } from '../components/Biomes.jsx';
import { foodpedia, foodDescription, foodList, foodNames, foodSingular } from '../text/food.js';
import { Tab } from '../components/Tab.jsx';
import { slimesList } from '../text/slimes.js';
import PropTypes from 'prop-types';
import pediaAbout from '../assets/misc/pediaabout.png';
import pediaQuestion from '../assets/misc/pediaquestion.png';
import '../css/Pedia.css';

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

const FoodList = ({ actualFoodList, wideScreen, updateFood, actualFood, filter }) => (
    <div className='list-food' style={{ borderRadius: (filter === 'any' ? '0' : '20px') + ' 20px 20px 20px' }}>
        {actualFoodList.map((foodId) => (
            <NavButton
                key={foodId}
                icon={`food/${foodId}`}
                name={foodList[foodId][0]}
                size={wideScreen ? 125 : 100}
                tilting={['ash', 'water'].includes(foodId) ? 'none' : 'random'}
                action={() => updateFood(foodId)}
                selected={actualFood === foodId}
            />
        ))}
    </div>
);

FoodList.propTypes = {
    actualFoodList: PropTypes.array.isRequired,
    wideScreen: PropTypes.bool.isRequired,
    updateFood: PropTypes.func.isRequired,
    actualFood: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired
};

const FoodDetails = ({ actualFood, favSlime, changePage, topBtn, setFilter }) => (
    <div className={'food-presentation' + (topBtn ? ' hidden-infos' : '')}>
        <div className="image-title">
            <div className="info-title">
                <h1>{foodList[actualFood][0]}</h1>
                <h2>{foodDescription[actualFood]}</h2>
            </div>
            <div className="image-container">
                <img src={'../assets/food/' + actualFood + '.png'} className='img-main' alt={foodList[actualFood][0]} />
            </div>
        </div>
        <div className={'little-box food-type link-to-food'} onClick={() => { setFilter(['veggies', 'meat', 'fruits'].includes(actualFood) ? actualFood : 'honey') }}>
            <img src={'../assets/food/' + foodList[actualFood][1] + '.png'} alt={foodSingular[foodList[actualFood][1]]} />
            <div>
                <h3>Food type</h3>
                <h4>{foodSingular[foodList[actualFood][1]]}</h4>
            </div>
        </div>
        <div className={'little-box food-fav' + (favSlime.length ? ' link-to-food' : '')} onClick={() => { if (favSlime.length) changePage('slimes', favSlime) }}>
            <img src={'../assets/' + (favSlime.length ? 'slimes/' + favSlime : 'misc/none') + '.png'} alt='none' />
            <div>
                <h3>Favorite of</h3>
                <h4>{(favSlime.length ? slimesList[favSlime][0] : 'Nobody')}</h4>
            </div>
        </div>
        <Biomes spawnList={foodList[actualFood][2]} changePage={changePage} />
    </div>
);

FoodDetails.propTypes = {
    actualFood: PropTypes.string.isRequired,
    favSlime: PropTypes.string.isRequired,
    changePage: PropTypes.func.isRequired,
    topBtn: PropTypes.bool.isRequired,
    setFilter: PropTypes.func.isRequired
};

const FoodDescription = ({ actualFood, topBtn }) => (
    <div className={'desc ' + (topBtn ? 'shown-desc' : 'hidden-desc')}>
        <div className='desc-title'>
            <img src={pediaAbout} alt='Slimeology' />
            <h3>About</h3>
        </div>
        <p>{foodpedia[actualFood][0]}</p>
        <div className='desc-title'>
            <img src={pediaQuestion} alt='Rancher Risks' />
            <h3>On the ranch</h3>
        </div>
        <p>{foodpedia[actualFood][1]}</p>
    </div>
);

FoodDescription.propTypes = {
    actualFood: PropTypes.string.isRequired,
    topBtn: PropTypes.bool.isRequired
};

export const Food = ({
    food = 'carrot',
    tab = 'food',
    changePage = ({ args }) => { console.log('changePage not defined, args={', args, '}') }
}) => {
    const [topBtn, setTopBtn] = useState(false);
    const [actualFood, setFood] = useState(food);
    const [filter, setFilter] = useState(tab);
    const updateFood = useCallback((food) => {
        setFood(food);
        setTopBtn(false);
    }, []);

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
                return foodNames.filter(food => foodList[food][1] === 'fruits');
            case 'veggies':
                return foodNames.filter(food => foodList[food][1] === 'veggies');
            case 'meat':
                return foodNames.filter(food => foodList[food][1] === 'meat');
            case 'special':
                return foodNames.filter(food => !['veggies', 'fruits', 'meat'].includes(foodList[food][1]));
            default:
                return foodNames;
        }
    }, [filter]);

    const favSlime = useMemo(() => {
        for (let slime in slimesList) {
            if (slimesList[slime][2] === actualFood) {
                return slime;
            }
        }
        return [];
    }, [actualFood]);

    return (
        <div>
            <div className='list-container'>
                <FoodTabs filter={filter} setFilter={setFilter} />
                <FoodList actualFoodList={actualFoodList} wideScreen={wideScreen} updateFood={updateFood} actualFood={actualFood} filter={filter} />
            </div>
            <div className='food-container box-layout-secondary'>
                <FoodDetails actualFood={actualFood} favSlime={favSlime} changePage={changePage} topBtn={topBtn} setFilter={setFilter} />
                <div className={'arrow-btn ' + (topBtn ? 'top-btn' : 'bot-btn')} onClick={() => setTopBtn(!topBtn)}>
                    <img src={'../assets/misc/arrow.png'} alt='arrow' />
                </div>
                <FoodDescription actualFood={actualFood} topBtn={topBtn} />
            </div>
        </div>
    );
};

Food.propTypes = {
    food: PropTypes.string,
    tab: PropTypes.string,
    changePage: PropTypes.func
};