export const weatherName: string[] = [
    'rain',
    'snow',
    'thunder',
    'lightning',
    'wind',
    'cyclone',
    'pollen',
    'vine',
    'slimefall'
];

export const weatherID: string[] = [
    'ra',
    'sn',
    'ls',
    'ws',
    'ps',
    'sf'
];

export const weatherList: { [key: string]: [string, string, string, string, string[], string, string[], boolean] } = {
    clear: ['Clear', 'cl', 'Clear Skies', '', [], '', ['co', 'rf', 'ss', 'ev', 'pb', 'gl'], false],
    rain: ['Rain', 'ra', 'Moody, dreary, cozy, wonderful', 'That\'s wet !', [], 'rain', ['co', 'rf', 'ss', 'ev', 'gl'], true],
    snow: ['Snow', 'sn', 'Walking in a wiggly wonderland', 'That\'s cold !', [], 'snow', ['pb'], false],
    thunder: ['Thunderstorm', 'ls', 'Hair-raising, if slimes had hair', 'That\'s loud !', [], 'lightning', ['co', 'rf', 'ss', 'ev', 'pb'], false],
    lightning: ['Lightning Strike', 'ls', 'When nature means business', 'That\'s bright !', ['mote', 'glass'], 'thunder', ['co', 'rf', 'ss', 'ev', 'pb'], true],
    wind: ['Wind', 'ws', 'Hold on to your plorts!', 'That\'s windy !', [], 'cyclone', ['co', 'rf', 'ss', 'ev', 'pb'], false],
    cyclone: ['Cyclone', 'ws', 'Dizzy as a dervish', 'That\'s spinning !', ['dervish', 'drift'], 'wind', ['co', 'rf', 'ss', 'ev', 'pb'], true],
    pollen: ['Pollen', 'ps', 'ah- ah- AH- AHLUVSLIMES!', 'That\'s sneezy !', [], 'vine', ['co', 'rf', 'ss', 'ev', 'gl'], false],
    vine: ['Vine Tangle', 'ps', 'Getting to the root of the pollen', 'That\'s thorny !', ['tangle'], 'pollen', ['co', 'rf', 'ss', 'ev', 'gl'], true],
    slimefall: ['Slimefall', 'sf', 'Oh come on...', 'That\'s slimy !', ['tarr'], 'slimefall', ['co', 'rf', 'ss', 'ev', 'pb'], false]
};

export const weatherPedia: { [key: string]: string } = {
    clear: 'Clear Skies',
    rain: 'Whether a light drizzle or a heavy downpour, rain can make any corner of Rainbow Island a little more dramatic. But rain can also help keep Tarr at bay, naturally water wild fruits, veggies, and crops, and delight puddle slimes everywhere.',
    snow: 'Snow is a rarity on Rainbow Island, but you can always find it in Powderfall Bluffs due to its unique atmospheric conditions. Slimes revel in a snow day, rolling down icy slopes, and never missing a chance to join a friendly Snowball fight.',
    thunder: 'Few other spectacles in nature compete with the crack of thunder and flash of lightning during a storm. On Rainbow Island, these storms can sometimes cause lightning to strike down from above, crashing into the ground with incredible force. So when the skies begin to rumble, watch out!',
    lightning: 'While the drama of distant thunderstorms can be a delight to witness, they can cause lightning to rip through the sky and crash into the ground. So for ranchers that fancy themselves storm chasers. look out for the crackle of electricity beneath your feet as a searing lightning bolt is surely on the way!',
    wind: 'Nothing beats the cool breeze of sea air that rolls through every corner of Rainbow Island. But when cool breezes become gusts and gales, anything that isn\'t rooted to the ground can find itself going wherever the wind decides to take it!',
    cyclone: 'Cyclones can form when windy weather reaches its peak, creating swirling, whirling, twisters that tear through the environment. Cyclones cause chaos, flinging about food, slimes, and even ranchers that are in their wake. But in all the chaos, you may just get lucky and find some dervish slimes having the time of their lives.',
    pollen: 'Rainbow Island is lush with trees and flowers so it\'s not unusual to find clouds that cause tears (of joy) and sneezes (of joy) as a reaction to the majesty of nature in full bloom. But nature on Rainbow Island rarely stops there, as pollen clouds are often a precursor to more aggressive forms of plant life expanding their reach.',
    vine: 'A strange phenomenon occurs on Rainbow Island when pollen clouds swell to unusual levels: plant life in the area will grow rapidly, and erratically, spreading creeping vines in all directions. These vines will spawn large buds that blossom into fruits and veggies, and make for a great hunting ground for the wild tangle slimes that sometimes appear.',
    slimefall: 'Even by the standards of Rainbow Island, slimefall is an unusual sight, with dozens of slimes raining down from the clouds above. As with many things, the slimes don\'t seem to be particularly bothered by it all, but a rancher would do well to remain cautious. With so many new slimes dropped into an area at once, slimefall can easily lead to Tarr outbreaks.'
};

export const weatherSpawn: { [key: string]: [string, string, string] } = {
    'mote': ['Lightning Mote', 'resources/mote', '/items/resource/mote'],
    'glass': ['Glass Shard', 'resources/glass', '/items/resource/glass'],
    'dervish': ['Dervish Slime', 'slimes/dervish', '/slimes/dervish'],
    'drift': ['Driftwood', 'resources/drift', '/items/resource/drift'],
    'tangle': ['Tangle Slime', 'slimes/tangle', '/slimes/tangle'],
    'tarr': ['Tarr', 'slimes/tarr', '/slimes/tarr']
}