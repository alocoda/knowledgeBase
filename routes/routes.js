const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');




router.get('/', (req, res) => {
    res.render('index');
});

router.post('/login', authController.login);

router.post('/signup', authController.signup);

router.post('/signupdetails', authController.signupdetails);


//messages / chat

router.get('/sendMessage', messageController.sendMessage);
router.post('/sendFirstMessageToUser',messageController.sendFirstMessageToUser);
//router.post('/beginMessage', messageController.beginMessageMessage);
router.get('/message', messageController.messages);

module.exports = router;

