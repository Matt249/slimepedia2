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
    recipeListAdder: (item: string, type: BlueprintType, qtty: number) => void;
    resetList: () => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipeContext = () => {
    const context = useContext(RecipeContext);
    if (!context) {
        throw new Error('useRecipeContext must be used within a RecipeProvider');
    }
    return context;
};

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const recipeList = useRef<{ [key: string]: [BlueprintType, number] }>({});
    const [craftList, setCraftList] = useState<{ [key: string]: number }>({});

    const recipeListAdder = (item: string, type: BlueprintType, qtty: number) => {
        if (recipeList.current[item] === undefined)
            recipeList.current[item] = [type, qtty];
        else
            recipeList.current[item][1] += qtty;
        updateCraftList();
    };

    const resetList = () => {
        recipeList.current = {};
        updateCraftList();
    };

    const craftRecipeMatcher = (item: string, type: BlueprintType) => {
        switch (type) {
            case BlueprintType.UPGRADES:
                return upgradesList[item][2];
            case BlueprintType.UTILITIES:
                return utilitiesList[item][2];
            case BlueprintType.WARP:
                return warpGadgets[item][2];
            case BlueprintType.DECORATIONS:
                return decorationsList[item][2];
        }
    }


    const updateCraftList = () => {
        const newCraftList: { [key: string]: number } = {};
        for (const [item, [type, qtty]] of Object.entries(recipeList.current))
            for (const [craftItem, craftQtty] of Object.entries(craftRecipeMatcher(item, type))) {
                if (newCraftList[craftItem] === undefined)
                    newCraftList[craftItem] = craftQtty * qtty;
                else
                    newCraftList[craftItem] += craftQtty * qtty;
            }
        setCraftList(newCraftList);
    };

    useEffect(() => {
        updateCraftList();
    }, [recipeList.current]);

    return (
        <RecipeContext.Provider value={{ recipeList, craftList, recipeListAdder, resetList }}>
            {children}
        </RecipeContext.Provider>
    );
};