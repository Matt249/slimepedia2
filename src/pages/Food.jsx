import { useState, useEffect } from 'react';
import { NavButton } from '../NavButton.jsx';
import { Biomes } from '../Biomes.jsx';
import { foodpedia, foodDescription, foodList, foodNames, foodSingular } from '../assets/text/food.js';
import { Tab } from '../Tab.jsx';
import '../assets/css/Pedia.css';
import pediaAbout from '../assets/misc/pediaabout.png';
import pediaQuestion from '../assets/misc/pediaquestion.png';
import { slimesList } from '../assets/text/slimes.js';

export const Food = ({
    food = 'carrot',
    tab = 'food',
    changePage = ({ args }) => { console.log('changePage not defined, args={', args, '}') }
}) => {
    const [topBtn, setTopBtn] = useState(false);
    const [actualFood, setFood] = useState(food);
    const [filter, setFilter] = useState(tab);
    const updateFood = (food) => {
        setFood(food);
        setTopBtn(false);
    }

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

    var actualFoodList = [];
    switch (filter) {
        case 'fruits':
            actualFoodList = foodNames.filter(food => foodList[food][1] === 'fruits');
            break;
        case 'veggies':
            actualFoodList = foodNames.filter(food => foodList[food][1] === 'veggies');
            break;
        case 'meat':
            actualFoodList = foodNames.filter(food => foodList[food][1] === 'meat');
            break;
        case 'special':
            actualFoodList = foodNames.filter(food => !['veggies', 'fruits', 'meat'].includes(foodList[food][1]));
            break;
        default:
            actualFoodList = foodNames;
            break;
    }

    var favSlime = [];
    for (let slime in slimesList)
        if (slimesList[slime][2] === actualFood) {
            favSlime = slime;
            break;
        }


    return (
        <div className='box-layout slimes-menu'>
            <div className='list-container'>
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
                <div className='list-food' style={{ borderRadius: (filter === 'any' ? '0' : '20px') + ' 20px 20px 20px' }}>
                    {actualFoodList.map((foodId) => {
                        return (
                            <NavButton
                                key={foodId}
                                icon={`food/${foodId}`}
                                name={foodList[foodId][0]}
                                size={wideScreen ? 125 : 100}
                                tilting={['ash', 'water'].includes(foodId) ? 'none' : 'random'}
                                action={() => updateFood(foodId)}
                                selected={actualFood === foodId}
                            />
                        );
                    })}
                </div>
            </div>
            <div className='food-container box-layout-secondary'>
                <div className={'food-presentation' + (topBtn ? ' hidden-infos' : '')}>
                    <div className="image-title">
                        <div className="info-title">
                            <h1>{foodList[actualFood][0]}</h1>
                            <h2>{foodDescription[actualFood]}</h2>
                        </div>
                        <div className="image-container">
                            <img src={require('../assets/food/' + actualFood + '.png')} className='img-main' alt={foodList[actualFood][0]} />
                        </div>
                    </div>
                    <div className='little-box food-type link-to-food' onClick={() => { setFilter(['veggies', 'meat', 'fruits'].includes(actualFood) ? actualFood : 'honey') }}>
                        <img src={require('../assets/food/' + foodList[actualFood][1] + '.png')} alt={foodSingular[foodList[actualFood][1]]} />
                        <div>
                            <h3>Food type</h3>
                            <h4>{foodSingular[foodList[actualFood][1]]}</h4>
                        </div>
                    </div>
                    <div className={'little-box food-fav' + (favSlime.length ? ' link-to-food' : '')} onClick={() => { if (favSlime.length) changePage('slimes', favSlime) }}>
                        <img src={require('../assets/' + (favSlime.length ? 'slimes/' + favSlime : 'misc/none') + '.png')} alt='none' />
                        <div>
                            <h3>Favorite of</h3>
                            <h4>{(favSlime.length ? slimesList[favSlime][0] : 'Nobody')}</h4>
                        </div>
                    </div>
                    <Biomes spawnList={foodList[actualFood][2]} changePage={changePage} />
                </div>
                <div className={'arrow-btn ' + (topBtn ? 'top-btn' : 'bot-btn')} onClick={() => setTopBtn(!topBtn)}>
                    <img src={require('../assets/misc/arrow.png')} alt='arrow' />
                </div>
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
            </div>
        </div>
    )
}