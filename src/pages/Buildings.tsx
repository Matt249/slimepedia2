import { useState, useEffect } from 'react';
import { NavButton } from '../components/NavButton';
import { buildingNames, buildingList, buildingUpgrades, usageList } from '../text/buildings';
import { mediaFetcher } from '../media-manager';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import React from 'react';
import upgradeImg from '/src/assets/misc/upgrade.png';
import buck from '/src/assets/misc/buck.png';
import pediaTut from '/src/assets/misc/pediatut.png';
import '../css/Buildings.css';

const defaultBuilding = 'corral';
const linkStyle = {
    textDecoration: 'none',
    color: 'var(--text-color)'
}

export const Buildings = () => {
    const { building, upgrade } = useParams();
    const activeBuilding = building ? building : defaultBuilding;
    const currentUpgrade = upgrade ? upgrade : null;
    const buildingsButtons = () => {
        return buildingNames.map((building) => {
            return (
                <NavLink key={building} to={`/buildings/${building}`} style={linkStyle}>
                    <NavButton
                        icon={'buildings/' + building}
                        name={buildingList[building][0]}
                        size={wideScreen ? 150 : 100}
                        selected={building[0] === activeBuilding}
                        tilting='none'
                    />
                </NavLink>
            )
        });
    }
    const upgradeList = () => {
        if (buildingUpgrades[activeBuilding].length === 0)
            return <h2 className='no-upgrades'>No upgrades available for this building.</h2>;
        return buildingUpgrades[activeBuilding].map((upgrade, index) => {
            return (
                <NavLink key={index} to={`/buildings/${activeBuilding}/${upgrade[0]}`} style={linkStyle}>
                    <NavButton
                        key={index}
                        icon={'buildings/' + upgrade[0]}
                        name={upgrade[1]}
                        size={wideScreen ? 100 : 75}
                        selected={upgrade[0] === currentUpgrade}
                        tilting='none'
                    />
                </NavLink>
            )
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
        var upgrade = buildingUpgrades[activeBuilding].find(upgrade => upgrade[0] === currentUpgrade);
        if (!upgrade)
            return <Navigate to='/buildings/' />;
        if (!currentUpgrade)
            return (
                <div className='upgrade-infos upgrade-no-infos'>
                    <div>
                        <img src={upgradeImg} alt="Upgrade Icon" />
                        <h3>Upgrade Information</h3>
                        <p>Click on an upgrade to see more information about it.</p>
                    </div>
                </div>
            );
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
                    <h1>{buildingList[activeBuilding][0]}</h1>
                    <h2>{buildingList[activeBuilding][1]}</h2>
                    <img className='building-image' src={mediaFetcher(`buildings/${activeBuilding}.png`)} alt={buildingList[activeBuilding][0]} />
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
                    <p>{buildingList[activeBuilding][3]}</p>
                </div>
                <div className='little-box-buildings building-cost'>
                    <img src={buck} alt='Newbuck coin' />
                    <div>
                        <h3>Cost</h3>
                        <h4>{buildingList[activeBuilding][2]}</h4>
                    </div>
                </div>
                <div className='little-box-buildings building-use'>
                    <img src={mediaFetcher(usageList[buildingList[activeBuilding][4]][1] + '.png')} alt='Usage' />
                    <div>
                        <h3>Usage</h3>
                        <h4>{usageList[buildingList[activeBuilding][4]][0]}</h4>
                    </div>
                </div>
                {upgradeInfo()}
            </div>
        </div>
    );
}

export default Buildings;