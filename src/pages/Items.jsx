import { useState, useEffect } from 'react';
import { NavButton } from '../components/NavButton';
import { Biomes } from '../components/Biomes';
import { Tab } from '../components/Tab';
import { resourcesList, resourcesNames, resPedia } from '../text/resources';
import { toyNames, toysList, toyDesc } from '../text/toys';
import { slimesList } from '../text/slimes';
import pedia from '../assets/misc/pediatut.png';
import buck from '../assets/misc/buck.png';
import noneIcon from '../assets/misc/none.png';
import '../css/Pedia.css';

const matchMainList = (list) => {
    switch (list) {
        case 'resources':
            return resourcesNames;
        case 'toys':
            return toyNames;
        default:
            return resourcesNames;
    }
}

const matchInfosList = (list) => {
    switch (list) {
        case 'resources':
            return resourcesList;
        case 'toys':
            return toysList;
        default:
            return resourcesList;
    }
}

export const Items = ({
    item = 'brine',
    tab = 'resources',
    changePage = () => { console.log('changePage not defined') }
}) => {
    const firstOption = 'resources';
    const [filter, setFilter] = useState(tab);
    const [actualItem, setItem] = useState(item);
    const [itemsNames, setListItems] = useState(matchMainList(filter));
    const [infosItems, setInfosItems] = useState(matchInfosList(filter));

    const updateTab = (newFilter) => {
        setFilter(newFilter);
        setListItems(matchMainList(newFilter));
        setInfosItems(matchInfosList(newFilter));
        setItem(matchMainList(newFilter)[0]);
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
    return (
        <div>
            <div className='list-container'>
                <div className='food-tabs'>
                    <Tab
                        title='Resources'
                        icon='misc/res'
                        action={() => { updateTab('resources') }}
                        selected={filter === 'resources'}
                    />
                    <Tab
                        title='Toys'
                        icon='misc/toys'
                        action={() => { updateTab('toys') }}
                        selected={filter === 'toys'}
                    />
                </div>
                <div className='list-food' style={{ borderRadius: (filter === firstOption ? '0' : '20px') + ' 20px 20px 20px' }}>
                    {itemsNames.map((item) => {
                        return (
                            <NavButton
                                key={item}
                                icon={filter + '/' + item}
                                name={infosItems[item][0]}
                                size={wideScreen ? 125 : 100}
                                action={() => {
                                    setItem(item);
                                    setInfosItems(matchInfosList(filter));
                                }}
                                selected={actualItem === item}
                            />
                        );
                    })}
                </div>
            </div>
            <div className='food-container box-layout-secondary'>
                <div className={'presentation presentation-' + filter}>
                    <div className="image-title">
                        <div className="info-title">
                            <h1>{infosItems[actualItem][0]}</h1>
                            <h2>{filter === 'toys' ? 'Playtime gets the wiggles out.' : resPedia[actualItem][0]}</h2>
                        </div>
                        <div className="image-container">
                            <img src={'../assets/' + filter + '/' + actualItem + '.png'} className='img-main' alt="pink slime" />
                        </div>
                    </div>
                    <div className='little-box infos-box'>
                        <img src={pedia} alt="Pedia Informations Icon" />
                        <div>
                            {(filter === 'resources' ? resPedia[actualItem][1] : toyDesc[actualItem]).split("\n").map((item, idx) => {
                                return (
                                    <p key={idx}>
                                        {item}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                    <div className={'little-box toy-price' + (filter !== 'toys' ? ' toy-hide' : '')}>
                        <img src={buck} alt='none' />
                        <div>
                            <h3>Price</h3>
                            <h4>500</h4>
                        </div>
                    </div>
                    {(filter === 'toys') ? (
                        <div className={'little-box toy-fav' + (infosItems[actualItem][1] === "none" ? '' : ' link-to-food') + (filter !== 'toys' ? ' toy-hide' : '')} onClick={() => changePage('slimes', infosItems[actualItem][1])}>
                            <img src={infosItems[actualItem][2] === 'none' ? noneIcon : '../assets/slimes/' + infosItems[actualItem][1] + '.png'} alt='none' />
                            <div>
                                <h3>Favorite of</h3>
                                <h4>{infosItems[actualItem][2] === 'none' ? 'None' : slimesList[infosItems[actualItem][1]][0]}</h4>
                            </div>
                        </div>
                    ) : (
                        <div className="little-box toy-fav toy-hide">
                            {/* <img src={noneIcon} alt='none' />
                            <div>
                                <h3>Favorite of</h3>
                                <h4>None</h4>
                            </div> */}
                        </div>
                    )
                    }
                    <Biomes spawnList={filter !== 'toys' ? resourcesList[actualItem][1] : ['pm']} changePage={changePage} />
                </div>
            </div>
        </div>
    );
};

Items.propTypes = {
    item: String,
    tab: String,
    changePage: Function
};