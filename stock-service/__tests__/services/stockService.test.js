const axios = require('axios');
const stockService = require('../../src/services/stockService');

jest.mock('axios');

describe('Stock Service test', () => {
    describe('requestStockQuote function', () => {
        it('Should return stock quote correctly', async () => {
            axios.get.mockResolvedValue({
                data: 'Symbol,Date,Time,Open,High,Low,Close,Volume,Name\nT.US,2024-05-17,22:03:06,17.4,17.41,17.26,17.4,25891151,AT&T\r'
            });

            const stockCode = 't.us';
            const expectedStockQuote = {
                "name": "AT&T",
                "symbol": "T.US",
                "open": "17.4",
                "high": "17.41",
                "low": "17.26",
                "close": "17.4"
            }

            const stockQuote = await stockService(stockCode);
            expect(stockQuote).toEqual(expectedStockQuote);
        });

        it('Should return an error if requestStockQuote fails', async () => {
            axios.get.mockRejectedValue(new Error('Internal server error'));
        
            const stockCode = 't.us';
            await expect(stockService(stockCode)).rejects.toThrow('Internal server error');
        });
    });
});