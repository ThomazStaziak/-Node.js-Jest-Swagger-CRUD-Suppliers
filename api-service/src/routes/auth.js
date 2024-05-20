const express = require('express');
const router = express.Router();
const {
    registerUserController,
    loginUserController,
    resetPasswordController
} = require('../controllers/authController');
const { authorizeValidation } = require('../middlewares/validationMiddleware');
const { registerSchema, loginSchema, resetSchema } = require('../validations/auth');

router.post('/register', authorizeValidation(registerSchema), registerUserController);
router.get('/login', authorizeValidation(loginSchema), loginUserController);
router.post('/reset-password', authorizeValidation(resetSchema), resetPasswordController);

module.exports = router;