const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized request' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden request' });
    }
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
