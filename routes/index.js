const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Landing page')
}) // Landing Page atau Home Page
router.get('/register', (req, res) => {
  res.send('Register Page')
}) // Register Page
router.post('/register', (req, res) => {
  res.send('Post Register')
}) // Post Register
router.get('/login', (req, res) => {
  res.send('Login Page')
}) // Login Page
router.post('/login', (req, res) => {
  res.send('Post Login')
}) // Post Login

module.exports = router;