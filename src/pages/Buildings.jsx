import { useState, useEffect } from 'react';
import { NavButton } from '../components/NavButton';
import { buildingPedia, buildingUpgrades, usageList } from '../text/buildings';
import { mediaFetcher } from '../media-manager';
import upgradeImg from '/src/assets/misc/upgrade.png';
import buck from '/src/assets/misc/buck.png';
import pediaTut from '/src/assets/misc/pediatut.png';
import '../css/Buildings.css';

const defaultBuilding = 'corral';

export const Buildings = () => {
    const buildingList = buildingPedia.map(building => building[0]);
    const [activeBuilding, setActiveBuilding] = useState(defaultBuilding);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentUpgrade, setCurrentUpgrade] = useState(null);
    const buildingsButtons = () => {
        return buildingPedia.map((building, index) => {
            return <NavButton
                key={index}
                icon={'buildings/' + building[0]}
                name={building[1]}
                size={wideScreen ? 150 : 100}
                action={() => {
                    setActiveBuilding(buildingList.includes(building[0]) ? building[0] : defaultBuilding);
                    setCurrentIndex(index);
                    setCurrentUpgrade(null);
                }}
                selected={building[0] === activeBuilding}
                tilting='none'
            />
        });
    }
    const upgradeList = () => {
        if (buildingUpgrades[activeBuilding].length === 0)
            return <h2 className='no-upgrades'>No upgrades available for this building.</h2>;
        return buildingUpgrades[activeBuilding].map((upgrade, index) => {
            return <NavButton
                key={index}
                icon={'buildings/' + upgrade[0]}
                name={upgrade[1]}
                size={wideScreen ? 100 : 75}
                action={() => setCurrentUpgrade(upgrade[0] === currentUpgrade ? null : upgrade[0])}
                selected={upgrade[0] === currentUpgrade}
                tilting='none'
            />
        });
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
    const upgradeInfo = () => {
        if (currentUpgrade === null || buildingUpgrades[activeBuilding].find(upgrade => upgrade[0] === currentUpgrade) === undefined)
            return (
                <div className='upgrade-infos upgrade-no-infos'>
                    <div>
                        <img src={upgradeImg} alt="Upgrade Icon" />
                        <h3>Upgrade Information</h3>
                        <p>Click on an upgrade to see more information about it.</p>
                    </div>
                </div>
            );
        var upgrade = buildingUpgrades[activeBuilding].find(upgrade => upgrade[0] === currentUpgrade);
        return (
            <div className='upgrade-infos upgrade-infos-available'>
                <div className='upgrade-title'>
                    <h3>{upgrade[1]}</h3>
                </div>
                <div className='upgrade-cost'>
                    <p>Cost: {upgrade[2]}</p>
                    <img src={buck} alt='Newbucks' />
                </div>
                <div className="upgrade-img">
                    <img src={mediaFetcher(`buildings/${upgrade[0]}.png`)} alt={upgrade[1]} />
                </div>
                <div className='upgrade-desc'>
                    <h4>Description</h4>
                    <p>{upgrade[3]}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className='buildings-list'>
                {buildingsButtons()}
            </div>
            <div className='building-presentation'>
                <div className='building-title'>
                    <h1>{buildingPedia[currentIndex][1]}</h1>
                    <h2>{buildingPedia[currentIndex][2]}</h2>
                    <img className='building-image' src={mediaFetcher(`buildings/${buildingPedia[currentIndex][0]}.png`)} alt='Corral' />
                </div>
                <div className='upgrade-list'>
                    <div>
                        {upgradeList()}
                    </div>
                    <div className='fake-border fb-0'></div>
                    <div className='fake-border fb-1'></div>
                </div>
                <div className='building-description'>
                    <img src={pediaTut} alt="Informations about the building" />
                    <p>{buildingPedia[currentIndex][4]}</p>
                </div>
                <div className='little-box-buildings building-cost'>
                    <img src={buck} alt='Newbuck coin' />
                    <div>
                        <h3>Cost</h3>
                        <h4>{buildingPedia[currentIndex][3]}</h4>
                    </div>
                </div>
                <div className='little-box-buildings building-use'>
                    <img src={mediaFetcher(usageList[buildingPedia[currentIndex][5]][1] + '.png')} alt='Usage' />
                    <div>
                        <h3>Usage</h3>
                        <h4>{usageList[buildingPedia[currentIndex][5]][0]}</h4>
                    </div>
                </div>
                {upgradeInfo()}
            </div>
        </div>
    );
}