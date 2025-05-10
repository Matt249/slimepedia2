import React, { useState, useMemo } from 'react';
import { NavLink, useParams, Navigate } from 'react-router-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { NavButton } from '../components/NavButton';
import { Biomes } from '../components/Biomes';
import { foodpedia, foodDescription, foodList, Food, FoodType, foodTypeList, foodBlackList } from '../text/food';
import { Tab } from '../components/Tab';
import { Slime, slimesList } from '../text/slimes';
import '../css/Pedia.css';
import { FaAngleDown } from 'react-icons/fa6';
import { getEnumValue } from '../App';

interface FoodTabsProps {
    filter: FoodType | null;
    setFilter: (filter: FoodType | null) => void;
}

const FoodTabs: React.FC<FoodTabsProps> = ({ filter, setFilter }) => (
    <div className='food-tabs'>
        <Tab
            title='All'
            icon={`food/any`}
            action={() => setFilter(FoodType.Any)}
            selected={filter === FoodType.Any}
        />
        <Tab
            title='Fruits'
            icon={`food/fruits`}
            action={() => setFilter(FoodType.Fruits)}
            selected={filter === FoodType.Fruits}
        />
        <Tab
            title='Veggies'
            icon={`food/veggies`}
            action={() => setFilter(FoodType.Veggies)}
            selected={filter === FoodType.Veggies}
        />
        <Tab
            title='Meat'
            icon={`food/meat`}
            action={() => setFilter(FoodType.Meat)}
            selected={filter === FoodType.Meat}
        />
        <Tab
            title='Special'
            icon={`food/honey`}
            action={() => setFilter(null)}
            selected={filter === null}
        />
    </div>
);

interface FoodListProps {
    actualFoodList: Food[];
    food: string | null;
    filter: FoodType | null;
}

const FoodList: React.FC<FoodListProps> = ({ actualFoodList, food, filter }) => (
    <OverlayScrollbarsComponent
        options={{
            scrollbars: {
                autoHide: "move",
                autoHideDelay: 500,
            },
        }}
        className={`list-food${(filter === FoodType.Any ? ' list-food-first' : '') + (filter == null ? ' list-food-last' : '')}`}
        defer
    >
        {actualFoodList.map((foodId) => (
            <NavLink key={foodId} to={`/food/${foodId}`} style={{ textDecoration: 'none' }}>
                <NavButton
                    key={foodId}
                    icon={`food/${foodId}`}
                    name={foodList[foodId][0]}
                    size={1.25}
                    tilting={['ash', 'water'].includes(foodId) ? 'none' : 'random'}
                    selected={food === foodId}
                />
            </NavLink>
        ))}
    </OverlayScrollbarsComponent>
);

const favSlimeCalc = (currentFood: Food | null) => {
    if (currentFood === null)
        return null;
    for (const slime of Object.values(Slime))
        if (slimesList[slime][2] === currentFood)
            return slime;
    return null;
};

interface FoodDetailsProps {
    food: Food | null;
    setFilter: (filter: FoodType) => void;
}

const FoodDetails: React.FC<FoodDetailsProps> = ({ food, setFilter }) => {
    if (food === null)
        return (
            <>
                <div className="image-title">
                    <div className="info-title">
                        <h1>Select food</h1>
                        <h2>Click on food to get it&apos;s information</h2>
                    </div>
                    <div className="image-container">
                    </div>
                </div>
                <div className='little-box food-type disabled'>
                    <img src='/assets/food/food.png' alt='Food Icon' />
                    <div>
                        <h3>Food type</h3>
                        <h4>No food selected</h4>
                    </div>
                </div>
                <div className='little-box food-fav disabled'>
                    <img src='/assets/slimes/pink.png' alt='None' />
                    <div>
                        <h3>Favorite of</h3>
                        <h4>No slime selected</h4>
                    </div>
                </div>
                <Biomes spawnList={[]} />
            </>
        );

    const favSlime = favSlimeCalc(food);

    return (
        <>
            <div className="image-title">
                <div className="info-title">
                    <h1>{foodList[food][0]}</h1>
                    <h2>{foodDescription[food]}</h2>
                </div>
                <div className="image-container">
                    <img src={`/assets/food/${food}.png`} className='img-main' alt={foodList[food][0]} />
                </div>
            </div>
            <a
                role='link'
                className='little-box food-type link-to-food'
                onClick={() => { setFilter((foodList[food][1] !== null && [FoodType.Veggies, FoodType.Fruits, FoodType.Meat].includes(foodList[food][1])) ? foodList[food][1] : FoodType.Any) }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setFilter(foodList[food][1] !== null && ([FoodType.Veggies, FoodType.Fruits, FoodType.Meat].includes(foodList[food][1])) ? foodList[food][1] : FoodType.Any);
                    }
                }}
                tabIndex={0}
            >
                <img src={foodList[food][1] === null ? '/assets/misc/none.png' : `/assets/food/${foodList[food][1]}.png`} alt={foodList[food][1] === null ? 'None' : foodTypeList[foodList[food][1]][1]} />
                <div>
                    <h3>Food type</h3>
                    <h4>{foodList[food][1] === null ? 'Unedible' : foodTypeList[foodList[food][1]][1]}</h4>
                </div>
            </a>
            {favSlime === null ?
                <div className='little-box food-fav'>
                    <img src='/assets/misc/none.png' alt='None' />
                    <div>
                        <h3>Favorite of</h3>
                        <h4>Nobody</h4>
                    </div>
                </div>
                :
                <NavLink to={`/slimes/${favSlime}`} style={{ textDecoration: 'none' }}>
                    <div className='little-box food-fav link-to-food'>
                        <img src={`/assets/slimes/${favSlime}.png`} alt={slimesList[favSlime][0]} />
                        <div>
                            <h3>Favorite of</h3>
                            <h4>{slimesList[favSlime][0]}</h4>
                        </div>
                    </div>
                </NavLink>
            }
            <Biomes spawnList={foodList[food][2]} />
        </>
    )
};

interface FoodDescriptionProps {
    food: Food | null;
    topBtn: boolean;
}

const FoodDescription: React.FC<FoodDescriptionProps> = ({ food: foodName, topBtn }) => {
    if (foodName === null)
        return (
            <div className={'desc ' + (topBtn ? 'shown-desc' : 'hidden-desc')}>
                <div className='desc-title'>
                    <img src='/assets/misc/pediaabout.png' alt='Slimeology' />
                    <h3>About</h3>
                </div>
                <p>Select a food to get it&apos;s description</p>
                <div className='desc-title'>
                    <img src='/assets/misc/pediaquestion.png' alt='Rancher Risks' />
                    <h3>On the ranch</h3>
                </div>
                <p>Select a food to get it&apos;s description</p>
            </div>
        );
    const food = Object.values(Food).includes(foodName) ? foodName : Food.Carrot;
    return (
        <div className={'desc ' + (topBtn ? 'shown-desc' : 'hidden-desc')}>
            <div className='desc-title'>
                <img src='/assets/misc/pediaabout.png' alt='Slimeology' />
                <h3>About</h3>
            </div>
            <p>{foodpedia[food][0]}</p>
            <div className='desc-title'>
                <img src='/assets/misc/pediaquestion.png' alt='Rancher Risks' />
                <h3>On the ranch</h3>
            </div>
            <p>{foodpedia[food][1]}</p>
        </div>
    )
};

export const FoodPage = () => {
    const { food: foodName } = useParams<{ food: string }>();
    const food = getEnumValue(Food, foodName);
    const [filter, setFilter] = useState<FoodType | null>(food ? foodList[food][1] : FoodType.Any);
    const [topBtn, setTopBtn] = useState(false);

    const actualFoodList: Food[] = useMemo(() => {
        switch (filter) {
            case FoodType.Any:
                return Object.values(Food).slice(0, -2);
            case FoodType.Fruits:
                return Object.values(Food).filter(foodSearched => foodList[foodSearched][1] === FoodType.Fruits);
            case FoodType.Veggies:
                return Object.values(Food).filter(foodSearched => foodList[foodSearched][1] === FoodType.Veggies);
            case FoodType.Meat:
                return Object.values(Food).filter(foodSearched => foodList[foodSearched][1] === FoodType.Meat);
            case null:
                return Object.values(Food).filter(foodSearched => foodList[foodSearched][1] === null ||  ![FoodType.Fruits, FoodType.Veggies, FoodType.Meat].includes(foodList[foodSearched][1])).slice(0, -2);
            default:
                return Object.values(Food).slice(0, -2);
        }
    }, [filter]);

    if (food === null && foodName !== undefined || food !== null && foodBlackList.includes(food))
        return <Navigate to='/food' replace />;

    document.title = food === null ? 'Food - Slimepedia' : (foodList[food][0] + ' - Slimepedia');

    return (
        <div>
            <div className='list-container'>
                <FoodTabs filter={filter} setFilter={setFilter} />
                <FoodList actualFoodList={actualFoodList} food={food} filter={filter} />
            </div>
            <div className='slime-presentation box-layout-secondary'>
                <div className={'pedia-infos food-infos' + (topBtn ? ' hidden-infos' : '')}>
                    <FoodDetails food={food} setFilter={setFilter} />
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
                <FoodDescription food={food} topBtn={topBtn} />
            </div>
        </div>
    );
};

export default FoodPage;