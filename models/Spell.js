const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const spellSchema = new Schema({
    level: Number,
    school: String,
    name: String,
    components: String,
    castingTime: String,
    duration: String,
    range: Number,
    damage: String,
    description: String,
});

const Spell = mongoose.model('Spell', spellSchema);
module.exports = Spell;
