const express = require('express');
const router = express.Router();
const { getStockQuote } = require('../controllers/stockController');
const { authorizeValidation } = require('../middlewares/validationMiddleware');
const { stockSchema } = require('../validations/stock');

router.get('/stock', authorizeValidation(stockSchema, 'query'), getStockQuote);

module.exports = router;
