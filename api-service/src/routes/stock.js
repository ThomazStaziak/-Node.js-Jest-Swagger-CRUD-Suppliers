const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { getStockQuote } = require('../controllers/stockController');


router.get('/stock', verifyToken, getStockQuote);

module.exports = router;
