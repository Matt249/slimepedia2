import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import { decorationsList, upgradesList, utilitiesList, warpGadgets } from '../text/blueprints';

enum BlueprintType {
    UPGRADES = 'upgrades',
    UTILITIES = 'utilities',
    WARP = 'warp',
    DECORATIONS = 'decorations'
}

interface RecipeContextType {
    recipeList: React.MutableRefObject<{ [key: string]: [BlueprintType, number] }>;
    craftList: { [key: string]: number };
    addToRecipeList: (item: string, type: BlueprintType, qtty: number) => void;
    decreaseBlueprint: (item: string, type: BlueprintType, qtty: number) => void;
    resetList: () => void;
    resetBlueprint: (item: string) => void;
    craftRecipeMatcher: (item: string, type: BlueprintType) => [string, { [key: string]: number }];
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipeContext = (): RecipeContextType => {
    const context = useContext(RecipeContext);
    if (!context) {
        throw new Error('useRecipeContext must be used within a RecipeProvider');
    }
    return context;
};

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const blueprintList = useRef<{ [key: string]: [BlueprintType, number] }>({});
    const [craftList, setCraftList] = useState<{ [key: string]: number }>({});

    const addToRecipeList = (item: string, type: BlueprintType, qtty: number) => {
        if (blueprintList.current[item] === undefined)
            blueprintList.current[item] = [type, qtty];
        else
            blueprintList.current[item][1] += qtty;
        updateCraftList();
    };

    const decreaseBlueprint = (item: string, type: BlueprintType, qtty: number) => {
        if (blueprintList.current[item] === undefined) {
            console.error('Item not found in blueprint list: ', item);
            return;
        }
        else if (blueprintList.current[item][1] <= qtty)
            delete blueprintList.current[item];
        else
            blueprintList.current[item][1] -= qtty;
        updateCraftList();
    };

    const resetBlueprint = (item: string) => {
        delete blueprintList.current[item];
        updateCraftList();
    };

    const resetList = () => {
        blueprintList.current = {};
        updateCraftList();
    };

    const craftRecipeMatcher: (item: string, type: BlueprintType) => [string, { [key: string]: number }] = (item: string, type: BlueprintType) => {
        switch (type) {
            case BlueprintType.UPGRADES:
                return [upgradesList[item][0], upgradesList[item][2]];
            case BlueprintType.UTILITIES:
                return [utilitiesList[item][0], utilitiesList[item][2]];
            case BlueprintType.WARP:
                return [warpGadgets[item][0], warpGadgets[item][2]];
            case BlueprintType.DECORATIONS:
                return [decorationsList[item][0], decorationsList[item][2]];
            default:
                throw new Error('Invalid blueprint type');
        }
    }

    const updateCraftList = () => {
        const newCraftList: { [key: string]: number } = {};
        for (const [item, [type, qtty]] of Object.entries(blueprintList.current))
            for (const [craftItem, craftQtty] of Object.entries(craftRecipeMatcher(item, type)[1])) {
                if (newCraftList[craftItem] === undefined)
                    newCraftList[craftItem] = craftQtty * qtty;
                else
                    newCraftList[craftItem] += craftQtty * qtty;
            }
        setCraftList(newCraftList);
    };

    useEffect(() => {
        updateCraftList();
    }, [blueprintList]);

    const contextValue = React.useMemo(() => ({
        recipeList: blueprintList,
        craftList,
        addToRecipeList,
        decreaseBlueprint,
        resetList,
        craftRecipeMatcher,
        resetBlueprint
    }), [craftList]);

    return (
        <RecipeContext.Provider value={contextValue}>
            {children}
        </RecipeContext.Provider>
    );
};