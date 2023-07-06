const express = require('express');
const Controller = require('../controller');

const router = express.Router()

router.get('/',Controller.home)
router.get('/register', Controller.register)
router.post('/register', Controller.createUser)
router.get('/login',Controller.login)
router.post('/login',Controller.postLogin)
router.get('/dishes',Controller.dishes)
module.exports = router;