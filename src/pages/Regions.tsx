import React, { useEffect, useRef, useState } from 'react';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Region, Ranch, regionElements, regionPedia, regionInfos, regionsResourcesInfos, regionsConnections, ranchSpecials, ranchInfos, ranchConnections, ranchPedia } from '../text/regions';
import { Tab } from '../components/Tab';
import { foodList } from '../text/food';
import { slimesList } from '../text/slimes';
import { LabyMusicRefs, MusicRefs } from '../components/MusicPlayer';
import '../css/MusicPlayer.css';
import '../css/Regions.css';
import { FaAngleDown } from 'react-icons/fa6';
import { getEnumValue } from '../App';

const regionTypeMatcher: (region: Region | Ranch) => RegionType | null = (region) => {
    if (Object.values(Region).includes(region as Region))
        return RegionType.Region;
    if (Object.values(Ranch).includes(region as Ranch))
        return RegionType.Ranch;
    else
        return null;
}

const RegionConnections: React.FC<{ region: Region | Ranch }> = ({ region, }) => {
    const connections = (() => {
        if (regionTypeMatcher(region) === RegionType.Region) {
            return regionsConnections[region as Region];
        }
        else if (regionTypeMatcher(region) === RegionType.Ranch) {
            return ranchConnections[region as Ranch];
        }
        else
            return [[], []];
    })();
    return (
        <div className='region-connections'>
            <h2 className='box-title'>Region Connections</h2>
            <div className='region-from'>
                {connections[0].length > 0 ? connections[0].map(regionName => {
                    if (regionTypeMatcher(regionName) === RegionType.Region)
                        return (
                            <NavLink to={`/regions/region/${regionName}`} key={'from-' + regionName}>
                                <img src={`/assets/world/${regionName}.png`} alt={regionInfos[regionName as Region][0]} title={regionInfos[regionName as Region][0]} />
                            </NavLink>
                        )
                    if (regionTypeMatcher(regionName) === RegionType.Ranch)
                        return (
                            <NavLink to={`/regions/ranch/${regionName}`} key={'from-' + regionName}>
                                <img src={`/assets/world/${regionName}.png`} alt={ranchInfos[regionName as Ranch][0]} title={ranchInfos[regionName as Ranch][0]} />
                            </NavLink>
                        )
                    return (<img key={'from-' + regionName} className='no-hover' src='/assets/misc/none.png' alt='No Region' />);
                }) : (
                    <img className='no-hover' src='/assets/misc/none.png' alt='No Region' />
                )}
            </div>
            <div className='region-connection-separator'>
                <FaAngleDown />
            </div>
            <div>
                <img className='no-hover' src={`/assets/world/${region}.png`} alt='Current Biome' />
            </div>
            <div className='region-connection-separator'>
                <FaAngleDown />
            </div>
            <div className='region-to'>
                {connections[1].length > 0 ? connections[1].map(regionName => {
                    if (regionTypeMatcher(regionName) === RegionType.Region)
                        return (
                            <NavLink to={`/regions/region/${regionName}`} key={'from-' + regionName}>
                                <img src={`/assets/world/${regionName}.png`} alt={regionInfos[regionName as Region][0]} title={regionInfos[regionName as Region][0]} />
                            </NavLink>
                        )
                    if (regionTypeMatcher(regionName) === RegionType.Ranch)
                        return (
                            <NavLink to={`/regions/ranch/${regionName}`} key={'from-' + regionName}>
                                <img src={`/assets/world/${regionName}.png`} alt={ranchInfos[regionName as Ranch][0]} title={ranchInfos[regionName as Ranch][0]} />
                            </NavLink>
                        )
                    return (<img key={'from-' + regionName} className='no-hover' src='/assets/misc/none.png' alt='No Region' />);
                }) : (
                    <img className='no-hover' src='/assets/misc/none.png' alt='No Region' />
                )}
            </div>
        </div>);
};

const RegionDescription: React.FC<{ region: Region }> = ({ region }) => (
    <div className='region-description' id='region-description'>
        <OverlayScrollbarsComponent
            options={{
                scrollbars: {
                    autoHide: "move",
                    autoHideDelay: 500,
                },
            }}
            className='region-pedia'
            defer
        >
            <h2 className='box-title'>Slimepedia Entry</h2>
            <p>
                {regionPedia[region].split("\n").map(function (item) {
                    return (
                        <span key={item}>
                            {item}
                        </span>
                    )
                })}
            </p>
        </OverlayScrollbarsComponent>
        <OverlayScrollbarsComponent
            options={{
                scrollbars: {
                    autoHide: "move",
                    autoHideDelay: 500,
                },
            }}
            className='region-slimes'
            defer
        >
            <h2 className='box-title'>Available Slimes</h2>
            {regionElements[region][0].map((slime, index) => (
                <NavLink to={`/slimes/${slime}`} style={{ textDecoration: 'none' }} key={`${slime}-${index}`}>
                    <div
                        className="region-element"
                        key={`${slime}-${index}`}
                    >
                        <div className="region-element-content">
                            <img
                                src={`/assets/slimes/${slime}.png`}
                                alt={slimesList[slime][0]}
                                title={slimesList[slime][0]}
                            />
                        </div>
                    </div>
                </NavLink>
            ))}
        </OverlayScrollbarsComponent>
        <OverlayScrollbarsComponent
            options={{
                scrollbars: {
                    autoHide: "move",
                    autoHideDelay: 500,
                },
            }}
            className='region-food'
            defer
        >
            <h2 className='box-title'>Available Food</h2>
            {regionElements[region][1].map((food, index) => (
                <NavLink to={`/food/${food}`} style={{ textDecoration: 'none' }} key={`${food}-${index}`}>
                    <div className="region-element" key={`${food}-${index}`}>
                        <div className="region-element-content">
                            <img
                                src={`/assets/food/${food}.png`}
                                alt={foodList[food][0]}
                                title={foodList[food][0]}
                            />
                        </div>
                    </div>
                </NavLink>
            ))}
        </OverlayScrollbarsComponent>
        <RegionConnections region={region} />
        <OverlayScrollbarsComponent
            options={{
                scrollbars: {
                    autoHide: "move",
                    autoHideDelay: 500,
                },
                overflow: {
                    x: 'scroll',
                    y: 'hidden',
                }
            }}
            className='region-resources'
            defer
        >
            <h2 className='box-title'>Available Resources</h2>
            {regionElements[region][2].map(resource => (regionsResourcesInfos[resource][2].length === 0 ?
                <div
                    className='region-element-resource'
                    key={resource}
                >
                    <img
                        src={`/assets/${regionsResourcesInfos[resource][1]}.png`}
                        alt={regionsResourcesInfos[resource][0]}
                        title={regionsResourcesInfos[resource][0]}
                    />
                </div>
                :
                <NavLink to={regionsResourcesInfos[resource][2]} style={{ textDecoration: 'none' }} key={resource}>
                    <div
                        className='region-element-resource resource-hover'
                        key={resource}
                    >
                        <img
                            src={`/assets/${regionsResourcesInfos[resource][1]}.png`}
                            alt={regionsResourcesInfos[resource][0]}
                            title={regionsResourcesInfos[resource][0]}
                        />
                    </div>
                </NavLink>
            ))}
        </OverlayScrollbarsComponent>
        <div className='region-pods'>
            <h2 className='box-title'>{region === 'labyrinth' ? 'Ancient Vaults' : 'Tresaure Pods'}</h2>
            <img src={region === 'labyrinth' ? '/assets/misc/door.png' : '/assets/misc/pod.png'} alt='Pods' />
            <p>{regionInfos[region][5]}</p>
        </div>
    </div >
);

const RanchDescription: React.FC<{ region: Ranch }> = ({ region }) => (
    <div className={`ranch-description${region === 'conservatory' ? ' ranch-conservatory' : ''}`} id='ranch-description'>
        <OverlayScrollbarsComponent
            options={{
                scrollbars: {
                    autoHide: "move",
                    autoHideDelay: 500,
                }
            }}
            className='ranch-pedia'
            defer
        >
            <h2 className='box-title'>Slimepedia Entry</h2>
            <p>
                {ranchPedia[region].split("\n").map(function (item) {
                    return (
                        <span key={item}>
                            {item}
                        </span>
                    )
                })}
            </p>
        </OverlayScrollbarsComponent>
        <RegionConnections region={region} />
        <div className='ranch-box ranch-cost'>
            <h2 className='box-title'>Expansion Cost</h2>
            <h3>{ranchInfos[region][6]}</h3>
            <img src='/assets/misc/buck.png' alt='Newbucks' />
        </div>
        <div className='ranch-box ranch-slots'>
            <h2 className='box-title'>Available Slots</h2>
            <h3>{ranchInfos[region][5]}</h3>
            <img src='/assets/misc/patch.png' alt='Slots' />
        </div>
        <div className='ranch-box ranch-pods'>
            <h2 className='box-title'>Pod in this Expansion</h2>
            <h3>{ranchInfos[region][4]}</h3>
            <img src='/assets/misc/pod.png' alt='Slots' />
        </div>
        <div className='ranch-box ranch-special'>
            <h2 className='box-title'>Special Features</h2>
            {ranchSpecials[region].map((feature) => {
                const isDirectFeature = regionsResourcesInfos[feature][2] === '';
                return isDirectFeature ? (
                    <div
                        className='ranch-special-feature'
                        key={feature}
                    >
                        <img src={`/assets/${regionsResourcesInfos[feature][1]}.png`} alt={regionsResourcesInfos[feature][0]} />
                        <h3>{regionsResourcesInfos[feature][0]}</h3>
                    </div>
                ) : (
                    <NavLink to={regionsResourcesInfos[feature][2]} style={{ textDecoration: 'none' }} key={feature}>
                        <div
                            className='ranch-special-feature special-hover'
                            key={feature}
                        >
                            <img src={`/assets/${regionsResourcesInfos[feature][1]}.png`} alt={regionsResourcesInfos[feature][0]} />
                            <h3>{regionsResourcesInfos[feature][0]}</h3>
                        </div>
                    </NavLink>
                );
            })}
        </div>
    </div >
);

const animationDelay = 300;

enum RegionType {
    Region = 'region',
    Ranch = 'ranch'
}

export const Regions: React.FC = () => {
    const { regionType: regionTypeName, region: regionName } = useParams();
    const regionType = getEnumValue(RegionType, regionTypeName);
    const region = (() => {
        const foundRegion = getEnumValue(Region, regionName);
        if (foundRegion !== null)
            return foundRegion;
        return getEnumValue(Ranch, regionName);
    })();
    const [tab, setTab] = useState<RegionType>();

    const mainPlayer = useRef<HTMLVideoElement>(null);
    const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

    useEffect(() => {
        if (regionType !== null)
            setTab(regionType);
    }, [regionType]);

    if (regionType === null) {
        if (getEnumValue(Region, region as Region))
            return <Navigate to={`/regions/region/${regionName}`} replace />;
        if (getEnumValue(Ranch, region as Ranch))
            return <Navigate to={`/regions/ranch/${regionName}`} replace />;
        return <Navigate to='/regions/region/fields' replace />;
    }
    if (region === null)
        return <Navigate to='/regions/region/fields' replace />;
    if (regionTypeName === RegionType.Region && !Object.values(Region).includes(region as Region))
        return <Navigate to={`/regions/ranch/${region}`} replace />;
    if (regionTypeName === RegionType.Ranch && !Object.values(Ranch).includes(region as Ranch))
        return <Navigate to={`/regions/region/${region}`} replace />;



    const zoneList = (() => {
        if (regionType === RegionType.Region) {
            return regionInfos[region as Region];
        } else if (regionType === RegionType.Ranch) {
            return ranchInfos[region as Ranch];
        }
        return [[], [], []];
    })();

    const zoneName = zoneList[0] as string;
    const zoneCode = zoneList[1];
    const zoneDescription = zoneList[2];

    const handleMouseEnter = async (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        const video = e.target as HTMLVideoElement;
        if (video.readyState >= 3) {
            try {
                await video.play();
            } catch (error) {
                console.error("Error playing video:", error);
            }
        }
    };

    const handleMouseLeave = async (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        const video = e.target as HTMLVideoElement;
        setTimeout(async () => {
            if (video.readyState >= 3) {
                try {
                    video.pause();
                } catch (error) {
                    console.error("Error pausing video:", error);
                }
            }
        }, animationDelay);
    };

    const handleVideoLoaded = async () => {
        try {
            if (mainPlayer.current && videoRefs.current[region]) {
                mainPlayer.current.currentTime = videoRefs.current[region].currentTime;
                await mainPlayer.current.play();
            }
        } catch (error) {
            console.error("Error loading main video:", error);
        }
    };

    const backgroudRegion = {
        backgroundImage: `url("/assets/wait/${region}.jpg")})`
    };

    const regionList = tab === RegionType.Region ? Object.values(Region) : Object.values(Ranch);
    document.title = (regionType === RegionType.Region ? regionInfos[region as Region][0] : ranchInfos[region as Ranch][0]) + ' - Slimepedia 2';

    return (
        <div>
            <div className='region-tab-list'>
                <div className='regions-tabs'>
                    <Tab title='World Regions' icon='misc/world' selected={tab === 'region'} action={() => setTab(RegionType.Region)} />
                    <Tab title='Ranch' icon='misc/patch' selected={tab === 'ranch'} action={() => setTab(RegionType.Ranch)} />
                </div>
                <OverlayScrollbarsComponent
                    options={{
                        scrollbars: {
                            autoHide: "move",
                            autoHideDelay: 500,
                        },
                    }}
                    className={'regions-list' + (tab === 'region' ? ' regions-list-regions' : ' regions-list-ranch')}
                    defer
                >
                    {regionList.map(regionItem => (
                        <NavLink to={`/regions/${tab}/${regionItem}`} style={{ textDecoration: 'none' }} key={regionItem}>
                            <div
                                className={'region-tab' + (regionItem === region ? ' region-selected' : '')}
                                key={tab === RegionType.Region ? regionInfos[regionItem as Region][0] : ranchInfos[regionItem as Ranch][0]}
                            >
                                <video
                                    ref={el => videoRefs.current[regionItem] = el}
                                    className='region-video'
                                    src={`/assets/videos/${tab === RegionType.Region ? regionInfos[regionItem as Region][1] : ranchInfos[regionItem as Ranch][1]}.light.webm`}
                                    onMouseEnter={e => handleMouseEnter(e)}
                                    onMouseLeave={e => { if (regionItem !== region) handleMouseLeave(e) }}
                                    autoPlay={regionItem === region}
                                    disablePictureInPicture loop muted
                                >
                                    {tab === RegionType.Region ? regionInfos[regionItem as Region][0] : ranchInfos[regionItem as Ranch][0]} Video
                                </video>
                                <img className='region-icon' src={`/assets/world/${regionItem}.png`} alt={tab === RegionType.Region ? regionInfos[regionItem as Region][0] : ranchInfos[regionItem as Ranch][0]} />
                                <h2 className='region-name'>{tab === RegionType.Region ? regionInfos[regionItem as Region][0] : ranchInfos[regionItem as Ranch][0]}</h2>
                            </div>
                        </NavLink>
                    ))}
                </OverlayScrollbarsComponent>
            </div>
            <div className='region-presentation'>
                <div className='region-background' style={backgroudRegion}>
                    <video
                        ref={mainPlayer}
                        className='region-background-video'
                        src={`/assets/videos/${zoneCode}.webm`}
                        disablePictureInPicture
                        autoPlay
                        loop
                        muted
                        onLoadedData={handleVideoLoaded}
                    >
                        Video Background
                    </video>
                </div>
                <div className='region-container'>
                    <div className='region-main-page-frame'>
                        {region === 'labyrinth' ? <LabyMusicRefs /> : <MusicRefs region={region} />}
                        <div className='region-main-page'>
                            <img src={`/assets/world/${region}.png`} alt={zoneName} />
                            <h1>{zoneName}</h1>
                            <h2>{zoneDescription}</h2>
                        </div>
                        <a className='arrow-down' href={`#${regionType}-description`}>
                            <FaAngleDown />
                        </a>
                    </div>
                    {regionType === RegionType.Region && <RegionDescription region={region as Region} />}
                    {regionType === RegionType.Ranch && <RanchDescription region={region as Ranch} />}
                </div>
            </div>
        </div>
    );
}

export default Regions;