const axios = require('axios');
const { StockQuote } = require('../models');

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

        return stockQuote;
    } catch (error) {
        
    }
}

module.exports = { getAndSaveStockQuote }
