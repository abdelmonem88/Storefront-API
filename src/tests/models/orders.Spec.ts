import { User, userModel } from '../../models/users';
import { Product, prodcutModel } from '../../models/products';
import { Product as orderProduct, orderModel } from '../../models/orders';
import db from '../../database';

const userStore = new userModel();
const productsStore = new prodcutModel();
const ordersStore = new orderModel();
let user: User = {
    id: 0,
    email: 'abdelmonem88@gmail.com',
    user_name: 'abdelmonem_1888',
    first_name: 'abdelmonem',
    last_name: 'mohamed',
    password: '123456789',
};
const product: Product = {
    id: 0,
    name: 'test_product',
    price: 10,
};
const products: orderProduct[] = [];

beforeAll(async () => {
    const newUser = await userStore.create(user);
    user = { ...user, id: newUser.id };
    const newProduct: Product = await productsStore.create(product);
    products.push({
        product_id: newProduct.id as unknown as number,
        quantity: 5,
    });
});

afterAll(async () => {
    const connection = await db.connect();
    connection.release();
});

describe('orders model tests', () => {
    it('order model must have a create method', () => {
        expect(ordersStore.create).toBeDefined();
    });
    it('test create new order using order details', async () => {
        const newOrder = await ordersStore.create(
            'active',
            user.id as unknown as number,
            products
        );
        expect({
            status: newOrder.status,
            user_id: newOrder.user_id,
        }).toEqual({
            status: 'active',
            user_id: user.id as unknown as number,
        });
    });
    it('test get current order', async () => {
        const currentOrder = await ordersStore.currentOrder(
            user.id as unknown as number,
            'active'
        );
        expect({
            status: currentOrder.status,
            user_id: currentOrder.user_id,
        }).toEqual({
            status: 'active',
            user_id: user.id as unknown as number,
        });
    });
});
