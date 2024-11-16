import { useState } from 'react';
import { Down } from '../components/Down';
import { mediaFetcher } from '../media-manager';
import { NavButton } from '../components/NavButton';
import { recipeElements, unlockRequirements, upgradeDescriptions, upgradeEffects, upgradeNames, upgradePacks, upgradesList, warpGadgets, warpNames } from '../text/blueprints';
import PropTypes from 'prop-types';
import upgradeImg from '/src/assets/misc/upgrade.png';
import utilitiesImg from '/src/assets/misc/utilities.png';
import warpImg from '/src/assets/misc/warp.png';
import decorationsImg from '/src/assets/misc/decorations.png';
import buck from '/src/assets/misc/buck.png';
import shopImg from '/src/assets/misc/shop.png';
import crossImg from '/src/assets/misc/cross.png';
import trashImg from '/src/assets/misc/trash.png';
import '../css/Blueprints.css';

const UpgradeItemList = ({
    selected = false,
    upgradePack,
    selectedCallback
}) => {
    const [upgradeLevel, setUpgradeLevel] = useState(1);

    const upgrade = () => {
        setUpgradeLevel(prevLevel => {
            const newLevel = prevLevel + 1;
            if (newLevel <= upgradePack[2]) {
                selectedCallback(upgradePack[0], newLevel);
                return newLevel;
            }
            return prevLevel;
        });
    };

    const downgrade = () => {
        setUpgradeLevel(prevLevel => {
            const newLevel = prevLevel - 1;
            if (newLevel >= 1) {
                selectedCallback(upgradePack[0], newLevel);
                return newLevel;
            }
            return prevLevel;
        });
    };

    return (
        <div
            className={'vac-upgrade-item' + (selected === upgradePack[0] ? ' selected' : '')}
            key={upgradePack[0]}
        >
            <div
                className='vac-upgrade-pack'
                onClick={() => selectedCallback(upgradePack[0], upgradeLevel)}
            >
                <img src={mediaFetcher(`upgrades/${upgradePack[0]}.png`)} alt={upgradePack[1]} />
                <h2>{upgradePack[1]}</h2>
            </div>
            <div className='vac-upgrade-tiers'>
                <div
                    className={'arrow-left' + (upgradeLevel <= 1 || upgradePack[2] === 1 ? ' disabled' : '')}
                    onClick={downgrade}
                ><Down /></div>
                <img src={mediaFetcher(`upgrades/${upgradePack[0] + (upgradePack[2] !== 1 ? upgradeLevel : '')}.png`)} alt={upgradePack[1]} />
                <div
                    className={'arrow-right' + (upgradeLevel >= upgradePack[2] || upgradePack[2] === 1 ? ' disabled' : '')}
                    onClick={upgrade}
                ><Down /></div>
            </div>
        </div>
    );

};

UpgradeItemList.propTypes = {
    selected: PropTypes.bool,
    upgradePack: PropTypes.array.isRequired,
    selectedCallback: PropTypes.func.isRequired
};

const UpgradesPage = ({ recipeListAdder }) => {
    const [selectedUpgrade, setSelectedUpgrade] = useState(null);
    const [selectedTier, setSelectedTier] = useState(1);
    const upgradeSelection = (upgrade, tier) => {
        if (upgrade === selectedUpgrade && tier === selectedTier) {
            setSelectedUpgrade(null);
            setSelectedTier(1);
        }
        else {
            setSelectedTier(tier);
            setSelectedUpgrade(upgrade);
        }
    }

    UpgradesPage.propTypes = {
        recipeListAdder: PropTypes.func.isRequired
    };


    return (
        <>
            <div className='vac-upgrade-list'>
                {upgradeNames.map((upgradeName) => (
                    <UpgradeItemList
                        key={upgradeName}
                        upgradePack={[upgradeName, upgradePacks[upgradeName][0], upgradePacks[upgradeName][1]]}
                        selectedCallback={upgradeSelection}
                    />
                ))}
            </div >
            <div className='vac-upgrade-info'>
                <div className='vac-upgrade-title-box'>
                    <img src={selectedUpgrade === null ? upgradeImg : mediaFetcher(`upgrades/${selectedUpgrade + (upgradePacks[selectedUpgrade][1] === 1 ? '' : selectedTier)}.png`)} alt={selectedUpgrade === null ? '' : upgradesList[selectedUpgrade + selectedTier][0]} />
                    <h1>{selectedUpgrade === null ? 'Select an upgrade' : upgradesList[selectedUpgrade + selectedTier][0]}</h1>
                    <h3>{selectedUpgrade === null ? 'Select an upgrade to view its details' : upgradeDescriptions[selectedUpgrade + selectedTier]}</h3>
                </div>
                <div className='vac-upgrade-recipe-box'>
                    <h2>Recipe</h2>
                    <div className='vac-upgrade-recipe-list'>
                        {selectedUpgrade !== null && (
                            <>
                                <div
                                    onClick={() => recipeListAdder(upgradesList[selectedUpgrade + selectedTier][3])}
                                >
                                    add items
                                </div>
                                <div>
                                    <img
                                        src={buck}
                                        alt='Newbucks'
                                        title='Newbucks'
                                    />
                                    <p>Newbucks: </p>
                                    <h3>{upgradesList[selectedUpgrade + selectedTier][2]}</h3>
                                </div>
                                {Object.keys(upgradesList[selectedUpgrade + selectedTier][3]).map((ingredient) => (
                                    <div key={ingredient}>
                                        <img
                                            src={mediaFetcher(`${recipeElements[ingredient][1]}.png`)}
                                            alt={recipeElements[ingredient][0]}
                                            title={recipeElements[ingredient][0]}
                                        />
                                        <p>{recipeElements[ingredient][0]}: </p>
                                        <h3>{upgradesList[selectedUpgrade + selectedTier][3][ingredient]}</h3>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
                <div className='vac-upgrade-effect-box'>
                    <img src={selectedUpgrade === null ? '' : mediaFetcher(`${upgradeEffects[selectedUpgrade + selectedTier][0][0]}.png`)} alt={selectedUpgrade === null ? '' : upgradesList[selectedUpgrade + selectedTier][0]} />
                    <p className='vac-effect-desc'>{selectedUpgrade === null ? '' : upgradeEffects[selectedUpgrade + selectedTier][0][1]}</p>
                    <Down />
                    <img src={selectedUpgrade === null ? '' : mediaFetcher(`${upgradeEffects[selectedUpgrade + selectedTier][1][0]}.png`)} alt={selectedUpgrade === null ? '' : upgradesList[selectedUpgrade + selectedTier][0]} />
                    <p className='vac-effect-desc'>{selectedUpgrade === null ? '' : upgradeEffects[selectedUpgrade + selectedTier][1][1]}</p>
                </div>
                <div className='vac-upgrade-requirements-box'>
                    <h2>Requirements</h2>
                    {(selectedUpgrade === null) ? '' : (<>
                        <img src={mediaFetcher(`${unlockRequirements[upgradesList[selectedUpgrade + selectedTier][1]][1]}.png`)} alt={selectedUpgrade === null ? '' : unlockRequirements[upgradesList[selectedUpgrade + selectedTier][1]][0]} />
                        <p>{selectedUpgrade === null ? '' : unlockRequirements[upgradesList[selectedUpgrade + selectedTier][1]][0]}</p>
                    </>)}
                </div>
            </div>
        </>
    );
};

const UtilitiesPage = () => {
    (
        <div>
            <h1>Utilites Page</h1>
        </div>

    );
};

const WarpPage = ({ recipeListAdder }) => {
    const [selectedWarp, setSelectedWarp] = useState(null);
    return (
        <>
            <div className='warp-list'>
                {warpNames.map((warpName) => (
                    <NavButton key={warpName} name={warpGadgets[warpName][0]} icon={`gadgets/${warpName}`} action={setSelectedWarp(warpName)} />
                ))}
            </div>
            <div className='warp-info'>
                <div className='vac-upgrade-info'>
                    <div className='vac-upgrade-title-box'>
                        <img src={selectedWarp === null ? upgradeImg : mediaFetcher(`gadgets/${selectedWarp}.png`)} alt={selectedWarp === null ? '' : warpGadgets[selectedWarp][0]} />
                        <h1>{selectedWarp === null ? 'Select an upgrade' : warpGadgets[selectedWarp][0]}</h1>
                        <h3>{selectedWarp === null ? 'Select an upgrade to view its details' : warpGadgets[selectedWarp]}</h3>
                    </div>
                    <div className='vac-upgrade-recipe-box'>
                        <h2>Recipe</h2>
                        <div className='vac-upgrade-recipe-list'>
                            {selectedWarp !== null && (
                                <>
                                    <div
                                        onClick={() => recipeListAdder(warpGadgets[selectedWarp][3])}
                                    >
                                        add items
                                    </div>
                                    <div>
                                        <img
                                            src={buck}
                                            alt='Newbucks'
                                            title='Newbucks'
                                        />
                                        <p>Newbucks: </p>
                                        <h3>{warpGadgets[selectedWarp][2]}</h3>
                                    </div>
                                    {Object.keys(warpGadgets[selectedWarp][3]).map((ingredient) => (
                                        <div key={ingredient}>
                                            <img
                                                src={mediaFetcher(`${recipeElements[ingredient][1]}.png`)}
                                                alt={recipeElements[ingredient][0]}
                                                title={recipeElements[ingredient][0]}
                                            />
                                            <p>{recipeElements[ingredient][0]}: </p>
                                            <h3>{warpGadgets[selectedWarp][3][ingredient]}</h3>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    <div className='vac-upgrade-effect-box'>

                    </div>
                    <div className='vac-upgrade-requirements-box'>
                        <h2>Requirements</h2>
                        {(selectedWarp === null) ? '' : (
                            <>
                                <img src={mediaFetcher(`${unlockRequirements[warpGadgets[selectedWarp][1]][1]}.png`)} alt={selectedWarp === null ? '' : unlockRequirements[warpGadgets[selectedWarp][1]][0]} />
                                <p>{selectedWarp === null ? '' : unlockRequirements[warpGadgets[selectedWarp][1]][0]}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

WarpPage.propTypes = {
    recipeListAdder: PropTypes.func.isRequired
};

const DecorationsPage = () => {
    return (
        <div>
            <h1>Decorations Page</h1>
        </div>
    );
};

export const Blueprints = () => {
    const [selectedTab, setSelectedTab] = useState('upgrades');
    const changeTab = (tab) => {
        if (tab !== selectedTab) {
            setSelectedTab(tab);
        }
    };
    const [recipeMenuToggle, setRecipeMenuToggle] = useState(false);
    const [recipeList, setRecipeList] = useState({});
    const addToRecipeList = (items) => {
        setRecipeList(prevList => {
            const newList = { ...prevList };
            for (let item in items) {
                if (newList[item] === undefined)
                    newList[item] = items[item];
                else
                    newList[item] += items[item];
            }
            return newList;
        });
    };

    const renderPage = () => {
        switch (selectedTab) {
            case 'upgrades':
                return <UpgradesPage recipeListAdder={addToRecipeList} />;
            case 'utilities':
                return <UtilitiesPage />;
            case 'warp':
                return <WarpPage recipeListAdder={addToRecipeList} />;
            case 'decorations':
                return <DecorationsPage />;
            default:
                return <></>;
        }
    };

    return (
        <>
            <div>
                <div className='blueprints-category'>
                    <div className={'blueprints-tab' + (selectedTab === 'upgrades' ? ' selected' : '')} onClick={() => changeTab('upgrades')}>
                        <img src={upgradeImg} alt="Upgrade Icon" />
                        <h1>Upgrades</h1>
                    </div>
                    <div className={'blueprints-tab' + (selectedTab === 'utilities' ? ' selected' : '')} onClick={() => changeTab('utilities')}>
                        <img src={utilitiesImg} alt="Utilities" />
                        <h1>Utilities</h1>
                    </div>
                    <div className={'blueprints-tab' + (selectedTab === 'warp' ? ' selected' : '')} onClick={() => changeTab('warp')}>
                        <img src={warpImg} alt="Warp Tech" />
                        <h1>Warp Tech</h1>
                    </div>
                    <div className={'blueprints-tab' + (selectedTab === 'decorations' ? ' selected' : '')} onClick={() => changeTab('decorations')}>
                        <img src={decorationsImg} alt="Decorations" />
                        <h1>Decorations</h1>
                    </div>
                </div>
                {renderPage()}
            </div>
            <div className='pin-list'>
                <img src={shopImg} alt='Shop icon' onClick={() => setRecipeMenuToggle(!recipeMenuToggle)} />
                <div className={'pin-list-recipe' + (recipeMenuToggle ? '' : ' disabled')}>
                    <div className='pin-header'>
                        <h1>Recipes Ingredients List</h1>
                        <img src={trashImg} alt='Clear' onClick={() => setRecipeList({})} />
                        <img src={crossImg} alt='Close' onClick={() => setRecipeMenuToggle(false)} />
                    </div>
                    <div className='pin-item-list'>
                        {Object.keys(recipeList).map((item) => (
                            <div
                                key={item}
                                className='pin-item-element'
                            >
                                <img
                                    src={mediaFetcher(`${recipeElements[item][1]}.png`)}
                                    alt={recipeElements[item][0]}
                                    title={recipeElements[item][0]}
                                />
                                <p>{recipeElements[item][0]}: </p>
                                <h3>{recipeList[item]}</h3>
                            </div>))}
                    </div>
                </div>
            </div>
        </>
    );
};