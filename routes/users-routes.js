const express = require('express');
const userController = require('../controllers/users-controller');

const router = express.Router();

router.get('/user/:username', userController.getUser);

router.post('/createUser', userController.createUser, (err) => {console.log(err)});

router.post('/authUser', userController.authUser, (err) => {console.log(err)});

router.patch('/changeUser', userController.changeUserData, (err) => {console.log(err)});

router.patch('/changeUserPassword', userController.changeUserPassword);

module.exports = router;
