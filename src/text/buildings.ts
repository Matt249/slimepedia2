export const buildingNames = ['corral', 'coop', 'garden', 'silo', 'pond', 'incinerator'];

export const buildingList = {
    'corral': ['Corral', 'A happy slime makes for a happy rancher.', 250, 'A corral is used to keep slimes on a ranch. The open-air corrals are designed for maximum slime satisfaction, with the rich soil of the Range beneath them and its expansive sky above them. Slimes will remain perfectly happy within corrals as long as they are fed regularly.\n\nRemember: You can shoot things THROUGH a corral barrier. Handy! ', 'slimes'],
    'coop': ['Coop', 'Keeping chickens in their place prevents the uprising.', 250, 'Though many ranchers simply let their chickens roam the ranch, a coop is the tool of a serious poultry producer. Coops keep hens and roostros close, allowing for maximum egg-laying potential. Just remember to avoid crowding the coop: chickens won\'t reproduce when in close proximity to more than a dozen other hens or roostros. But give them room and watch the love bloom.', 'food'],
    'garden': ['Garden', 'Nothing beats the taste of food grown in your own backyard.', 250, 'The gardens used by ranchers use advanced technology to rapidly grow clones of fruits and veggies in a natural, though greatly sped up, way. By placing a sample into the replicator, the garden\'s soil is instantly populated by a fruit tree or veggie patch and will keep producing harvests until removed.', 'food'],
    'silo': ['Silo', 'You can\'t take it with you when you go, so put it in storage.', 450, 'A silo lets a rancher neatly store plorts and resources in a handy, compact unit. Simply shoot into an available silo port to fill it, or vac it to retrieve items within. Remember, a clean ranch is a happy ranch!', 'itemsfood'],
    'pond': ['Pond', 'Water you going to do with this?', 450, 'A pond gives you a source of fresh water on the ranch that you can use for watering gardens, calming slimes in a corral, defeating tarr, or giving your puddle slimes a place to hang out and feed.', 'puddle'],
    'incinerator': ['Incinerator', 'Don\'t need it? Burn it!', 450, 'An Incinerator will instantly burn anything it touches into ash, and then burn that ash into nothing. It\'s an excellent solution for eliminating a tarr outbreak or for simply disposing of unwanted slimes if you\'re a terrible, heartless monster.', 'itemsfood']
}

export const buildingUpgrades = {
    'corral': [
        ['corralhighwalls', 'High Walls', 350, 'Higher corral walls ensure that even the bounciest of slimes will have difficulty escaping.'],
        ['airnet', 'Air Net', 450, 'An air net is a force barrier that covers the top of a corral. It can take a few hits before needing to recharge.'],
        ['shield', 'Solar Shield', 425, 'A solar shield will encase a corral in a dim shade, protecting slimes sensitive to light.'],
        ['musicbox', 'Music Box', 350, 'The music box plays a soothing tune that greatly reduces slime agitation.'],
        ['feeder', 'Auto-Feeder', 500, 'An auto-feeder will drop food into the corral at regular intervals. Just remember to keep it stocked!'],
        ['collector', 'Plort Collector', 500, 'A plort collector will vacuum up two types of plorts in a corral at regular intervals, depositing them into a storage tank, so long as space is available.']
    ],
    'garden': [
        ['soil', 'Nutrient Soil', 350, 'Nutrient soil contains compost from the Rainbow Fields and minerals from Ember Valley. Makes crops always yield the maximum harvest.'],
        ['sprinkler', 'Sprinkler', 500, 'A sprinkler ensures that your crops are always watered, making them grow twice as fast.'],
        ['scareslime', 'Scare Slime', 425, 'A scareslime is a stuffed tarr model designed to keep wandering slimes away from your crops. Simple, but terrifying.']
    ],
    'coop': [
        ['coophighwalls', 'High Walls', 200, 'Helps prevent chickens from flying the coop.'],
        ['grass', 'Spring Grass', 425, 'Spring grass attracts scuttle bugs that chickens just love to eat. With their bellies full, chickens will grow into healthy hens and roostros twice as fast.'],
        ['vitamizer', 'Vitamizer', 500, 'The very latest in advanced poultry tech, the vitamizer bathes the chickens in \'vita-rays\', allowing them to produce eggs twice as fast.'],
        ['eldercollector', 'Elder Collector', 1300, 'Safely and gently moves Elder chickens away from the younger generation and stores them in a collector.']
    ],
    'pond': [],
    'incinerator': [
        ['trough', 'Ash Trough', 500, 'An ash trough allows you to collect the ash of incinerated food at its base, which is eaten exclusively by fire slimes. It\'s gross.']
    ],
    'silo': [
        ['additional', 'Additional storage', 500, 'A silo can have up to four ports for storing plorts and resources.'],
        ['additional', 'Additional storage', 500, 'A silo can have up to four ports for storing plorts and resources.'],
        ['additional', 'Additional storage', 500, 'A silo can have up to four ports for storing plorts and resources.'],
    ]
}

export const usageList = {
    'slimes': ['Slimes', 'slimes/pink'],
    'puddle': ['Puddle Slimes', 'slimes/puddle'],
    'food': ['Food', 'food/food'],
    'itemsfood': ['Items and Food', 'misc/resfood']
}