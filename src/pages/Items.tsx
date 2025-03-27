import { NavButton } from '../components/NavButton';
import { Biomes } from '../components/Biomes';
import { Tab } from '../components/Tab';
import { resourcesList, resourcesNames, resPedia } from '../text/resources';
import { toyNames, toysList, toyDesc } from '../text/toys';
import { slimesList } from '../text/slimes';
import { mediaFetcher } from '../media-manager';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import React from 'react';
import pedia from '/src/assets/misc/pediatut.png';
import buck from '/src/assets/misc/buck.png';
import noneIcon from '/src/assets/misc/none.png';
import '../css/Pedia.css';

const matchMainList = (list: string) => {
    switch (list) {
        case 'resources':
            return resourcesNames;
        case 'toys':
            return toyNames;
        default:
            return resourcesNames;
    }
}

const matchInfosList = (list: string) => {
    switch (list) {
        case 'toys':
            return toysList;
        default:
            return resourcesList;
    }
}

export const Items = () => {
    const firstOption = 'resources';
    const lastOption = 'toys';
    const { tab: tabName, item: itemName } = useParams();
    const tab = (tabName && ['resources', 'toys'].includes(tabName)) ? tabName : firstOption;
    const item = (itemName && matchMainList(tab).includes(itemName)) ? itemName : matchMainList(tab)[0];
    const itemsNames = matchMainList(tab);
    const infosItems = matchInfosList(tab);

    if (itemName && !itemsNames.includes(itemName)) {
        return tab === 'toys' ? <Navigate to='/items/toys/ball' /> : <Navigate to='/items/resource/brine' />;
    }

    return (
        <div>
            <div className='list-container'>
                <div className='items-tabs'>
                    <NavLink to='/items/resources' style={{ textDecoration: 'none' }}>
                        <Tab
                            title='Resources'
                            icon='misc/res'
                            selected={tab === 'resources'}
                        />
                    </NavLink>
                    <NavLink to='/items/toys' style={{ textDecoration: 'none' }}>
                        <Tab
                            title='Toys'
                            icon='misc/toys'
                            selected={tab === 'toys'}
                        />
                    </NavLink>
                </div>
                <div className='list-food' style={{ borderRadius: `${tab === firstOption ? '0' : 'var(--border-size)'} ${tab === lastOption ? ' 0 ' : 'var(--border-size)'} var(--border-size) var(--border-size)` }}>
                    {itemsNames.map((itemName) => {
                        return (
                            <NavLink key={itemName} to={`/items/${tab}/${itemName}`} style={{ textDecoration: 'none' }}>
                                <NavButton
                                    key={itemName}
                                    icon={tab + '/' + itemName}
                                    name={infosItems[itemName][0]}
                                    size={1.25}
                                    selected={itemName === item}
                                />
                            </NavLink>
                        );
                    })}
                </div>
            </div>
            <div className='food-container box-layout-secondary'>
                <div className={'presentation presentation-' + tab}>
                    <div className="image-title">
                        <div className="info-title">
                            <h1>{infosItems[item][0]}</h1>
                            <h2>{tab === 'toys' ? 'Playtime gets the wiggles out.' : resPedia[item][0]}</h2>
                        </div>
                        <div className="image-container">
                            <img src={mediaFetcher(`${tab}/${item}.png`)} className='img-main' alt={infosItems[item][0]} />
                        </div>
                    </div>
                    <div className='little-box infos-box'>
                        <img src={pedia} alt="Pedia Informations Icon" />
                        <div>
                            {(tab === 'resources' ? resPedia[item][1] : toyDesc[item]).split("\n").map((item, idx) => {
                                return (
                                    <p key={idx}>
                                        {item}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                    <div className={'little-box toy-price' + (tab !== 'toys' ? ' toy-hide' : '')}>
                        <img src={buck} alt='Newbuck Icon' />
                        <div>
                            <h3>Price</h3>
                            <h4>500</h4>
                        </div>
                    </div>
                    {(tab === 'toys') ? infosItems[item][1] === "none" ?
                        <div className='little-box toy-fav'>
                            <img src={noneIcon} alt='None' />
                            <div>
                                <h3>Favorite of</h3>
                                <h4>Nobody</h4>
                            </div>
                        </div>
                        :
                        <NavLink to={`/slimes/${toysList[item][1]}`} style={{ textDecoration: 'none' }}>
                            <div className='little-box toy-fav link-to-food'>
                                <img src={mediaFetcher(`slimes/${infosItems[item][1]}.png`)} alt={slimesList[toysList[item][1]][0]} />
                                <div>
                                    <h3>Favorite of</h3>
                                    <h4>{slimesList[toysList[item][1]][0]}</h4>
                                </div>
                            </div>
                        </NavLink>
                        :
                        <div className="little-box toy-fav toy-hide">
                            <img src={noneIcon} alt='None' />
                            <div>
                                <h3>Favorite of</h3>
                                <h4>None</h4>
                            </div>
                        </div>
                    }
                    <Biomes spawnList={tab !== 'toys' ? resourcesList[item][1] : ['pm']} />
                </div>
            </div>
        </div>
    );
};


export default Items;