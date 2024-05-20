const axios = require('axios');
const logger = require('../utils/logger');

const getStockQuote = async (req, res) => {
    try {
        const { q: stockCode } = req.query;

        const response = await axios.get(`https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcvn&h&e=csv`);

        const [symbol, date, time, open, high, low, close, volume, name] = response.data.split('\n')[1].split(',');
        
        if (open === 'N/D') {
            return res.status(400).json({ message: 'Invalid stock code' });
        }

        res.status(200).json({ name: name.trim(), symbol, open, high, low, close });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getStockQuote }
