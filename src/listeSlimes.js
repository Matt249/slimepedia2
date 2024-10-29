export const slimesList = {
    'pink': ['pink', 'Pink Slime', 'food', 'none', true, ['rf', 'ss', 'ev', 'pb'], 'ball'],
    'cotton': ['cotton', 'Cotton Slime', 'veggies', 'lettuce', true, ['rf', 'ss', 'pb'], 'bouncy'],
    'tabby': ['tabby', 'Tabby Slime', 'meat', 'henStony', true, ['rf', 'ss', 'ev'], 'yarn'],
    'phosphor': ['phosphor', 'Phosphor Slime', 'fruits', 'cuberry', true, ['rf', 'ss', 'ev', 'pb'], 'none'],
    'rock': ['rock', 'Rock Slime', 'veggies', 'beet', true, ['ss', 'ev', 'pb'], 'none'],
    'hunter': ['hunter', 'Hunter Slime', 'meat', 'rooster', true, ['ss', 'pb'], 'none'],
    'angler': ['angler', 'Angler Slime', 'meat', 'henSea', true, ['ss', 'ev'], 'puffer'],
    'puddle': ['puddle', 'Puddle Slime', 'water', 'water', false, ['ss', 'ev', 'pb'], 'duck'],
    'ringtail': ['ringtail', 'Ringtail Slime', 'food', 'none', true, ['ss', 'ev', 'pb'], 'trash'],
    'honey': ['honey', 'Honey Slime', 'fruits', 'mango', true, ['ss'], 'none'],
    'flutter': ['flutter', 'Flutter Slime', 'nectar', 'nectar', true, ['ss'], 'worm'],
    'batty': ['batty', 'Batty Slime', 'fruits', 'granite', true, ['ev'], 'moon'],
    'boom': ['boom', 'Boom Slime', 'meat', 'henBriar', true, ['ev', 'pb'], 'bomb'],
    'crystal': ['crystal', 'Crystal Slime', 'veggies', 'onion', true, ['ev', 'pb'], 'none'],
    'fire': ['fire', 'Fire Slime', 'ash', 'ash', false, ['ev'], 'none'],
    'saber': ['saber', 'Saber Slime', 'meat', 'henCluck', true, ['pb'], 'none'],
    'dervish': ['dervish', 'Dervish Slime', 'fruits', 'pear', true, ['ws'], 'none'],
    'tangle': ['tangle', 'Tangle Slime', 'meat', 'henPainted', true, ['ps'], 'none'],
    'yolky': ['yolky', 'Yolky Slime', 'none', 'none', false, ['rf', 'ss', 'ev', 'pb'], 'none'],
    'lucky': ['lucky', 'Lucky Slime', 'meat', 'none', false, ['rf', 'ss', 'ev', 'pb'], 'none'],
    'gold': ['gold', 'Gold Slime', 'food', 'none', false, ['rf', 'ss', 'ev', 'pb'], 'none'],
    'tarr': ['tarr', 'Tarr Slime', 'ranchersnslimes', 'ranchersnslimes', false, ['co', 'rf', 'ss', 'ev', 'pb'], 'none']
};

export const toys = {
    'ball': 'Beach Ball',
    'bouncy': 'Bouncy Ball',
    'yarn': 'Yarn Ball',
    'none': 'None',
    'puffer': 'Plushie Puffer Fish',
    'duck': 'Rubber Ducky',
    'trash': 'Trashcan',
    'worm': 'Glowbug',
    'moon': 'Full Moon Ball',
    'bomb': 'Bomb Ball'
}

export const toysList = [
    ['ball', 'Beach Ball', 'pink'],
    ['bouncy', 'Bouncy Ball', 'cotton'],
    ['yarn', 'Yarn Ball', 'tabby'],
    ['puffer', 'Plushie Puffer Fish', 'angler'],
    ['duck', 'Rubber Ducky', 'puddle'],
    ['trash', 'Trashcan', 'ringtail'],
    ['worm', 'Glowbug', 'flutter'],
    ['moon', 'Full Moon Ball', 'batty'],
    ['bomb', 'Bomb Ball', 'boom'],
    ['fox', 'Glo Glo Foxifur', 'none']
];

export const foodTypes = {
    'food': ["Any", true],
    'veggies': ["Veggies", true],
    'fruits': ["Fruits", true],
    'meat': ["Meat", true],
    'honey': ["Special", true],
    'water': ["Water", false],
    'ash': ["Ash", false],
    'nectar': ["Nectar", false],
    'ranchersnslimes': ["Ranchers and Slimes", false],
    'none': ["None", false]
};

export const foodList = [
    ['ranchersnslimes', 'Ranchers and Slimes', 'ranchersnslimes', ['co', 'gu', 'td', 'tp', 'ds', 'ar', 'rf', 'ss', 'ev', 'pb']],
    ['carrot', 'Carrot', 'veggies', ['ar', 'rf', 'ss', 'ev', 'pb']],
    ['lettuce', "Water Lettuce", 'veggies', ['rf', 'ss', 'ev']],
    ['beet', "Heart Beet", 'veggies', ['ss', 'ev', 'pb']],
    ['onion', "Odd Onion", 'veggies', ['ev', 'pb']],
    ['pogo', 'Pogofruit', 'fruits', ['ar', 'rf', 'ss', 'ev', 'pb']],
    ['cuberry', "Cuberry", 'fruits', ['rf', 'ev', 'ss', 'pb']],
    ['mango', "Mint Mango", 'fruits', ['ss']],
    ['granite', "Pomegranite", 'fruits', ['ss', 'ev']],
    ['pear', "Prickle Pear", 'fruits', ['ev']],
    ['hen', 'Hen Hen', 'meat', ['gu', 'rf', 'ss', 'ev', 'pb']],
    ['henStony', "Stony Hen", 'meat', ['rf', 'ev']],
    ['henSea', "Sea Hen", 'meat', ['ss', 'ev']],
    ['henBriar', "Briar Hen", 'meat', ['ev']],
    ['henCluck', "Thundercluck Hen", 'meat', ['pb']],
    ['henPainted', "Painted Hen", 'meat', ['ss']],
    ['rooster', "Rooster", 'meat', ['gu', 'rf', 'ss', 'ev', 'pb']],
    ['henElder', 'Elder Hen', 'meat', ['rf', 'ss', 'ev', 'pb']],
    ['roosterElder', 'Elder Rooster', 'meat', ['rf', 'ss', 'ev', 'pb']],
    ['water', "Water", 'water', ['tp', 'ds', 'ss', 'ev', 'pb']],
    ['nectar', "Moondew Nectar", 'nectar', ['ss']],
    ['ash', "Ash", 'ash', ['ev']],
];

export const spawnLocationsList = {
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
    'ws': ['tornado', 'Level 3 Wind Storm', false],
    'ps': ['vines', 'Level 3 Pollen Storm', false],
    'ls': ['lightning', 'Level 3 Thunderstorm', false],
    'pm': ['shop', 'Pronto Mart', false]
};

export const weatherList = [
    ['clear', 'Clear'],
    ['rain', 'Rain'],
    ['thunder', 'Thunderstorm'],
    ['lightning', 'Lightning Strike'],
    ['snow', 'Snow'],
    ['wind', 'Wind'],
    ['cyclone', 'Cyclone'],
    ['pollen', 'Pollen'],
    ['vine', 'Vine Tangle']
];

export const resourcesList = [
    ['brine', 'Deep Brine', ['co', 'gu', 'td', 'tp', 'ds', 'ar', 'rf']],
    ['lava', 'Lava Dust', ['ev']],
    ['primordy', 'Primordy Oil', ['ev']],
    ['sand', 'Silky Sand', ['ss', 'ev']],
    ['jelly', 'Jellystone', ['co', 'gu', 'td', 'tp', 'ds', 'ar', 'rf']],
    ['radiant', 'Radiant Ore', ['ss', 'ev']],
    ['diamond', 'Strange Diamond', ['rf', 'ss', 'ev', 'pb']],
    ['wax', 'Buzz Wax', ['ss', 'ev']],
    ['honey', 'Wild Honey', ['ss']],
    ['fossil', 'Slime Fossil', ['pb']],
    ['snowflake', 'Perfect Snowflake', ['pb']],
    ['sunsap', 'Sun Sap', ['pb']],
    ['drift', 'Drift Crystal', ['ws']],
    ['glass', 'Storm Glass', ['ls']],
    ['mote', 'Lightning Mote', ['ls']]
];