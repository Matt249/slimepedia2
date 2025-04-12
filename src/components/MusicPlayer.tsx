import React, { useRef, useState } from 'react';
import { ranchIds } from '../text/regions';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const playAudio = (audioRef: React.MutableRefObject<HTMLAudioElement | null>, currentAudio: HTMLAudioElement | null, setCurrentAudio: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>) => {
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

const getAudioName = (currentAudio: HTMLAudioElement | null) => {
    if (!currentAudio?.src) return '';
    const parts = currentAudio.src.split('/');
    const lastPart = parts.pop();
    if (lastPart) {
        const lP = lastPart.split('.')[0].split('-');
        return `${lP[0]}-${lP[1]}-${lP[2]}`;
    }
    return '';
};

const audioLabyRefsNames = [
    'waterworks-day-theme',
    'waterworks-day-ambient',
    'waterworks-night-theme',
    'waterworks-night-ambient',
    'lava-day-theme',
    'lava-day-ambient',
    'lava-night-theme',
    'lava-night-ambient',
    'labyrinth-day-theme',
    'labyrinth-day-ambient',
    'labyrinth-night-theme',
    'labyrinth-night-ambient',
    'dreamland-day-theme',
    'dreamland-day-ambient',
    'dreamland-night-theme',
    'dreamland-night-ambient'
]

export const MusicRefs: React.FC<{ region: string }> = ({ region: regionName }) => {
    const region = ranchIds.includes(regionName) ? 'conservatory' : regionName;
    const [musicMenu, setMusicMenu] = useState(false);
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

    const themeDayRef = useRef<HTMLAudioElement | null>(null);
    const relaxDayRef = useRef<HTMLAudioElement | null>(null);
    const ambientDayRef = useRef<HTMLAudioElement | null>(null);
    const themeNightRef = useRef<HTMLAudioElement | null>(null);
    const relaxNightRef = useRef<HTMLAudioElement | null>(null);
    const ambientNightRef = useRef<HTMLAudioElement | null>(null);

    if (region === 'sea')
        return <></>;

    return (
        <>
            <audio ref={themeDayRef} src={`/assets/music/${region}-day-theme.ogg`}>
                <track kind="captions" srcLang="en" label="Day Theme Captions" default src="data:text/vtt,WEBVTT%0A%0A00:00:00.000%20--%3E%2000:00:10.000%0AMusique%20de%20Rainbow%20Fields" />
            </audio>
            <audio ref={relaxDayRef} src={`/assets/music/${region}-day-relax.ogg`}>
                <track kind="captions" srcLang="en" label="Day Relax Captions" default src="data:text/vtt,WEBVTT%0A%0A00:00:00.000%20--%3E%2000:00:10.000%0AMusique%20de%20Rainbow%20Fields%20Relax" />
            </audio>
            <audio ref={ambientDayRef} src={`/assets/music/${region}-day-ambient.ogg`}>
                <track kind="captions" srcLang="en" label="Day Ambient Captions" default src="data:text/vtt,WEBVTT%0A%0A00:00:00.000%20--%3E%2000:00:10.000%0AMusique%20de%20Rainbow%20Fields%20Ambient" />
            </audio>
            <audio ref={themeNightRef} src={`/assets/music/${region}-night-theme.ogg`}>
                <track kind="captions" srcLang="en" label="Night Theme Captions" default src="data:text/vtt,WEBVTT%0A%0A00:00:00.000%20--%3E%2000:00:10.000%0AMusique%20de%20Rainbow%20Fields%20Night%20Theme" />
            </audio>
            <audio ref={relaxNightRef} src={`/assets/music/${region}-night-relax.ogg`}>
                <track kind="captions" srcLang="en" label="Night Relax Captions" default src="data:text/vtt,WEBVTT%0A%0A00:00:00.000%20--%3E%2000:00:10.000%0AMusique%20de%20Rainbow%20Fields%20Night%20Relax" />
            </audio>
            <audio ref={ambientNightRef} src={`/assets/music/${region}-night-ambient.ogg`}>
                <track kind="captions" srcLang="en" label="Night Ambient Captions" default src="data:text/vtt,WEBVTT%0A%0A00:00:00.000%20--%3E%2000:00:10.000%0AMusique%20de%20Rainbow%20Fields%20Night%20Ambient" />
            </audio>
            <div className={`region-music-player ${musicMenu ? '' : 'disabled'}`}>
                <button className='music-player-icon' onClick={() => setMusicMenu(!musicMenu)}>
                    <img src='/assets/misc/audio.png' alt='Open music list' />
                </button>
                <OverlayScrollbarsComponent
                    options={{
                        scrollbars: {
                            autoHide: "move",
                            autoHideDelay: 500,
                        },
                    }}
                    defer
                >
                    <button className={`music-element-icon ${getAudioName(currentAudio) === region + '-night-ambient' ? 'music-current' : ''}`} onClick={() => playAudio(ambientNightRef, currentAudio, setCurrentAudio)}>
                        <img src='/assets/deco/cheerfulstatue.png' alt='Cheerful Statue' />
                    </button>
                    <button className={`music-element-icon ${getAudioName(currentAudio) === region + '-night-relax' ? 'music-current' : ''}`} onClick={() => playAudio(relaxNightRef, currentAudio, setCurrentAudio)}>
                        <img src='/assets/deco/happystatue.png' alt='Happy Statue' />
                    </button>
                    <button className={`music-element-icon ${getAudioName(currentAudio) === region + '-night-theme' ? 'music-current' : ''}`} onClick={() => playAudio(themeNightRef, currentAudio, setCurrentAudio)}>
                        <img src='/assets/deco/overjoyedstatue.png' alt='Overjoyed Statue' />
                    </button>
                    <img src='/assets/misc/moon.png' className='music-time' alt='Night Music' />
                    <button className={`music-element-icon ${getAudioName(currentAudio) === region + '-day-ambient' ? 'music-current' : ''}`} onClick={() => playAudio(ambientDayRef, currentAudio, setCurrentAudio)}>
                        <img src='/assets/deco/cheerfulstatue.png' alt='Cheerful Statue' />
                    </button>
                    <button className={`music-element-icon ${getAudioName(currentAudio) === region + '-day-relax' ? 'music-current' : ''}`} onClick={() => playAudio(relaxDayRef, currentAudio, setCurrentAudio)}>
                        <img src='/assets/deco/happystatue.png' alt='Happy Statue' />
                    </button>
                    <button className={`music-element-icon ${getAudioName(currentAudio) === region + '-day-theme' ? 'music-current' : ''}`} onClick={() => playAudio(themeDayRef, currentAudio, setCurrentAudio)}>
                        <img src='/assets/deco/overjoyedstatue.png' alt='Overjoyed Statue' />
                    </button>
                    <img src='/assets/misc/sun.png' className='music-time' alt='Day Music' />
                </OverlayScrollbarsComponent>
            </div>
        </>
    )
}
const MusicSection: React.FC<{
    sectionName: string;
    refsList: Record<string, React.RefObject<HTMLAudioElement>>;
    currentAudio: HTMLAudioElement | null;
    setCurrentAudio: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
}> = ({ sectionName, refsList, currentAudio, setCurrentAudio }) => (
    <div className={`music-section music-section-${sectionName}`}>
        <img src='/assets/misc/sun.png' className="music-time" alt="Day Music" />
        <button
            className={`music-element-icon ${getAudioName(currentAudio) === sectionName + '-day-theme' ? 'music-current' : ''}`}
            onClick={() => playAudio(refsList[`${sectionName}-day-theme`], currentAudio, setCurrentAudio)}
        >
            <img src='/assets/deco/overjoyedstatue.png' alt="Overjoyed Statue" />
        </button>
        <button
            className={`music-element-icon ${getAudioName(currentAudio) === sectionName + '-day-ambient' ? 'music-current' : ''}`}
            onClick={() => playAudio(refsList[`${sectionName}-day-ambient`], currentAudio, setCurrentAudio)}
        >
            <img src='/assets/deco/cheerfulstatue.png' alt="Cheerful Statue" />
        </button>
        <img src='/assets/misc/moon.png' className="music-time" alt="Night Music" />
        <button
            className={`music-element-icon ${getAudioName(currentAudio) === sectionName + '-night-theme' ? 'music-current' : ''}`}
            onClick={() => playAudio(refsList[`${sectionName}-night-theme`], currentAudio, setCurrentAudio)}
        >
            <img src='/assets/deco/overjoyedstatue.png' alt="Overjoyed Statue" />
        </button>
        <button
            className={`music-element-icon ${getAudioName(currentAudio) === sectionName + '-night-ambient' ? 'music-current' : ''}`}
            onClick={() => playAudio(refsList[`${sectionName}-night-ambient`], currentAudio, setCurrentAudio)}
        >
            <img src='/assets/deco/cheerfulstatue.png' alt="Cheerful Statue" />
        </button>
    </div>
);

export const LabyMusicRefs: React.FC = () => {
    const [musicMenu, setMusicMenu] = useState(false);
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

    const refsList = useRef(
        audioLabyRefsNames.reduce((acc, name) => {
            acc[name] = React.createRef<HTMLAudioElement>();
            return acc;
        }, {} as Record<string, React.RefObject<HTMLAudioElement>>)
    ).current;

    const sections = ['waterworks', 'lava', 'labyrinth', 'dreamland'];

    return (
        <>
            {audioLabyRefsNames.map((name) => (
                <audio key={name} ref={refsList[name]} src={`/assets/music/${name}.ogg`}>
                    <track
                        kind="captions"
                        srcLang="en"
                        label={`${name} Captions`}
                        default
                        src={`data:text/vtt,WEBVTT%0A%0A00:00:00.000%20--%3E%2000:00:10.000%0A${name.replace(/-/g, ' ')}`}
                    />
                </audio>
            ))}
            <div className={`region-music-player region-labyrinth ${musicMenu ? '' : 'disabled'}`}>
                <button className='music-player-icon' onClick={() => setMusicMenu(!musicMenu)}>
                    <img src='/assets/misc/audio.png' alt='Open music list' />
                </button>
                <OverlayScrollbarsComponent
                    options={{
                        scrollbars: {
                            autoHide: "move",
                            autoHideDelay: 500,
                        },
                    }}
                    defer
                >
                    {sections.map((section) => (
                        <MusicSection
                            key={section}
                            sectionName={section}
                            refsList={refsList}
                            currentAudio={currentAudio}
                            setCurrentAudio={setCurrentAudio}
                        />
                    ))}
                </OverlayScrollbarsComponent>
            </div>
        </>
    );
};