const express = require('express');
const router = express.Router();
const { authorizeToken } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/roleMiddleware');
const { authorizeValidation } = require('../middlewares/validationMiddleware');
const { 
    getStockQuoteController, 
    getHistoryController, 
    getStatsController
} = require('../controllers/stockController');
const { stockSchema } = require('../validations/stock');

router.get('/stock', authorizeToken, authorizeValidation(stockSchema, 'query'), getStockQuoteController);
router.get('/history', authorizeToken, getHistoryController);
router.get('/stats', authorizeToken, authorizeRole('admin'), getStatsController);

module.exports = router;
