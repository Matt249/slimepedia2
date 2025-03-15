import React, { useRef, useState } from 'react';
import { regionElements, regionPedia, regionsIds, regionInfos, regionsResourcesInfos, ranchIds, regionsConnections, ranchSpecials } from '../text/regions';
import { Tab } from '../components/Tab';
import { foodList } from '../text/food';
import { slimesList } from '../text/slimes';
import { mediaFetcher } from '../media-manager';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import Down from '../components/Down';
import podImg from '/src/assets/misc/pod.png';
import noneImg from '/src/assets/misc/none.png';
import buckImg from '/src/assets/misc/buck.png';
import patchImg from '/src/assets/misc/patch.png';
import musicImg from '/src/assets/misc/audio.png';
import overjoyedStatue from '/src/assets/deco/overjoyedstatue.png';
import happyStatue from '/src/assets/deco/happystatue.png';
import cheerfulStatue from '/src/assets/deco/cheerfulstatue.png';
import sunImg from '/src/assets/misc/sun.png';
import moonImg from '/src/assets/misc/moon.png';
import doorImg from '/src/assets/misc/door.png';
import '../css/Regions.css';

interface RegionDescriptionProps {
    region: string;
    regionDescriptionRef: React.RefObject<HTMLDivElement>;
}

const RegionDescription: React.FC<RegionDescriptionProps> = ({ region, regionDescriptionRef }) => (
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
                                alt={slimesList[slime][0]}
                                title={slimesList[slime][0]}
                            />
                        </div>
                    </div>
                </NavLink>
            ))}
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
                    <img className='region-no-connection' src={noneImg} alt='No Region' />
                )}
            </div>
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
        </div>
        <div className='region-pods'>
            <h2 className='box-title'>{region === 'labyrinth' ? 'Ancient Vaults' : 'Tresaure Pods'}</h2>
            <img src={region === 'labyrinth' ? doorImg : podImg} alt='Pods' />
            <p>{regionInfos[region][5]}</p>
        </div>
    </div>
);

interface RanchDescriptionProps {
    region: string,
    regionDescriptionRef: React.RefObject<HTMLDivElement>
}

const RanchDescription: React.FC<RanchDescriptionProps> = ({ region, regionDescriptionRef }) => (
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
                    <img className='region-no-connection' src={noneImg} alt='No Region' />
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
            {ranchSpecials[region].map((feature) => (regionsResourcesInfos[feature][2] === '' ?
                <div
                    className='ranch-special-feature'
                    key={feature}
                >
                    <img src={mediaFetcher(`${regionsResourcesInfos[feature][1]}.png`)} alt={regionsResourcesInfos[feature][0]} />
                    <h3>{regionsResourcesInfos[feature][0]}</h3>
                </div>
                :
                <NavLink to={regionsResourcesInfos[feature][2]} style={{ textDecoration: 'none' }} key={feature}>
                    <div
                        className='ranch-special-feature special-hover'
                        key={feature}
                    >
                        <img src={mediaFetcher(`${regionsResourcesInfos[feature][1]}.png`)} alt={regionsResourcesInfos[feature][0]} />
                        <h3>{regionsResourcesInfos[feature][0]}</h3>
                    </div>
                </NavLink>
            ))}
        </div>
    </div>
);

const animationDelay = 300;

export const Regions: React.FC = () => {
    const [musicMenu, setMusicMenu] = useState(false);
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

    const themeDayRef = useRef<HTMLAudioElement | null>(null);
    const relaxDayRef = useRef<HTMLAudioElement | null>(null);
    const ambientDayRef = useRef<HTMLAudioElement | null>(null);
    const themeNightRef = useRef<HTMLAudioElement | null>(null);
    const relaxNightRef = useRef<HTMLAudioElement | null>(null);
    const ambientNightRef = useRef<HTMLAudioElement | null>(null);

    const waterworksDayThemeRef = useRef<HTMLAudioElement | null>(null);
    const waterworksDayAmbientRef = useRef<HTMLAudioElement | null>(null);
    const waterworksNightThemeRef = useRef<HTMLAudioElement | null>(null);
    const waterworksNightAmbientRef = useRef<HTMLAudioElement | null>(null);
    const lavaDayThemeRef = useRef<HTMLAudioElement | null>(null);
    const lavaDayAmbientRef = useRef<HTMLAudioElement | null>(null);
    const lavaNightThemeRef = useRef<HTMLAudioElement | null>(null);
    const lavaNightAmbientRef = useRef<HTMLAudioElement | null>(null);
    const labyrinthDayThemeRef = useRef<HTMLAudioElement | null>(null);
    const labyrinthDayAmbientRef = useRef<HTMLAudioElement | null>(null);
    const labyrinthNightThemeRef = useRef<HTMLAudioElement | null>(null);
    const labyrinthNightAmbientRef = useRef<HTMLAudioElement | null>(null);
    const dreamlandDayThemeRef = useRef<HTMLAudioElement | null>(null);
    const dreamlandDayAmbientRef = useRef<HTMLAudioElement | null>(null);
    const dreamlandNightThemeRef = useRef<HTMLAudioElement | null>(null);
    const dreamlandNightAmbientRef = useRef<HTMLAudioElement | null>(null);

    const playAudio = (audioRef: React.MutableRefObject<HTMLAudioElement | null>) => {
        if (currentAudio)
            if (currentAudio !== audioRef.current) {
                currentAudio.pause();
                if (currentAudio)
                    currentAudio.currentTime = 0;
            }
            else if (currentAudio === audioRef.current) {
                audioRef.current.pause();
                currentAudio.currentTime = 0;
                setCurrentAudio(null);
                return;
            }
        setCurrentAudio(audioRef.current);
        if (audioRef.current) {
            audioRef.current.volume = 0.1;
            audioRef.current.play();
        }
    };

    const getAudioName = () => {
        if (currentAudio === null || !currentAudio.src) return '';
        const parts = currentAudio.src.split('/');
        const lastPart = parts.pop();
        if (lastPart) {
            const lP = lastPart.split('.')[0].split('-');
            return `${lP[0]}-${lP[1]}-${lP[2]}`;
        }
        return '';
    };

    const regionDescriptionRef = useRef<HTMLDivElement>(null);
    const { regionType: regionTypeName, region: regionName } = useParams();
    const regionType = regionTypeName && ['region', 'ranch'].includes(regionTypeName) ? regionTypeName : 'region';
    const [selectedTab, setSelectedTab] = useState(regionType);
    const region = (regionName && ((regionsIds.includes(regionName) && regionType === 'region') || (ranchIds.includes(regionName) && regionType === 'ranch'))) ? regionName : null;
    const regionMusic = (region === null || region === 'sea') ? null : ranchIds.includes(region) ? 'conservatory' : region;

    const mainPlayer = useRef<HTMLVideoElement>(null);
    const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

    if (!regionType) return <Navigate to='/regions/region/fields' />;
    if (!region) return <Navigate to={`/regions/${regionType}/${regionType === 'region' ? 'fields' : 'consevatory'}`} />;

    const descriptionChoice = () => {
        if (regionType === 'region') return <RegionDescription region={region} regionDescriptionRef={regionDescriptionRef} />;
        if (regionType === 'ranch') return <RanchDescription region={region} regionDescriptionRef={regionDescriptionRef} />;
        return null;
    }

    const scrollToSection = () => {
        if (regionDescriptionRef.current)
            regionDescriptionRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    const listOfRegions = selectedTab === 'region' ? regionsIds : ranchIds;

    const handleMouseEnter = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        if ((e.target as HTMLVideoElement).readyState >= 3)
            (e.target as HTMLVideoElement).play();
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        setTimeout(() => {
            if ((e.target as HTMLVideoElement).readyState >= 3)
                (e.target as HTMLVideoElement).pause();
        }, animationDelay);
    };

    const handleVideoLoaded = () => {
        mainPlayer.current!.currentTime = videoRefs.current[region!]!.currentTime;
        mainPlayer.current!.play();
    };

    const backgroudRegion = {
        backgroundImage: `url(${mediaFetcher(`wait/${region}.jpg`)})`
    };

    return (
        <div>
            <div className='region-tab-list'>
                <div className='regions-tabs'>
                    <Tab title='World Regions' icon='misc/world' selected={selectedTab === 'region'} action={() => setSelectedTab('region')} />
                    <Tab title='Ranch' icon='misc/patch' selected={selectedTab === 'ranch'} action={() => setSelectedTab('ranch')} />
                </div>
                <div className='regions-list' style={{ borderRadius: `${selectedTab === 'region' ? '0 20px' : '20px 0'} 20px 20px` }}>
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
                </div>
            </div>
            <div className='region-presentation'>
                <div className='region-background' style={backgroudRegion}>
                    <video
                        ref={mainPlayer}
                        className='region-background-video'
                        src={mediaFetcher(`videos/${regionInfos[region!][2]}.webm`)}
                        disablePictureInPicture
                        autoPlay
                        loop
                        muted
                        onLoadedData={handleVideoLoaded} // Ajoutez cet événement
                    >
                        Video Background
                    </video>
                </div>
                <div className='region-container'>
                    <div className='region-main-page-frame'>
                        {(regionMusic) ? (region === 'labyrinth') ? (
                            <>
                                <audio ref={waterworksDayThemeRef} src={mediaFetcher(`music/waterworks-day-theme.ogg`)} />
                                <audio ref={waterworksDayAmbientRef} src={mediaFetcher(`music/waterworks-day-ambient.ogg`)} />
                                <audio ref={waterworksNightThemeRef} src={mediaFetcher(`music/waterworks-night-theme.ogg`)} />
                                <audio ref={waterworksNightAmbientRef} src={mediaFetcher(`music/waterworks-night-ambient.ogg`)} />
                                <audio ref={lavaDayThemeRef} src={mediaFetcher(`music/lava-day-theme.ogg`)} />
                                <audio ref={lavaDayAmbientRef} src={mediaFetcher(`music/lava-day-ambient.ogg`)} />
                                <audio ref={lavaNightThemeRef} src={mediaFetcher(`music/lava-night-theme.ogg`)} />
                                <audio ref={lavaNightAmbientRef} src={mediaFetcher(`music/lava-night-ambient.ogg`)} />
                                <audio ref={labyrinthDayThemeRef} src={mediaFetcher(`music/labyrinth-day-theme.ogg`)} />
                                <audio ref={labyrinthDayAmbientRef} src={mediaFetcher(`music/labyrinth-day-ambient.ogg`)} />
                                <audio ref={labyrinthNightThemeRef} src={mediaFetcher(`music/labyrinth-night-theme.ogg`)} />
                                <audio ref={labyrinthNightAmbientRef} src={mediaFetcher(`music/labyrinth-night-ambient.ogg`)} />
                                <audio ref={dreamlandDayThemeRef} src={mediaFetcher(`music/dreamland-day-theme.ogg`)} />
                                <audio ref={dreamlandDayAmbientRef} src={mediaFetcher(`music/dreamland-day-ambient.ogg`)} />
                                <audio ref={dreamlandNightThemeRef} src={mediaFetcher(`music/dreamland-night-theme.ogg`)} />
                                <audio ref={dreamlandNightAmbientRef} src={mediaFetcher(`music/dreamland-night-ambient.ogg`)} />
                                <div className={`region-music-player ${musicMenu ? '' : 'disabled'}`}>
                                    <div className='waterworks-music'>
                                        <img src={cheerfulStatue} className={`music-element-icon ${getAudioName() === 'waterworks-night-ambient' ? 'music-current' : ''}`} alt='Cheerful Statue' onClick={() => playAudio(waterworksNightAmbientRef)} />
                                        <img src={overjoyedStatue} className={`music-element-icon ${getAudioName() === 'waterworks-night-theme' ? 'music-current' : ''}`} alt='Overjoyed Statue' onClick={() => playAudio(waterworksNightThemeRef)} />
                                        <img src={moonImg} className='music-time' alt='Night Music' />
                                        <img src={cheerfulStatue} className={`music-element-icon ${getAudioName() === 'waterworks-day-ambient' ? 'music-current' : ''}`} alt='Cheerful Statue' onClick={() => playAudio(waterworksDayAmbientRef)} />
                                        <img src={overjoyedStatue} className={`music-element-icon ${getAudioName() === 'waterworks-day-theme' ? 'music-current' : ''}`} alt='Overjoyed Statue' onClick={() => playAudio(waterworksDayThemeRef)} />
                                        <img src={sunImg} className='music-time' alt='Day Music' />
                                    </div>
                                    <div className='lava-music'>
                                        <img src={cheerfulStatue} className={`music-element-icon ${getAudioName() === 'lava-night-ambient' ? 'music-current' : ''}`} alt='Cheerful Statue' onClick={() => playAudio(lavaNightAmbientRef)} />
                                        <img src={overjoyedStatue} className={`music-element-icon ${getAudioName() === 'lava-night-theme' ? 'music-current' : ''}`} alt='Overjoyed Statue' onClick={() => playAudio(lavaNightThemeRef)} />
                                        <img src={moonImg} className='music-time' alt='Night Music' />
                                        <img src={cheerfulStatue} className={`music-element-icon ${getAudioName() === 'lava-day-ambient' ? 'music-current' : ''}`} alt='Cheerful Statue' onClick={() => playAudio(lavaDayAmbientRef)} />
                                        <img src={overjoyedStatue} className={`music-element-icon ${getAudioName() === 'lava-day-theme' ? 'music-current' : ''}`} alt='Overjoyed Statue' onClick={() => playAudio(lavaDayThemeRef)} />
                                        <img src={sunImg} className='music-time' alt='Day Music' />
                                    </div>
                                    <div className='labyrinth-music'>
                                        <img src={cheerfulStatue} className={`music-element-icon ${getAudioName() === 'labyrinth-night-ambient' ? 'music-current' : ''}`} alt='Cheerful Statue' onClick={() => playAudio(labyrinthNightAmbientRef)} />
                                        <img src={overjoyedStatue} className={`music-element-icon ${getAudioName() === 'labyrinth-night-theme' ? 'music-current' : ''}`} alt='Overjoyed Statue' onClick={() => playAudio(labyrinthNightThemeRef)} />
                                        <img src={moonImg} className='music-time' alt='Night Music' />
                                        <img src={cheerfulStatue} className={`music-element-icon ${getAudioName() === 'labyrinth-day-ambient' ? 'music-current' : ''}`} alt='Cheerful Statue' onClick={() => playAudio(labyrinthDayAmbientRef)} />
                                        <img src={overjoyedStatue} className={`music-element-icon ${getAudioName() === 'labyrinth-day-theme' ? 'music-current' : ''}`} alt='Overjoyed Statue' onClick={() => playAudio(labyrinthDayThemeRef)} />
                                        <img src={sunImg} className='music-time' alt='Day Music' />
                                    </div>
                                    <div className='dreamland-music'>
                                        <img src={cheerfulStatue} className={`music-element-icon ${getAudioName() === 'dreamland-night-ambient' ? 'music-current' : ''}`} alt='Cheerful Statue' onClick={() => playAudio(dreamlandNightAmbientRef)} />
                                        <img src={overjoyedStatue} className={`music-element-icon ${getAudioName() === 'dreamland-night-theme' ? 'music-current' : ''}`} alt='Overjoyed Statue' onClick={() => playAudio(dreamlandNightThemeRef)} />
                                        <img src={moonImg} className='music-time' alt='Night Music' />
                                        <img src={cheerfulStatue} className={`music-element-icon ${getAudioName() === 'dreamland-day-ambient' ? 'music-current' : ''}`} alt='Cheerful Statue' onClick={() => playAudio(dreamlandDayAmbientRef)} />
                                        <img src={overjoyedStatue} className={`music-element-icon ${getAudioName() === 'dreamland-day-theme' ? 'music-current' : ''}`} alt='Overjoyed Statue' onClick={() => playAudio(dreamlandDayThemeRef)} />
                                        <img src={sunImg} className='music-time' alt='Day Music' />
                                    </div>
                                    <img className={'music-player-icon'} src={musicImg} onClick={() => setMusicMenu(!musicMenu)} />
                                </div>
                            </>
                        ) : (
                            <>
                                <audio ref={themeDayRef} src={mediaFetcher(`music/${regionMusic}-day-theme.ogg`)} />
                                <audio ref={relaxDayRef} src={mediaFetcher(`music/${regionMusic}-day-relax.ogg`)} />
                                <audio ref={ambientDayRef} src={mediaFetcher(`music/${regionMusic}-day-ambient.ogg`)} />
                                <audio ref={themeNightRef} src={mediaFetcher(`music/${regionMusic}-night-theme.ogg`)} />
                                <audio ref={relaxNightRef} src={mediaFetcher(`music/${regionMusic}-night-relax.ogg`)} />
                                <audio ref={ambientNightRef} src={mediaFetcher(`music/${regionMusic}-night-ambient.ogg`)} />
                                <div className={`region-music-player ${musicMenu ? '' : 'disabled'}`}>
                                    <div>
                                        <img src={cheerfulStatue} className={`music-element-icon ${getAudioName() === `${regionMusic}-night-ambient` ? 'music-current' : ''}`} alt='Cheerful Statue' onClick={() => playAudio(ambientNightRef)} />
                                        <img src={happyStatue} className={`music-element-icon ${getAudioName() === `${regionMusic}-night-relax` ? 'music-current' : ''}`} alt='Happy Statue' onClick={() => playAudio(relaxNightRef)} />
                                        <img src={overjoyedStatue} className={`music-element-icon ${getAudioName() === `${regionMusic}-night-theme` ? 'music-current' : ''}`} alt='Overjoyed Statue' onClick={() => playAudio(themeNightRef)} />
                                        <img src={moonImg} className='music-time' alt='Night Music' />
                                        <img src={cheerfulStatue} className={`music-element-icon ${getAudioName() === `${regionMusic}-day-ambient` ? 'music-current' : ''}`} alt='Cheerful Statue' onClick={() => playAudio(ambientDayRef)} />
                                        <img src={happyStatue} className={`music-element-icon ${getAudioName() === `${regionMusic}-day-relax` ? 'music-current' : ''}`} alt='Happy Statue' onClick={() => playAudio(relaxDayRef)} />
                                        <img src={overjoyedStatue} className={`music-element-icon ${getAudioName() === `${regionMusic}-day-theme` ? 'music-current' : ''}`} alt='Overjoyed Statue' onClick={() => playAudio(themeDayRef)} />
                                        <img src={sunImg} className='music-time' alt='Day Music' />
                                    </div>
                                    <img className={'music-player-icon'} src={musicImg} onClick={() => setMusicMenu(!musicMenu)} />
                                </div>
                            </>
                        ) : null}
                        <div className='region-main-page'>
                            <img src={mediaFetcher(`world/${region}.png`)} alt={regionInfos[region][0]} />
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

export default Regions;