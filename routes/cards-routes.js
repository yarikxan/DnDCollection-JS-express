const express = require('express');
const cardController = require('../controllers/cards-controller')

const router = express.Router();
const handleError = (res, error) => {
    res.status(500).json({error});
};

router.get('/getCards', cardController.getCards);

router.get('/countCards', cardController.countCards);

module.exports = router;
