const mongoose = require('mongoose');

/*Schema defined in left->right top->down pattern, based on workshop page
    For better understanding look at workshop page's first line and compare it with
    schema's fields starting with imgURL
*/

const Schema = mongoose.Schema;
const cardSchema = new Schema({
    cardType: String, //PC, NPC, Monster
    description: String,


    imgIdURL: String, //  img/cards/id
    name: String,
    race: String,
    class: String,
    backstory: String,
    alignment: String,
    level: Number,
    exp: Number,

    armorClass: Number,
    speed: Number,
    Inspiration: Number,
    initiative: Number,

    gold: Number,
    hits: Number,
    tempHits: Number,
    hitDices: String,

    stats: [Number], //[Strenght, Agility, Constitution, Intelligence, Wisdom, Charisma]

    profinciencies: String,

    lore: String, //Backstory
    alliesAndOrgs: String,
    appearance: String,

    personalityTraits: String,
    ideals: String,
    bonds: String,
    flaws: String,

    notes1: String,
    notes2: String,
    notes3: String,
    notes4: String,

    items: {
        type: [Schema.Types.ObjectId],
        ref: "Item",
    },
    skills: String,

    spells: {
        type: [Schema.Types.ObjectId],
        ref: "Spell",
    },

    inventory: String,
    treasures: String,

    inFavs: Number,
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
