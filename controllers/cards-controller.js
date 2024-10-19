const countCardsHelper = require('../helpers/countCards');
const config = require('../config');
const Card = require('../models/Card')

const handeError = (res, error) => {
    res.status(500).json({error});  
};

const cardController = {

    getCards: async (req,res) => {
        const page = parseInt(req.query.page);
        const pageSize = config.other.pagination.pagesize;
        
        const cardType = req.query.cardType || "";
        const cardClass = req.query.cardClass || "";
        const minLevel = req.query.minLevel? parseInt(req.query.minLevel) : 1;
        const maxLevel = req.query.maxLevel? parseInt(req.query.maxLevel) : 20;
        const cardName = req.query.cardName || "";

        const filter = {
            level: {
                $gte: minLevel,
                $lte: maxLevel,
            },
        };
        if(cardType) {filter.cardType = cardType;}
        if(cardClass) {filter.class = cardClass;}
        if(cardName) {filter.name = cardName;}

        try{
            const response = await Card.find(filter)
                .skip(page-1)
                .limit(pageSize);
            const cards = await response;
            const count = await countCardsHelper(cardType, cardName, cardClass, minLevel, maxLevel);
            res.status(200).json({
                cards,
                count,
                totalPages: Math.ceil(count/pageSize),
            });
        } catch(error) {
            console.error('Error fetching cards', error);
            throw new Error('failed to retrieve cards')
        };
    },

    countCards: async (req,res) => {
        const cardType = req.query.cardType || "";
        const cardClass = req.query.cardClass || "";
        const minLevel = req.query.minLevel? parseInt(req.query.minLevel) : 1;
        const maxLevel = req.query.maxLevel? parseInt(req.query.maxLevel) : 20;
    
        try {
        const count = await countCardsHelper(cardType, cardClass, minLevel, maxLevel);
        res.status(200).json(count);
        } catch(error) {
            console.error('Error counting cards', error);
            throw new Error('Failed to retrieve cards')
        };
    },

    changeCard: async (req,res) => {
        const cardId = req.query.cardId;

        const currCard = await Card.findById(cardId);
        const changedCard = req.body.card;


        if(!cardId) {
            res.status(400).json({error: "Wrong id"});
            return
        }



    },

}

module.exports = cardController;
