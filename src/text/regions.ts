import { Food } from "./food";
import { Resource } from "./resources";
import { Slime } from "./slimes";

export enum RegionType {
    Region = 'regions',
    Ranch = 'ranch'
}

export enum Region {
    Fields = 'fields',
    Strand = 'strand',
    Valley = 'valley',
    Bluffs = 'bluffs',
    Labyrinth = 'labyrinth',
    Sea = 'sea'
}

export enum Ranch {
    Conservatory = 'conservatory',
    Archway = 'archway',
    Den = 'den',
    Gully = 'gully',
    Tidepools = 'tidepools',
    Digsite = 'digsite'
}

export const regionInfos: { [key in Region]: [string, string, string, string, number, number, number] } = {
    [Region.Sea]: ['The Slime Sea', 'se', 'An expansive body of water and slime compound that\'s not fit for swimming, let alone drinking.', 'se', 0, 0, 0],
    [Region.Fields]: ['Rainbow Fields', 'rf', 'Shifting colors like a dream, fading just as quickly.', 'rf', 16, 0, 0],
    [Region.Strand]: ['Starlight Strand', 'ss', 'A vision of dusk and dawn together as one.', 'ss', 31, 0, 0],
    [Region.Valley]: ['Ember Valley', 'ev', 'The ancient world stirs beneath your feet with every step.', 'ev', 33, 0, 0],
    [Region.Bluffs]: ['Powderfall Bluffs', 'pb', 'A lost era echoing trough halls of shimmering ice.', 'pb', 23, 0, 0],
    [Region.Labyrinth]: ['The Grey Labyrinth', 'gl', 'An imposing layer cake whose depths hide ancient, prismatic secrets.', 'gl', 19, 0, 0]
};

    export const ranchInfos: { [key in Ranch]: [string, string, string, string, number, number, number] } = {
    [Ranch.Conservatory]: ['The Conservatory', 'co', 'Your gateway to a prismatic paradise.', 'co', 0, 8, 0],
    [Ranch.Den]: ['The Den', 'td', 'This dark, damp, mushroom-covered expansion to the conservatory is a refuge from the sun for slimes and ranchers alike.', 'co', 1, 5, 1800],
    [Ranch.Gully]: ['The Gully', 'gu', 'This expansion to the Conservatory is surrounded by tall rock formations and covered in amber grass.', 'gu', 1, 5, 1800],
    [Ranch.Archway]: ['The Archway', 'ar', 'An expansion to the conservatory set amongst ancient ruins and fields of rainbow grass.', 'ar', 1, 5, 1800],
    [Ranch.Tidepools]: ['The Tidepools', 'tp', 'A costal sanctuary for coral lifeforms and seaweed, this expansion to the conservatory is guaranteed to fill your shoes with sand.', 'tp', 0, 5, 3500],
    [Ranch.Digsite]: ['The Digsite', 'ds', 'A curious archaeological site with plenty of room for a creative rancher to clean up and make it their own.', 'ds', 0, 4, 4500]
};

export const spawnLocationsList: { [key: string]: [string, string, boolean] } = {
    'co': ['conservatory', 'The Conservatory', true],
    'td': ['den', 'The Den', true],
    'gu': ['gully', 'The Gully', true],
    'ar': ['archway', 'The Archway', true],
    'tp': ['tidepools', 'The Tidepools', true],
    'ds': ['digsite', 'The Digsite', true],
    'rf': ['fields', 'Rainbow Fields', false],
    'ss': ['strand', 'Starlight Strand', false],
    'ev': ['valley', 'Ember Valley', false],
    'pb': ['bluffs', 'Powderfall Bluffs', false],
    'gl': ['labyrinth', 'Grey Labyrinth', false],
    'se': ['sea', 'The Slime Sea', false],
    'ws': ['cyclone', 'Cyclone', false],
    'ps': ['vine', 'Vine Tangle', false],
    'ls': ['lightning', 'Lightning Strike', false],
    'pm': ['shop', 'Pronto Mart', false]
};

export const regionElements: { [key in Region]: [Slime[], Food[], (Resource | Slime | Food.Water)[]] } = {
    [Region.Fields]: [
        [Slime.Pink, Slime.Cotton, Slime.Tabby, Slime.Phosphor, Slime.Yolky],
        [Food.Pogo, Food.Cuberry, Food.Carrot, Food.Lettuce, Food.Hen, Food.HenStony, Food.Rooster, Food.Chick, Food.ChickStony, Food.HenElder, Food.RoosterElder],
        [Resource.Jelly, Resource.Brine, Resource.Diamond, Slime.Pink, Slime.Cotton, Slime.Phosphor]
    ],
    [Region.Strand]: [
        [Slime.Pink, Slime.Cotton, Slime.Rock, Slime.Phosphor, Slime.Hunter, Slime.Honey, Slime.Angler, Slime.Flutter, Slime.Ringtail, Slime.Puddle, Slime.Yolky],
        [Food.Pogo, Food.Cuberry, Food.Mango, Food.Granite, Food.Carrot, Food.Beet, Food.Nectar, Food.Hen, Food.HenPainted, Food.HenSea, Food.HenStony, Food.Rooster, Food.Chick, Food.ChickPainted, Food.ChickSea, Food.ChickStony, Food.HenElder, Food.RoosterElder],
        [Food.Water, Resource.Radiant, Resource.Sand, Resource.Wax, Resource.Honey, Resource.Diamond, Slime.Hunter, Slime.Honey, Slime.Ringtail, Slime.Angler, Slime.Flutter]
    ],
    [Region.Valley]: [
        [Slime.Pink, Slime.Cotton, Slime.Rock, Slime.Phosphor, Slime.Tabby, Slime.Angler, Slime.Crystal, Slime.Boom, Slime.Fire, Slime.Puddle, Slime.Ringtail, Slime.Batty, Slime.Yolky],
        [Food.Pogo, Food.Cuberry, Food.Pear, Food.Granite, Food.Carrot, Food.Onion, Food.Beet, Food.Lettuce, Food.Hen, Food.HenBriar, Food.HenSea, Food.HenStony, Food.Rooster, Food.Chick, Food.ChickBriar, Food.ChickSea, Food.ChickStony, Food.HenElder, Food.RoosterElder],
        [Food.Water, Resource.Radiant, Resource.Sand, Resource.Wax, Resource.Diamond, Resource.Primordy, Resource.Lava, Slime.Batty, Slime.Boom, Slime.Crystal, Slime.Rock, Slime.Tabby]
    ],
    [Region.Bluffs]: [
        [Slime.Pink, Slime.Cotton, Slime.Rock, Slime.Phosphor, Slime.Boom, Slime.Hunter, Slime.Puddle, Slime.Crystal, Slime.Saber, Slime.Yolky],
        [Food.Pogo, Food.Cuberry, Food.Carrot, Food.Onion, Food.Beet, Food.Hen, Food.HenCluck, Food.Rooster, Food.HenElder, Food.RoosterElder],
        [Food.Water, Resource.Snowflake, Resource.Sunsap, Resource.Fossil, Resource.Diamond, Slime.Saber]
    ],
    [Region.Labyrinth]: [
        [Slime.Pink, Slime.Cotton, Slime.Tabby, Slime.Rock, Slime.Phosphor, Slime.Hunter, Slime.Angler, Slime.Crystal, Slime.Boom, Slime.Fire, Slime.Batty, Slime.Puddle, Slime.Ringtail, Slime.Shadow, Slime.Twin, Slime.Sloomber, Slime.Yolky],
        [Food.Pogo, Food.Cuberry, Food.Mango, Food.Granite, Food.Pear, Food.Carrot, Food.Lettuce, Food.Onion, Food.Beet, Food.Hen, Food.HenBriar, Food.HenSea, Food.HenStony, Food.Chick, Food.ChickBriar, Food.ChickSea, Food.ChickStony, Food.Cherry, Food.HenCandied, Food.ChickCandied],
        [Resource.Aqua, Resource.Magma, Resource.Indigo, Resource.Dream, Resource.Petal, Resource.Royal, Resource.Diamond, Slime.Twin, Slime.Sloomber]
    ],
    [Region.Sea]: [[], [], []]
};

export const ranchSpecials: { [key in Ranch]: string[] } = {
    [Ranch.Conservatory]: ['market', 'refinery', 'pronto'],
    [Ranch.Den]: ['dark'],
    [Ranch.Gully]: ['spawnHen', 'spawnRooster'],
    [Ranch.Archway]: ['spawnPogo', 'spawnCarrot'],
    [Ranch.Tidepools]: ['pond'],
    [Ranch.Digsite]: ['pond', 'springpad']
}

export const ranchPedia: { [key in Ranch]: string } = {
    [Ranch.Conservatory]: 'When Beatrix first arrived at Rainbow Island she discovered this mysterious, abandoned Conservatory and decided to use it as her home away from home, as it has all the facilities an experienced slime rancher would need to make a living.\nThe Conservatory itself is the only structure on the island that appears to have been constructed recently, standing in stark contrast to the ancient slime ruins found all over Rainbow Island and the rest of the Far, Far Range.\nStrangely, imperfections and wear on its various structures seem to be part of the design, as if it was created for a museum exhibit. And yet, there is a palpable feeling throughout that this was a home to someone, that it was built with love and purpose.',
    [Ranch.Den]: 'Hidden within a large rounded hill resides the Den, an expansion to the conservatory. This dark, damp cave is a refuge from the sun for slimes and ranches alike. Phosphor slimes in particular enjoy the mushroom-lined walls, while Batty slimes love to stretch their wings in their natural habitat.',
    [Ranch.Gully]: 'The Gully is an expansion to the Conservatory nestled between ancient, towering rock formations. While slimes enjoy frolicking in the amber fields of grass, Hen Hens nest in the cliffs, making this a meat-lover\'s paradise.',
    [Ranch.Archway]: 'The Archway is an expansion to the conservatory set amongst grass-covered ruins from a time long ago. Pogofruits and carrots grow between the cracks in the stone, making this a great spot for slimes that enjoy some fruits and veggies in their diet.',
    [Ranch.Tidepools]: 'Perched on a low-lying peninsula, the Tidepools is like a vacation: a sandy getaway from a rancher\'s busy life in the conservatory. But slimes and other creatures like this place, too. Tall coral reef formations provide some respite from the sun, while shallow pools of water create an oasis for puddle slimes and other aquatic life.',
    [Ranch.Digsite]: 'The Digsite is an expansion that revealed itself when a wall collapsed inside the Den, revealing an abandoned archaeological site. It\'s not clear what the excavator was searching for on the site\'s windswept cliffs, or if they ever discovered it.'}

export const regionPedia: { [key in Region]: string } = {
    [Region.Sea]: 'The Slime Sea that covers most of the Far, Far Range is something of a mystery. It is seemingly a mixture of water and slime that is believed to be the primordial pool whence all slimes emerged, though its true purpose is entirely unknown by even the most esteemed slime scientists.\nWhat is known is that the liquid found within the Slime Sea is not fit for drinking, watering crops, or even swimming, as most things seem to quickly sink to the bottom.\nWhen a slime enters the slime sea it quickly vanishes but it is widely believed that this far from ends the slime\'s existence, for slimes that enter the sea can often be seen quickly reappearing back on land, happy as ever.\nIn fact, many slime scientists believe that slimes use the sea as a means of transportation, moving swiftly below the surface and popping out on land wherever they see fit.\nBut all theories aside, one fact remains very clear, most especially to ranchers: don\'t enter the Slime Sea!',
    [Region.Fields]: 'Every day is one perfect, unending lazy afternoon in the Rainbow Fields; the kind that would make anyone want to stretch out across its prismatic grasses and while away the hours watching marshmallow clouds drift slowly across the sky.\nHappy, hoppy cotton slimes pop from their underground warrens and bounce about the glades, always hoping to land in a patch of delicious water lettuce.\nCareful explorers will also find ample reserves of jellystone along the hills and cliffs, as well as spouts of deep brine near the banks of the Slime Sea.\nWatching it all are the giant, smiling slime statues dotting the landscape, basking in the golden sun and hinting at the wondrous stone structures that Rainbow Island has yet to reveal to its vistors.',
    [Region.Strand]: 'The Starlight Strand is a world of opposites: a winding land cut erratically by the Slime Sea, with towering heights and cliffs that loom over deep lowland marshes.\nFurther, it is all mysteriously split right down the middle between two opposing palettes of coral and lavender, with the very atmosphere itself seeming to change as you cross from one to the other.\n\nThe strand is a floral fantasia, making it an ideal home to nectar-loving honey and flutter slimes, and its canopies are abuzz with hives that can be harvested for wild honey and buzz wax.\nThough undeniably beautiful, the Starlight Strand\'s peculiar nature is unlikely a natural occurrence, and suggests a secret history hidden within the heart of Rainbow Island.',
    [Region.Valley]: 'Ember Valley is always rumbling: blasting great geysers of water along its coasts and erupting lava into its smoldering ravines. It is a primal place, with canyons carved from swirling winds, revealing enormous fossils of unknown creatures.\nThe unique combination of strong geothermal activity and volcanic soil makes for a land abundant in primordy oil and lava dust, and makes for a natural home to heat-loving boom, fire and crystal slimes.\nStrangely, much of Ember Valley\'s primordial nature feels like a recent occurrence, at least relatively speaking. Its volcanic activity does not feel like the product of eons of change, but from some kind of unknown catalyst.\nIt would be wise to tread carefully in this place, further change could happen swiftly and it might just occur right below your feet...',
    [Region.Bluffs]: 'In a time long forgotten, Powderfall Bluffs may have been part of a greater landmass of Rainbow Island but somehow broke away, likely from the geological turmoil found in Ember Valley. And as it drifted away into the sea, it took its prehistoric inhabitants with it.\nAs sea levels rose, Powderfall Bluffs somehow became encased in a gigantic shell of shimmering ice before sinking into the depths of The Slime Sea, becoming like a living world inside a snow globe. The cause of this icy phenomenon is unknown, but could indicate that the strange effects of the prisma waves radiating from Rainbow Island date back to a time before recorded history on the Far, Far Range.\nNow, Powderfall Bluffs has returned, as a perfectly preserved prehistoric ecosystem. Those willing to brave the freezing climate will find hungry saber slimes, and fearsome thunderclucks. Vibrant Sun Sap can be found in groves of ancient redwoods, with slime fossils and blustery plumes of perfect snowflakes hidden around every frozen corner.',
    [Region.Labyrinth]: 'Towering over the horizon, the Grey Labyrinth stretches across the skyline of Rainbow Island like an imposing jigsaw puzzle missing a piece. On its surface, it appears to be keeping the curious out, yet the further in one ventures, the more one suspects the Grey Labyrinth is holding something in.\nAmid twisting corridors of carved stone and unnatural metals, and echoing from pipes channeling water and magma, an erratic pulse of power beats from somewhere deeper within the ancient structure. Strange phenomena mar otherwise ethereal, manicured gardens, and prismatic light washes over the landscape, bathing it in unpredictable, transformative energies.\nCountless ages of exposure to these energies seems to have impacted both slimes and inanimate objects alike, giving them odd properties that sometimes defy logic or natural forces entirely. Even shadows seem to cluster and capriciously bound through the ancient megastructure.\nWithin its deepest chambers, the Grey Labyrinth holds a secret that perhaps one can only answer with some unexpected guidance from beyond.'
}

export const ranchConnections: { [key in Ranch]: [(Region | Ranch)[], (Region | Ranch)[]] } = {
    [Ranch.Conservatory]: [[Region.Fields], [Ranch.Den, Ranch.Gully, Ranch.Archway]],
    [Ranch.Den]: [[Ranch.Conservatory], [Ranch.Digsite]],
    [Ranch.Gully]: [[Ranch.Conservatory], [Ranch.Tidepools]],
    [Ranch.Archway]: [[Ranch.Conservatory], []],
    [Ranch.Tidepools]: [[Ranch.Gully], []],
    [Ranch.Digsite]: [[Ranch.Den], []]
};

export const regionsConnections: { [key in Region]: [(Region | Ranch)[], (Region | Ranch)[]] } = {
    [Region.Fields]: [[Ranch.Conservatory], [Region.Strand, Region.Valley]],
    [Region.Strand]: [[Region.Fields], [Region.Labyrinth]],
    [Region.Valley]: [[Region.Fields], [Region.Bluffs, Region.Labyrinth]],
    [Region.Bluffs]: [[Region.Valley], []],
    [Region.Labyrinth]: [[Region.Strand, Region.Valley], []],
    [Region.Sea]: [[Ranch.Conservatory, Region.Fields, Region.Strand, Region.Valley, Region.Bluffs], []]
};

export const regionsResourcesInfos: { [key: string]: [string, string, string] } = {
    'pink': ['Pink Gordo', 'gordos/pink', '/slimes/pink'],
    'cotton': ['Cotton Gordo', 'gordos/cotton', '/slimes/cotton'],
    'phosphor': ['Phosphor Gordo', 'gordos/phosphor', '/slimes/phosphor'],
    'hunter': ['Hunter Gordo', 'gordos/hunter', '/slimes/hunter'],
    'honey': ['Honey Gordo', 'gordos/honey', '/slimes/honey'],
    'ringtail': ['Ringtail Gordo', 'gordos/ringtail', '/slimes/ringtail'],
    'angler': ['Angler Gordo', 'gordos/angler', '/slimes/angler'],
    'flutter': ['Flutter Gordo', 'gordos/flutter', '/slimes/flutter'],
    'batty': ['Batty Gordo', 'gordos/batty', '/slimes/batty'],
    'boom': ['Boom Gordo', 'gordos/boom', '/slimes/boom'],
    'crystal': ['Crystal Gordo', 'gordos/crystal', '/slimes/crystal'],
    'rock': ['Rock Gordo', 'gordos/rock', '/slimes/rock'],
    'tabby': ['Tabby Gordo', 'gordos/tabby', '/slimes/tabby'],
    'saber': ['Saber Gordo', 'gordos/saber', '/slimes/saber'],
    'twin': ['Twin Gordo', 'gordos/twin', '/slimes/twin'],
    'sloomber': ['Sloomber Gordo', 'gordos/sloomber', '/slimes/sloomber'],
    'jelly': ['Jellystone', 'resources/jelly', '/items/resources/jelly'],
    'brine': ['Deep Brine', 'resources/brine', '/items/resources/brine'],
    'water': ['Water', 'food/water', '/food/water'],
    'radiant': ['Radiant Ore', 'resources/radiant', '/items/resources/radiant'],
    'sand': ['Silky Sand', 'resources/sand', '/items/resources/sand'],
    'wax': ['Buzz Wax', 'resources/wax', '/items/resources/wax'],
    'wildhoney': ['Wild Honey', 'resources/wildhoney', '/items/resources/wildhoney'],
    'diamond': ['Strange Diamond', 'resources/diamond', '/items/resources/diamond'],
    'primordy': ['Primordy Oil', 'resources/primordy', '/items/resources/primordy'],
    'lava': ['Lava Dust', 'resources/lava', '/items/resources/lava'],
    'snowflake': ['Perfect Snowflake', 'resources/snowflake', '/items/resources/snowflake'],
    'sunsap': ['Sun Sap', 'resources/sunsap', '/items/resources/sunsap'],
    'fossil': ['Slime Fossil', 'resources/fossil', '/items/resources/fossil'],
    'aqua': ['Aqua Glass', 'resources/aqua', '/items/resources/aqua'],
    'magma': ['Magma Comb', 'resources/magma', '/items/resources/magma'],
    'blackindigo': ['Black Indigonium', 'resources/blackindigo', '/items/resources/blackindigo'],
    'dream': ['Dream Bubble', 'resources/dream', '/items/resources/dream'],
    'petal': ['Tin Petal', 'resources/petal', '/items/resources/petal'],
    'royal': ['Royal Jelly', 'resources/royal', '/items/resources/royal'],
    'prisma': ['Radiant Plort', 'resources/prisma', '/items/resources/prisma'],
    'market': ['Plort Market', 'misc/market', ''],
    'refinery': ['Plort Refinery', 'misc/refinery', ''],
    'pronto': ['Prontomart', 'misc/shop', ''],
    'dark': ['Always Dark', 'buildings/shield', '/buildings/corral/shield'],
    'spawnHen': ['Hen Hen Spawn', 'food/hen', '/food/hen'],
    'spawnRooster': ['Rooster Spawn', 'food/rooster', '/food/rooster'],
    'spawnPogo': ['Pogofruit Trees', 'food/pogo', '/food/pogo'],
    'spawnCarrot': ['Carrot Patches', 'food/carrot', '/food/carrot'],
    'pond': ['Natural Ponds', 'buildings/pond', '/buildings/pond'],
    'springpad': ['Spring Pad', 'gadgets/springpad', '/blueprints/utilities/springpad']
}