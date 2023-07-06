const express = require('express');
const Controller = require('../controller');
const isLogin = require('../middleware/isLogin')

const router = express.Router()

router.get('/',Controller.home)
router.get('/register', Controller.register)
router.post('/register', Controller.createUser)
router.get('/login',Controller.login)
router.post('/login',Controller.postLogin)
router.get('/dishes',isLogin,Controller.dishes)
router.get('/reservation',isLogin,Controller.reservation)
router.get('/logout',Controller.logout)

module.exports = router;