const { getAndSaveStockQuote } = require('../services/stockService');

const getStockQuote = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { q: stockCode } = req.query;

        if (!stockCode) {
            return res.status(400).json({ error: 'Stock code is required' });
        }

        const stockQuote = await getAndSaveStockQuote(stockCode, userId);

        res.status(200).json(stockQuote);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getStockQuote };
