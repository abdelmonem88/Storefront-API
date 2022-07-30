import db from '../database';

export type Product = { product_id: number; quantity: number };

export type Order = {
    status: string;
    user_id: number;
    products: Product[];
};

export class orderModel {
    async create(
        status: string,
        user_id: number,
        products: Product[]
    ): Promise<Order> {
        try {
            const connection = await db.connect();
            const sql =
                'INSERT INTO orders (status,user_id) values($1,$2) RETURNING *';
            const result = await connection.query(sql, [status, user_id]);
            const order = result.rows[0];
            const order_id = result.rows[0].id;

            const newProducts = [];
            for (const product of products) {
                const addProducts = await connection.query(
                    'INSERT INTO orders_products(quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING *',
                    [product.quantity, order_id, product.product_id]
                );
                newProducts.push(addProducts.rows[0]);
            }

            connection.release();

            const res = {
                status: order.status,
                user_id: order.user_id,
                products: newProducts,
            };

            return res;
        } catch (error) {
            throw new Error('Unble to create your order');
        }
    }

    async currentOrder(user_id: number, status: string): Promise<Order> {
        try {
            const connection = await db.connect();
            const getOrder = await connection.query(
                'SELECT * from orders where user_id=($1) AND status=($2) ORDER by id desc',
                [user_id, status]
            );
            const getProducts = await connection.query(
                'SELECT op.quantity,op.product_id from orders_products op inner join products p on op.product_id=p.id where order_id=($1)',
                [getOrder.rows[0].id]
            );
            connection.release();

            return {
                status: getOrder.rows[0].status,
                user_id: getOrder.rows[0].user_id,
                products: getProducts.rows,
            };
        } catch (error) {
            throw new Error('Unble to create your order');
        }
    }
}
