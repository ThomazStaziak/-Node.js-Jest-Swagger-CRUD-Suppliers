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

const registerUser = async (email, role) => {
    try {
        const randomizedPassword = Math.random().toString(36).substring(2);
        const passwordHash = await bcrypt.hash(randomizedPassword, 10);

        const user = User.create({
            email, 
            password: passwordHash,
            role
        })

        return { email, password: randomizedPassword, role }
    } catch (error) {
        console.log(error)
        throw new Error('Internal server error');
    }
}

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Password is incorrect');
        }

        const token = generateJwtToken({ id: user.id });

        return { token };
    } catch (error) {
        throw new Error('Internal server error');
    }
}

module.exports = { registerUser, loginUser }