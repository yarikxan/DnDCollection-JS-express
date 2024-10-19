const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    favoredCards: {
        type: [Schema.Types.ObjectId],
        ref: "Card",
    },
    madeCards: {
        type: [Schema.Types.ObjectId],
        ref: "Card",
    },
    isAdmin: Boolean,
    resetCode: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
