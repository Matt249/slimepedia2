export const regionsIds = ['fields', 'strand', 'valley', 'bluffs', 'sea'];
export const ranchIds = ['conservatory', 'den', 'gully', 'archway', 'tidepools', 'digsite'];
export const RegAndRanchIds = regionsIds.concat(ranchIds);

export const regionInfos: {[key: string]: [string, string, string, string, string, number, number, number]} = {
    'sea': ['The Slime Sea', 'sea', 'se', 'An expansive body of water and slime compound that\'s not fit for swimming, let alone drinking.', 'se', 0, 0, 0],
    'fields': ['Rainbow Fields', 'fields', 'rf', 'Shifting colors like a dream, fading just as quickly.', 'rf', 16, 0, 0],
    'strand': ['Starlight Strand', 'strand', 'ss', 'A vision of dusk and dawn together as one.', 'ss', 31, 0, 0],
    'valley': ['Ember Valley', 'valley', 'ev', 'The ancient world stirs beneath your feet with every step.', 'ev', 33, 0, 0],
    'bluffs': ['Powderfall Bluffs', 'bluffs', 'pb', 'A lost era echoing trough halls of shimmering ice.', 'pb', 23, 0, 0],
    'conservatory': ['The Conservatory', 'conservatory', 'co', 'Your gateway to a prismatic paradise.', 'co', 0, 8, 0],
    'den': ['The Den', 'den', 'td', 'This dark, damp, mushroom-covered expansion to the conservatory is a refuge from the sun for slimes and ranchers alike.', 'co', 1, 5, 1800],
    'gully': ['The Gully', 'gully', 'gu', 'This expansion to the Conservatory is surrounded by tall rock formations and covered in amber grass.', 'gu', 1, 5, 1800],
    'archway': ['The Archway', 'archway', 'ar', 'An expansion to the conservatory set amongst ancient ruins and fields of rainbow grass.', 'ar', 1, 5, 1800],
    'tidepools': ['The Tidepools', 'tidepools', 'tp', 'A costal sanctuary for coral lifeforms and seaweed, this expansion to the conservatory is guaranteed to fill your shoes with sand.', 'tp', 0, 5, 3500],
    'digsite': ['The Digsite', 'digsite', 'ds', 'A curious archaeological site with plenty of room for a creative rancher to clean up and make it their own.', 'ds', 0, 5, 4500]
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
    'se': ['sea', 'The Slime Sea', false],
    'ws': ['tornado', 'Level 3 Wind Storm', false],
    'ps': ['vines', 'Level 3 Pollen Storm', false],
    'ls': ['lightning', 'Level 3 Thunderstorm', false],
    'pm': ['shop', 'Pronto Mart', false]
};

export const regionElements: { [key: string]: [string[], string[], string[]] }= {
    'fields': [['pink', 'cotton', 'tabby', 'phosphor'], ['pogo', 'cuberry', 'carrot', 'lettuce', 'hen', 'henStony', 'rooster', 'chick', 'chickStony', 'henElder', 'roosterElder'], ['jelly', 'brine', 'gordoPink', 'gordoCotton', 'gordoPhosphor']],
    'strand': [['pink', 'cotton', 'rock', 'phosphor', 'hunter', 'honey', 'angler', 'flutter', 'ringtail', 'puddle'], ['pogo', 'cuberry', 'mango', 'granite', 'carrot', 'beet', 'nectar', 'hen', 'henPainted', 'henSea', 'henStony', 'rooster', 'chick', 'chickPainted', 'chickSea', 'chickStony', 'henElder', 'roosterElder'], ['water', 'radiant', 'sand', 'wax', 'honey', 'diamond', 'gordoHunter', 'gordoHoney', 'gordoRingtail', 'gordoAngler', 'gordoFlutter']],
    'valley': [['pink', 'cotton', 'rock', 'phosphor', 'tabby', 'angler', 'crystal', 'boom', 'fire', 'puddle', 'ringtail', 'batty'], ['pogo', 'cuberry', 'pear', 'granite', 'carrot', 'onion', 'beet', 'lettuce', 'hen', 'henBriar', 'henSea', 'henStony', 'rooster', 'chick', 'chickBriar', 'chickSea', 'chickStony', 'henElder', 'roosterElder'], ['water', 'radiant', 'sand', 'wax', 'diamond', 'primordy', 'lava', 'gordoBatty', 'gordoBoom', 'gordoCrystal', 'gordoRock', 'gordoTabby']],
    'bluffs': [['pink', 'cotton', 'rock', 'phosphor', 'boom', 'hunter', 'puddle', 'crystal', 'saber'], ['pogo', 'cuberry', 'carrot', 'onion', 'beet', 'hen', 'henCluck', 'rooster', 'henElder', 'roosterElder'], ['water', 'snowflake', 'sunsap', 'fossil', 'diamond', 'gordoSaber']],
    'sea': [[], [], []]
}

export const ranchSpecials: { [key: string]: string[] } = {
    'conservatory': ['market', 'refinery', 'pronto'],
    'den': ['dark'],
    'gully': ['spawnHen', 'spawnRooster'],
    'archway': ['spawnPogo', 'spawnCarrot'],
    'tidepools': ['pond'],
    'digsite': ['pond', 'springpad']
}

export const regionPedia: { [key: string]: string } = {
    'conservatory': 'When Beatrix first arrived at Rainbow Island she discovered this mysterious, abandoned Conservatory and decided to use it as her home away from home, as it has all the facilities an experienced slime rancher would need to make a living.\nThe Conservatory itself is the only structure on the island that appears to have been constructed recently, standing in stark contrast to the ancient slime ruins found all over Rainbow Island and the rest of the Far, Far Range.\nStrangely, imperfections and wear on its various structures seem to be part of the design, as if it was created for a museum exhibit. And yet, there is a palpable feeling throughout that this was a home to someone, that it was built with love and purpose.',
    'den': 'Hidden within a large rounded hill resides the Den, an expansion to the conservatory. This dark, damp cave is a refuge from the sun for slimes and ranches alike. Phosphor slimes in particular enjoy the mushroom-lined walls, while Batty slimes love to stretch their wings in their natural habitat.',
    'gully': 'The Gully is an expansion to the Conservatory nestled between ancient, towering rock formations. While slimes enjoy frolicking in the amber fields of grass, Hen Hens nest in the cliffs, making this a meat-lover\'s paradise.',
    'archway': 'The Archway is an expansion to the conservatory set amongst grass-covered ruins from a time long ago. Pogofruits and carrots grow between the cracks in the stone, making this a great spot for slimes that enjoy some fruits and veggies in their diet.',
    'tidepools': 'Perched on a low-lying peninsula, the Tidepools is like a vacation: a sandy getaway from a rancher\'s busy life in the conservatory. But slimes and other creatures like this place, too. Tall coral reef formations provide some respite from the sun, while shallow pools of water create an oasis for puddle slimes and other aquatic life.',
    'digsite': 'The Digsite is an expansion that revealed itself when a wall collapsed inside the Den, revealing an abandoned archaeological site. It\'s not clear what the excavator was searching for on the site\'s windswept cliffs, or if they ever discovered it.',
    'sea': 'The Slime Sea that covers most of the Far, Far Range is something of a mystery. It is seemingly a mixture of water and slime that is believed to be the primordial pool whence all slimes emerged, though its true purpose is entirely unknown by even the most esteemed slime scientists.\nWhat is known is that the liquid found within the Slime Sea is not fit for drinking, watering crops, or even swimming, as most things seem to quickly sink to the bottom.\nWhen a slime enters the slime sea it quickly vanishes but it is widely believed that this far from ends the slime\'s existence, for slimes that enter the sea can often be seen quickly reappearing back on land, happy as ever.\nIn fact, many slime scientists believe that slimes use the sea as a means of transportation, moving swiftly below the surface and popping out on land wherever they see fit.\nBut all theories aside, one fact remains very clear, most especially to ranchers: don\'t enter the Slime Sea!',
    'fields': 'Every day is one perfect, unending lazy afternoon in the Rainbow Fields; the kind that would make anyone want to stretch out across its prismatic grasses and while away the hours watching marshmallow clouds drift slowly across the sky.\nHappy, hoppy cotton slimes pop from their underground warrens and bounce about the glades, always hoping to land in a patch of delicious water lettuce.\nCareful explorers will also find ample reserves of jellystone along the hills and cliffs, as well as spouts of deep brine near the banks of the Slime Sea.\nWatching it all are the giant, smiling slime statues dotting the landscape, basking in the golden sun and hinting at the wondrous stone structures that Rainbow Island has yet to reveal to its vistors.',
    'strand': 'The Starlight Strand is a world of opposites: a winding land cut erratically by the Slime Sea, with towering heights and cliffs that loom over deep lowland marshes.\nFurther, it is all mysteriously split right down the middle between two opposing palettes of coral and lavender, with the very atmosphere itself seeming to change as you cross from one to the other.\n\nThe strand is a floral fantasia, making it an ideal home to nectar-loving honey and flutter slimes, and its canopies are abuzz with hives that can be harvested for wild honey and buzz wax.\nThough undeniably beautiful, the Starlight Strand\'s peculiar nature is unlikely a natural occurrence, and suggests a secret history hidden within the heart of Rainbow Island.',
    'valley': 'Ember Valley is always rumbling: blasting great geysers of water along its coasts and erupting lava into its smoldering ravines. It is a primal place, with canyons carved from swirling winds, revealing enormous fossils of unknown creatures.\nThe unique combination of strong geothermal activity and volcanic soil makes for a land abundant in primordy oil and lava dust, and makes for a natural home to heat-loving boom, fire and crystal slimes.\nStrangely, much of Ember Valley\'s primordial nature feels like a recent occurrence, at least relatively speaking. Its volcanic activity does not feel like the product of eons of change, but from some kind of unknown catalyst.\nIt would be wise to tread carefully in this place, further change could happen swiftly and it might just occur right below your feet...',
    'bluffs': 'In a time long forgotten, Powderfall Bluffs may have been part of a greater landmass of Rainbow Island but somehow broke away, likely from the geological turmoil found in Ember Valley. And as it drifted away into the sea, it took its prehistoric inhabitants with it.\nAs sea levels rose, Powderfall Bluffs somehow became encased in a gigantic shell of shimmering ice before sinking into the depths of The Slime Sea, becoming like a living world inside a snow globe. The cause of this icy phenomenon is unknown, but could indicate that the strange effects of the prisma waves radiating from Rainbow Island date back to a time before recorded history on the Far, Far Range.\nNow, Powderfall Bluffs has returned, as a perfectly preserved prehistoric ecosystem. Those willing to brave the freezing climate will find hungry saber slimes, and fearsome thunderclucks. Vibrant Sun Sap can be found in groves of ancient redwoods, with slime fossils and blustery plumes of perfect snowflakes hidden around every frozen corner. '
}

export const regionsConnections: {[key: string]: [string[], string[]]} = {
    'conservatory': [[], ['fields', 'den', 'gully', 'archway']],
    'den': [['conservatory'], ['digsite']],
    'gully': [['conservatory'], ['tidepools']],
    'archway': [['conservatory'], []],
    'tidepools': [['gully'], []],
    'digsite': [['den'], []],
    'fields': [['conservatory'], ['strand', 'valley']],
    'strand': [['fields'], []],
    'valley': [['fields'], ['bluffs']],
    'bluffs': [['valley'], []],
    'sea': [['conservatory', 'fields', 'strand', 'valley', 'bluffs'], []]
}

export const regionsResourcesInfos: { [key: string]: [string, string, string] } = {
    'gordoPink': ['Pink Gordo', 'gordos/pink', ''],
    'gordoCotton': ['Cotton Gordo', 'gordos/cotton', ''],
    'gordoPhosphor': ['Phosphor Gordo', 'gordos/phosphor', ''],
    'gordoHunter': ['Hunter Gordo', 'gordos/hunter', ''],
    'gordoHoney': ['Honey Gordo', 'gordos/honey', ''],
    'gordoRingtail': ['Ringtail Gordo', 'gordos/ringtail', ''],
    'gordoAngler': ['Angler Gordo', 'gordos/angler', ''],
    'gordoFlutter': ['Flutter Gordo', 'gordos/flutter', ''],
    'gordoBatty': ['Batty Gordo', 'gordos/batty', ''],
    'gordoBoom': ['Boom Gordo', 'gordos/boom', ''],
    'gordoCrystal': ['Crystal Gordo', 'gordos/crystal', ''],
    'gordoRock': ['Rock Gordo', 'gordos/rock', ''],
    'gordoTabby': ['Tabby Gordo', 'gordos/tabby', ''],
    'gordoSaber': ['Saber Gordo', 'gordos/saber', ''],
    'jelly': ['Jellystone', 'resources/jelly', '/items/resources/jelly'],
    'brine': ['Deep Brine', 'resources/brine', '/items/resources/brine'],
    'water': ['Water', 'food/water', '/food/water'],
    'radiant': ['Radiant Ore', 'resources/radiant', '/items/resources/radiant'],
    'sand': ['Silky Sand', 'resources/sand', '/items/resources/sand'],
    'wax': ['Buzz Wax', 'resources/wax', '/items/resources/wax'],
    'honey': ['Wild Honey', 'resources/honey', '/items/resources/honey'],
    'diamond': ['Strange Diamond', 'resources/diamond', '/items/resources/diamond'],
    'primordy': ['Primordy Oil', 'resources/primordy', '/items/resources/primordy'],
    'lava': ['Lava Dust', 'resources/lava', '/items/resources/lava'],
    'snowflake': ['Perfect Snowflake', 'resources/snowflake', '/items/resources/snowflake'],
    'sunsap': ['Sun Sap', 'resources/sunsap', '/items/resources/sunsap'],
    'fossil': ['Slime Fossil', 'resources/fossil', '/items/resources/fossil'],
    'market': ['Plort Market', 'misc/market', ''],
    'refinery': ['Plort Refinery', 'misc/refinery', ''],
    'pronto': ['Prontomart', 'misc/shop', ''],
    'dark': ['Always Dark', 'buildings/shield', '/buildings/corral/shield'],
    'spawnHen': ['Hen Hen Spawn', 'food/hen', '/food/hen'],
    'spawnRooster': ['Rooster Spawn', 'food/rooster', '/food/rooster'],
    'spawnPogo': ['Pogofruit Trees', 'food/pogo', '/food/pogo'],
    'spawnCarrot': ['Carrot Patches', 'food/carrot', '/food/carrot'],
    'pond': ['Natural Ponds', 'buildings/pond', '/buildings/pond'],
    'springpad': ['Jump Pad', 'gadgets/springpad', '/blueprints/utilities/springpad']
}