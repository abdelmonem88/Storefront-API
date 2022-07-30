import db from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
};

export class prodcutModel {
    // create product
    async create(product: Product): Promise<Product> {
        try {
            const connection = await db.connect();
            const sql =
                'INSERT INTO products (name,price) VALUES ($1,$2) returning *';

            const result = await connection.query(sql, [
                product.name,
                product.price,
            ]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error('Unble to create product');
        }
    }

    // get all products
    async index(): Promise<Product[]> {
        try {
            const connection = await db.connect();
            const sql = 'SELECT * from products';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error('Unble to get products');
        }
    }

    // get single product
    async show(product_id: number): Promise<Product> {
        try {
            const connection = await db.connect();
            const sql = 'SELECT name , price from products where id=($1)';
            const result = await connection.query(sql, [product_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error('Unble to get product');
        }
    }
}
