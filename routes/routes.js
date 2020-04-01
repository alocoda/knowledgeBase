const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/login', loginController.login);

module.exports = router;