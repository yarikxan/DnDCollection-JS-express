const mongoose = require('mongoose');

const Schema = new mongoose.Schema;
const itemSchema = new Schema({
    name: String,
    type: String,
    imgidURL: String,
    cost: Number,
    stats: String,
    weight: String,
    description: String,
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
