const { Router } = require('express');
const { loginUser, signupUser } = require('../controllers/authControllers')

const router = Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

module.exports = router