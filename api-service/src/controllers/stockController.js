const { 
    getAndSaveStockQuote, 
    getHistory,
    getStats 
} = require('../services/stockService');

const getStockQuoteController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { q: stockCode } = req.query;

        const stockQuote = await getAndSaveStockQuote(stockCode, userId);

        res.status(201).json(stockQuote);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getHistoryController = async (req, res) => {
    try {
        const userId = req.user.userId;
        
        const history = await getHistory(userId);

        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getStatsController = async (req, res) => {
    try {
        const stats = await getStats();

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { 
    getStockQuoteController, 
    getHistoryController,
    getStatsController
}
