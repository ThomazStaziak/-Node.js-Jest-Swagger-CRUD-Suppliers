const stockService = require('../services/stockService');
const logger = require('../utils/logger');

async function getStockQuote(req, res) {
    const { q: stockCode } = req.query;

    if (!stockCode) {
        return res.status(400).json({ message: 'Stock code cannot be null' });
    }

    try {
        const stockQuote = await stockService(stockCode);

        logger.info('Stock quote request successful', stockCode);
        res.status(200).json(stockQuote);
    } catch (error) {
        logger.error('Something went wrong', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getStockQuote }
