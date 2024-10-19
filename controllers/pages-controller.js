const Card = require('../models/Card');

const pageController = {
    getIndex: (req, res) => {
        res.render('index');
    },

    getPlay: (req, res) => {
        res.render('play');
    },

    getCollection: async (req,res) => {
        res.render('collection');
    },

    cardIdMiddleware: async (req, res, next, cardId) => {
        if(cardId == 'new'){
            const newCard = new Card({});
            const savedNewCard = await newCard.save();
            req.params.cardId = savedNewCard.id;

            return res.redirect(`/workshop/${savedNewCard._id}`)
        }
        next();
    },

    getWorkshop: async (req,res) => {
        const existingCard = await Card.findById(req.params.cardId);
        res.render('workshop', {card: existingCard});
    },

    getAuth: (req,res) => {
        const destination = req.query.destination || "";
        res.render('authorize', {destination: destination});
    },
}
module.exports = pageController;
