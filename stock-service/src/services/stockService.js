const axios = require('axios');

async function requestStockQuote(stockCode) {
    try {
        const response = await axios.get(`https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcvn&h&e=csv`);

        const [symbol, date, time, open, high, low, close, volume, name] = response.data.split('\n')[1].split(',');
    
        return { name: name.trim(), symbol, open, high, low, close }
    } catch (error) {
        throw new Error('Internal server error');
    }

}

module.exports = requestStockQuote