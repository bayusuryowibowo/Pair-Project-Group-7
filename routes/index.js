const express = require('express');
const Controller = require('../controller');
const isLogin = require('../middleware/isLogin');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router()

router.get('/', Controller.home)
router.get('/register', Controller.register)
router.post('/register', Controller.createUser)
router.get('/login',Controller.login)
router.post('/login',Controller.postLogin)
router.get('/dishes',isAdmin,Controller.dishes)
router.get('/reservation',isLogin,Controller.reservation)
router.get('/logout',Controller.logout)
router.post('/reservation',Controller.postReservation)
router.get('/secretreservation',isAdmin,Controller.dataReservation)
router.get('/cancelreservation',isLogin,Controller.cancelReservation)
router.get('/editprofile',isLogin,Controller.editProfile)
router.post('/editprofile',isLogin,Controller.saveProfile)
router.get('/reservation/:code/delete',Controller.deleteReservation)


module.exports = router;