import { useState } from 'react';
import './assets/css/Buildings.css';
import { NavButton } from './NavButton';
import { buildingPedia, buildingUpgrades, usageList } from './assets/text/buildings';

const defaultBuilding = 'corral';

export const Buildings = () => {
    const buildingList = buildingPedia.map(building => building[0]);
    const [activeBuilding, setActiveBuilding] = useState(defaultBuilding);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentUpgrade, setCurrentUpgrade] = useState(null);
    const actualBuildingHandler = (building, index) => {
        setActiveBuilding(buildingList.includes(building) ? building : defaultBuilding);
        setCurrentIndex(index);
        setCurrentUpgrade(null);
    }
    const buildingsButtons = () => {
        return buildingPedia.map((building, index) => {
            return <NavButton key={index} icon={'buildings/' + building[0]} name={building[1]} tilting='none' size={100} action={() => actualBuildingHandler(building[0], index)} />
        });
    }
    const upgradeList = () => {
        if (buildingUpgrades[activeBuilding].length === 0)
            return <h2>No upgrades available for this building.</h2>;
        return buildingUpgrades[activeBuilding].map((upgrade, index) => {
            return <NavButton key={index} icon={'buildings/' + upgrade[0]} name={upgrade[1]} tilting='none' size={75} action={() => setCurrentUpgrade(upgrade[0])} />
        });
    }

    const upgradeInfo = () => {
        if (currentUpgrade === null || buildingUpgrades[activeBuilding].find(upgrade => upgrade[0] === currentUpgrade) === undefined)
            return (
                <div className='upgrade-infos'>
                    <h3>Upgrade Information</h3>
                    <p>Click on an upgrade to see more information about it.</p>
                </div>
            );
        var upgrade = buildingUpgrades[activeBuilding].find(upgrade => upgrade[0] === currentUpgrade);
        return (
            <div className='upgrade-infos'>
                <div className='upgrade-title'>
                    <h3>{upgrade[1]}</h3>
                </div>
                <div className='upgrade-cost'>
                    <p>Cost: {upgrade[2]}</p>
                    <img src={require('./assets/misc/buck.png')} alt='Newbucks' />
                </div>
                <div className="upgrade-img">
                    <img src={require('./assets/buildings/' + upgrade[0] + '.png')} alt={upgrade[1]} />
                </div>
                <div className='upgrade-desc'>
                    <h4>Description</h4>
                    <p>{upgrade[3]}</p>
                </div>
            </div>
        );
    }

    return (
        <div className='box-layout buildings-menu'>
            <div className='buildings-list'>
                {buildingsButtons()}
            </div>
            <div className='building-presentation'>
                <div className='building-title'>
                    <h1>{buildingPedia[currentIndex][1]}</h1>
                    <h2>{buildingPedia[currentIndex][2]}</h2>
                    <img className='building-image' src={require('./assets/buildings/' + buildingPedia[currentIndex][0] + '.png')} alt='Corral' />
                </div>
                <div className='upgrade-list'>
                    <div>
                        {upgradeList()}
                        <div className='fake-border fb-0'></div>
                        <div className='fake-border fb-1'></div>
                    </div>
                </div>
                <div className='building-description'>
                    <img src={require('./assets/misc/pediatut.png')} alt="Informations about the building" />
                    <p>{buildingPedia[currentIndex][4]}</p>
                </div>
                <div className='little-box-buildings building-cost'>
                    <img src={require('./assets/misc/buck.png')} alt='Newbuck coin' />
                    <div>
                        <h3>Cost</h3>
                        <h4>{buildingPedia[currentIndex][3]}</h4>
                    </div>
                </div>
                <div className='little-box-buildings building-use'>
                    <img src={require('./assets/' + usageList[buildingPedia[currentIndex][5]][1] + '.png')} alt='Usage' />
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