import { useRef, useState } from 'react';
import { regionElements, regionPedia, regionsIds, regionInfos, regionsResourcesInfos, ranchIds, regionsConnections, ranchSpecials } from '../text/regions';
import { Tab } from '../components/Tab';
import { foodList } from '../text/food';
import { slimesList } from '../text/slimes';
import { mediaFetcher } from '../media-manager';
import { NavLink, useParams } from 'react-router-dom';
import React from 'react';
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
import vaultImg from '/src/assets/misc/vault.png';
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
                {(regionsConnections[region][0].length) ? regionsConnections[region][0].map(regionArg => (
                    <NavLink to={`/regions/${regionArg}`} style={{ textDecoration: 'none' }} key={regionArg}>
                        <img
                            src={mediaFetcher(`world/${regionArg}.png`)}
                            alt={regionInfos[regionArg][0]}
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
                            alt={regionInfos[regionArg][0]}
                            key={regionArg}
                        />
                    </NavLink>
                )) : (
                    <img className='no-hover' src={noneImg} alt='No Region' />
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
            <img src={region === 'labyrinth' ? vaultImg : podImg} alt='Pods' />
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
        {region !== 'conservatory' && (
            <div className='ranch-connection ranch-in'>
                <h2 className='box-title'>Accessed by</h2>
                {regionsConnections[region][0].map((place) => (
                    <NavLink to={`/regions/${place}`} style={{ textDecoration: 'none' }} key={place}>
                        <div
                            className="ranch-element"
                            key={place}
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

export const Regions = () => {

    const [musicMenu, setMusicMenu] = useState(false);
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

    const themeDayRef = useRef(null);
    const relaxDayRef = useRef(null);
    const ambientDayRef = useRef(null);
    const themeNightRef = useRef(null);
    const relaxNightRef = useRef(null);
    const ambientNightRef = useRef(null);

    const waterworksDayThemeRef = useRef(null);
    const waterworksDayAmbientRef = useRef(null);
    const waterworksNightThemeRef = useRef(null);
    const waterworksNightAmbientRef = useRef(null);
    const lavaDayThemeRef = useRef(null);
    const lavaDayAmbientRef = useRef(null);
    const lavaNightThemeRef = useRef(null);
    const lavaNightAmbientRef = useRef(null);
    const labyrinthDayThemeRef = useRef(null);
    const labyrinthDayAmbientRef = useRef(null);
    const labyrinthNightThemeRef = useRef(null);
    const labyrinthNightAmbientRef = useRef(null);
    const dreamlandDayThemeRef = useRef(null);
    const dreamlandDayAmbientRef = useRef(null);
    const dreamlandNightThemeRef = useRef(null);
    const dreamlandNightAmbientRef = useRef(null);

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

    const { region: regionName } = useParams();
    const region = (regionName && (regionsIds.includes(regionName) || ranchIds.includes(regionName))) ? regionName : 'fields';
    const regionMusic = region === 'sea' ? null : ranchIds.includes(region) ? 'conservatory' : region;
    const actualSelection = ranchIds.includes(region) ? 'ranch' : 'regions';
    const regionDescriptionRef = useRef<HTMLDivElement>(null);

    const scrollToSection = () => {
        if (regionDescriptionRef.current)
            regionDescriptionRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    const listOfRegions = actualSelection === 'regions' ? regionsIds : ranchIds;

    const descriptionChoice = () => {
        switch (actualSelection) {
            case 'regions':
                return <RegionDescription region={region} regionDescriptionRef={regionDescriptionRef} />;
            case 'ranch':
                return <RanchDescription region={region} regionDescriptionRef={regionDescriptionRef} />;
            default:
                return <RegionDescription region={region} regionDescriptionRef={regionDescriptionRef} />;
        }
    }


    const handleMouseEnter = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        if ((e.target as HTMLVideoElement).readyState >= 3)
            (e.target as HTMLVideoElement).play();
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
        if ((e.target as HTMLVideoElement).readyState >= 3)
            (e.target as HTMLVideoElement).pause();
    };

    const backgroudRegion = {
        backgroundImage: `url(${mediaFetcher(`wait/${region}.jpg`)})`
    };

    const mainPlayer = useRef<HTMLVideoElement>(null);
    const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

    const handleTabClick = (regionItem: string) => {
        if (videoRefs.current[regionItem]) {
            videoRefs.current[regionItem].currentTime = 0;
            videoRefs.current[regionItem].play();
        }
    };

    return (
        <div>
            <div className='region-tab-list'>
                <div className='regions-tabs'>
                    <NavLink to='/regions/fields' style={{ textDecoration: 'none' }}>
                        <Tab title='World Regions' icon='misc/world' selected={actualSelection === 'regions'} />
                    </NavLink>
                    <NavLink to='/regions/conservatory' style={{ textDecoration: 'none' }}>
                        <Tab title='Ranch' icon='misc/patch' selected={actualSelection === 'ranch'} />
                    </NavLink>
                </div>
                <div className='regions-list' style={{ borderRadius: `${actualSelection === 'regions' ? '0' : '20px'} ${actualSelection === 'ranch' ? '0' : '20px'} 20px 20px` }}>
                    {listOfRegions.map(regionItem => (
                        <NavLink to={`/regions/${regionItem}`} style={{ textDecoration: 'none' }} key={regionItem}>
                            <div
                                className={'region-tab' + (regionItem === region ? ' region-selected' : '')}
                                key={regionInfos[regionItem][0]}
                                onClick={() => handleTabClick(regionItem)}
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
                        src={mediaFetcher(`videos/${regionInfos[region][2]}.webm`)}
                        disablePictureInPicture
                        autoPlay
                        loop
                        muted
                        onLoadedData={e => {
                            (e.target as HTMLVideoElement).play();
                        }}
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
                                        <img src={cheerfulStatue} className={getAudioName() === 'waterworks-night-ambient' ? 'music-current' : ''} alt='Cheerful Statue' onClick={() => playAudio(waterworksNightAmbientRef)} />
                                        <img src={overjoyedStatue} className={getAudioName() === 'waterworks-night-theme' ? 'music-current' : ''} alt='Overjoyed Statue' onClick={() => playAudio(waterworksNightThemeRef)} />
                                        <img src={moonImg} className='music-time' alt='Night Music' />
                                        <img src={cheerfulStatue} className={getAudioName() === 'waterworks-day-ambient' ? 'music-current' : ''} alt='Cheerful Statue' onClick={() => playAudio(waterworksDayAmbientRef)} />
                                        <img src={overjoyedStatue} className={getAudioName() === 'waterworks-day-theme' ? 'music-current' : ''} alt='Overjoyed Statue' onClick={() => playAudio(waterworksDayThemeRef)} />
                                        <img src={sunImg} className='music-time' alt='Day Music' />
                                    </div>
                                    <div className='lava-music'>
                                        <img src={cheerfulStatue} className={getAudioName() === 'lava-night-ambient' ? 'music-current' : ''} alt='Cheerful Statue' onClick={() => playAudio(lavaNightAmbientRef)} />
                                        <img src={overjoyedStatue} className={getAudioName() === 'lava-night-theme' ? 'music-current' : ''} alt='Overjoyed Statue' onClick={() => playAudio(lavaNightThemeRef)} />
                                        <img src={moonImg} className='music-time' alt='Night Music' />
                                        <img src={cheerfulStatue} className={getAudioName() === 'lava-day-ambient' ? 'music-current' : ''} alt='Cheerful Statue' onClick={() => playAudio(lavaDayAmbientRef)} />
                                        <img src={overjoyedStatue} className={getAudioName() === 'lava-day-theme' ? 'music-current' : ''} alt='Overjoyed Statue' onClick={() => playAudio(lavaDayThemeRef)} />
                                        <img src={sunImg} className='music-time' alt='Day Music' />
                                    </div>
                                    <div className='labyrinth-music'>
                                        <img src={cheerfulStatue} className={getAudioName() === 'labyrinth-night-ambient' ? 'music-current' : ''} alt='Cheerful Statue' onClick={() => playAudio(labyrinthNightAmbientRef)} />
                                        <img src={overjoyedStatue} className={getAudioName() === 'labyrinth-night-theme' ? 'music-current' : ''} alt='Overjoyed Statue' onClick={() => playAudio(labyrinthNightThemeRef)} />
                                        <img src={moonImg} className='music-time' alt='Night Music' />
                                        <img src={cheerfulStatue} className={getAudioName() === 'labyrinth-day-ambient' ? 'music-current' : ''} alt='Cheerful Statue' onClick={() => playAudio(labyrinthDayAmbientRef)} />
                                        <img src={overjoyedStatue} className={getAudioName() === 'labyrinth-day-theme' ? 'music-current' : ''} alt='Overjoyed Statue' onClick={() => playAudio(labyrinthDayThemeRef)} />
                                        <img src={sunImg} className='music-time' alt='Day Music' />
                                    </div>
                                    <div className='dreamland-music'>
                                        <img src={cheerfulStatue} className={getAudioName() === 'dreamland-night-ambient' ? 'music-current' : ''} alt='Cheerful Statue' onClick={() => playAudio(dreamlandNightAmbientRef)} />
                                        <img src={overjoyedStatue} className={getAudioName() === 'dreamland-night-theme' ? 'music-current' : ''} alt='Overjoyed Statue' onClick={() => playAudio(dreamlandNightThemeRef)} />
                                        <img src={moonImg} className='music-time' alt='Night Music' />
                                        <img src={cheerfulStatue} className={getAudioName() === 'dreamland-day-ambient' ? 'music-current' : ''} alt='Cheerful Statue' onClick={() => playAudio(dreamlandDayAmbientRef)} />
                                        <img src={overjoyedStatue} className={getAudioName() === 'dreamland-day-theme' ? 'music-current' : ''} alt='Overjoyed Statue' onClick={() => playAudio(dreamlandDayThemeRef)} />
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
                                    <img src={cheerfulStatue} className={getAudioName() === `${regionMusic}-night-ambient` ? 'music-current' : ''} alt='Cheerful Statue' onClick={() => playAudio(ambientNightRef)} />
                                    <img src={happyStatue} className={getAudioName() === `${regionMusic}-night-relax` ? 'music-current' : ''} alt='Happy Statue' onClick={() => playAudio(relaxNightRef)} />
                                    <img src={overjoyedStatue} className={getAudioName() === `${regionMusic}-night-theme` ? 'music-current' : ''} alt='Overjoyed Statue' onClick={() => playAudio(themeNightRef)} />
                                    <img src={moonImg} className='music-time' alt='Night Music' />
                                    <img src={cheerfulStatue} className={getAudioName() === `${regionMusic}-day-ambient` ? 'music-current' : ''} alt='Cheerful Statue' onClick={() => playAudio(ambientDayRef)} />
                                    <img src={happyStatue} className={getAudioName() === `${regionMusic}-day-relax` ? 'music-current' : ''} alt='Happy Statue' onClick={() => playAudio(relaxDayRef)} />
                                    <img src={overjoyedStatue} className={getAudioName() === `${regionMusic}-day-theme` ? 'music-current' : ''} alt='Overjoyed Statue' onClick={() => playAudio(themeDayRef)} />
                                    <img src={sunImg} className='music-time' alt='Day Music' />
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