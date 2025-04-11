import { NavButton } from '../components/NavButton';
import { buildingNames, buildingList, buildingUpgrades, usageList } from '../text/buildings';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import React from 'react';
import '../css/Buildings.css';

const defaultBuilding = 'corral';
const linkStyle = {
    textDecoration: 'none',
    color: 'var(--text-color)'
}

export const Buildings = () => {
    const { building, upgrade } = useParams();
    const activeBuilding = building ?? defaultBuilding;
    const currentUpgrade = upgrade ?? null;
    const buildingsButtons = () => {
        return buildingNames.map((building) => {
            return (
                <NavLink key={building} to={`/buildings/${building}`} style={linkStyle}>
                    <NavButton
                        icon={`buildings/${building}`}
                        name={buildingList[building][0]}
                        size={1.25}
                        selected={building === activeBuilding}
                        tilting='none'
                    />
                </NavLink>
            )
        });
    }
    const upgradeList = () => {
        if (buildingUpgrades[activeBuilding].length === 0)
            return (
                <>
                    <NavButton icon='misc/upgrade' name='Upgrade' size={.8} selected={false} tilting='none' visible={false} />
                    <h2>No upgrades available for this building.</h2>
                </>
            );
        return buildingUpgrades[activeBuilding].map((upgrade) => {
            return (
                <NavLink key={upgrade[0]} to={`/buildings/${activeBuilding}/${upgrade[0]}`} style={linkStyle}>
                    <NavButton
                        key={upgrade[0]}
                        icon={`buildings/${upgrade[0]}`}
                        name={upgrade[1]}
                        size={.8}
                        selected={upgrade[0] === currentUpgrade}
                        tilting='none'
                    />
                </NavLink>
            )
        });
    }

    const upgradeInfo = () => {
        const upgrade = buildingUpgrades[activeBuilding].find(upgrade => upgrade[0] === currentUpgrade);
        if (!currentUpgrade) {
            return (
                <div className='upgrade-infos upgrade-no-infos'>
                    <div>
                        <img src='/assets/misc/upgrade.png' alt="Upgrade Icon" />
                        <h3>Upgrade Information</h3>
                        <p>Click on an upgrade to see more information about it.</p>
                    </div>
                </div>
            );
        }
        if (!upgrade)
            return <Navigate to='/buildings/corral' />;
        return (
            <div className='upgrade-infos upgrade-infos-available'>
                <div className='upgrade-title'>
                    <h3>{upgrade[1]}</h3>
                </div>
                <div className='upgrade-cost'>
                    <p>Cost: {upgrade[2]}</p>
                    <img src='/assets/misc/buck.png' alt='Newbucks' />
                </div>
                <div className="upgrade-img">
                    <img src={`/assets/buildings/${upgrade[0]}.png`} alt={upgrade[1]} />
                </div>
                <div className='upgrade-desc'>
                    <h4>Description</h4>
                    <p>{upgrade[3]}</p>
                </div>
            </div>
        );
    }

    const foundUpgrade = buildingUpgrades[activeBuilding].find(upgrade => upgrade[0] === currentUpgrade);
    const upgradeName = foundUpgrade ? foundUpgrade[1] : undefined;
    if (upgradeName)
        document.title = `${upgradeName} (${buildingList[activeBuilding][0]}) - Slimepedia 2`;
    else if (building)
        document.title = buildingList[activeBuilding][0] + ' - Slimepedia 2';
    else
        document.title = 'Buildings - Slimepedia 2';

    return (
        <div>
            <div className='buildings-list'>
                {buildingsButtons()}
            </div>
            <div className='building-presentation'>
                <div className='building-title'>
                    <h1>{buildingList[activeBuilding][0]}</h1>
                    <h2>{buildingList[activeBuilding][1]}</h2>
                    <img className='building-image' src={`/assets/buildings/${activeBuilding}.png`} alt={buildingList[activeBuilding][0]} />
                </div>
                <div className='upgrade-list'>
                    <div>
                        {upgradeList()}
                    </div>
                    <div className='fake-border fb-0'></div>
                    <div className='fake-border fb-1'></div>
                </div>
                <div className='building-description'>
                    <img src='/assets/misc/pediatut.png' alt="Informations about the building" />
                    <p>{buildingList[activeBuilding][3]}</p>
                </div>
                <div className='little-box-buildings building-cost'>
                    <img src='/assets/misc/buck.png' alt='Newbuck coin' />
                    <div>
                        <h3>Cost</h3>
                        <h4>{buildingList[activeBuilding][2]}</h4>
                    </div>
                </div>
                <div className='little-box-buildings building-use'>
                    <img src={`/assets/${usageList[buildingList[activeBuilding][4]][1]}.png`} alt='Usage' />
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