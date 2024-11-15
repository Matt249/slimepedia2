import { useRef } from 'react';
import { regionElements, regionPedia, regionsIds, regionInfos, regionsResourcesInfos, ranchIds, regionsConnections, ranchSpecials } from '../text/regions';
import { Tab } from '../components/Tab';
import { foodList } from '../text/food';
import { slimesList } from '../text/slimes';
import { mediaFetcher } from '../media-manager';
import Down from '../components/Down';
import PropTypes from 'prop-types';
import podImg from '/src/assets/misc/pod.png';
import noneImg from '/src/assets/misc/none.png';
import buckImg from '/src/assets/misc/buck.png';
import patchImg from '/src/assets/misc/patch.png';
import '../css/Regions.css';
import { NavLink } from 'react-router-dom';

export const Regions = ({
    region = 'fields'
}) => {
    const actualSelection = ranchIds.includes(region) ? 'ranch' : 'regions';
    const regionDescriptionRef = useRef(null);

    const scrollToSection = () => {
        if (regionDescriptionRef.current)
            regionDescriptionRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    const listOfRegions = actualSelection === 'regions' ? regionsIds : ranchIds;

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
                <h2 className='box-title'>Slimepedia Entry</h2>
                <p>
                    {regionPedia[region].split("\n").map(function (item, idx) {
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
                {regionElements[region][0].map((slime, index) => (
                    <NavLink to={`/slimes/${slime}`} style={{ textDecoration: 'none' }} key={`${slime}-${index}`}>
                        <div
                            className="region-element"
                            key={`${slime}-${index}`}
                        >
                            <div className="region-element-content">
                                <img
                                    src={mediaFetcher(`slimes/${slime}.png`)}
                                    alt={slimesList[slime][1]}
                                    title={slimesList[slime][1]}
                                />
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
            <div className='region-connections'>
                <h2 className='box-title'>Region Connections</h2>
                <div className='region-from'>
                    {(regionsConnections[region][0].length) ? regionsConnections[region][0].map(regionArg => (
                        <NavLink to={`/regions/${regionArg}`} style={{ textDecoration: 'none' }} key={regionArg}>
                            <img
                                src={mediaFetcher(`world/${regionArg}.png`)}
                                alt='Portal'
                                key={regionArg}
                            />
                        </NavLink>
                    )) : (
                        <img className='region-no-connection' src={noneImg} alt='No Region' />
                    )}
                </div>
                <div className='region-connection-separator'>
                    <Down />
                </div>
                <div>
                    <img className='no-hover' src={mediaFetcher(`world/${region}.png`)} alt='Current Biome' />
                </div>
                <div className='region-connection-separator'>
                    <Down />
                </div>
                <div className='region-from'>
                    {(regionsConnections[region][1].length) ? regionsConnections[region][1].map(regionArg => (
                        <NavLink to={`/regions/${regionArg}`} style={{ textDecoration: 'none' }} key={regionArg}>
                            <img
                                src={mediaFetcher(`world/${regionArg}.png`)}
                                alt='Portal'
                                key={regionArg}
                            />
                        </NavLink>
                    )) : (
                        <img className='no-hover' src={noneImg} alt='Portal' />
                    )}
                </div>
            </div>
            <div className='region-food'>
                <h2 className='box-title'>Available Food</h2>
                {regionElements[region][1].map((food, index) => (
                    <NavLink to={`/food/${food}`} style={{ textDecoration: 'none' }} key={`${food}-${index}`}>
                        <div className="region-element" key={`${food}-${index}`}>
                            <div className="region-element-content">
                                <img
                                    src={mediaFetcher(`food/${food}.png`)}
                                    alt={foodList[food][0]}
                                    title={foodList[food][0]}
                                />
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
            <div className='region-resources'>
                <h2 className='box-title'>Available Resources</h2>
                {regionElements[region][2].map(resource => (regionsResourcesInfos[resource][2].length === 0 ?
                    <div
                        className='region-element-resource'
                        key={resource}
                    >
                        <img
                            src={mediaFetcher(`${regionsResourcesInfos[resource][1]}.png`)}
                            alt={regionsResourcesInfos[resource][0]}
                            title={regionsResourcesInfos[resource][0]}
                        />
                    </div>
                    :
                    <NavLink to={`/resources/${resource}`} style={{ textDecoration: 'none' }} key={resource}>
                        <div
                            className='region-element-resource resource-hover'
                            key={resource}
                        >
                            <img
                                src={mediaFetcher(`${regionsResourcesInfos[resource][1]}.png`)}
                                alt={regionsResourcesInfos[resource][0]}
                                title={regionsResourcesInfos[resource][0]}
                            />
                        </div>
                    </NavLink>
                ))}
            </div>
            <div className='region-pods'>
                <h2 className='box-title'>Available Pods</h2>
                <img src={podImg} alt='Pods' />
                <p>{regionInfos[region][5]}</p>
            </div>
        </div>
    );

    const ranchDescription = () => (
        <div className={`ranch-description${region === 'conservatory' ? ' ranch-conservatory' : ''}`} ref={regionDescriptionRef}>
            <div className='ranch-pedia'>
                <h2 className='box-title'>Slimepedia Entry</h2>
                <p>
                    {regionPedia[region].split("\n").map(function (item, idx) {
                        return (
                            <span key={idx}>
                                {item}
                            </span>
                        )
                    })}
                </p>
            </div>
            {region !== 'conservatory' && (
                <div className='ranch-connection ranch-in'>
                    <h2 className='box-title'>Accessed by</h2>
                    {regionsConnections[region][0].map((place) => (
                        <NavLink to={`/regions/${place}`} style={{ textDecoration: 'none' }} key={place}>
                            <div
                                className="ranch-element"
                                key={place}
                                name={'coucou'}
                            >
                                <div className="region-element-content">
                                    <img
                                        src={mediaFetcher(`world/${regionInfos[place][1]}.png`)}
                                        alt={regionInfos[place][0]}
                                        title={regionInfos[place][0]}
                                    />
                                </div>
                            </div>
                        </NavLink>
                    ))}

                </div>
            )}
            <div className='ranch-connection ranch-out'>
                <h2 className='box-title'>Leads to</h2>
                {(regionsConnections[region][1].length) ? regionsConnections[region][1].map((place) => (
                    <NavLink to={`/regions/${place}`} style={{ textDecoration: 'none' }} key={place}>
                        <div
                            className="ranch-element"
                            key={place}
                            name={regionInfos[place][0]}
                        >
                            <div className="region-element-content">
                                <img
                                    src={mediaFetcher(`world/${regionInfos[place][1]}.png`)}
                                    alt={regionInfos[place][0]}
                                    title={regionInfos[place][0]}
                                />
                            </div>
                        </div>
                    </NavLink>
                )) :
                    <h3 className='ranch-nowhere'>Nowhere</h3>
                }
            </div>
            <div className='ranch-box ranch-cost'>
                <h2 className='box-title'>Expansion Cost</h2>
                <h3>{regionInfos[region][7]}</h3>
                <img src={buckImg} alt='Newbucks' />
            </div>
            <div className='ranch-box ranch-slots'>
                <h2 className='box-title'>Available Slots</h2>
                <h3>{regionInfos[region][6]}</h3>
                <img src={patchImg} alt='Slots' />
            </div>
            <div className='ranch-box ranch-pods'>
                <h2 className='box-title'>Pod in this Expansion</h2>
                <h3>{regionInfos[region][5]}</h3>
                <img src={podImg} alt='Slots' />
            </div>
            <div className='ranch-box ranch-special'>
                <h2 className='box-title'>Special Features</h2>
                {ranchSpecials[region].map((feature) => (regionsResourcesInfos[feature][2].length === 0 ?
                    <div
                        className='ranch-special-feature'
                        key={feature}
                    >
                        <img src={mediaFetcher(`${regionsResourcesInfos[feature][1]}.png`)} alt='Slots' />
                        <h3>{regionsResourcesInfos[feature][0]}</h3>
                    </div>
                    :
                    <NavLink to={`/${regionsResourcesInfos[feature][2][0]}/${regionsResourcesInfos[feature][2][2]}`} style={{ textDecoration: 'none' }} key={feature}>
                        <div
                            className='ranch-special-feature special-hover'
                            key={feature}
                        >
                            <img src={mediaFetcher(`${regionsResourcesInfos[feature][1]}.png`)} alt='Slots' />
                            <h3>{regionsResourcesInfos[feature][0]}</h3>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );

    const handleMouseEnter = (e) => {
        if (e.target.readyState >= 3)
            e.target.play();
    };

    const handleMouseLeave = (e) => {
        if (e.target.readyState >= 3)
            if (region !== region)
                e.target.pause();
    };

    return (
        <div>
            <div className='region-tab-list'>
                <div className='regions-tab-selector'>
                    <NavLink to='/regions/fields' style={{ textDecoration: 'none' }}>
                        <Tab title='World Regions' icon='misc/world' selected={actualSelection === 'regions'} />
                    </NavLink>
                    <NavLink to='/regions/conservatory' style={{ textDecoration: 'none' }}>
                        <Tab title='Ranch' icon='misc/patch' selected={actualSelection === 'ranch'} />
                    </NavLink>
                </div>
                <div className={'regions-list' + (actualSelection === 'regions' ? ' not-rounded' : '')}>
                    {listOfRegions.map(regionItem => (
                        <NavLink to={`/regions/${regionItem}`} style={{ textDecoration: 'none' }} key={regionItem}>
                            <div
                                className={'region-tab' + (regionItem === region ? ' region-selected' : '')}
                                key={regionInfos[regionItem][0]}
                            >
                                <video
                                    className='region-video'
                                    src={mediaFetcher(`videos/${regionInfos[regionItem][2]}.light.webm`)}
                                    onMouseEnter={e => handleMouseEnter(e, regionItem)}
                                    onMouseLeave={e => handleMouseLeave(e, regionItem)}
                                    disablePictureInPicture loop muted
                                >
                                    {regionInfos[regionItem][0]} Video
                                </video>
                                <img className='region-icon' src={mediaFetcher(`world/${regionInfos[regionItem][1]}.png`)} alt='Rainbow Fields Logo' />
                                <h2 className='region-name'>{regionInfos[regionItem][0]}</h2>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className='region-presentation'>
                <div className='region-background'>
                    <video
                        className='region-background-video'
                        src={mediaFetcher(`videos/${regionInfos[region][2]}.webm`)}
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
                            <img src={mediaFetcher(`world/${region}.png`)} alt='Region Icon' />
                            <h1>{regionInfos[region][0]}</h1>
                            <h2>{regionInfos[region][3]}</h2>
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

Regions.propTypes = {
    region: PropTypes.string,
    changePage: PropTypes.func
};