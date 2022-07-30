import { Application, Request, Response } from 'express';
import { orderModel } from '../models/orders';
import validateUser from '../middlewares/validateUser';

const store = new orderModel();

const createOrder = async (req: Request, res: Response) => {
    try {
        const { products } = req.body;
        const order = await store.create('active', 1, products);

        res.status(201).json({
            msg: 'order created successfully',
            data: order,
        });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const getCurrentOrder = async (req: Request, res: Response) => {
    try {
        const order = await store.currentOrder(1, 'active');
        res.status(200).json({
            msg: 'get current order successfully',
            data: order,
        });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const orderssRoutes = (app: Application) => {
    app.post('/orders', validateUser, createOrder);
    app.get('/orders/current_order', getCurrentOrder);
};

export default orderssRoutes;
