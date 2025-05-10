import { NavButton } from '../components/NavButton';
import { buildingList, buildingUpgrades, usageList, Building } from '../text/buildings';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import React from 'react';
import '../css/Buildings.css';
import { getEnumValue } from '../App';

const linkStyle = {
    textDecoration: 'none',
    color: 'var(--text-color)'
}

const UpgradeInfo: React.FC<{ building: Building | null; currentUpgrade: string | null }> = ({ building, currentUpgrade }) => {
    if (currentUpgrade == null || building == null) {
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

    const upgrade = buildingUpgrades[building].find(upgrade => upgrade[0] === currentUpgrade);
    if (!upgrade)
        return <Navigate to='/buildings/corral' replace />;
    return (
        <div className='upgrade-infos upgrade-infos-available'>
            <div className='upgrade-title'>
                <h3>{upgrade[1]}</h3>
            </div>
            <div className='little-box-buildings upgrade-cost building-cost'>
                <img src='/assets/misc/buck.png' alt='Newbuck coin' />
                <div>
                    <h3>Cost</h3>
                    <h4>{upgrade[2]}</h4>
                </div>
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

const UpgradeList: React.FC<{ building: Building; currentUpgrade: string | null }> = ({ building, currentUpgrade }) => {
    if (buildingUpgrades[building].length === 0)
        return (
            <>
                <NavButton icon='misc/upgrade' name='Upgrade' size={.8} selected={false} tilting='none' visible={false} />
                <h2>No upgrades available for this building.</h2>
            </>
        );
    return (
        <>
            {buildingUpgrades[building].map((upgrade) => (
                <NavLink key={upgrade[0]} to={`/buildings/${building}/${upgrade[0]}`} style={linkStyle}>
                    <NavButton
                        icon={`buildings/${upgrade[0]}`}
                        name={upgrade[1]}
                        size={.8}
                        selected={upgrade[0] === currentUpgrade}
                        tilting='none'
                    />
                </NavLink>
            ))}
        </>
    );
};

const BuildingsButtons: React.FC<{ selectedBuilding: Building | null }> = ({ selectedBuilding }) => {
    return (
        <>
            {Object.values(Building).map((buildingElement) => (
                <NavLink key={buildingElement} to={`/buildings/${buildingElement}`} style={linkStyle}>
                    <NavButton
                        icon={`buildings/${buildingElement}`}
                        name={buildingList[buildingElement][0]}
                        size={1.25}
                        selected={buildingElement === selectedBuilding}
                        tilting='none'
                    />
                </NavLink>
            ))}
        </>
    );
};

const EmptyBuilding: React.FC = () => (
    <div>
        <div className='buildings-list'>
            <BuildingsButtons selectedBuilding={null} />
        </div>
        <div className='building-presentation'>
            <div className='building-title'>
                <h1>No Building Selected</h1>
                <h2>Select a building on the list got get it&apos;s infoirmations</h2>
                <img className='building-image' src='' alt='No building selected' />
            </div>
            <div className='upgrade-list'>
                <div>
                    <UpgradeList building={Building.Corral} currentUpgrade={null} />
                </div>
                <div className='fake-border fb-0'></div>
                <div className='fake-border fb-1'></div>
            </div>
            <div className='building-description'>
                <img src='/assets/misc/pediatut.png' alt="Informations about the building" />
            </div>
            <div className='little-box-buildings building-cost'>
                <img src='/assets/misc/buck.png' alt='Newbuck coin' />
                <div>
                    <h3>Cost</h3>
                </div>
            </div>
            <div className='little-box-buildings building-use'>
                <img src='' alt='Usage' />
                <div>
                    <h3>Usage</h3>
                </div>
            </div>
            <UpgradeInfo building={null} currentUpgrade={null} />
        </div>
    </div>
);

export const Buildings = () => {
    const { building: buildingName, upgrade } = useParams();
    const building = getEnumValue(Building, buildingName) ?? Building.Corral;
    const currentUpgrade = upgrade ?? null;

    if (building === null)
        return <EmptyBuilding />;

    const foundUpgrade = buildingUpgrades[building].find(upgrade => upgrade[0] === currentUpgrade);
    const upgradeName = foundUpgrade ? foundUpgrade[1] : undefined;
    if (upgradeName)
        document.title = `${upgradeName} (${buildingList[building][0]}) - Slimepedia 2`;
    else if (buildingName)
        document.title = buildingList[building][0] + ' - Slimepedia 2';
    else
        document.title = 'Buildings - Slimepedia 2';

    return (
        <div>
            <div className='buildings-list'>
                <BuildingsButtons selectedBuilding={null} />
            </div>
            <div className='building-presentation'>
                <div className='building-title'>
                    <h1>{buildingList[building][0]}</h1>
                    <h2>{buildingList[building][1]}</h2>
                    <img className='building-image' src={`/assets/buildings/${building}.png`} alt={buildingList[building][0]} />
                </div>
                <div className='upgrade-list'>
                    <div>
                        <UpgradeList building={building} currentUpgrade={currentUpgrade} />
                    </div>
                    <div className='fake-border fb-0'></div>
                    <div className='fake-border fb-1'></div>
                </div>
                <div className='building-description'>
                    <img src='/assets/misc/pediatut.png' alt="Informations about the building" />
                    <p>{buildingList[building][3]}</p>
                </div>
                <div className='little-box-buildings building-cost'>
                    <img src='/assets/misc/buck.png' alt='Newbuck coin' />
                    <div>
                        <h3>Cost</h3>
                        <h4>{buildingList[building][2]}</h4>
                    </div>
                </div>
                <div className='little-box-buildings building-use'>
                    <img src={`/assets/${usageList[buildingList[building][4]][1]}.png`} alt='Usage' />
                    <div>
                        <h3>Usage</h3>
                        <h4>{usageList[buildingList[building][4]][0]}</h4>
                    </div>
                </div>
                <UpgradeInfo building={building} currentUpgrade={currentUpgrade} />
            </div>
        </div>
    );
}

export default Buildings;