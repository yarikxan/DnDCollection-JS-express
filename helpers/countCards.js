const Card = require('../models/Card');

countCardsHelper = async (cardType, cardName, cardClass, minLevel, maxLevel) => {
    const query = {
        level: {
            $gte: minLevel || 1,
            $lte: maxLevel || 1,
        },
    };
    if(cardType) {query.cardType = cardType;}
    if(cardClass) {query.class = cardClass;}
    if(cardName) {query.name = cardName;}
    const count = await Card.countDocuments(query);
    return count;
};

module.exports = countCardsHelper;
