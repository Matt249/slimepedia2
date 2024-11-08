import { useState, useRef } from 'react';
import { regionElements, regionPedia, regionsIds, regionInfos, regionsResourcesInfos, ranchIds, regionsConnections, ranchSpecials } from '../text/regions';
import { Tab } from '../components/Tab';
import { foodList } from '../text/food';
import { slimesList } from '../text/slimes';
import Down from '../Down';
import '../css/Regions.css';

export const Regions = ({
    region = 'fields',
    changePage = () => { console.log('changePage not defined') }
}) => {
    const [actualRegion, setRegion] = useState(regionsIds.includes(region) ? region : ranchIds.includes(region) ? region : 'fields');
    const [actualSelection, setSelection] = useState(ranchIds.includes(region) ? 'ranch' : 'regions');
    const regionDescriptionRef = useRef(null);

    const goToNewPage = (page, filter, element) => {
        changePage(page, filter, element);
    }

    const scrollToSection = (top) => {
        if (regionDescriptionRef.current)
            regionDescriptionRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    const tabChange = (tab, regionArg) => {
        setSelection(tab);
        setRegion(regionArg ? regionArg : tab === 'regions' ? 'fields' : 'conservatory');
    };

    var listOfRegions = [];
    switch (actualSelection) {
        case 'ranch':
            listOfRegions = ranchIds;
            break;
        default:
            listOfRegions = regionsIds;
    }

    const goToRegion = (regionArg) => {
        if (regionsIds.includes(regionArg)) {
            if (actualSelection !== 'regions')
                setSelection('region');
            setRegion(regionArg);
        }
        else if (ranchIds.includes(regionArg)) {
            if (actualSelection !== 'ranch')
                setSelection('ranch');
            setRegion(regionArg);
        }
    }

    const descriptionChoice = () => {
        switch (actualSelection) {
            case 'regions':
                return regionDescription();
            case 'ranch':
                return ranchDescription();
            default:
                return regionDescription();
        }
    }

    const regionDescription = () => (
        <div className='region-description' ref={regionDescriptionRef}>
            <div className='region-pedia'>
                <p>
                    {regionPedia[actualRegion].split("\n").map(function (item, idx) {
                        return (
                            <span key={idx}>
                                {item}
                            </span>
                        )
                    })}
                </p>
            </div>
            <div className='region-slimes'>
                <h2 className='box-title'>Available Slimes</h2>
                {regionElements[actualRegion][0].map((slime, index) => (
                    <div
                        className="region-element"
                        onClick={() => goToNewPage('slimes', slime)}
                        key={`${slime}-${index}`}
                    >
                        <div className="region-element-content">
                            <img
                                src={require('../assets/slimes/' + slime + '.png')}
                                alt={slimesList[slime][1]}
                                title={slimesList[slime][1]}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className='region-connections'>
                <h2 className='box-title'>Region Connections</h2>
                <div className='region-from'>
                    {(regionsConnections[actualRegion][0].length) ? regionsConnections[actualRegion][0].map(regionArg => (
                        <img
                            src={require('../assets/world/' + regionArg + '.png')}
                            alt='Portal'
                            onClick={() => goToRegion(regionArg)}
                            key={regionArg}
                        />
                    )) : (
                        <img className='region-no-connection' src={require('../assets/misc/none.png')} alt='Portal' />
                    )}
                </div>
                <div className='region-connection-separator'>
                    <Down />
                </div>
                <div>
                    <img className='no-hover' src={require('../assets/world/' + actualRegion + '.png')} alt='Current Biome' />
                </div>
                <div className='region-connection-separator'>
                    <Down />
                </div>
                <div className='region-from'>
                    {(regionsConnections[actualRegion][1].length) ? regionsConnections[actualRegion][1].map(regionArg => (
                        <img
                            src={require('../assets/world/' + regionArg + '.png')}
                            alt='Portal'
                            onClick={() => setRegion(regionArg)}
                            key={regionArg}
                        />
                    )) : (
                        <img className='no-hover' src={require('../assets/misc/none.png')} alt='Portal' />
                    )}
                </div>
            </div>
            <div className='region-food'>
                <h2 className='box-title'>Available Food</h2>
                {regionElements[actualRegion][1].map((food, index) => (
                    <div className="region-element" key={`${food}-${index}`}>
                        <div
                            className="region-element-content"
                            onClick={() => goToNewPage('food', 'any', food)}
                        >
                            <img
                                src={require('../assets/food/' + food + '.png')}
                                alt={foodList[food][0]}
                                title={foodList[food][0]}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className='region-resources'>
                <h2 className='box-title'>Available Resources</h2>
                {regionElements[actualRegion][2].map(resource => (
                    <div
                        className={"region-element-resource" + (regionsResourcesInfos[resource][2].length !== 0 ? ' resource-hover' : '')}
                        onClick={() => {
                            if (regionsResourcesInfos[resource][2].length !== 0)
                                goToNewPage(regionsResourcesInfos[resource][2][0], regionsResourcesInfos[resource][2][1], regionsResourcesInfos[resource][2][2]);
                        }}
                        key={resource}
                    >
                        <img
                            src={require('../assets/' + regionsResourcesInfos[resource][1] + '.png')}
                            alt={regionsResourcesInfos[resource][0]}
                            title={regionsResourcesInfos[resource][0]}
                        />
                    </div>
                ))}
            </div>
            <div className='region-pods'>
                <h2 className='box-title'>Available Pods</h2>
                <img src={require('../assets/misc/pod.png')} alt='Pods' />
                <p>{regionInfos[actualRegion][5]}</p>
            </div>
        </div>
    );

    const ranchDescription = () => (
        <div className={`ranch-description${actualRegion === 'conservatory' ? ' ranch-conservatory' : ''}`} ref={regionDescriptionRef}>
            <div className='ranch-pedia'>
                <p>
                    {regionPedia[actualRegion].split("\n").map(function (item, idx) {
                        return (
                            <span key={idx}>
                                {item}
                            </span>
                        )
                    })}
                </p>
            </div>
            {actualRegion !== 'conservatory' && (
                <div className='ranch-connection ranch-in'>
                    <h2 className='box-title'>Accessed by</h2>
                    {regionsConnections[actualRegion][0].map((place) => (
                        <div
                            className="ranch-element"
                            onClick={() => (ranchIds.includes(place) ? setRegion(place) : tabChange('regions', place))}
                            key={place}
                            name={'coucou'}
                        >
                            <div className="region-element-content">
                                <img
                                    src={require('../assets/' + regionInfos[place][1] + '.png')}
                                    alt={regionInfos[place][0]}
                                    title={regionInfos[place][0]}
                                />
                            </div>
                        </div>
                    ))}

                </div>
            )}
            <div className='ranch-connection ranch-out'>
                <h2 className='box-title'>Leads to</h2>
                {(regionsConnections[actualRegion][1].length) ? regionsConnections[actualRegion][1].map((place) => (
                    <div
                        className="ranch-element"
                        onClick={() => (ranchIds.includes(place) ? setRegion(place) : tabChange('regions', place))}
                        key={place}
                        name={regionInfos[place][0]}
                    >
                        <div className="region-element-content">
                            <img
                                src={require('../assets/' + regionInfos[place][1] + '.png')}
                                alt={regionInfos[place][0]}
                                title={regionInfos[place][0]}
                            />
                        </div>
                    </div>
                )) :
                    <h3 className='ranch-nowhere'>Nowhere</h3>
                }
            </div>
            <div className='ranch-box ranch-cost'>
                <h2 className='box-title'>Expansion Cost</h2>
                <h3>{regionInfos[actualRegion][7]}</h3>
                <img src={require('../assets/misc/buck.png')} alt='Newbucks' />
            </div>
            <div className='ranch-box ranch-slots'>
                <h2 className='box-title'>Available Slots</h2>
                <h3>{regionInfos[actualRegion][6]}</h3>
                <img src={require('../assets/misc/patch.png')} alt='Slots' />
            </div>
            <div className='ranch-box ranch-pods'>
                <h2 className='box-title'>Pod in this Expansion</h2>
                <h3>{regionInfos[actualRegion][5]}</h3>
                <img src={require('../assets/misc/pod.png')} alt='Slots' />
            </div>
            <div className='ranch-box ranch-special'>
                <h2 className='box-title'>Special Features</h2>
                {ranchSpecials[actualRegion].map((feature) => (
                    <div
                        className={'ranch-special-feature' + (regionsResourcesInfos[feature][2].length !== 0 ? ' special-hover' : '')}
                        key={feature}
                        onClick={() => {
                            if (regionsResourcesInfos[feature][2].length !== 0)
                                goToNewPage(regionsResourcesInfos[feature][2][0], regionsResourcesInfos[feature][2][1], regionsResourcesInfos[feature][2][2]);
                        }}
                    >
                        <img src={require('../assets/' + regionsResourcesInfos[feature][1] + '.png')} alt='Slots' />
                        <h3>{regionsResourcesInfos[feature][0]}</h3>
                    </div>
                ))}
            </div>
        </div>
    );

    const handleMouseEnter = (e, region) => {
        if (e.target.readyState >= 3)
            e.target.play();
    };

    const handleMouseLeave = (e, region) => {
        if (e.target.readyState >= 3)
            if (actualRegion !== region)
                e.target.pause();
    };

    return (
        <div className='regions'>
            <div className='regions-menu'>
                <div className='regions-tab-selector'>
                    <Tab title='World Regions' icon='misc/world' selected={actualSelection === 'regions'} action={() => tabChange('regions')} />
                    <Tab title='Ranch' icon='misc/patch' selected={actualSelection === 'ranch'} action={() => tabChange('ranch')} />
                </div>
                <div className={'regions-list' + (actualSelection === 'regions' ? ' not-rounded' : '')}>
                    {listOfRegions.map(region => (
                        <div
                            className={'region-tab' + (actualRegion === [region][0] ? ' region-selected' : '')}
                            key={regionInfos[region][0]}
                            onClick={() => setRegion(region)}
                        >
                            <video
                                className='region-video'
                                src={require('../assets/' + regionInfos[region][2] + '.light.webm')}
                                onMouseEnter={e => handleMouseEnter(e, region)}
                                onMouseLeave={e => handleMouseLeave(e, region)}
                                disablePictureInPicture loop muted
                            >
                                {regionInfos[region][0]} Video
                            </video>
                            <img className='region-icon' src={require('../assets/' + regionInfos[region][1] + '.png')} alt='Rainbow Fields Logo' />
                            <h2 className='region-name'>{regionInfos[region][0]}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className='region-presentation'>
                <div className='region-background'>
                    <video
                        className='region-background-video'
                        src={require('../assets/' + regionInfos[actualRegion][2] + '.webm')}
                        disablePictureInPicture autoPlay loop muted
                        onLoadedData={e => {
                            e.target.play();
                        }}
                    >
                        Video Background
                    </video>
                </div>
                <div className='region-container'>
                    <div className='region-main-page-frame'>
                        <div className='region-main-page'>
                            <img src={require('../assets/world/' + actualRegion + '.png')} alt='Region Icon' />
                            <h1>{regionInfos[actualRegion][0]}</h1>
                            <h2>{regionInfos[actualRegion][3]}</h2>
                        </div>
                        <h1 className='arrow-down' onClick={scrollToSection}>
                            <Down />
                        </h1>
                    </div>
                    {descriptionChoice()}
                </div>
            </div>
        </div>
    );
}

