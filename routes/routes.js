const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const postRepliesContoller = require('../controllers/postRepliesContoller');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/profile/:id', userProfileController.getProfile);

router.post('/addLike/:id', userProfileController.addLike);

module.exports = router;