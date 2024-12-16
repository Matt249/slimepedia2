import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Down } from '../components/Down';
import { mediaFetcher } from '../media-manager';
import { NavButton } from '../components/NavButton';
import { Tab } from '../components/Tab';
import {
    decorationsDescription, decorationsList, decorationsNames, recipeElements, themeList, unlockRequirements,
    upgradeDescriptions, upgradeEffects, upgradeNames, upgradePacks, upgradesList, utilitiesDescription,
    utilitiesList, utilitiesNames, warpDescriptions, warpGadgets, warpNames
} from '../text/blueprints';
import React from 'react';
import upgradeImg from '/src/assets/misc/upgrade.png';
import utilitiesImg from '/src/assets/misc/utilities.png';
import warpImg from '/src/assets/misc/warp.png';
import decorationsImg from '/src/assets/misc/decorations.png';
import shopImg from '/src/assets/misc/shop.png';
import crossImg from '/src/assets/misc/cross.png';
import trashImg from '/src/assets/misc/trash.png';
import blueprintImg from '/src/assets/misc/blueprint.png';
import '../css/Blueprints.css';

interface ConstructionListProps {
    recipe: Record<string, number>;
    recipeListAdder: (recipe: Record<string, number>) => void;
    hideQtty?: boolean;
}

const ConstructionList: React.FC<ConstructionListProps> = ({ recipe: pattern, recipeListAdder, hideQtty = false }) => {
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => setQuantity(prevQtty => prevQtty + (prevQtty < 99 ? 1 : 0));
    const decreaseQuantity = () => setQuantity(prevQtty => prevQtty - (prevQtty > 1 ? 1 : 0));
    const [recipe, setRecipe] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const newRecipe: { [kay: string]: number } = {};
        for (const element in pattern)
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
                        <div key={ingredient}>{console.log(ingredient)}
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

interface UpgradeItemListProps {
    selected: boolean;
    upgradePack: [string, string, number];
    selectedCallback: (upgrade: string, tier: number) => void;
}

const UpgradeItemList: React.FC<UpgradeItemListProps> = ({
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
            className={'vac-upgrade-item' + (selected ? ' selected' : '')}
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

interface UpgradesPageProps {
    recipeListAdder: (recipe: Record<string, number>) => void;
    blueprint: string | null;
    tier?: number;
}

const UpgradesPage: React.FC<UpgradesPageProps> = ({ recipeListAdder, blueprint, tier = 1}) => {
    const [selectedUpgrade, setSelectedUpgrade] = useState<string | null>(blueprint || null);
    const [selectedTier, setSelectedTier] = useState<number>(tier);
    const upgradeSelection = (upgrade: string, tier: number) => {
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
                        selected={selectedUpgrade === upgradeName && selectedTier === upgradePacks[upgradeName][1]}
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

interface UtilitiesPageProps {
    recipeListAdder: (recipe: Record<string, number>) => void;
    blueprint: string | null;
}

const UtilitiesPage: React.FC<UtilitiesPageProps> = ({ recipeListAdder, blueprint = 'medstation' }) => {
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
                <div className='vac-upgrade-title-box'>
                    <img src={blueprint === null ? blueprintImg : mediaFetcher(`gadgets/${blueprint}.png`)} alt={blueprint === null ? 'No Blueprint' : utilitiesList[blueprint][0]} />
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

interface WarpPageProps {
    recipeListAdder: (recipe: Record<string, number>) => void;
    blueprint: string | null;
}

const WarpPage: React.FC<WarpPageProps> = ({ recipeListAdder, blueprint = 'snowyteleporter' }) => {
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

interface DecorationsPageProps {
    recipeListAdder: (recipe: Record<string, number>) => void;
    blueprint: string | null;
}

const DecorationsPage: React.FC<DecorationsPageProps> = ({ recipeListAdder, blueprint = 'emeraldcypress' }) => {
    const lastOption = Object.keys(themeList)[Object.keys(themeList).length - 1];
    const [decoFilter, setDecoFilter] = useState<string | null>(null);
    return (
        <>
            <div className='decoration-list'>
                <div className='decoration-tabs'>
                    <Tab title='Any' icon='misc/decorations' action={() => setDecoFilter(null)} selected={decoFilter === null} />
                    {Object.keys(themeList).map((theme) => (
                        <Tab key={theme} title={themeList[theme][0]} icon={themeList[theme][1]} action={() => setDecoFilter(theme)} selected={theme === decoFilter} />
                    ))}
                </div>
                <div className='blueprint-list' style={{ borderRadius: `${decoFilter === null ? '0' : '20px'} ${decoFilter === lastOption ? '0' : '20px'} 20px 20px` }}>
                    {(decoFilter === null ? decorationsNames : decorationsNames.filter((deco) => decorationsList[deco][3] === decoFilter)).map((decoName) => (
                        <NavLink key={decoName} to={`/blueprints/decorations/${decoName}`} className='warp-item'>
                            <NavButton key={decoName} name={decorationsList[decoName][0]} icon={`deco/${decoName}`} tilting='none' selected={decoName === blueprint} />
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className='blueprint-infos decoration'>
                <div className='vac-upgrade-title-box'>
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
                    <h2>Theme</h2>
                    {blueprint !== null && (
                        <>
                            <img src={mediaFetcher(`${themeList[decorationsList[blueprint][3]][1]}.png`)} alt={decorationsList[blueprint][0]} />
                            <p>{themeList[decorationsList[blueprint][3]][0]}</p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

interface RecipeMenuProps {
    recipeList: Record<string, number>;
    resetList: () => void;
}

const RecipeMenu: React.FC<RecipeMenuProps> = ({ recipeList, resetList }) => {
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

export const Blueprints = () => {
    const { tab: tabName, blueprint: blueprintName, tier: tierName } = useParams();
    const tab = tabName || 'upgrades';
    const blueprint = blueprintName || null;
    const tier = tierName ? parseInt(tierName, 10) : null;

    const [recipeList, setRecipeList] = useState({});
    const resetList = () => setRecipeList({});
    const addToRecipeList = (items: { [key: string]: number }) => {
        setRecipeList(prevList => {
            const newList: { [key: string]: number } = { ...prevList };
            for (const item in items) {
                if (newList[item] === undefined)
                    newList[item] = items[item];
                else
                    newList[item] += items[item];
            }
            return newList;
        });
    };

    const renderPage = () => {
/*         if (blueprint === null)
            return <></>;
 */        switch (tab) {
            case 'upgrades':
                return <UpgradesPage recipeListAdder={addToRecipeList} blueprint={blueprint} tier={tier || 1} />;
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

export default Blueprints;