import { useState, useEffect } from 'react';
import { NavButton } from './NavButton.jsx';
import { Biomes } from './Biomes';
import { foodList, foodTypes, slimesList } from './listeSlimes';
import { foodpedia, foodDescription } from './assets/text/foodpedia.js';
import { Tab } from './Tab';
import './assets/css/Pedia.css';
import pediaAbout from './assets/misc/pediaabout.png';
import pediaQuestion from './assets/misc/pediaquestion.png';

function findFirstMatchingArray(list, element) {
    for (let array of list) {
        if (array[0] === element) {
            return array;
        }
    }
    return undefined;
}

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
    const foodListBis = foodList.slice(1);
    const sortedFoodList = false ? foodListBis.sort((a, b) => a[1].localeCompare(b[1])) : foodListBis;
    var foodToList = [];
    if (['veggies', 'fruits', 'meat'].includes(filter))
        foodToList = sortedFoodList.filter(food => food[2] === filter);
    else if (filter === 'honey')
        foodToList = sortedFoodList.filter(food => !['veggies', 'fruits', 'meat'].includes(food[2]));
    else
        foodToList = sortedFoodList;
    var firstOption = Object.keys(foodTypes)[0];
    const foodListSorted = Object.keys(foodTypes).slice(0, 5);
    const currentFood = findFirstMatchingArray(sortedFoodList, actualFood);
    const slimePerFavFood = {};
    const foodSingular = {
        'meat': "Meat",
        'fruits': "Fruit",
        'veggies': "Veggie",
        'water': "Water",
        'ash': "Ash",
        'nectar': "Nectar"
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

    for (let foodToSearch of sortedFoodList)
        for (let slime in slimesList)
            if (slimesList[slime][3] === foodToSearch[0])
                slimePerFavFood[foodToSearch[0]] = slimesList[slime][0];
    const foodName = currentFood[1];
    const foodIcon = require('./assets/food/' + currentFood[0] + '.png');
    const foodType = require('./assets/food/' + currentFood[2] + '.png');
    const favSlime = (actualFood in slimePerFavFood) ? slimePerFavFood[actualFood] : "none";
    const favSlimeIcon = require('./assets/' + (favSlime === "none" ? "misc/none" : "slimes/" + favSlime) + '.png');
    return (
        <div className='box-layout slimes-menu'>
            <div className='list-container'>
                <div className='food-tabs'>
                    {foodListSorted.map(food => (
                        <Tab
                            key={food}
                            title={foodTypes[food][0]}
                            icon={`food/${food}`}
                            action={() => setFilter(food)}
                            {...(filter === food ? { 'selected': true } : {})}
                        />
                    ))}
                </div>
                <div className='list-food' style={{ borderRadius: (filter === firstOption ? '0' : '20px') + ' 20px 20px 20px' }}>
                    {foodToList.map(([foodId, name]) => {
                        const imagePath = `food/${foodId}`;
                        return (
                            <NavButton
                                key={foodId}
                                icon={imagePath}
                                name={name}
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
                            <h1>{foodName}</h1>
                            <h2>{foodDescription[currentFood[0]] ? foodDescription[currentFood[0]] : foodDescription['lorem']}</h2>
                        </div>
                        <div className="image-container">
                            <img src={foodIcon} className='img-main' alt="pink slime" />
                        </div>
                    </div>
                    <div className='little-box food-type link-to-food' onClick={() => { setFilter(['veggies', 'meat', 'fruits'].includes(currentFood[2]) ? currentFood[2] : 'honey') }}>
                        <img src={foodType} alt="veggies" />
                        <div>
                            <h3>Food type</h3>
                            <h4>{foodSingular[currentFood[2]]}</h4>
                        </div>
                    </div>
                    <div className={'little-box food-fav' + (favSlime === "none" ? '' : ' link-to-food')} onClick={() => { if (currentFood[3] !== 'none') changePage('slimes', favSlime) }}>
                        <img src={favSlimeIcon} alt='none' />
                        <div>
                            <h3>Favorite of</h3>
                            <h4>{(favSlime === "none" ? "Nobody" : slimesList[favSlime][1])}</h4>
                        </div>
                    </div>
                    <Biomes spawnList={currentFood[3]} changePage={changePage} />
                </div>
                <div className={'arrow-btn ' + (topBtn ? 'top-btn' : 'bot-btn')} onClick={() => setTopBtn(!topBtn)}>
                    <img src={require('./assets/misc/arrow.png')} alt='arrow' />
                </div>
                <div className={'desc ' + (topBtn ? 'shown-desc' : 'hidden-desc')}>
                    <div className='desc-title'>
                        <img src={pediaAbout} alt='Slimeology' />
                        <h3>About</h3>
                    </div>
                    <p>{foodpedia[currentFood[0]] ? foodpedia[currentFood[0]][0] : foodpedia['lorem'][0]}</p>
                    <div className='desc-title'>
                        <img src={pediaQuestion} alt='Rancher Risks' />
                        <h3>On the ranch</h3>
                    </div>
                    <p>{foodpedia[currentFood[0]] ? foodpedia[currentFood[0]][1] : foodpedia['lorem'][1]}</p>
                </div>
            </div>
        </div>
    )
}