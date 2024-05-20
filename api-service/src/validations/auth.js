const Yup = require('yup');

const registerSchema = Yup.object({
    email: Yup.string().email().required(),
    role: Yup.string().oneOf(['user', 'admin']).required()
});

const loginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required()
});

module.exports = { registerSchema, loginSchema };