const { registerUser, loginUser } = require('../services/authService');

const registerUserController = async (req, res) => {
    try {
        const { email, role } = req.body;

        console.log(req.body)

        if (!email) {
            return res.status(400).json({ message: 'email is required' });
        }
        
        if (!role) {
            return res.status(400).json({ message: 'role is required' });
        }

        const user = await registerUser(email, role);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'email is required' });
        }
        
        if (!password) {
            return res.status(400).json({ message: 'password is required' });
        }

        const token = await loginUser(email, password);
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { registerUserController, loginUserController }