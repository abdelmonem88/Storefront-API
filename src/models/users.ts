/* eslint-disable @typescript-eslint/no-unused-vars */
import db from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
    id?: number;
    email: string;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
};

export class userModel {
    // create user
    async create(user: User): Promise<User> {
        try {
            const connection = await db.connect();
            const sql =
                'INSERT INTO users (email,user_name,first_name,last_name,password) values ($1,$2,$3,$4,$5) returning *';
            // user password hashing
            const hash = bcrypt.hashSync(
                user.password + BCRYPT_PASSWORD,
                parseInt(SALT_ROUNDS as string)
            );
            const result = await connection.query(sql, [
                user.email,
                user.user_name,
                user.first_name,
                user.last_name,
                hash,
            ]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error('Unble to create user');
        }
    }
    // get all users
    async index(): Promise<User[]> {
        try {
            const connection = await db.connect();
            const sql =
                'SELECT id,email,user_name,first_name,last_name from users';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error('Unable to get users');
        }
    }
    // get single user
    async show(user_id: number): Promise<User> {
        const connection = await db.connect();
        const sql =
            'Select id,email,user_name,first_name,last_name from users where id=($1)';
        const result = await connection.query(sql, [user_id]);
        connection.release();
        return result.rows[0];
    }
    // authenticate user
    async authenticate(email: string, password: string): Promise<User | null> {
        try {
            const connection = await db.connect();
            const sql = 'SELECT password from users WHERE email=($1)';
            const result = await connection.query(sql, [email]);
            if (result.rows.length) {
                const user = result.rows[0];
                const isValid = bcrypt.compareSync(
                    password + BCRYPT_PASSWORD,
                    user.password
                );
                if (isValid) {
                    const userData = await connection.query(
                        'SELECT id,email,user_name,first_name,last_name from users WHERE email=($1)',
                        [email]
                    );
                    connection.release();
                    return userData.rows[0];
                }
            }
            connection.release();
            return null;
        } catch (error) {
            throw new Error('wrong credentials ... please try again');
        }
    }
}
