const request = require('supertest');
const app = require('../../src/app');

const adminMail = `${Math.random().toString(36).substring(2)}@mail.com`;
let adminPassword = '';

const userMail = `${Math.random().toString(36).substring(2)}@mail.com`;
let userPassword = '';

beforeAll(async () => {
    const responseUser = await request(app)
        .post('/register')
        .send({ email: userMail, role: 'user' });

    userPassword = responseUser.body.password;

    const responseAdmin = await request(app)
    .post('/register')
    .send({ email: adminMail, role: 'admin' });

    adminPassword = responseAdmin.body.password;
});

describe('Stock controller test', () => {
    describe('/stock | GET Method', () => {
        it('Should return a stock quote', async () => {
            const responseLogin = await request(app)
                .get('/login')
                .send({ email: userMail, password: userPassword });

            const stockCode = 't.us';

            const response = await request(app)
                .get(`/stock?q=${stockCode}`)
                .set('Authorization', `Bearer ${responseLogin.body.token}`);
                

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(
                expect.objectContaining({
                    name: expect.any(String),
                    symbol: expect.any(String),
                    open: expect.any(String),
                    high: expect.any(String),
                    low: expect.any(String),
                    close: expect.any(String),
            }));
        });

        it('should return an error if token is null', async () => {
            const stockCode = 't.us';

            const response = await request(app)
                .get(`/stock?q=${stockCode}`);

            expect(response.statusCode).toBe(401);
            expect(response.body).toHaveProperty('message');
        });

        it('should return an error if user is not authorized', async () => {
            const stockCode = 't.us';

            const response = await request(app)
                .get(`/stock?q=${stockCode}`)
                .set('Authorization', `Bearer invalidToken`);

            expect(response.statusCode).toBe(403);
            expect(response.body).toHaveProperty('message');
        });

        it('should return an error if stock code is null', async () => {
            const responseLogin = await request(app)
                .get('/login')
                .send({ email: userMail, password: userPassword });

            const response = await request(app)
                .get(`/stock`)
                .set('Authorization', `Bearer ${responseLogin.body.token}`);

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe('/history | GET Method', () => {
        it('Should return a history', async () => {
            const stockCode = 't.us';

            const responseLogin = await request(app)
                .get('/login')
                .send({ email: userMail, password: userPassword });

            await request(app)
                .get(`/stock?q=${stockCode}`)
                .set('Authorization', `Bearer ${responseLogin.body.token}`);

            const response = await request(app)
                .get('/history')
                .set('Authorization', `Bearer ${responseLogin.body.token}`);
                
            expect(response.statusCode).toBe(200);
            expect(response.body[0]).toEqual(
                expect.objectContaining({
                    date: expect.any(String),
                    name: expect.any(String),
                    symbol: expect.any(String),
                    open: expect.any(Number),
                    high: expect.any(Number),
                    low: expect.any(Number),
                    close: expect.any(Number),
            }));
        });

        it('should return an error if token is null', async () => {
            const response = await request(app)
                .get('/history');

            expect(response.statusCode).toBe(401);
            expect(response.body).toHaveProperty('message');
        });

        it('should return an error if user is not authorized', async () => {
            const response = await request(app)
                .get('/history')
                .set('Authorization', `Bearer invalidToken`);

            expect(response.statusCode).toBe(403);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe('/stats | GET Method', () => {
        it('Should return the stats', async () => {
            const responseLogin = await request(app)
                .get('/login')
                .send({ email: adminMail, password: adminPassword });

            const response = await request(app)
                .get('/stats')
                .set('Authorization', `Bearer ${responseLogin.body.token}`);
                
            expect(response.statusCode).toBe(200);
            expect(response.body[0]).toHaveProperty('stock');
            expect(response.body[0]).toHaveProperty('times_requested');
        });

        it('should return an error if token is null', async () => {
            const response = await request(app)
                .get('/stats');

            expect(response.statusCode).toBe(401);
            expect(response.body).toHaveProperty('message');
        });

        it('should return an error if user is not authorized', async () => {
            const response = await request(app)
                .get('/stats')
                .set('Authorization', `Bearer invalidToken`);

            expect(response.statusCode).toBe(403);
            expect(response.body).toHaveProperty('message');
        });

        it('should return an error if user has a user role', async () => {
            const responseLogin = await request(app)
                .get('/login')
                .send({ email: userMail, password: userPassword });

            const response = await request(app)
                .get('/stats')
                .set('Authorization', `Bearer ${responseLogin.body.token}`);

            expect(response.statusCode).toBe(403);
            expect(response.body).toHaveProperty('message');
        });
    });
});
