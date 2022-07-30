import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const {
    NODE_ENV,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env;

const pool = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    database: NODE_ENV == 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT as string),
});

export default pool;
