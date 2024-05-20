const axios = require('axios');
const { Sequelize } = require('sequelize');
const { StockQuote } = require('../models');

const getStockQuoteController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { q: stockCode } = req.query;

        const response = await axios.get(`${process.env.STOCK_SERVICE_URL}/stock?q=${stockCode}`);

        const { name, symbol, open, high, low, close } = response.data;

        await StockQuote.create({
            userId,
            name,
            symbol,
            open,
            high,
            low,
            close
        });

        res.status(200).json({ name, symbol, open, high, low, close });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getHistoryController = async (req, res) => {
    try {
        const userId = req.user.userId;
        
        const history = await StockQuote.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
        });

        const formattedHistory = history.map(value => ({
            date: value.createdAt,
            name: value.name,
            symbol: value.symbol,
            open: value.open,
            high: value.high,
            low: value.low,
            close: value.close
        }));

        res.status(200).json(formattedHistory);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getStatsController = async (req, res) => {
    try {
        const stats = await StockQuote.findAll({
            attributes: [
                'symbol',
                [Sequelize.fn('COUNT', Sequelize.col('symbol')), 'times_requested'],
            ],
            group: ['symbol'],
            order: [['times_requested', 'DESC']],
            limit: 5,
        });

        const formattedStats = stats.map(stat => ({
            stock: stat.symbol,
            times_requested: stat.get('times_requested'),
        }));

        res.status(200).json(formattedStats);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { 
    getStockQuoteController, 
    getHistoryController,
    getStatsController
}
