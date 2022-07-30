import { Application, Request, Response } from 'express';
import { prodcutModel } from '../models/products';
import validateUser from '../middlewares/validateUser';

const store = new prodcutModel();

const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await store.create(req.body);
        res.status(201).json({
            msg: 'product has been created successfully',
            data: product,
        });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.status(200).json({
            msg: 'successfully get all products',
            data: products,
        });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const getProduct = async (req: Request, res: Response) => {
    try {
        const product_id = parseInt(req.params.id as unknown as string);
        const product = await store.show(product_id);
        res.status(200).json({
            msg: 'successfully get product',
            data: product,
        });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const productsRoutes = (app: Application) => {
    app.post('/products', validateUser, createProduct);
    app.get('/products', getProducts);
    app.get('/products/:id', getProduct);
};

export default productsRoutes;
