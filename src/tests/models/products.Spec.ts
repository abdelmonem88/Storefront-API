import { Product, prodcutModel } from '../../models/products';

const productsStore = new prodcutModel();

const product: Product = {
    id: 0,
    name: 'test_product',
    price: 10,
};

describe('products model tests', () => {
    it('products model must have a create method', () => {
        expect(productsStore.create).toBeDefined();
    });

    it('test create product method using new product details', async () => {
        const newProduct = await productsStore.create({
            name: product.name,
            price: product.price,
        });
        product.id = newProduct.id;
        expect({
            name: newProduct.name,
            price: newProduct.price,
        }).toEqual({ name: product.name, price: product.price });
    });

    it('product model must have an index method', () => {
        expect(productsStore.index).toBeDefined();
    });

    it('get single products using product id', async () => {
        const getProduct = await productsStore.show(
            product.id as unknown as number
        );
        expect({
            name: getProduct.name,
            price: getProduct.price,
        }).toEqual({
            name: product.name,
            price: product.price,
        });
    });
});
