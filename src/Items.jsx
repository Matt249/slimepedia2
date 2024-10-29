import { useState, useEffect } from 'react';
import './assets/css/Pedia.css';
import { NavButton } from './NavButton';
import { Biomes } from './Biomes';
import { resourcesList, toysList, slimesList } from './listeSlimes';
import { Tab } from './Tab';
import pedia from './assets/misc/pediatut.png';
import buck from './assets/misc/buck.png';
import { resPedia } from './assets/text/resourcepedia';
import { toyDesc } from './assets/text/toypedia';

function findFirstMatchingArray(list, element, nth) {
    for (let array of list)
        if (array[nth] === element)
            return array;
    return undefined;
}

const matchMainList = (list) => {
    switch (list) {
        case 'resources':
            return resourcesList;
        case 'toys':
            return toysList;
        default:
            return resourcesList;
    }
}

const matchInfosList = (list) => {
    switch (list) {
        case 'resources':
            let newDesc = {};
            for (let key in resPedia)
                newDesc[key] = resPedia[key][0];
            return newDesc;
        case 'toys':
            return toyDesc;
        default:
            return resPedia;
    }
}

const matchPediaList = (list) => {
    switch (list) {
        case 'resources':
            let newPedia = {};
            for (let key in resPedia)
                newPedia[key] = resPedia[key][1];
            return newPedia;
        case 'toys':
            return toyDesc;
        default:
            return resPedia;
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
    const [listItems, setListItems] = useState(matchMainList(filter));
    const [infosItems, setInfosItems] = useState(matchInfosList(filter));
    const [pediaItems, setPediaItems] = useState(matchPediaList(filter));
    const [itemArray, setItemArray] = useState(findFirstMatchingArray(listItems, actualItem, 0));

    const updateItem = (idToSwitch) => {
        setItem(idToSwitch);
        setItemArray(findFirstMatchingArray(listItems, idToSwitch, 0));
        setInfosItems(matchInfosList(filter));
        setPediaItems(matchPediaList(filter));
    }

    const updateTab = (newFilter) => {
        setFilter(newFilter);
        setListItems(matchMainList(newFilter));
        setItemArray(matchMainList(newFilter)[0]);
        setInfosItems(matchInfosList(newFilter));
        setPediaItems(matchPediaList(newFilter));
        setItem(matchMainList(newFilter)[0][0]);
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
        <div className='box-layout slimes-menu'>
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
                    {listItems.map(([resId, name]) => {
                        return (
                            <NavButton
                                key={resId}
                                icon={filter + '/' + resId}
                                name={name}
                                size={wideScreen ? 125 : 100}
                                action={() => updateItem(resId)}
                                selected={actualItem === resId}
                            />
                        );
                    })}
                </div>
            </div>
            <div className='food-container box-layout-secondary'>
                <div className={'presentation presentation-' + filter}>
                    <div className="image-title">
                        <div className="info-title">
                            <h1>{itemArray[1]}</h1>
                            <h2>{filter === 'toys' ? 'Playtime gets the wiggles out.' : infosItems[itemArray[0]]}</h2>
                        </div>
                        <div className="image-container">
                            <img src={require('./assets/' + filter + '/' + itemArray[0] + '.png')} className='img-main' alt="pink slime" />
                        </div>
                    </div>
                    <div className='little-box infos-box'>
                        <img src={pedia} alt="Pedia Informations Icon" />
                        <div>
                            {pediaItems[actualItem].split("\n").map(function (item, idx) {
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
                        <div className={'little-box toy-fav' + (itemArray[2] === "none" ? '' : ' link-to-food') + (filter !== 'toys' ? ' toy-hide' : '')} onClick={() => changePage('slimes', itemArray[2])}>
                            <img src={itemArray[2] === 'none' ? require('./assets/misc/none.png') : require('./assets/slimes/' + itemArray[2] + '.png')} alt='none' />
                            <div>
                                <h3>Favorite of</h3>
                                <h4>{itemArray[2] === 'none' ? 'None' : slimesList[itemArray[2]][1]}</h4>
                            </div>
                        </div>
                    ) : (
                        <div className="little-box toy-fav toy-hide">
                            <img src={require('./assets/misc/none.png')} alt='none' />
                            <div>
                                <h3>Favorite of</h3>
                                <h4>None</h4>
                            </div>
                        </div>
                    )
                    }
                    <Biomes spawnList={filter !== 'toys' ? itemArray[2] : ['pm']} changePage={changePage} />

                </div>
            </div>
        </div>
    );
};