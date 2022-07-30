import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);
let userId: number;
let token: string;

describe('users routes test', () => {
    it('test createUser user route', async () => {
        const response = await request.post('/users').send({
            email: 'test@test.com',
            user_name: 'test_user',
            first_name: 'test_first_name',
            last_name: 'test_last_name',
            password: 'test_password',
        });
        token = response.body.token;
        userId = response.body.data.id;
        expect(response.status).toBe(201);
    });
    it('test getUsers route', async () => {
        const response = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('test getUser route', async () => {
        const response = await request
            .get('/users/' + userId)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('test authenticateUser route', async () => {
        const response = await request
            .post('/authenticate')
            .send({ email: 'test@test.com', password: 'test_password' });
        expect(response.status).toBe(200);
    });
});
