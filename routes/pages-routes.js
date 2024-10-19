const express = require('express');
const pageController = require('../controllers/pages-controller')

const router = express.Router()

router.get('/', pageController.getIndex);

router.get('/play', pageController.getPlay);

router.get('/collection', pageController.getCollection);

router.param('cardId', pageController.cardIdMiddleware)
router.get('/workshop/:cardId', pageController.getWorkshop);

router.get('/auth', pageController.getAuth);
module.exports = router;
