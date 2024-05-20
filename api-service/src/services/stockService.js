const axios = require('axios');
const { StockQuote } = require('../models');
const { Sequelize } = require('sequelize');

const getAndSaveStockQuote = async (stockCode, userId) => {
    try {
        const response = await axios.get(`${process.env.STOCK_SERVICE_URL}/stock?q=${stockCode}`);

        const { name, symbol, open, high, low, close } = response.data;

        const stockQuote = await StockQuote.create({
            userId,
            name,
            symbol,
            open,
            high,
            low,
            close,
        });

        return { name, symbol, open, high, low, close };
    } catch (error) {
        throw new Error('Internal server error');
    }
}

const getHistory = async (userId) => {
    try {
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

        return formattedHistory;
    } catch (error) {
        throw new Error('Internal server error');
    }
}

const getStats = async () => {
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

        return formattedStats;
    } catch (error) {
        console.log(error.message);
        throw new Error('Internal server error');
    }
};

module.exports = {
    getAndSaveStockQuote,
    getHistory,
    getStats
}
