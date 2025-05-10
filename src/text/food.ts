export enum Food {
    Carrot = 'carrot',
    Lettuce = 'lettuce',
    Beet = 'beet',
    Onion = 'onion',
    Pogo = 'pogo',
    Mango = 'mango',
    Cuberry = 'cuberry',
    Granite = 'granite',
    Pear = 'pear',
    Cherry = 'cherry',
    Chick = 'chick',
    Hen = 'hen',
    Rooster = 'rooster',
    ChickSea = 'chickSea',
    HenSea = 'henSea',
    ChickStony = 'chickStony',
    HenStony = 'henStony',
    ChickBriar = 'chickBriar',
    HenBriar = 'henBriar',
    ChickCluck = 'chickCluck',
    HenCluck = 'henCluck',
    ChickPainted = 'chickPainted',
    HenPainted = 'henPainted',
    ChickCandied = 'chickCandied',
    HenCandied = 'henCandied',
    HenElder = 'henElder',
    RoosterElder = 'roosterElder',
    Nectar = 'nectar',
    Water = 'water',
    UnstableVeggie = 'unstableveggie',
    UnstableFruit = 'unstablefruit',
    UnstableMeat = 'unstablemeat',
    RanchersnSlimes = 'ranchersnslimes',
    Ash = 'ash',
}

export const foodBlackList: (Food | null)[] = [
    Food.RanchersnSlimes,
    Food.Ash,
    null
]

export enum FoodType {
    Any = 'any',
    Fruits = 'fruits',
    Veggies = 'veggies',
    Meat = 'meat',
    Nectar = 'nectar',
    Water = 'water',
    Ash = 'ash',
    RanchersnSlimes = 'ranchersnslimes',
}

export const foodTypeBlacklist: FoodType[] = [
    FoodType.Any,
    FoodType.Ash,
    FoodType.RanchersnSlimes,
];

export const foodTypeList: { [key in FoodType]: [string, string]} = {
    [FoodType.Any]: ["Any", "Any"],
    [FoodType.Meat]: ["Meat", "Meat"],
    [FoodType.Fruits]: ["Fruits", "Fruit"],
    [FoodType.Veggies]: ["Veggies", "Veggie"],
    [FoodType.Water]: ["Water", "Water"],
    [FoodType.Ash]: ["Ash", "Ash"],
    [FoodType.Nectar]: ["Nectar", "Nectar"],
    [FoodType.RanchersnSlimes]: ["Ranchers and Slimes", "Ranchers and Slimes"],
};

export const foodList: { [key in Food]: [string, FoodType | null, string[]]} = {
    [Food.Carrot]: ["Carrot", FoodType.Veggies, ['ar', 'rf', 'ss', 'ev', 'pb', 'gl']],
    [Food.Lettuce]: ["Water Lettuce", FoodType.Veggies, ['rf', 'ss', 'ev', 'gl']],
    [Food.Beet]: ["Heart Beet", FoodType.Veggies, ['ss', 'ev', 'pb', 'gl']],
    [Food.Onion]: ["Odd Onion", FoodType.Veggies, ['ev', 'pb', 'gl']],
    [Food.Pogo]: ["Pogofruit", FoodType.Fruits, ['ar', 'rf', 'ss', 'ev', 'pb', 'gl']],
    [Food.Cuberry]: ["Cuberry", FoodType.Fruits, ['rf', 'ev', 'ss', 'pb', 'gl']],
    [Food.Mango]: ["Mint Mango", FoodType.Fruits, ['ss', 'gl']],
    [Food.Granite]: ["Pomegranite", FoodType.Fruits, ['ss', 'ev', 'gl']],
    [Food.Pear]: ["Prickle Pear", FoodType.Fruits, ['ev', 'gl']],
    [Food.Cherry]: ["Polaricherry", FoodType.Fruits, ['gl']],
    [Food.Chick]: ["Chickadoo", null, ['rf', 'ss', 'ev', 'pb', 'gl']],
    [Food.ChickBriar]: ["Briar Chick", null, ['ev', 'gl']],
    [Food.ChickCandied]: ["Candied Chick", null, ['gl']],
    [Food.ChickCluck]: ["Thundercluck Chick", null, ['pb']],
    [Food.ChickPainted]: ["Painted Chick", null, ['ss', 'gl']],
    [Food.ChickSea]: ["Sea Chick", null, ['ss', 'ev', 'gl']],
    [Food.ChickStony]: ["Stony Chick", null, ['rf', 'ev', 'gl']],
    [Food.Hen]: ["Hen Hen", FoodType.Meat, ['gu', 'rf', 'ss', 'ev', 'pb', 'gl']],
    [Food.HenStony]: ["Stony Hen", FoodType.Meat, ['rf', 'ev', 'gl']],
    [Food.HenSea]: ["Sea Hen", FoodType.Meat, ['ss', 'ev', 'gl']],
    [Food.HenBriar]: ["Briar Hen", FoodType.Meat, ['ev', 'gl']],
    [Food.HenCluck]: ["Thundercluck Hen", FoodType.Meat, ['pb']],
    [Food.HenPainted]: ["Painted Hen", FoodType.Meat, ['ss', 'gl']],
    [Food.HenCandied]: ["Candied Hen", FoodType.Meat, ['gl']],
    [Food.Rooster]: ["Rooster", FoodType.Meat, ['gu', 'rf', 'ss', 'ev', 'pb', 'gl']],
    [Food.HenElder]: ['Elder Hen', FoodType.Meat, ['rf', 'ss', 'ev', 'pb', 'gl']],
    [Food.RoosterElder]: ['Elder Rooster', FoodType.Meat, ['rf', 'ss', 'ev', 'pb', 'gl']],
    [Food.Water]: ["Water", FoodType.Water, ['tp', 'ds', 'ss', 'ev', 'pb', 'gl']],
    [Food.Nectar]: ["Moondew Nectar", FoodType.Nectar, ['ss']],
    [Food.UnstableFruit]: ["Unstable Fruit", FoodType.Fruits, ['gl']],
    [Food.UnstableVeggie]: ["Unstable Veggie", FoodType.Veggies, ['gl']],
    [Food.UnstableMeat]: ["Unstable Meat", FoodType.Meat, ['gl']],
    [Food.RanchersnSlimes]: ["Ranchers and Slimes", FoodType.RanchersnSlimes, []],
    [Food.Ash]: ["Ash", FoodType.Ash, []]
};

export const foodDescription: { [key: string]: string} = {
    'lorem': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'carrot': 'Next to a vacpack, it\'s a rancher\'s best friend.',
    'beet': 'If you listen to it closely, you can faintly hear a veggie.',
    'onion': 'I wouldn\'t trust this onion, even less so than a normal onion.',
    'lettuce': 'The only glass of water with your daily dose of fiber!',
    'pogo': 'The most common fruit found on the Range, and some say, the most delicious.',
    'cuberry': 'Delicate, sweet, and they never roll off the table.',
    'mango': 'Intensely sweet with a cool, minty finish.',
    'granite': 'Rich in minerals!',
    'pear': 'This is a fruit that knows how to fight back.',
    'cherry': 'Sharply sour or sickeningly sweet.',
    'chick': 'So little and soft you\'d think they\'re filled with marshmallow.',
    'chickBriar': 'A breed of chick that\'s totally bush-league.',
    'chickCandied': 'The sweetest chicks grow into the toughest jawbreakers.',
    'chickCluck': 'The king of chickens has to start somewhere.',
    'chickPainted': 'A tiny chick that\'s hiding a bounty of colorful potential.',
    'chickSea': 'Equal parts salt and fluff.',
    'chickStony': 'This little chick had quite a hard upbringing.',
    'hen': 'A hearty chicken bred to be twice as tasty as its cousin on Earth.',
    'henStony': 'Has a rock solid conviction... in chicken stuff.',
    'henBriar': 'A real wild bird that loves to ramble in the bramble.',
    'henPainted': 'Some believe it\'s what lies at the end of a rainbow. Totally disappointing.',
    'henCandied': 'Try to catch them before the sugar rush.',
    'henSea': 'Loveable trash. Like your favorite bad movie.',
    'henCluck': 'A chicken that\'s always ready to throw down.',
    'rooster': 'Struts his stuff like he\'s king of the coop.',
    'henElder': 'An old bird whose egg-laying days are over, easy.',
    'roosterElder': 'Shakes his tail feathers and no one cares.',
    'nectar': 'Very sweet but VERY sticky. Handle with care.',
    'water': 'Give your slimes a bath, they really need it.',
    'ash': 'A fine powder that\'s great for making slimes sneeze.',
    'unstablefruit': 'Unnatural objects with a slippery grasp on reality.',
    'unstableveggie': 'Unnatural objects with a slippery grasp on reality.',
    'unstablemeat': 'Unnatural objects with a slippery grasp on reality.'
}



export const foodpedia: { [key: string]: [string, string]} = {
    'carrot': [
        "The humble carrot was brought to the Far, Far Range because they're easy to grow and nutritious. Most ranchers swear by them as they're a handy portable snack, promote good night vision, and when juiced are only second to coffee as the perfect morning beverage.",
        "Deposit a carrot into a garden's depositor and you'll have a large carrot crop of your own."
    ],
    'pogo': [
        "Pogofruit are a common sight almost anywhere on the Far, Far Range. Tasting a bit like a peach, they're most notable for having their trademark spots both on and under the skin.",
        "Deposit a pogofruit into a garden's depositor and you'll grow a large pogofruit tree of your very own."
    ],
    'beet': [
        "Heart beets get their name from their deep, red color and heart-like shape. Heart beets are also unusually juicy for a beet, making it the only veggie that's not for the squeamish in the kitchen.",
        "Deposit a heart beet into a garden's depositor and you'll have a large heart beet crop of your very own."
    ],
    'onion': [
        "Odd Onions can only grow in the Indigo Quarry; however, you'll never encounter an Odd Onion patch. Instead, Odd Onions can be found randomly in other veggie patches. As the saying goes \"Forage into the Indigo Quarry and you'll always find the Odd Onion in your haul.\"",
        "Deposit an Odd Onion into a garden's depositor and strangely, carrots will begin to grow. However, there is a good chance you'll get some odd onions in your crop as well."
    ],
    'lettuce': [
        "Like a desert bloom or a deep sea pearl, water lettuce is a small miracle. The dry season can be difficult for wildlife on the Far, Far Range. But through the humble water lettuce, nature has found a way to provide. The water stored inside the plant prevents its leaves from wilting under the sun's rays, and in turn the crisp leaves keep the water cool and protected, perfect for a thirsty critter in search of relief from the heat.",
        "Deposit a water lettuce into a garden's depositor and you'll have a large water lettuce crop of your very own."
    ],
    'cuberry': [
        "Due to their sweet taste and curious shape, cuberries were quick to become a favorite amongst the first ranchers on the range. They are often used in cakes and pies when celebrating special occasions, like birthdays or Plortapalooza.",
        "Deposit a cuberry into a garden's depositor and you'll grow a large cuberry tree of your own."
    ],
    'mango': [
        "The mint mango is perhaps the sweetest fruit ever discovered. Its appearance is that of a mango, with a thicker, syrup-like juice, and a bright, minty aftertaste. It's no wonder Honey Slimes seek them out or that they have such amazingly fresh breath.",
        "Deposit a mint mango into a garden's depositor, and you'll grow a large mint mango tree of your very own."
    ],
    'granite': [
        "The pomegranite is as mysterious as it is ancient. A fruit that grows only in the dark caves beneath the earth, it grows without sunlight, without warmth. It should not be, and yet, it is. A living paradox? Or a symbol of nature's resilience, of the ability for life to thrive even in the unlikeliest of spaces? Pretty deep stuff.",
        "Deposit a pomegranite into a garden's depositor and you'll grow a large pomegranite tree of your own."
    ],
    'pear': [
        "Prickle pears are a fruit that know how to put up a fight. With a thick, leathery skin and covered sharp barbs, they're an 'acquired taste' to be sure. But those that put forth the (cautious) effort will find one of the sweetest fruits in the known universe hiding within.",
        "Deposit a prickle pear into a garden's depositor and you'll grow a large prickle pear tree of your very own."
    ],
    'cherry': [
        " The polaricherry is somehow both the most sweet and the most sour fruit on Rainbow Island, depending on which side you're looking at when you take a bite. Is their flavor profile another strange effect of the labyrinth, or a natural variation?",
        " Deposit a polaricherry into a garden's depositor and you'll grow a large polaricherry tree of your own."
    ],
    'chick': [
        "Chickadoos of all varieties will never be eaten by slimes. Some believe this is because slimes are too kind-hearted to do such a thing. Others believe it's because chickadoos don't yet have enough meat on their bones. Chicks are baby chickens that will eventually grow into a hen hen or more rarely, a roostro.",
        "Keep chickadoos in a safe place and they'll eventually grow into a Hen Hen or Roostro."
    ],
    'chickBriar': [
        "Briar chickadoos are baby chickens that will eventually grow into a briar hen or more rarely, a roostro. Chicks of all varieties will never be eaten by slimes. Some believe this is because slimes are too kind-hearted to do such a thing. Others believe it's because chickadoos don't yet have enough meat on their bones.",
        "Keep Briar Chicks in a safe place and they'll eventually grow into a Briar Hen or Roostro."
    ],
    'chickCandied': [
        "Candied chickadoos are baby chickens that will eventually grow into a candied hen or more rarely, a roostro. Chickadoos of all varieties will never be eaten by slimes. Some believe this is because slimes are too kind-hearted to do such a thing. Others believe it's because chickadoos don't yet have enough meat on their bones.",
        "Keep candied chickadoos in a safe place and they'll eventually grow into a candied hen or roostro."
    ],
    'chickCluck': [
        "Thunder chickadoos are baby chickens that will eventually grow into a thundercluck or more rarely, a roostro. Chicks of all varieties will never be eaten by slimes. Some believe this is because slimes are too kind-hearted to do such a thing. Others believe it's because chickadoos don't yet have enough meat on their bones.",
        "Keep thunder chickadoos in a safe place and they'll eventually grow into a thundercluck or Roostro."
    ],
    'chickPainted': [
        "Painted chickadoos are baby chickens that will eventually grow into a painted hen or more rarely, a roostro. Chicks of all varieties will never be eaten by slimes. Some believe this is because slimes are too kind-hearted to do such a thing. Others believe it's because chickadoos don't yet have enough meat on their bones.",
        "Keep Painted chickadoos in a safe place and they'll eventually grow into a Painted Hen or a Roostro. "
    ],
    'chickSea': [
        "Chickadoos of all varieties will never be eaten by slimes. Some believe this is because slimes are too kind-hearted to do such a thing. Others believe it's because chickadoos don't yet have enough meat on their bones. Sea chickadoos are baby chickens that will eventually grow into a sea hen or more rarely, a roostro.",
        " Keep sea chickadoos in a safe place and they'll eventually grow into a sea hen or roostro. "
    ],
    'chickStony': [
        "Stony chickadoos are baby chickens that will eventually grow into a stony hen or more rarely, a roostro. Chicks of all varieties will never be eaten by slimes. Some believe this is because slimes are too kind-hearted to do such a thing. Others believe it's because chickadoos don't yet have enough meat on their bones. ",
        "Keep Stony Chicks in a safe place and they'll eventually grow into a Stony Hen or a Roostro."
    ],
    'hen': [
        "Hen Hens are a special breed of chicken bred to survive the climate of the Far, Far Range. While appearing more or less like a big chicken, these burly birds are much more adept at fending for themselves, making them ideal for ranchers who might otherwise be distracted by a few hundred hungry slimes.",
        "Hen Hens in close proximity to roostros will periodically lay eggs that produce chickadoos. However, keeping too many hens or roostros in close proximity makes them anxious and egg production will come to halt. Savvy ranchers with an understanding of the complex nature of chicken romance always keep their coops from exceeding 12 grown chickens."
    ],
    'henStony': [
        "Stony hens are thought to have evolved from hen hens who once trekked deep into the mountains of the Far, Far Range. Perhaps these birds were seeking a clarity of mind that one can truly obtain through meditation amongst these lofty, barren crags. But most likely, they were just stupid and got lost.",
        "Stony hens in close proximity to roostros will periodically lay eggs that produce stony chickadoos. However, keeping too many hens or roostros in close proximity makes them anxious and egg production will come to a halt. Savvy ranchers with an understanding of the complex nature of chicken romance always keep their coops from exceeding 12 grown chickens."
    ],
    'henBriar': [
        "Briar hens are a chicken variant born from the wild thickets of the Far, Far Range. They were first discovered long ago by an explorer who noted that they seemed to have a complex tribal structure, and a fascinating series of chicken customs. He even may have joined the briar tribe as an honorary chicken himself! His records end there however, and we know nothing else about him or his findings. Oh, but his name was Carl. We know that.",
        "Briar hens in close proximity to roostros will periodically lay eggs that produce briar chickadoos. However, keeping too many hens or roostros in close proximity makes them anxious and egg production will come to halt. Savvy ranchers with an understanding of the complex nature of chicken romance always keep their coops from exceeding 12 grown chickens."
    ],
    'henPainted': [
        "Painted Hens are the colorful chicken variants found in Starlight Strand. It is unknown what caused their rainbow-like plumage to occur. One theory suggests their colors are a biological mimicry of the prismatic glass found within the desert, while another theory states that their wild colors made them the dominant mates of Cluck Kingdoms and thus were banished to the desert by a coalition of jealous chickens who couldn't compete with these fashionable fouls. But the latter theory is only believed by one strange person, so we're not sure why it would have been included here.",
        "Painted Hens in close proximity to roostros will periodically lay eggs that produce painted chickadoos. However, keeping too many hens or roostros in close proximity make them anxious and egg production will come to a halt. Savvy ranchers with an understanding of the complex nature of chicken romance always keep their coops from exceeding 12 grown chickens."
    ],
    'henSea': [
        "Old sailors say that sea hens are actually demons in disguise, and that their vacant expressions are actually a diabolically calculated misdirect to hide evil intent. Plotting, waiting for their moment... to strike.",
        "Sea hens in close proximity to roostros will periodically lay eggs that produce sea chickadoos. However, keeping too many chickens in close proximity makes them anxious and egg production will come to a halt. Savvy ranchers with an understanding of the complex nature of chicken romance will monitor growth rates in their coops and reduce density when growth beings to slow."
    ],
    'henCluck': [
        "Thought to be extinct for over a billion years, thunderclucks are a variety of prehistoric hen that ruled the roost during the Jellasic Period and absolute proof that dinosaurs were basically just giant chickens. Historians had long believed they were wiped out from a giant meteor, but seeing them now it's clear that the roostros were probably just super terrified of them and it just sort of took care of itself.",
        "Thunderclucks in close proximity to roostros will periodically lay eggs that produce thunder chickadoos. However, keeping too many chickens in close proximity makes them anxious and egg production will come to a halt. Savvy ranchers with an understanding of the complex nature of chicken romance will monitor growth rates in their coops and reduce density when growth beings to slow."
    ],
    'henCandied': [
        "Candied hens are a mysterious breed of chicken found in the Grey Labyrinth. Their unusual sweetness is almost too perfect, as if pulled from the dreams of a hungry slime. How did such a hen come to be in the labyrinth?",
        " Candied hens in close proximity to roostros will periodically lay eggs that produce candied chickadoos. However, keeping too many chickens in close proximity makes them anxious and egg production will come to a halt. Savvy ranchers with an understanding of the complex nature of chicken romance will monitor growth rates in their coops and reduce density when growth beings to slow"
    ],
    'rooster': [
        "Roostros are the alpha birds on the Far, Far Range and half of the equation required to breed chickens on the ranch. However, roostros are rarer than any hen making them a great find any time one is discovered. To acquire a roostro, either find one out on the range or breed them on the ranch. Any type of chickadoo has a small chance of growing into a roostro. Some ranchers believe that these odds increase if you greet the Rooster King's crow at sunrise with an enthusiastic 'good morning!'",
        "All hens in close proximity to roostros will periodically lay eggs that produce chickadoos. However, keeping too many hens or roostros in close proximity makes them anxious and egg production will come to a halt. Savvy ranchers with an understanding of the complex nature of chicken romance always keep their coops from exceeding 12 grown chickens."
    ],
    'henElder': [
        "Elder hens have lived a full-feathered life. They've met the roostro of their dreams, seen their little chickadoos grow up, and are ready to start the next chapter of their chicken lives. In all likelihood this will include getting the names of countless books, movies and actors wrong. But don't blame them for that. They're chickens for goodness sake.",
        "An elder hen can no longer lay eggs and serves no other purpose than becoming a slightly tough chicken dinner."
    ],
    'roosterElder': [
        "Elder roostros are the senior-aged roostros who have retired from the otherwise bustling life of their younger counterparts. 'Young roostros crow too much, they move too fast, and frankly have no respect for their elders,' an elder roostro might say of youths; as they make a gross, smacking sound with their lips. Though this is of course impossible, as roostros do not have lips.",
        "An elder roostro can no longer sire chickadoos and serves no other purpose than becoming a slightly tough chicken dinner."
    ],
    'nectar': [
        "This sweet syrup comes from Rainbow Island's most unusual plant, the moondew flower, which only blooms at night. Initially scientists thought the buds of this flower never opened. But that was just because they tended to call it quits around 5, maybe 4:45 if they were trying to beat traffic. That is, until that fateful night when one Dr. Arnold Penobscott forgot about Daylight Savings Time and wound up working an hour late. As he went to grab his jacket he was surprised to see the moondew flower, in full bloom. That's just how discoveries are made sometimes.",
        "Moondew Nectar cannot be grown in the ranch's gardens, but it can be used to feed flutter slimes."
    ],
    'water': [
        "Water can be used to speed up garden growth, calm down slimes, and disperse pesky Tarr before they gobble up your slimes. Water can even wash away Crystal slime's crystal formations or neutralize Boom slimes before they explode. Water is a truly wonderous tool for any rancher, but remember where you found it: water sources are few and far between.",
        "Water is an extremely useful resource found across the Far, Far Range. Unlike water in the slime sea, water from pools and waterfalls can be suctioned into the vac pack and stored using the handy Water Tank upgrade. Once stored, it can be shot out of the vac at the world around you, creating numerous beneficial effects."
    ],
    'unstablefruit': [
        "Caught and stretched across reality, matter, and time, resources affected by the prisma disruptions of the Grey Labyrinth are too volatile to exist for long in the natural world. Eventually, these resources will pop out of existence, or even a rancher's vac tank, to escape the confines of reality and mundane three dimensions. Basically, they've got too many reality appointments and they are constantly rushing to get to their next one.",
        "While unable to be used for regular ranching, unstable resources do seem to have unique interactions with the slimes within the Grey Labyrinth. It will take an intrepid slime scientist or adventurous rancher to find out how these disrupted resources impact the normal slime digestive process. Due to their reality-bending energies, unstable resources directly conflict with warp technology. They cannot be teleported and even prevent ranchers from using warp technology themselves as long as unstable resources are within their vac tanks."
    ],
    'unstablemeat': [
        "Caught and stretched across reality, matter, and time, resources affected by the prisma disruptions of the Grey Labyrinth are too volatile to exist for long in the natural world. Eventually, these resources will pop out of existence, or even a rancher's vac tank, to escape the confines of reality and mundane three dimensions. Basically, they've got too many reality appointments and they are constantly rushing to get to their next one.",
        "While unable to be used for regular ranching, unstable resources do seem to have unique interactions with the slimes within the Grey Labyrinth. It will take an intrepid slime scientist or adventurous rancher to find out how these disrupted resources impact the normal slime digestive process. Due to their reality-bending energies, unstable resources directly conflict with warp technology. They cannot be teleported and even prevent ranchers from using warp technology themselves as long as unstable resources are within their vac tanks."
    ],
    'unstableveggie': [
        "Caught and stretched across reality, matter, and time, resources affected by the prisma disruptions of the Grey Labyrinth are too volatile to exist for long in the natural world. Eventually, these resources will pop out of existence, or even a rancher's vac tank, to escape the confines of reality and mundane three dimensions. Basically, they've got too many reality appointments and they are constantly rushing to get to their next one.",
        "While unable to be used for regular ranching, unstable resources do seem to have unique interactions with the slimes within the Grey Labyrinth. It will take an intrepid slime scientist or adventurous rancher to find out how these disrupted resources impact the normal slime digestive process. Due to their reality-bending energies, unstable resources directly conflict with warp technology. They cannot be teleported and even prevent ranchers from using warp technology themselves as long as unstable resources are within their vac tanks."
    ],
}