const axios = require('axios');
const request = require('supertest');
const app = require('../../src/app');

jest.mock('axios');

describe('Stock Controller test', () => {
    describe('/stock | GET Method', () => {
        it('Should return stock quote correctly', async () => {
            axios.get.mockResolvedValue({
                data: 'Symbol,Date,Time,Open,High,Low,Close,Volume,Name\nT.US,2024-05-17,22:03:06,17.4,17.41,17.26,17.4,25891151,AT&T\r'
            });

            const expectedResponse = {
                "name": "AT&T",
                "symbol": "T.US",
                "open": "17.4",
                "high": "17.41",
                "low": "17.26",
                "close": "17.4"
            }

            const response = await request(app).get('/stock?q=t.us');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expectedResponse);
        });

        it('Should return an error if stock code is null', async () => {
            const response = await request(app).get('/stock');
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
        })

        it('Should return an error if /stock fails', async () => {
            axios.get.mockRejectedValue(new Error('Internal server error'));

            const response = await request(app).get('/stock?q=t.us');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Internal server error' });
        })
    });
})