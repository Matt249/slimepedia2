import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Down } from '../components/Down';
import { mediaFetcher } from '../media-manager';
import { NavButton } from '../components/NavButton';
import { decorationsDescription, decorationsList, decorationsNames, recipeElements, unlockRequirements, upgradeDescriptions, upgradeEffects, upgradeNames, upgradePacks, upgradesList, utilitiesDescription, utilitiesList, utilitiesNames, warpDescriptions, warpGadgets, warpNames } from '../text/blueprints';
import PropTypes from 'prop-types';
import upgradeImg from '/src/assets/misc/upgrade.png';
import utilitiesImg from '/src/assets/misc/utilities.png';
import warpImg from '/src/assets/misc/warp.png';
import decorationsImg from '/src/assets/misc/decorations.png';
import shopImg from '/src/assets/misc/shop.png';
import crossImg from '/src/assets/misc/cross.png';
import trashImg from '/src/assets/misc/trash.png';
import blueprintImg from '/src/assets/misc/blueprint.png';
import '../css/Blueprints.css';
import { regionInfos } from '../text/regions';

const ConstructionList = ({ recipe: pattern, recipeListAdder, hideQtty = false }) => {
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => setQuantity(prevQtty => prevQtty + (prevQtty < 99 ? 1 : 0));
    const decreaseQuantity = () => setQuantity(prevQtty => prevQtty - (prevQtty > 1 ? 1 : 0));
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        const newRecipe = {};
        for (let element in pattern)
            newRecipe[element] = pattern[element] * quantity;
        setRecipe(newRecipe);
    }, [pattern, quantity]);

    return (
        <div className='recipe-list'>
            {recipe !== null && (
                <>
                    {!hideQtty &&
                        <div className='quantity-selector'>
                            <Down onClick={() => decreaseQuantity()} />
                            <div></div>
                            <h2 onClick={() => recipeListAdder(recipe)}>{quantity}</h2>
                            <img src={crossImg} alt='Add to the list' onClick={() => recipeListAdder(recipe)} />
                            <div></div>
                            <Down onClick={() => increaseQuantity()} />
                        </div>
                    }
                    {Object.keys(recipe).map((ingredient) => (
                        <div key={ingredient}>
                            <img
                                src={mediaFetcher(`${recipeElements[ingredient][1]}.png`)}
                                alt={recipeElements[ingredient][0]}
                                title={recipeElements[ingredient][0]}
                            />
                            <p>{recipeElements[ingredient][0]}: </p>
                            <h3>{recipe[ingredient]}</h3>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

ConstructionList.propTypes = {
    recipe: PropTypes.object.isRequired,
    recipeListAdder: PropTypes.func.isRequired,
    hideQtty: PropTypes.bool
};

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
        <NavLink
            className={'vac-upgrade-item' + (selected === upgradePack[0] ? ' selected' : '')}
            key={upgradePack[0]}
            to={`/blueprints/upgrades/${upgradePack[0]}`}
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
        </NavLink>
    );

};

UpgradeItemList.propTypes = {
    selected: PropTypes.bool,
    upgradePack: PropTypes.array.isRequired,
    selectedCallback: PropTypes.func.isRequired
};

const UpgradesPage = ({ recipeListAdder, blueprint }) => {
    const [selectedUpgrade, setSelectedUpgrade] = useState(blueprint || null);
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
                    {(selectedUpgrade !== null && selectedTier !== null) && <ConstructionList recipe={upgradesList[selectedUpgrade + selectedTier][2]} recipeListAdder={recipeListAdder} />}
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

UpgradesPage.propTypes = {
    recipeListAdder: PropTypes.func.isRequired,
    blueprint: PropTypes.string
};

const UtilitiesPage = ({ recipeListAdder, blueprint = null }) => {
    return (
        <>
            <div className='blueprint-list'>
                {utilitiesNames.map((utilitiesNames) => (
                    <NavLink key={utilitiesNames} to={`/blueprints/utilities/${utilitiesNames}`} className='warp-item'>
                        <NavButton key={utilitiesNames} name={utilitiesList[utilitiesNames][0]} icon={`gadgets/${utilitiesNames}`} tilting='none' />
                    </NavLink>
                ))}
            </div>
            <div className='blueprint-infos'>
                <div className='vac-upgrade-title-box'>{console.log(blueprint)}
                    <img src={blueprint === null ? blueprintImg : mediaFetcher(`gadgets/${blueprint}.png`)} alt={blueprint === null ? '' : utilitiesList[blueprint][0]} />
                    <h1>{blueprint === null ? 'Select a blueprint' : utilitiesList[blueprint][0]}</h1>
                    <h3>{blueprint === null ? 'Select an upgrade to view its details' : utilitiesDescription[blueprint]}</h3>
                </div>
                <div className='vac-upgrade-recipe-box'>
                    <h2>Recipe</h2>
                    {blueprint !== null && <ConstructionList recipe={utilitiesList[blueprint][2]} recipeListAdder={recipeListAdder} hideQtty={false} />}
                </div>
                <div className='vac-upgrade-requirements-box'>
                    <h2>Requirements</h2>
                    {blueprint !== null && (
                        <>
                            <img src={mediaFetcher(`${unlockRequirements[utilitiesList[blueprint][1]][1]}.png`)} alt={unlockRequirements[utilitiesList[blueprint][1]][0]} />
                            <p>{unlockRequirements[utilitiesList[blueprint][1]][0]}</p>
                        </>
                    )}
                </div>
            </div>
        </>
    )
};

UtilitiesPage.propTypes = {
    recipeListAdder: PropTypes.func.isRequired,
    blueprint: PropTypes.string
};

const WarpPage = ({ recipeListAdder, blueprint = null }) => {
    return (
        <>
            <div className='blueprint-list'>
                {warpNames.map((warpName) => (
                    <NavLink key={warpName} to={`/blueprints/warp/${warpName}`} className='warp-item'>
                        <NavButton key={warpName} name={warpGadgets[warpName][0]} icon={`gadgets/${warpName}`} tilting='none' />
                    </NavLink>
                ))}
            </div>
            <div className='blueprint-infos'>
                <div className='vac-upgrade-title-box'>
                    <img src={blueprint === null ? blueprintImg : mediaFetcher(`gadgets/${blueprint}.png`)} alt={blueprint === null ? '' : warpGadgets[blueprint][0]} />
                    <h1>{blueprint === null ? 'Select a blueprint' : warpGadgets[blueprint][0]}</h1>
                    <h3>{blueprint === null ? 'Select an upgrade to view its details' : warpDescriptions[blueprint]}</h3>
                </div>
                <div className='vac-upgrade-recipe-box'>
                    <h2>Recipe</h2>
                    {blueprint !== null && <ConstructionList recipe={warpGadgets[blueprint][2]} recipeListAdder={recipeListAdder} hideQtty={false} />}
                </div>
                <div className='vac-upgrade-requirements-box'>
                    <h2>Requirements</h2>
                    {blueprint !== null && (
                        <>
                            <img src={mediaFetcher(`${unlockRequirements[warpGadgets[blueprint][1]][1]}.png`)} alt={unlockRequirements[warpGadgets[blueprint][1]][0]} />
                            <p>{unlockRequirements[warpGadgets[blueprint][1]][0]}</p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

WarpPage.propTypes = {
    recipeListAdder: PropTypes.func.isRequired,
    blueprint: PropTypes.string
};

const DecorationsPage = ({ recipeListAdder, blueprint = null }) => {
    return (
        <>
            <div className='blueprint-list'>
                {decorationsNames.map((decoName) => (
                    <NavLink key={decoName} to={`/blueprints/decorations/${decoName}`} className='warp-item'>{console.log(decoName)}
                        <NavButton key={decoName} name={decorationsList[decoName][0]} icon={`deco/${decoName}`} tilting='none' />
                    </NavLink>
                ))}
            </div>
            <div className='blueprint-infos decoration'>
                <div className='vac-upgrade-title-box'>{console.log(blueprint)}
                    <img src={blueprint === null ? blueprintImg : mediaFetcher(`deco/${blueprint}.png`)} alt={blueprint === null ? '' : decorationsList[blueprint][0]} />
                    <h1>{blueprint === null ? 'Select a blueprint' : decorationsList[blueprint][0]}</h1>
                    <h3>{blueprint === null ? 'Select an upgrade to view its details' : decorationsDescription[blueprint]}</h3>
                </div>
                <div className='vac-upgrade-recipe-box'>
                    <h2>Recipe</h2>
                    {blueprint !== null && <ConstructionList recipe={decorationsList[blueprint][2]} recipeListAdder={recipeListAdder} hideQtty={false} />}
                </div>
                <div className='vac-upgrade-requirements-box'>
                    <h2>Requirements</h2>
                    {blueprint !== null && (
                        <>
                            <img src={mediaFetcher(`${unlockRequirements[decorationsList[blueprint][1]][1]}.png`)} alt={unlockRequirements[decorationsList[blueprint][1]][0]} />
                            <p>{unlockRequirements[decorationsList[blueprint][1]][0]}</p>
                        </>
                    )}
                </div>
                <div className='decoration-theme'>
                    <h2>Region theme</h2>
                    {blueprint !== null && (
                        <>
                            <img src={mediaFetcher(`world/${decorationsList[blueprint][3]}.png`)} alt={decorationsList[blueprint][0]} />
                            <p>{regionInfos[decorationsList[blueprint][3]][0]}</p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

DecorationsPage.propTypes = {
    recipeListAdder: PropTypes.func.isRequired,
    blueprint: PropTypes.string
};

const RecipeMenu = ({ recipeList, resetList }) => {
    const [recipeMenuToggle, setRecipeMenuToggle] = useState(false);
    return (
        <div className={`pin-button ${recipeMenuToggle ? ' opened' : ''}`}>
            <img src={shopImg} alt='Shop icon' onClick={() => setRecipeMenuToggle(!recipeMenuToggle)} />
            <div className='pin-header'>
                <img src={shopImg} alt='Shop icon' />
                <h1>Recipes Ingredients List</h1>
                <img src={trashImg} alt='Clear the list' onClick={() => resetList()} />
                <img src={crossImg} alt='Close' onClick={() => setRecipeMenuToggle(!recipeMenuToggle)} />
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
    )
};

RecipeMenu.propTypes = {
    recipeList: PropTypes.object.isRequired,
    resetList: PropTypes.func.isRequired
};

export const Blueprints = () => {
    const { tab: tabName, blueprint: blueprintName, tier: tierName } = useParams();
    const tab = tabName || 'upgrades';
    const blueprint = blueprintName || null;
    const tier = tierName || null;

    const [recipeList, setRecipeList] = useState({});
    const resetList = () => setRecipeList({});
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
        switch (tab) {
            case 'upgrades':
                return <UpgradesPage recipeListAdder={addToRecipeList} blueprint={blueprint} tier={tier} />;
            case 'utilities':
                return <UtilitiesPage recipeListAdder={addToRecipeList} blueprint={blueprint} />;
            case 'warp':
                return <WarpPage recipeListAdder={addToRecipeList} blueprint={blueprint} />;
            case 'decorations':
                return <DecorationsPage recipeListAdder={addToRecipeList} blueprint={blueprint} />;
            default:
                return <></>;
        }
    };

    return (
        <>
            <div>
                <div className='blueprints-category'>
                    <NavLink to='/blueprints/upgrades' className={'blueprints-tab' + (tab === 'upgrades' ? ' selected' : '')}>
                        <img src={upgradeImg} alt="Upgrade Icon" />
                        <h1>Upgrades</h1>
                    </NavLink>
                    <NavLink to='/blueprints/utilities' className={'blueprints-tab' + (tab === 'utilities' ? ' selected' : '')}>
                        <img src={utilitiesImg} alt="Utilities" />
                        <h1>Utilities</h1>
                    </NavLink>
                    <NavLink to='/blueprints/warp' className={'blueprints-tab' + (tab === 'warp' ? ' selected' : '')}>
                        <img src={warpImg} alt="Warp Tech" />
                        <h1>Warp Tech</h1>
                    </NavLink>
                    <NavLink to='/blueprints/decorations' className={'blueprints-tab' + (tab === 'decorations' ? ' selected' : '')}>
                        <img src={decorationsImg} alt="Decorations" />
                        <h1>Decorations</h1>
                    </NavLink>
                </div>
                {renderPage()}
            </div>
            <RecipeMenu recipeList={recipeList} resetList={resetList} />
        </>
    );
};