const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/login', authController.login);

router.post('/signup', authController.signup);

router.post('/signupdetails', authController.signupdetails)

module.exports = router;