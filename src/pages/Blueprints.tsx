import { useEffect, useState } from 'react';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import { Down } from '../components/Down';
import { Minus } from '../components/Minus';
import { Plus } from '../components/Plus';
import { mediaFetcher } from '../media-manager';
import { NavButton } from '../components/NavButton';
import { Tab } from '../components/Tab';
import { RecipeProvider, useRecipeContext } from '../components/RecipeContext';
import {
    decorationsDescription, decorationsList, decorationsNames, recipeElements, themeList, unlockRequirements,
    upgradeDescriptions, upgradeEffects, upgradeNames, upgradePacks, upgradesList, utilitiesDescription,
    utilitiesList, utilitiesNames, warpDescriptions, warpGadgets, warpNames
} from '../text/blueprints';
import useMediaQuery from '../useMediaQueries';
import React from 'react';
import upgradeImg from '/src/assets/misc/upgrade.png';
import utilitiesImg from '/src/assets/misc/utilities.png';
import warpImg from '/src/assets/misc/warp.png';
import decorationsImg from '/src/assets/misc/decorations.png';
import shopImg from '/src/assets/misc/shop.png';
import trashImg from '/src/assets/misc/trash.png';
import blueprintImg from '/src/assets/misc/blueprint.png';
import '../css/Blueprints.css';
import MemoXmark from '../components/Xmark';

enum BlueprintType {
    UPGRADES = 'upgrades',
    UTILITIES = 'utilities',
    WARP = 'warp',
    DECORATIONS = 'decorations'
}

const blueprintMatcher = (blueprint: string, type: BlueprintType) => {
    switch (type) {
        case BlueprintType.UPGRADES:
            return upgradesList[blueprint];
        case BlueprintType.UTILITIES:
            return utilitiesList[blueprint];
        case BlueprintType.WARP:
            return warpGadgets[blueprint];
        case BlueprintType.DECORATIONS:
            return decorationsList[blueprint];
    }
}

const descriptionMatcher = (blueprint: string, type: BlueprintType) => {
    switch (type) {
        case BlueprintType.UPGRADES:
            return upgradeDescriptions[blueprint];
        case BlueprintType.UTILITIES:
            return utilitiesDescription[blueprint];
        case BlueprintType.WARP:
            return warpDescriptions[blueprint];
        case BlueprintType.DECORATIONS:
            return decorationsDescription[blueprint];
    }
}

const CraftingList: React.FC<{ name: string; type: BlueprintType }> = ({ name, type }) => {
    const { addToRecipeList } = useRecipeContext();
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        setQuantity(1);
    }, [name]);
    const increaseQuantity = () => setQuantity(prevQtty => prevQtty + (prevQtty < 99 ? 1 : 0));
    const decreaseQuantity = () => setQuantity(prevQtty => prevQtty - (prevQtty > 1 ? 1 : 0));
    const recipe = blueprintMatcher(name, type)[2];

    return (
        <div className='recipe-list'>
            <div className='quantity-selector'>
                <Down onClick={() => decreaseQuantity()} />
                <div></div>
                <h2 onClick={() => addToRecipeList(name, type, quantity)}>{quantity}</h2>
                <Plus onClick={() => addToRecipeList(name, type, quantity)} />
                <div></div>
                <Down onClick={() => increaseQuantity()} />
            </div>
            {Object.keys(recipe).map((ingredient) => (
                <div key={ingredient}>
                    <img
                        src={mediaFetcher(`${recipeElements[ingredient][1]}.png`)}
                        alt={recipeElements[ingredient][0]}
                        title={recipeElements[ingredient][0]}
                    />
                    <p>{recipeElements[ingredient][0]}: </p>
                    <h3>{recipe[ingredient] * quantity}</h3>
                </div>
            ))}
        </div>
    );
};

const BlueprintInfos: React.FC<{ blueprint: string | null, type: BlueprintType }> = ({
    blueprint,
    type
}) => {
    if (blueprint === null)
        return (
            <div className='blueprint-infos'>
                <div className='blueprint-title-box'>
                    <img src={blueprintImg} alt='No Blueprint' />
                    <h1>Select a blueprint</h1>
                    <h2>Select an upgrade to view its details</h2>
                </div>
                <div className='blueprint-requirements-box little-box'>
                    <img />
                    <div>
                        <h3>Requirements</h3>
                        <h4></h4>
                    </div>
                </div>
                <div className='blueprint-recipe-box'>
                    <h2>Recipe</h2>
                </div>
            </div>
        );
    const folder = type === BlueprintType.DECORATIONS ? 'deco' : 'gadgets';
    const blueprintInfos = blueprintMatcher(blueprint, type);
    const blueprintDescription = descriptionMatcher(blueprint, type);
    return (
        <div className='blueprint-infos'>
            <div className='blueprint-title-box'>
                <img src={mediaFetcher(`${folder}/${blueprint}.png`)} alt={blueprintDescription} />
                <h1>{blueprintInfos[0]}</h1>
                <h2>{blueprintDescription}</h2>
            </div>
            <div className='blueprint-requirements-box little-box'>
                <img src={mediaFetcher(`${unlockRequirements[blueprintInfos[1]][1]}.png`)} alt={unlockRequirements[blueprintInfos[1]][0]} />
                <div>
                    <h3>Requirements</h3>
                    <h4>{unlockRequirements[blueprintInfos[1]][0]}</h4>
                </div>
            </div>
            <div className='blueprint-recipe-box'>
                <h2>Recipe</h2>
                <CraftingList name={blueprint} type={type} />
            </div>
        </div>
    );
}

interface UpgradeItemListProps {
    selected: boolean;
    upgradePack: [string, string, number];
    tier: number;
}

const UpgradeItemList: React.FC<UpgradeItemListProps> = ({
    selected = false,
    upgradePack,
    tier: selectedTier = 1
}) => {
    const [tier, setTier] = useState(selectedTier);

    return (
        <div
            className={'vac-upgrade-item' + (selected ? ' selected' : '')}
            key={upgradePack[0]}
        >
            <NavLink
                to={`/blueprints/upgrades/${upgradePack[0]}/${tier}`}
                className='vac-upgrade-pack'
            >

                <img src={mediaFetcher(`upgrades/${upgradePack[0]}.png`)} alt={upgradePack[1]} />
                <h2>{upgradePack[1]}</h2>
            </NavLink>
            <div className='vac-upgrade-tiers'>
                {tier > 1 && upgradePack[2] >= 1 ? (
                    <NavLink to={`/blueprints/upgrades/${upgradePack[0]}/${tier - 1}`}>
                        <div className='arrow-left' onClick={() => setTier(tier - 1)}>
                            <Down />
                        </div>
                    </NavLink>
                ) : (
                    <div className='arrow-left disabled'>
                        <Down />
                    </div>
                )}
                <h2>{tier}</h2>
                {tier < upgradePack[2] && upgradePack[2] >= 1 ? (
                    <NavLink to={`/blueprints/upgrades/${upgradePack[0]}/${tier + 1}`}>
                        <div className='arrow-right' onClick={() => setTier(tier + 1)}>
                            <Down />
                        </div>
                    </NavLink>
                ) : (
                    <div className='arrow-right disabled'>
                        <Down />
                    </div>
                )}
            </div>
        </div>
    );

};

const UpgradesPage: React.FC = () => {
    const { blueprint: upgradeName, tier: selectedTier } = useParams();
    const tier = selectedTier ? parseInt(selectedTier, 10) : 1;
    const upgrade = upgradeName || null;
    if (upgrade !== null) {
        if (!upgradeNames.includes(upgrade))
            return (<Navigate to='/blueprints/upgrades' />);
        else if (tier < 1 || tier > upgradePacks[upgrade][1])
            return (<Navigate to={`/blueprints/upgrades/${upgrade}`} />);
    }
    return (
        <>
            <div className='vac-upgrade-list'>
                {upgradeNames.map((upgradeName) => (
                    <UpgradeItemList
                        selected={upgrade === upgradeName}
                        key={upgradeName}
                        upgradePack={[upgradeName, upgradePacks[upgradeName][0], upgradePacks[upgradeName][1]]}
                        tier={tier}
                    />
                ))}
            </div >
            <div className='vac-upgrade-info'>
                <div className='blueprint-title-box'>
                    <img src={upgrade === null ? upgradeImg : mediaFetcher(`upgrades/${upgrade}.png`)} alt={upgrade === null ? '' : upgradesList[upgrade + tier][0]} />
                    <h1>{upgrade === null ? 'Select an upgrade' : upgradesList[upgrade + tier][0]}</h1>
                    <h2>{upgrade === null ? 'Select an upgrade to view its details' : upgradeDescriptions[upgrade + tier]}</h2>
                </div>
                <div className='blueprint-recipe-box'>
                    <h2>Recipe</h2>
                    {(upgrade !== null && tier !== null) && <CraftingList name={upgrade + tier} type={BlueprintType.UPGRADES} />}
                </div>
                <div className='vac-upgrade-effect-box'>
                    <img src={upgrade === null ? '' : mediaFetcher(`${upgradeEffects[upgrade + tier][0][0]}.png`)} alt={upgrade === null ? '' : upgradesList[upgrade + tier][0]} />
                    <p className='vac-effect-desc'>{upgrade === null ? '' : upgradeEffects[upgrade + tier][0][1]}</p>
                    <Down />
                    <img src={upgrade === null ? '' : mediaFetcher(`${upgradeEffects[upgrade + tier][1][0]}.png`)} alt={upgrade === null ? '' : upgradesList[upgrade + tier][0]} />
                    <p className='vac-effect-desc'>{upgrade === null ? '' : upgradeEffects[upgrade + tier][1][1]}</p>
                </div>
                <div className='blueprint-requirements-box little-box'>
                    {(upgrade === null) ? '' : (<>
                        <img src={mediaFetcher(`${unlockRequirements[upgradesList[upgrade + tier][1]][1]}.png`)} alt={upgrade === null ? '' : unlockRequirements[upgradesList[upgrade + tier][1]][0]} />
                        <div>
                            <h3>Requirements</h3>
                            <h4>{upgrade === null ? '' : unlockRequirements[upgradesList[upgrade + tier][1]][0]}</h4>
                        </div>
                    </>)}
                </div>
            </div>
        </>
    );
};

const UtilitiesPage: React.FC = () => {
    const isLargeScreen = useMediaQuery('(min-width: 2000px)');
    const { blueprint: blueprintName } = useParams();
    const blueprint = blueprintName || null;
    return (
        <>
            <div className='blueprint-list'>
                {utilitiesNames.map((utilitiesNames) => (
                    <NavLink key={utilitiesNames} to={`/blueprints/utilities/${utilitiesNames}`} className='blueprint-item'>
                        <NavButton key={utilitiesNames} name={utilitiesList[utilitiesNames][0]} icon={`gadgets/${utilitiesNames}`} tilting='none' size={isLargeScreen ? 125 : 100} />
                    </NavLink>
                ))}
            </div>
            <BlueprintInfos blueprint={blueprint} type={BlueprintType.UTILITIES} />
        </>
    )
};

const WarpPage: React.FC = () => {
    const isLargeScreen = useMediaQuery('(min-width: 2000px)');
    const { blueprint: warpName } = useParams();
    const blueprint = warpName || null;
    return (
        <>
            <div className='blueprint-list'>
                {warpNames.map((warpName) => (
                    <NavLink key={warpName} to={`/blueprints/warp/${warpName}`} className='blueprint-item'>
                        <NavButton key={warpName} name={warpGadgets[warpName][0]} icon={`gadgets/${warpName}`} tilting='none' size={isLargeScreen ? 125 : 100} />
                    </NavLink>
                ))}
            </div>
            <BlueprintInfos blueprint={blueprint} type={BlueprintType.WARP} />
        </>
    );
};

const DecorationsPage: React.FC = () => {
    const isLargeScreen = useMediaQuery('(min-width: 2000px)');
    const { blueprint: blueprintName } = useParams();
    const blueprint = blueprintName || null
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
                <div className='blueprint-list'>
                    {(decoFilter === null ? decorationsNames : decorationsNames.filter((deco) => decorationsList[deco][3] === decoFilter)).map((decoName) => (
                        <NavLink key={decoName} to={`/blueprints/decorations/${decoName}`} className='blueprint-item'>
                            <NavButton name={decorationsList[decoName][0]} icon={`deco/${decoName}`} tilting='none' selected={decoName === blueprint} size={isLargeScreen ? 125 : 100} />
                        </NavLink>
                    ))}
                </div>
            </div>
            <BlueprintInfos blueprint={blueprint} type={BlueprintType.DECORATIONS} />
        </>
    );
};

const RecipeMenu: React.FC = () => {
    const { recipeList, resetList, craftList, decreaseBlueprint, craftRecipeMatcher, addToRecipeList, resetBlueprint } = useRecipeContext();
    const [recipeMenuToggle, setRecipeMenuToggle] = useState(false);
    return (
        <div className={`pin-button ${recipeMenuToggle ? ' opened' : ''}`}>
            <img src={shopImg} alt='Shop icon' onClick={() => setRecipeMenuToggle(!recipeMenuToggle)} />
            <div className='pin-header'>
                <img src={shopImg} alt='Shop icon' />
                <h1>Recipes Ingredients List</h1>
                <img src={trashImg} alt='Clear the list' onClick={() => resetList()} />
                <MemoXmark onClick={() => setRecipeMenuToggle(!recipeMenuToggle)} />
            </div>
            <div>
                <div className='pin-list-header'>
                    <h1>Blueprints</h1>
                </div>
                <div className='pin-list'>
                    {(Object.keys(craftList).length === 0) ?
                        (<div className='craft-list-empty'>
                            <h1>No blueprint selected</h1>
                        </div>) :
                        Object.keys(recipeList.current).map((blueprint) => {
                            const type = recipeList.current[blueprint][0];
                            const name = craftRecipeMatcher(blueprint, type)[0];
                            return (
                                <div
                                    className='pin-element pin-blueprint-element'
                                    key={blueprint}
                                >
                                    <img src={mediaFetcher(type === BlueprintType.UPGRADES ? ('upgrades/' + blueprint.replace(/[^a-zA-Z]/g, '') + '.png') : `${type === BlueprintType.DECORATIONS ? 'deco' : 'gadgets'}/${blueprint}.png`)} />
                                    <p>{name}: </p>
                                    <Plus onClick={() => addToRecipeList(blueprint, BlueprintType.DECORATIONS, 1)} />
                                    <h3>{recipeList.current[blueprint][1]}</h3>
                                    <Minus onClick={() => decreaseBlueprint(blueprint, BlueprintType.DECORATIONS, 1)} />
                                    <img onClick={()=> resetBlueprint(blueprint)} src={trashImg} alt='Clear the blueprint' className='clear-item-img' />
                                </div>
                            )
                        })}
                </div>
                <div className='pin-list-header'>
                    <h1>Resources</h1>
                </div>
                <div className='pin-list'>
                    {(Object.keys(craftList).length === 0) ?
                        (<div className='craft-list-empty'>
                            <h1>No resources needed</h1>
                        </div>) :
                        Object.keys(craftList).map((item) => (
                            <div
                                key={item}
                                className='pin-element pin-item-element'
                            >
                                <img
                                    src={mediaFetcher(`${recipeElements[item][1]}.png`)}
                                    alt={recipeElements[item][0]}
                                    title={recipeElements[item][0]}
                                />
                                <p>{recipeElements[item][0]}: </p>
                                <h3>{craftList[item]}</h3>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export const Blueprints: React.FC = () => {
    const { tab: tabName } = useParams();
    const tab = tabName || 'upgrades';

    const renderPage = () => {
        switch (tab) {
            case 'upgrades':
                return <UpgradesPage />;
            case 'utilities':
                return <UtilitiesPage />;
            case 'warp':
                return <WarpPage />;
            case 'decorations':
                return <DecorationsPage />;
            default:
                return <></>;
        }
    };

    return (
        <RecipeProvider>
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
                        <h1>Decoration</h1>
                    </NavLink>
                </div>
                {renderPage()}
            </div>
            <RecipeMenu />
        </RecipeProvider>
    );
};

export default Blueprints;