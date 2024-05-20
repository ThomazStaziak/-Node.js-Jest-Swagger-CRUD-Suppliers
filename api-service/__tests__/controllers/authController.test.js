const request = require('supertest');
const app = require('../../src/app');

describe('Auth controller test', () => {
    describe('/register | POST Method', () => {
        it('Should register a new user', async () => {
            const randomEmail = `${Math.random().toString(36).substring(2)}@mail.com`;

            const response = await request(app)
                .post('/register')
                .send({ email: randomEmail, role: 'user' });

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('email', randomEmail);
            expect(response.body).toHaveProperty('password');
        });

        it('should return an error if email is null', async () => {
            const response = await request(app)
                .post('/register')
                .send({ role: 'user' });

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });

        it('should return an error if role is null', async () => {
            const response = await request(app)
                .post('/register')
                .send({ email: 'test@mail.com' });

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });

        it('should return an error if user already exists', async () => {
            const firstResponse = await request(app)
                .post('/register')
                .send({ email: 'test@mail.com' });

            const response = await request(app)
                .post('/register')
                .send({ email: 'test@mail.com' });

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe('/login | GET Method', () => {
        it('Should login with right credentials', async () => {
            const randomEmail = `${Math.random().toString(36).substring(2)}@mail.com`;

            const responseRegister = await request(app)
                .post('/register')
                .send({ email: randomEmail, role: 'user' });

            const responseLogin = await request(app)
                .get('/login')
                .send({ email: randomEmail, password: responseRegister.body.password });

            expect(responseLogin.statusCode).toBe(200);
            expect(responseLogin.body).toHaveProperty('token');
        });

        it('should return an error if email is null', async () => {
            const response = await request(app)
                .get('/login')
                .send({ password: 'anything' });

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });

        it('should return an error if password is null', async () => {
            const response = await request(app)
                .get('/login')
                .send({ email: 'test@mail.com' });

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });

        it('should return an error if the credentials are incorrect', async () => {
            const response = await request(app)
                .get('/login')
                .send({ email: 'test@mail.com', password: '123' });

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });
    });
});
