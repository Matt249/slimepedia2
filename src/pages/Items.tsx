import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { NavButton } from '../components/NavButton';
import { Biomes } from '../components/Biomes';
import { Tab } from '../components/Tab';
import { Resource, resourceList, resourcePedia } from '../text/resources';
import { Toy, toyNames } from '../text/toys';
import { Slime, slimesList } from '../text/slimes';
import '../css/Pedia.css';
import { getEnumValue } from '../App';

enum ItemType {
    Resource = 'resources',
    Toy = 'toys',
}

const slimePerToy: (toy: Toy) => Slime | null = (toy) => {
    if (toy === null)
        return null;
    for (const [slime, slimeInfos] of Object.entries(slimesList)) {
        if (slimeInfos[4] === toy)
            return slime as Slime;
    }
    return null;
}

const ItemList: React.FC<{
    tab: ItemType;
    item: Resource | Toy | null;
    setTab: (item: ItemType) => void
}> = ({ tab, item, setTab }) => (
    <div className='list-container'>
        <div className='items-tabs'>
            <Tab
                title='Resources'
                icon='misc/res'
                selected={tab === ItemType.Resource}
                action={() => setTab(ItemType.Resource)}
            />
            <Tab
                title='Toys'
                icon='misc/toys'
                selected={tab === ItemType.Toy}
                action={() => setTab(ItemType.Toy)}
            />
        </div>
        <OverlayScrollbarsComponent
            options={{
                scrollbars: {
                    autoHide: "move",
                    autoHideDelay: 500,
                },
            }}
            className={'list-food ' + (tab === Object.values(ItemType)[0] ? 'list-food-first' : 'list-food-last')}
            defer
        >
            {tab === ItemType.Toy ?
                Object.values(Toy).map((toy) => (
                    <NavLink key={toy + '-item'} to={'/items/toys/' + toy} style={{ textDecoration: 'none' }}>
                        <NavButton
                            icon={'toys/' + toy}
                            name={toyNames[toy][0]}
                            size={1.25}
                            selected={toy === item}
                        />
                    </NavLink>
                )) :
                Object.values(Resource).map((resource) => (
                    <NavLink key={resource + '-item'} to={`/items/${tab}/${resource}`} style={{ textDecoration: 'none' }}>
                        <NavButton
                            icon={tab + '/' + resource}
                            name={resourceList[resource][0]}
                            size={1.25}
                            selected={resource === item}
                        />
                    </NavLink>
                ))}
        </OverlayScrollbarsComponent>
    </div>
);

const EmptyItemInfos = () => (
    <div className={'presentation presentation-resources'}>
        <div className="image-title">
            <div className="info-title">
                <h1>No item selected</h1>
                <h2>Select an item on the list</h2>
            </div>
            <div className="image-container">
                <img src='' className='img-main' alt='' />
            </div>
        </div>
        <div className='little-box infos-box'>
            <img src='/assets/misc/pediatut.png' alt="Pedia Informations Icon" />
            <div>
            </div>
        </div>
        <div className='little-box toy-hide'>
            <img src='/assets/misc/buck.png' alt='Newbuck Icon' />
            <div>
                <h3>Price</h3>
                <h4>500</h4>
            </div>
        </div>

        <div className="little-box toy-fav toy-hide">
            <img src='/assets/misc/none.png' alt='None' />
            <div>
                <h3>Favorite of</h3>
                <h4>None</h4>
            </div>
        </div>
        <Biomes spawnList={[]} />
    </div>
)

export const Items = () => {
    const { tab: tabName, item: itemName } = useParams();
    const category = (() => {
        if (getEnumValue(Resource, itemName))
            return ItemType.Resource;
        if (getEnumValue(Toy, itemName))
            return ItemType.Toy;
        return getEnumValue(ItemType, tabName);
    }
    )();
    const item: Resource | Toy | null = (() => {
        const resource = getEnumValue(Resource, itemName);
        if (resource !== null)
            return resource;
        return getEnumValue(Toy, itemName);
    })();
    const [tab, setTab] = useState<ItemType>(category ?? ItemType.Resource);

    useEffect(() => {
        if (category !== null)
            setTab(category);
    }, [category]);

    if (category === null) {
        if (getEnumValue(Resource, tabName))
            return <Navigate to={`/items/resources/${tabName}`} replace />;
        if (getEnumValue(Toy, tabName))
            return <Navigate to={`/items/toys/${tabName}`} replace />;
        return <Navigate to='/items/resources' replace />;
    }
    if (item === null) {
        return (
            <div>
                <ItemList tab={tab} item={null} setTab={setTab} />
                <EmptyItemInfos />
            </div>
        );
    }
    if (tabName === ItemType.Resource && !Object.values(Resource).includes(item as Resource))
        return <Navigate to={`/items/toys/${item}`} replace />;
    if (tabName === ItemType.Toy && !Object.values(Toy).includes(item as Toy))
        return <Navigate to={`/items/resources/${item}`} replace />;

    const title = (() => {
        if (item !== null)
            return category === ItemType.Resource 
                ? resourceList[item as Resource][0].toString() 
                : toyNames[item as Toy][0].toString();
        if (category !== null)
            return category.toString();
        return 'Items';
    })();
    document.title = title + ' - Slimepedia 2';

    const itemTitle = (() => {
        if (category === ItemType.Resource)
            return resourceList[item as Resource][0];
        if (category === ItemType.Toy)
            return toyNames[item as Toy][0];
        return '';
    })();

    return (
        <div>
            <ItemList tab={tab} item={item} setTab={setTab} />
            <div className={'presentation presentation-' + category}>
                <div className="image-title">
                    <div className="info-title">
                        <h1>{itemTitle}</h1>
                        <h2>{item && Object.values(Toy).includes(item as Toy) ? 'Playtime gets the wiggles out.' : resourceList[item as Resource][2]}</h2>
                    </div>
                    <div className="image-container">
                        <img src={`/assets/${category}/${item}.png`} className='img-main' alt={itemTitle} />
                    </div>
                </div>
                <div className='little-box infos-box'>
                    <img src='/assets/misc/pediatut.png' alt="Pedia Informations Icon" />
                    <div>
                        {(category === ItemType.Resource ? resourcePedia[item as Resource] : toyNames[item as Toy][1]).split("\n").map((line, index) => {
                            return (
                                <p key={'paragraph-' + index}>
                                    {line}
                                </p>
                            )
                        })}
                    </div>
                </div>
                <div className={'little-box toy-price' + (category !== ItemType.Toy ? ' toy-hide' : '')}>
                    <img src='/assets/misc/buck.png' alt='Newbuck Icon' />
                    <div>
                        <h3>Price</h3>
                        <h4>500</h4>
                    </div>
                </div>
                {(() => {
                    if (category === ItemType.Toy) {
                        const slime = slimePerToy(item as Toy);
                        if (slime === null) {
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
                                <NavLink to={`/slimes/${slime}`} style={{ textDecoration: 'none' }}>
                                    <div className='little-box toy-fav link-to-food'>
                                        <img src={`/assets/slimes/${slime}.png`} alt={slimesList[slime][0]} />
                                        <div>
                                            <h3>Favorite of</h3>
                                            <h4>{slimesList[slime][0]}</h4>
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
                <Biomes spawnList={category === ItemType.Resource ? resourceList[item as Resource][1] : ['pm']} />
            </div>
        </div>
    );
};

export default Items;