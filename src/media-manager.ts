import noneImg from './assets/misc/none.png';

interface FolderObject {
    [key: string]: string | undefined;
}

let folders: { [key: string]: FolderObject } = {};

export const initializeFolders = () => {
    interface FolderObject {
        [key: string]: string | undefined;
    }

    const createFolderObject = (globResult: Record<string, undefined>): FolderObject => {
        return Object.entries(globResult).reduce((acc: FolderObject, [path, module]) => {
            const fileName = (path.split('/').pop() ?? '').split('?')[0];
            acc[fileName] = module;
            return acc;
        }, {});
    };

    folders = {
        buildings: createFolderObject(import.meta.glob('/src/assets/buildings/*', { eager: true, query: '?url', import: 'default' })),
        deco: createFolderObject(import.meta.glob('/src/assets/deco/*', { eager: true, query: '?url', import: 'default' })),
        fonts: createFolderObject(import.meta.glob('/src/assets/fonts/*', { eager: true, query: '?url', import: 'default' })),
        food: createFolderObject(import.meta.glob('/src/assets/food/*', { eager: true, query: '?url', import: 'default' })),
        gadgets: createFolderObject(import.meta.glob('/src/assets/gadgets/*', { eager: true, query: '?url', import: 'default' })),
        gordos: createFolderObject(import.meta.glob('/src/assets/gordos/*', { eager: true, query: '?url', import: 'default' })),
        map: createFolderObject(import.meta.glob('/src/assets/map/*', { eager: true, query: '?url', import: 'default' })),
        misc: createFolderObject(import.meta.glob('/src/assets/misc/*', { eager: true, query: '?url', import: 'default' })),
        music: createFolderObject(import.meta.glob('/src/assets/music/*', { eager: true, query: '?url', import: 'default' })),
        plorts: createFolderObject(import.meta.glob('/src/assets/plorts/*', { eager: true, query: '?url', import: 'default' })),
        ranchers: createFolderObject(import.meta.glob('/src/assets/ranchers/*', { eager: true, query: '?url', import: 'default' })),
        resources: createFolderObject(import.meta.glob('/src/assets/resources/*', { eager: true, query: '?url', import: 'default' })),
        slimes: createFolderObject(import.meta.glob('/src/assets/slimes/*', { eager: true, query: '?url', import: 'default' })),
        toys: createFolderObject(import.meta.glob('/src/assets/toys/*', { eager: true, query: '?url', import: 'default' })),
        ui: createFolderObject(import.meta.glob('/src/assets/ui/*', { eager: true, query: '?url', import: 'default' })),
        upgrades: createFolderObject(import.meta.glob('/src/assets/upgrades/*', { eager: true, query: '?url', import: 'default' })),
        videos: createFolderObject(import.meta.glob('/src/assets/videos/*', { eager: true, query: '?url', import: 'default' })),
        wait: createFolderObject(import.meta.glob('/src/assets/wait/*', { eager: true, query: '?url', import: 'default' })),
        wallpapers: createFolderObject(import.meta.glob('/src/assets/wallpapers/*', { eager: true, query: '?url', import: 'default' })),
        world: createFolderObject(import.meta.glob('/src/assets/world/*', { eager: true, query: '?url', import: 'default' }))
    };
};

export const mediaFetcher = (path: string): string => {
    const pathList = path.split('/');
    const requiredFile = pathList[1];
    const requiredFolder = pathList[0];
    const folder = folders[requiredFolder];
    if (!folder) {
        console.error(`Folder not found: ${path}`);
        return noneImg;
    }
    const cleanedFile = requiredFile.replace(/\?.*$/, '');
    if (folder[cleanedFile] === undefined) {
        console.error(`File not found: ${requiredFile}`);
        return noneImg;
    }
    return folder[cleanedFile];
};

initializeFolders();