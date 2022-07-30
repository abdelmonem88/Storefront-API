import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);
let token: string;
let productId: string;

describe('products routes tests', () => {
    it('test create product route', async () => {
        const newUser = await request.post('/users').send({
            email: 'test88@test.com',
            user_name: 'test88_user',
            first_name: 'test88_first_name',
            last_name: 'test88_last_name',
            password: 'test88_password',
        });
        token = newUser.body.token;

        const newPeroduct = await request
            .post('/products')
            .send({
                name: 'test product',
                price: 5,
            })
            .set('Authorization', `Bearer ${token}`);
        productId = newPeroduct.body.data.id;
        expect(newPeroduct.status).toBe(201);
    });
    it('test get products route', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });
    it('test get product route', async () => {
        const response = await request.get('/products/' + productId);
        expect(response.status).toBe(200);
    });
});
