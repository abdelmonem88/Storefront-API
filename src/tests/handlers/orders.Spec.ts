import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);
let token: string;
let productId: string;
const products: { product_id: string; quantity: number }[] = [];

describe('orders routes tests', () => {
    it('test create order route', async () => {
        const newUser = await request.post('/users').send({
            email: 'test888@test.com',
            user_name: 'test888_user',
            first_name: 'test888_first_name',
            last_name: 'test888_last_name',
            password: 'test888_password',
        });
        token = newUser.body.token;

        const newPeroduct = await request
            .post('/products')
            .send({
                name: 'test88 product',
                price: 10,
            })
            .set('Authorization', `Bearer ${token}`);
        productId = newPeroduct.body.data.id;
        products.push({
            product_id: productId,
            quantity: 2,
        });
        const response = await request
            .post('/orders')
            .set('Authorization', `Bearer ${token}`)
            .send({
                products,
            });
        expect(response.status).toBe(201);
    });
    it('test get current order route', async () => {
        const response = await request.get('/orders/current_order');
        expect(response.status).toBe(200);
    });
});
