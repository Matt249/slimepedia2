import { useState, useEffect } from 'react';
import { NavButton } from '../components/NavButton';
import { Biomes } from '../components/Biomes';
import { Tab } from '../components/Tab';
import { resourcesList, resourcesNames, resPedia } from '../text/resources';
import { toyNames, toysList, toyDesc } from '../text/toys';
import { slimesList } from '../text/slimes';
import PropTypes from 'prop-types';
import pedia from '/src/assets/misc/pediatut.png';
import buck from '/src/assets/misc/buck.png';
import noneIcon from '/src/assets/misc/none.png';
import '../css/Pedia.css';
import { mediaFetcher } from '../media-manager';
import { NavLink } from 'react-router-dom';

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
                    <NavLink to='/resources' style={{ textDecoration: 'none' }}>
                        <Tab
                            title='Resources'
                            icon='misc/res'
                            action={() => { updateTab('resources') }}
                            selected={filter === 'resources'}
                        />
                    </NavLink>
                    <NavLink to='/toys' style={{ textDecoration: 'none' }}>
                        <Tab
                            title='Toys'
                            icon='misc/toys'
                            action={() => { updateTab('toys') }}
                            selected={filter === 'toys'}
                        />
                    </NavLink>
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
                            <img src={mediaFetcher(`${filter}/${actualItem}.png`)} className='img-main' alt="pink slime" />
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
                    {(filter === 'toys') ? infosItems[actualItem][1] === "none" ?
                        <div className='little-box toy-fav'>
                            <img src={noneIcon} alt='None' />
                            <div>
                                <h3>Favorite of</h3>
                                <h4>Nobody</h4>
                            </div>
                        </div>
                        :
                        <NavLink to={`/slimes/${infosItems[actualItem][1]}`} style={{ textDecoration: 'none' }}>
                            <div className='little-box toy-fav link-to-food'>
                                <img src={mediaFetcher(`slimes/${infosItems[actualItem][1]}.png`)} alt='none' />
                                <div>
                                    <h3>Favorite of</h3>
                                    <h4>{slimesList[infosItems[actualItem][1]][0]}</h4>
                                </div>
                            </div>
                        </NavLink>
                        :
                        <div className="little-box toy-fav toy-hide">
                            <img src={noneIcon} alt='none' />
                            <div>
                                <h3>Favorite of</h3>
                                <h4>None</h4>
                            </div>
                        </div>
                    }
                    <Biomes spawnList={filter !== 'toys' ? resourcesList[actualItem][1] : ['pm']} />
                </div>
            </div>
        </div>
    );
};

Items.propTypes = {
    item: PropTypes.string,
    tab: PropTypes.string,
};