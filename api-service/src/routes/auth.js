const express = require('express');
const router = express.Router();
const {
    registerUserController,
    loginUserController,
} = require('../controllers/authController');

router.post('/register', registerUserController);
router.get('/login', loginUserController);

module.exports = router;