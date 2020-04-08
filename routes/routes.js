const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const homeController = require("../controllers/HomeController");
const userProfileController = require('../controllers/userProfileController');
const postController = require('../controllers/postController');


router.get('/', (req, res) => {
    res.render('index');
});

router.post('/login', authController.login);

router.post('/signup', authController.signup);

router.post('/signupdetails', authController.signupdetails);

router.get('/home', homeController.latestPosts)

router.get('/nextpost', homeController.latestPostsNext)

router.get('/prevpost', homeController.latestPostsPrev)

router.post('/newpost', homeController.newPost)

router.get('/logout', homeController.logout)

router.get('/profile', homeController.getProfile)

router.get('/search', homeController.search)

router.get('/filter', homeController.filterPosts)

router.get('/profile/:id', userProfileController.getProfile);

router.post('/addLike/:id', userProfileController.addLike);

router.get('/post/:postid', postController.getPost);

router.post('/post/:postid/reply', postController.postReply);

module.exports = router;