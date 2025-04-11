import React, { useState } from 'react';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { NavButton } from '../components/NavButton';
import { Biomes } from '../components/Biomes';
import { Tab } from '../components/Tab';
import { resourceList, resourcesNames, resourcePedia } from '../text/resources';
import { toyNames, toysList, toyDesc } from '../text/toys';
import { slimesList } from '../text/slimes';
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
    if ('toys' === list)
        return toysList;
    return resourceList;
}

export const Items = () => {
    const firstOption = 'resources';
    const lastOption = 'toys';
    const { tab: tabName, item: itemName } = useParams();
    const [tab, setTab] = useState((tabName && ['resources', 'toys'].includes(tabName)) ? tabName : firstOption);
    const item = (itemName && (resourcesNames.includes(itemName) || toyNames.includes(itemName))) ? itemName : matchMainList(tab)[0];
    const itemsNames = matchMainList(tab);
    const infosItems = matchInfosList(tab);

    if (itemName && !itemsNames.includes(itemName)) {
        return tab === 'toys' ? <Navigate to={'/items/toys/' + toyNames[0]} /> : <Navigate to={'/items/resource/' + resourcesNames[0]} />;
    }

    document.title = infosItems[item][0] + ' - Slimepedia 2';

    return (
        <div>
            <div className='list-container'>
                <div className='items-tabs'>
                    <Tab
                        title='Resources'
                        icon='misc/res'
                        selected={tab === 'resources'}
                        action={() => setTab(firstOption)}
                    />
                    <Tab
                        title='Toys'
                        icon='misc/toys'
                        selected={tab === 'toys'}
                        action={() => setTab(lastOption)}
                    />
                </div>
                <OverlayScrollbarsComponent
                    options={{
                        scrollbars: {
                            autoHide: "move",
                            autoHideDelay: 500,
                        },
                    }}
                    className={'list-food ' + (tab === firstOption ? 'list-food-first' : 'list-food-last')}
                    defer
                >
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
                </OverlayScrollbarsComponent>
            </div>
            <div className='food-container box-layout-secondary'>
                <div className={'presentation presentation-' + tab}>
                    <div className="image-title">
                        <div className="info-title">
                            <h1>{infosItems[item][0]}</h1>
                            <h2>{tab === 'toys' ? 'Playtime gets the wiggles out.' : resourceList[item][2]}</h2>
                        </div>
                        <div className="image-container">
                            <img src={`/assets/${tab}/${item}.png`} className='img-main' alt={infosItems[item][0]} />
                        </div>
                    </div>
                    <div className='little-box infos-box'>
                        <img src='/assets/misc/pediatut.png' alt="Pedia Informations Icon" />
                        <div>
                            {(tab === 'resources' ? resourcePedia[item] : toyDesc[item]).split("\n").map((item) => {
                                return (
                                    <p key={item}>
                                        {item}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                    <div className={'little-box toy-price' + (tab !== 'toys' ? ' toy-hide' : '')}>
                        <img src='/assets/misc/buck.png' alt='Newbuck Icon' />
                        <div>
                            <h3>Price</h3>
                            <h4>500</h4>
                        </div>
                    </div>
                    {(() => {
                        if (tab === 'toys') {
                            if (infosItems[item][1] === "none") {
                                return (
                                    <div className='little-box toy-fav'>
                                        <img src='/assets/misc/none.png' alt='None' />
                                        <div>
                                            <h3>Favorite of</h3>
                                            <h4>Nobody</h4>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <NavLink to={`/slimes/${toysList[item][1]}`} style={{ textDecoration: 'none' }}>
                                        <div className='little-box toy-fav link-to-food'>
                                            <img src={`/assets/slimes/${infosItems[item][1]}.png`} alt={slimesList[toysList[item][1]][0]} />
                                            <div>
                                                <h3>Favorite of</h3>
                                                <h4>{slimesList[toysList[item][1]][0]}</h4>
                                            </div>
                                        </div>
                                    </NavLink>
                                );
                            }
                        } else {
                            return (
                                <div className="little-box toy-fav toy-hide">
                                    <img src='/assets/misc/none.png' alt='None' />
                                    <div>
                                        <h3>Favorite of</h3>
                                        <h4>None</h4>
                                    </div>
                                </div>
                            );
                        }
                    })()}
                    <Biomes spawnList={tab !== 'toys' ? resourceList[item][1] : ['pm']} />
                </div>
            </div>
        </div>
    );
};


export default Items;