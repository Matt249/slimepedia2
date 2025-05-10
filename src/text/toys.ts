export enum Toy {
    Ball = 'ball',
    Bomb = 'bomb',
    Bouncy = 'bouncy',
    Moon = 'moon',
    Worm = 'worm',
    Puffer = 'puffer',
    Yarn = 'yarn',
    Duck = 'duck',
    Trash = 'trash',
    Fox = 'fox'
}

export const toyNames: {[key in Toy] : [string, string]} = {
    [Toy.Ball]: ['Beach Ball', 'Reduces agitation of nearby slimes, especially Pink Slimes who enjoy fun in the sun.'],
    [Toy.Bomb]: ['Bomb Ball', 'Reduces agitation of nearby slimes, especially Boom Slimes who probably think this sort of thing is funny.'], 
    [Toy.Bouncy]: ['Bouncy Ball', 'Reduces agitation of nearby slimes, especially Cotton Slimes who see it as serious competition.'], 
    [Toy.Moon]: ['Full Moon Ball', 'Reduces agitation of nearby slimes, especially Batty Slimes who see the night as their only true friend.'], 
    [Toy.Yarn]: ['Yarn Ball', 'Reduces agitation of nearby slimes, especially Tabby Slimes. Though, they still don\'t know how to knit anymore than other slimes'], 
    [Toy.Worm]: ['Glowbug', 'Reduces agitation of nearby slimes, especially Flutter Slimes who find it even more soothing than themselves.'], 
    [Toy.Puffer]: ['Plushie Puffer Fish', 'Reduces agitation of nearby slimes, especially Angler Slimes who don\'t mind prickly playmates.'], 
    [Toy.Duck]: ['Rubber Ducky', 'Reduces agitation of nearby slimes, especially Puddle Slimes who are less shy when a rubber ducky buddy is around.'], 
    [Toy.Trash]: ['Trashcan', 'Reduces agitation of nearby slimes, especially Ringtail Slimes who love to eat trash and do crimes.'], 
    [Toy.Fox]: ['Glo Glo Foxifur', 'Greatly reduces agitation of all nearby slimes. Perfect for slimes getting into mischief.\nNote: Steam-exclusive toy.'],
};