const express = require('express');
const Controller = require('../controller');

const router = express.Router()

router.get('/',Controller.home)
router.get('/register', Controller.register)
router.post('/register')
router.get('/login',)
router.post('/login')
module.exports = router;