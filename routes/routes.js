const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userProfileController = require('../controllers/userProfileController');
const postContoller = require('../controllers/postContoller');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/login', authController.login);

router.post('/signup', authController.signup);

router.post('/signupdetails', authController.signupdetails);

router.get('/profile/:id', userProfileController.getProfile);

router.post('/addLike/:id', userProfileController.addLike);

router.get('/post/:postid', postContoller.getPost);


module.exports = router;