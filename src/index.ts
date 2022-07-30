import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
//import all routes
import usersRoutes from './handlers/users';
import productsRoutes from './handlers/products';
import orderssRoutes from './handlers/orders';
// middlewares
import notFound from './middlewares/not-found';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// use cors
app.use(cors());
// parse incoming request middleware
app.use(express.json());

// basic route
app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to storefront API')
);

// users routes
usersRoutes(app);

// products routes
productsRoutes(app);

// orders routes
orderssRoutes(app);

// handle not found routes
app.use(notFound);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

export default app;
