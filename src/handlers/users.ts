import { Application, Request, Response } from 'express';
import { userModel } from '../models/users';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import validateUser from '../middlewares/validateUser';

dotenv.config();

const store = new userModel();

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await store.create(req.body);
        const { TOKEN_SECRET } = process.env;
        const token = jwt.sign(user, TOKEN_SECRET as string);

        res.status(201).json({
            msg: 'user has been created successfully',
            data: user,
            token,
        });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await store.index();
        res.status(200).json({
            msg: 'successfully get all users',
            data: users,
        });
    } catch (error) {
        res.status(400).json(error);
    }
};

const getUser = async (req: Request, res: Response) => {
    const user_id = parseInt(req.params.id as unknown as string);
    const user = await store.show(user_id);
    res.status(200).json({ data: user });
};

const authenticateUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await store.authenticate(email, password);
        const { TOKEN_SECRET } = process.env;

        if (user) {
            const token = jwt.sign(user, TOKEN_SECRET as string);
            res.status(200).json({
                token,
                user,
            });
        } else {
            res.status(500).json({ msg: 'Wrong email or password' });
        }
    } catch (error) {
        throw new Error('Wrong email or password ... please try again');
    }
};

const usersRoutes = (app: Application) => {
    app.post('/users', createUser);
    app.get('/users', validateUser, getUsers);
    app.get('/users/:id', validateUser, getUser);
    app.post('/authenticate', authenticateUser);
};

export default usersRoutes;
