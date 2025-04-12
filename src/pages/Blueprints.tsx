import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import { Down } from '../components/Down';
import { Minus } from '../components/Minus';
import { Plus } from '../components/Plus';
import { NavButton } from '../components/NavButton';
import { RecipeProvider, useRecipeContext } from '../components/RecipeContext';
import {
    decorationsDescription, decorationsList, decorationsNames, recipeElements, themeList, unlockRequirements,
    upgradeDescriptions, upgradeEffects, upgradeNames, upgradePacks, upgradesList, utilitiesDescription,
    utilitiesList, utilitiesNames, warpDescriptions, warpGadgets, warpNames
} from '../text/blueprints';
import '../css/Blueprints.css';
import MemoXmark from '../components/Xmark';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

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
        <OverlayScrollbarsComponent
            options={{
                scrollbars: {
                    autoHide: "move",
                    autoHideDelay: 500,
                },
                overflow: {
                    x: 'hidden',
                    y: 'scroll',
                }
            }}
            defer
            className='recipe-list'
        >
            <div className='quantity-selector'>
                <Down onClick={() => decreaseQuantity()} />
                <div></div>
                <button onClick={() => addToRecipeList(name, type, quantity)}>
                    <h2>{quantity}</h2>
                    <Plus />
                </button>
                <div></div>
                <Down onClick={() => increaseQuantity()} />
            </div>
            {Object.keys(recipe).map((ingredient) => (
                <div key={ingredient}>
                    <img
                        src={`/assets/${recipeElements[ingredient][1]}.png`}
                        alt={recipeElements[ingredient][0]}
                        title={recipeElements[ingredient][0]}
                    />
                    <p>{recipeElements[ingredient][0]}: </p>
                    <h3>{recipe[ingredient] * quantity}</h3>
                </div>
            ))}
        </OverlayScrollbarsComponent>
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
                    <img src='/assets/misc/blueprint.png' alt='No Blueprint' />
                    <h1>Select a blueprint</h1>
                    <h2>Select an upgrade to view its details</h2>
                </div>
                <div className='blueprint-requirements-box little-box'>
                    <div>
                        <h3>Requirements</h3>
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
                <img src={`/assets/${folder}/${blueprint}.png`} alt={blueprintDescription} />
                <h1>{blueprintInfos[0]}</h1>
                <h2>{blueprintDescription}</h2>
            </div>
            <div className='blueprint-requirements-box little-box'>
                <img src={`/assets/${unlockRequirements[blueprintInfos[1]][1]}.png`} alt={unlockRequirements[blueprintInfos[1]][0]} />
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
            className={`vac-upgrade-item${(selected ? ' selected' : '')}`}
            key={upgradePack[0]}
        >
            <NavLink
                to={`/blueprints/upgrades/${upgradePack[0]}/${tier}`}
                className='vac-upgrade-pack'
            >

                <img src={`/assets/upgrades/${upgradePack[0]}.png`} alt={upgradePack[1]} />
                <h2>{upgradePack[1]}</h2>
            </NavLink>
            <div className='vac-upgrade-tiers'>
                {tier > 1 && upgradePack[2] >= 1 ? (
                    <NavLink to={`/blueprints/upgrades/${upgradePack[0]}/${tier - 1}`} onClick={() => setTier(tier - 1)}>
                        <div className='arrow-left'>
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
                    <NavLink to={`/blueprints/upgrades/${upgradePack[0]}/${tier + 1}`} onClick={() => setTier(tier + 1)}>
                        <div className='arrow-right'>
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
    const upgrade = upgradeName ?? null;

    const validateUpgrade = () => {
        if (upgrade !== null) {
            if (!upgradeNames.includes(upgrade)) return <Navigate to='/blueprints/upgrades' />;
            if (tier < 1 || tier > upgradePacks[upgrade][1]) return <Navigate to={`/blueprints/upgrades/${upgrade}`} />;
        }
        return null;
    };

    const renderUpgradeList = () => (
        <OverlayScrollbarsComponent
            options={{
                scrollbars: {
                    autoHide: "move",
                    autoHideDelay: 500,
                },
            }}
            defer
            className='vac-upgrade-list'>
            {upgradeNames.map((upgradeName) => (
                <UpgradeItemList
                    selected={upgrade === upgradeName}
                    key={upgradeName}
                    upgradePack={[upgradeName, upgradePacks[upgradeName][0], upgradePacks[upgradeName][1]]}
                    tier={tier}
                />
            ))}
        </OverlayScrollbarsComponent>
    );

    const renderUpgradeInfo = () => (
        <div className='vac-upgrade-info'>
            <UpgradeTitleBox upgrade={upgrade} tier={tier} />
            <UpgradeRecipeBox upgrade={upgrade} tier={tier} />
            <UpgradeEffectBox upgrade={upgrade} tier={tier} />
            <UpgradeRequirementsBox upgrade={upgrade} tier={tier} />
        </div>
    );

    document.title = upgrade === null ? 'Blueprints - Slimepedia' : upgradesList[upgrade + tier][0] + ' - Slimepedia';

    return (
        <>
            {validateUpgrade()}
            {renderUpgradeList()}
            {renderUpgradeInfo()}
        </>
    );
};

const UpgradeTitleBox: React.FC<{ upgrade: string | null; tier: number }> = ({ upgrade, tier }) => (
    <div className='blueprint-title-box'>
        <img src={upgrade === null ? '/assets/misc/upgrade.png' : `/assets/upgrades/${upgrade}.png`} alt={upgrade === null ? '' : upgradesList[upgrade + tier][0]} />
        <h1>{upgrade === null ? 'Select an upgrade' : upgradesList[upgrade + tier][0]}</h1>
        <h2>{upgrade === null ? 'Select an upgrade to view its details' : upgradeDescriptions[upgrade + tier]}</h2>
    </div>
);

const UpgradeRecipeBox: React.FC<{ upgrade: string | null; tier: number }> = ({ upgrade, tier }) => (
    <div className='blueprint-recipe-box'>
        <h2>Recipe</h2>
        {(upgrade !== null && tier !== null) && <CraftingList name={upgrade + tier} type={BlueprintType.UPGRADES} />}
    </div>
);

const UpgradeEffectBox: React.FC<{ upgrade: string | null; tier: number }> = ({ upgrade, tier }) => (
    <div className='vac-upgrade-effect-box'>
        <img src={upgrade === null ? '' : `/assets/${upgradeEffects[upgrade + tier][0][0]}.png`} alt={upgrade === null ? '' : upgradesList[upgrade + tier][0]} />
        <p className='vac-effect-desc'>{upgrade === null ? '' : upgradeEffects[upgrade + tier][0][1]}</p>
        <Down />
        <img src={upgrade === null ? '' : `/assets/${upgradeEffects[upgrade + tier][1][0]}.png`} alt={upgrade === null ? '' : upgradesList[upgrade + tier][0]} />
        <p className='vac-effect-desc'>{upgrade === null ? '' : upgradeEffects[upgrade + tier][1][1]}</p>
    </div>
);

const UpgradeRequirementsBox: React.FC<{ upgrade: string | null; tier: number }> = ({ upgrade, tier }) => (
    <div className='blueprint-requirements-box little-box'>
        {(upgrade === null) ? '' : (
            <>
                <img src={`/assets/${unlockRequirements[upgradesList[upgrade + tier][1]][1]}.png`} alt={upgrade === null ? '' : unlockRequirements[upgradesList[upgrade + tier][1]][0]} />
                <div>
                    <h3>Requirements</h3>
                    <h4>{upgrade === null ? '' : unlockRequirements[upgradesList[upgrade + tier][1]][0]}</h4>
                </div>
            </>
        )}
    </div>
);

const UtilitiesPage: React.FC = () => {
    const { blueprint: blueprintName } = useParams();
    const blueprint = blueprintName ?? null;

    document.title = blueprint === null ? 'Blueprints - Slimepedia' : utilitiesList[blueprint][0] + ' - Slimepedia';

    return (
        <>
            <OverlayScrollbarsComponent
                options={{
                    scrollbars: {
                        autoHide: "move",
                        autoHideDelay: 500,
                    },
                }}
                defer
                className='blueprint-list'
            >
                {utilitiesNames.map((utilitiesNames) => (
                    <NavLink key={utilitiesNames} to={`/blueprints/utilities/${utilitiesNames}`} className='blueprint-item'>
                        <NavButton key={utilitiesNames} name={utilitiesList[utilitiesNames][0]} icon={`gadgets/${utilitiesNames}`} tilting='none' size={1.25} />
                    </NavLink>
                ))}
            </OverlayScrollbarsComponent>
            <BlueprintInfos blueprint={blueprint} type={BlueprintType.UTILITIES} />
        </>
    )
};

const WarpPage: React.FC = () => {
    const { blueprint: warpName } = useParams();
    const blueprint = warpName ?? null;

    document.title = blueprint === null ? 'Blueprints - Slimepedia' : warpGadgets[blueprint][0] + ' - Slimepedia';

    return (
        <>
            <OverlayScrollbarsComponent
                options={{
                    scrollbars: {
                        autoHide: "move",
                        autoHideDelay: 500,
                    },
                }}
                defer
                className='blueprint-list'
            >
                {warpNames.map((warpName) => (
                    <NavLink key={warpName} to={`/blueprints/warp/${warpName}`} className='blueprint-item'>
                        <NavButton key={warpName} name={warpGadgets[warpName][0]} icon={`gadgets/${warpName}`} tilting='none' size={1.25} />
                    </NavLink>
                ))}
            </OverlayScrollbarsComponent>
            <BlueprintInfos blueprint={blueprint} type={BlueprintType.WARP} />
        </>
    );
};

const DecorationsPage: React.FC = () => {
    const { blueprint: blueprintName } = useParams();
    const blueprint = blueprintName ?? null
    const [decoFilter, setDecoFilter] = useState<string>('any');

    document.title = blueprint === null ? 'Blueprints - Slimepedia' : decorationsList[blueprint][0] + ' - Slimepedia';

    return (
        <>
            <div className='decoration-list'>
                <div className='decoration-tabs'>
                    {Object.keys(themeList).map((theme) => (
                        <button key={theme} className={`decoration-tab${decoFilter === theme ? ' selected' : ''}`} onClick={() => setDecoFilter(theme)} title={themeList[theme][0]}>
                            <img src={`/assets/${themeList[theme][1]}.png`} alt="Any Decoration" />
                        </button>
                    ))}
                </div>
                <div className='decoration-filter-name'><h1>Filter : {themeList[decoFilter][0]}</h1></div>
                <OverlayScrollbarsComponent
                    options={{
                        scrollbars: {
                            autoHide: "move",
                            autoHideDelay: 500,
                        },
                    }}
                    defer
                    className='blueprint-list decoration'>
                    {(decoFilter === 'any' ? decorationsNames : decorationsNames.filter((deco) => decorationsList[deco][3] === decoFilter)).map((decoName) => (
                        <NavLink key={decoName} to={`/blueprints/decorations/${decoName}`} className='blueprint-item'>
                            <NavButton name={decorationsList[decoName][0]} icon={`deco/${decoName}`} tilting='none' selected={decoName === blueprint} size={1.25} />
                        </NavLink>
                    ))}
                </OverlayScrollbarsComponent>
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
            <button onClick={() => setRecipeMenuToggle(!recipeMenuToggle)}>
                <img src='/assets/misc/shop.png' alt='Shop icon' />
            </button>
            <div className='pin-header'>
                <img src='/assets/misc/shop.png' alt='Shop icon' />
                <h1>Recipes Ingredients List</h1>
                <button onClick={() => resetList()}>
                    <img src='/assets/misc/trash.png' alt='Clear the list' />
                </button>
                <MemoXmark onClick={() => setRecipeMenuToggle(!recipeMenuToggle)} />
            </div>
            <OverlayScrollbarsComponent
                options={{
                    scrollbars: {
                        autoHide: "move",
                        autoHideDelay: 500,
                    },
                    overflow: {
                        x: 'hidden',
                        y: 'scroll',
                    }
                }}
                defer
            >
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
                            const currentType = type === BlueprintType.DECORATIONS ? 'deco' : 'gadgets'
                            return (
                                <div
                                    className='pin-element pin-blueprint-element'
                                    key={blueprint}
                                >
                                    <img src={type === BlueprintType.UPGRADES ? ('/assets/upgrades/' + blueprint.replace(/[^a-zA-Z]/g, '') + '.png') : `/assets/${currentType}/${blueprint}.png`} alt='Icon of blueprint' />
                                    <p>{name}: </p>
                                    <Plus onClick={() => addToRecipeList(blueprint, BlueprintType.DECORATIONS, 1)} />
                                    <h3>{recipeList.current[blueprint][1]}</h3>
                                    <Minus onClick={() => decreaseBlueprint(blueprint, BlueprintType.DECORATIONS, 1)} />
                                    <button onClick={() => resetBlueprint(blueprint)}>
                                        <img src='/assets/misc/trash.png' alt='Clear the blueprint' className='clear-item-img' />
                                    </button>
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
                                    src={`/assets/${recipeElements[item][1]}.png`}
                                    alt={recipeElements[item][0]}
                                    title={recipeElements[item][0]}
                                />
                                <p>{recipeElements[item][0]}: </p>
                                <h3>{craftList[item]}</h3>
                            </div>
                        ))}
                </div>
            </OverlayScrollbarsComponent>
        </div>
    );
};

export const Blueprints: React.FC = () => {
    const { tab: tabName } = useParams();
    const tab = tabName ?? 'upgrades';

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

    useEffect(() => {
        document.title = 'Blueprints - Slimepedia';
    }, []);

    return (
        <RecipeProvider>
            <div>
                <div className='blueprints-category'>
                    <NavLink to='/blueprints/upgrades' className={`blueprints-tab${tab === 'upgrades' ? ' selected' : ''}`}>
                        <img src='/assets/misc/upgrade.png' alt="Upgrade Icon" />
                        <h1>Upgrades</h1>
                    </NavLink>
                    <NavLink to='/blueprints/utilities' className={`blueprints-tab${tab === 'utilities' ? ' selected' : ''}`}>
                        <img src='/assets/misc/utilities.png' alt="Utilities" />
                        <h1>Utilities</h1>
                    </NavLink>
                    <NavLink to='/blueprints/warp' className={`blueprints-tab${tab === 'warp' ? ' selected' : ''}`}>
                        <img src='/assets/misc/warp.png' alt="Warp Tech" />
                        <h1>Warp Tech</h1>
                    </NavLink>
                    <NavLink to='/blueprints/decorations' className={`blueprints-tab${tab === 'decorations' ? ' selected' : ''}`}>
                        <img src='/assets/misc/decorations.png' alt="Decorations" />
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