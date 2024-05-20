const express = require('express');
const router = express.Router();
const {
    registerUserController,
    loginUserController,
} = require('../controllers/authController');
const { authorizeValidation } = require('../middlewares/validationMiddleware');
const { registerSchema, loginSchema } = require('../validations/auth');

router.post('/register', authorizeValidation(registerSchema), registerUserController);
router.get('/login', authorizeValidation(loginSchema), loginUserController);

module.exports = router;