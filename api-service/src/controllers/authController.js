const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateJwtToken = (user) => {
    return jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' } 
    );
}

const registerUserController = async (req, res) => {
    try {
        const { email, role } = req.body;

        const user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const randomizedPassword = Math.random().toString(36).substring(2);
        const passwordHash = await bcrypt.hash(randomizedPassword, 10);

        await User.create({
            email, 
            password: passwordHash,
            role
        })

        res.status(201).json({ email, password: randomizedPassword, role });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
           return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
           return res.status(400).json({ message: 'Password is incorrect' });
        }

        const token = generateJwtToken({ id: user.id, role: user.role });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { registerUserController, loginUserController }