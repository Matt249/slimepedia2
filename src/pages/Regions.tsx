import React, { useRef, useState } from 'react';
import { regionElements, regionPedia, regionsIds, regionInfos, regionsResourcesInfos, ranchIds, regionsConnections, ranchSpecials } from '../text/regions';
import { Tab } from '../components/Tab';
import { foodList } from '../text/food';
import { slimesList } from '../text/slimes';
import { mediaFetcher } from '../media-manager';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import Down from '../components/Down';
import podImg from '../assets/misc/pod.png';
import noneImg from '../assets/misc/none.png';
import buckImg from '../assets/misc/buck.png';
import patchImg from '../assets/misc/patch.png';
import doorImg from '../assets/misc/door.png';
import '../css/Regions.css';
import { LabyMusicRefs, MusicRefs } from '../components/MusicPlayer';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

interface RegionDescriptionProps {
    region: string;
    regionDescriptionRef: React.RefObject<HTMLDivElement>;
}

const RegionDescription: React.FC<RegionDescriptionProps> = ({ region, regionDescriptionRef }) => (
    <div className='region-description' ref={regionDescriptionRef}>
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
                                src={mediaFetcher(`slimes/${slime}.png`)}
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
                                src={mediaFetcher(`food/${food}.png`)}
                                alt={foodList[food][0]}
                                title={foodList[food][0]}
                            />
                        </div>
                    </div>
                </NavLink>
            ))}
        </OverlayScrollbarsComponent>
        <div className='region-connections'>
            <h2 className='box-title'>Region Connections</h2>
            <div className='region-from'>
                {(regionsConnections[region][0].length) ? regionsConnections[region][0].map(regionArg => {
                    const regionName = regionArg.split("/")[1];
                    return (
                        <NavLink to={`/regions/${regionArg}`} style={{ textDecoration: 'none' }} key={regionArg}>
                            <img src={mediaFetcher(`world/${regionName}.png`)} alt={regionInfos[regionName][0]} />
                        </NavLink>
                    )
                }) : (
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
                {(regionsConnections[region][1].length) ? regionsConnections[region][1].map(regionArg => {
                    const regionName = regionArg.split("/")[1];
                    return (
                        <NavLink to={`/regions/${regionArg}`} style={{ textDecoration: 'none' }} key={regionArg}>
                            <img src={mediaFetcher(`world/${regionName}.png`)} alt={regionInfos[regionName][0]} />
                        </NavLink>
                    )
                }) : (
                    <img className='no-hover' src={noneImg} alt='No Region' />
                )}
            </div>
        </div>
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
                        src={mediaFetcher(`${regionsResourcesInfos[resource][1]}.png`)}
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
                            src={mediaFetcher(`${regionsResourcesInfos[resource][1]}.png`)}
                            alt={regionsResourcesInfos[resource][0]}
                            title={regionsResourcesInfos[resource][0]}
                        />
                    </div>
                </NavLink>
            ))}
        </OverlayScrollbarsComponent>
        <div className='region-pods'>
            <h2 className='box-title'>{region === 'labyrinth' ? 'Ancient Vaults' : 'Tresaure Pods'}</h2>
            <img src={region === 'labyrinth' ? doorImg : podImg} alt='Pods' />
            <p>{regionInfos[region][5]}</p>
        </div>
    </div >
);

interface RanchDescriptionProps {
    region: string,
    regionDescriptionRef: React.RefObject<HTMLDivElement>
}

const RanchDescription: React.FC<RanchDescriptionProps> = ({ region, regionDescriptionRef }) => (
    <div className={`ranch-description${region === 'conservatory' ? ' ranch-conservatory' : ''}`} ref={regionDescriptionRef}>
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
                {regionPedia[region].split("\n").map(function (item) {
                    return (
                        <span key={item}>
                            {item}
                        </span>
                    )
                })}
            </p>
        </OverlayScrollbarsComponent>
        <div className='region-connections'>
            <h2 className='box-title'>Ranch Connections</h2>
            <div className='region-from'>
                {(regionsConnections[region][0].length) ? regionsConnections[region][0].map(regionArg => {
                    const regionName = regionArg.split("/")[1];
                    return (
                        <NavLink to={`/regions/${regionArg}`} style={{ textDecoration: 'none' }} key={regionArg}>
                            <img src={mediaFetcher(`world/${regionName}.png`)} alt={regionInfos[regionName][0]} />
                        </NavLink>
                    )
                }) : (
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
                {(regionsConnections[region][1].length) ? regionsConnections[region][1].map(regionArg => {
                    const regionName = regionArg.split("/")[1];
                    return (
                        <NavLink to={`/regions/${regionArg}`} style={{ textDecoration: 'none' }} key={regionArg}>
                            <img src={mediaFetcher(`world/${regionName}.png`)} alt={regionInfos[regionName][0]} />
                        </NavLink>
                    )
                }) : (
                    <img className='no-hover' src={noneImg} alt='No Region' />
                )}
            </div>
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
            {ranchSpecials[region].map((feature) => {
                const isDirectFeature = regionsResourcesInfos[feature][2] === '';
                return isDirectFeature ? (
                    <div
                        className='ranch-special-feature'
                        key={feature}
                    >
                        <img src={mediaFetcher(`${regionsResourcesInfos[feature][1]}.png`)} alt={regionsResourcesInfos[feature][0]} />
                        <h3>{regionsResourcesInfos[feature][0]}</h3>
                    </div>
                ) : (
                    <NavLink to={regionsResourcesInfos[feature][2]} style={{ textDecoration: 'none' }} key={feature}>
                        <div
                            className='ranch-special-feature special-hover'
                            key={feature}
                        >
                            <img src={mediaFetcher(`${regionsResourcesInfos[feature][1]}.png`)} alt={regionsResourcesInfos[feature][0]} />
                            <h3>{regionsResourcesInfos[feature][0]}</h3>
                        </div>
                    </NavLink>
                );
            })}
        </div>
    </div >
);

const animationDelay = 300;

export const Regions: React.FC = () => {
    const regionDescriptionRef = useRef<HTMLDivElement>(null);
    const { regionType: regionTypeName, region: regionName } = useParams();
    const regionType = regionTypeName && ['region', 'ranch'].includes(regionTypeName) ? regionTypeName : 'region';
    const [selectedTab, setSelectedTab] = useState(regionType);
    const region = (regionName && ((regionsIds.includes(regionName) && regionType === 'region') || (ranchIds.includes(regionName) && regionType === 'ranch'))) ? regionName : null;

    const mainPlayer = useRef<HTMLVideoElement>(null);
    const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

    if (!regionType) return <Navigate to='/regions/region/fields' />;
    if (!region) return <Navigate to={`/regions/${regionType}/${regionType === 'region' ? 'fields' : 'consevatory'}`} />;

    const scrollToSection = () => {
        if (regionDescriptionRef.current)
            regionDescriptionRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    const listOfRegions = selectedTab === 'region' ? regionsIds : ranchIds;

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
        backgroundImage: `url(${mediaFetcher('wait/' + region + '.jpg')})`
    };

    return (
        <div>
            <div className='region-tab-list'>
                <div className='regions-tabs'>
                    <Tab title='World Regions' icon='misc/world' selected={selectedTab === 'region'} action={() => setSelectedTab('region')} />
                    <Tab title='Ranch' icon='misc/patch' selected={selectedTab === 'ranch'} action={() => setSelectedTab('ranch')} />
                </div>
                <OverlayScrollbarsComponent
                    options={{
                        scrollbars: {
                            autoHide: "move",
                            autoHideDelay: 500,
                        },
                    }}
                    className={'regions-list' + (selectedTab === 'region' ? ' regions-list-regions' : ' regions-list-ranch')}
                    defer
                >
                    {listOfRegions.map(regionItem => (
                        <NavLink to={`/regions/${selectedTab}/${regionItem}`} style={{ textDecoration: 'none' }} key={regionItem}>
                            <div
                                className={'region-tab' + (regionItem === region ? ' region-selected' : '')}
                                key={regionInfos[regionItem][0]}
                            >
                                <video
                                    ref={el => videoRefs.current[regionItem] = el}
                                    className='region-video'
                                    src={mediaFetcher(`videos/${regionInfos[regionItem][2]}.light.webm`)}
                                    onMouseEnter={e => handleMouseEnter(e)}
                                    onMouseLeave={e => { if (regionItem !== region) handleMouseLeave(e) }}
                                    autoPlay={regionItem === region}
                                    disablePictureInPicture loop muted
                                >
                                    {regionInfos[regionItem][0]} Video
                                </video>
                                <img className='region-icon' src={mediaFetcher(`world/${regionInfos[regionItem][1]}.png`)} alt={regionInfos[regionItem][0]} />
                                <h2 className='region-name'>{regionInfos[regionItem][0]}</h2>
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
                        src={mediaFetcher(`videos/${regionInfos[region][2]}.webm`)}
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
                            <img src={mediaFetcher(`world/${region}.png`)} alt={regionInfos[region][0]} />
                            <h1>{regionInfos[region][0]}</h1>
                            <h2>{regionInfos[region][3]}</h2>
                        </div>
                        <a
                            role="link"
                            onClick={scrollToSection}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    scrollToSection();
                                }
                            }}
                            tabIndex={0}
                            className='arrow-down'
                        >
                            <Down />
                        </a>
                    </div>
                    {(regionType === 'ranch') ? <RanchDescription region={region} regionDescriptionRef={regionDescriptionRef} /> : <RegionDescription region={region} regionDescriptionRef={regionDescriptionRef} />}
                </div>
            </div>
        </div>
    );
}

export default Regions;