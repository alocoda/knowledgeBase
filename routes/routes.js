const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/login', authController.login);

router.post('/signup', authController.signup);

router.post('/signupdetails', authController.signupdetails);

router.get('/profile/:id', profileController.getprofile);

module.exports = router;