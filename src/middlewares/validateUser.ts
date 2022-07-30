import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const validateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        const { TOKEN_SECRET } = process.env;

        jwt.verify(
            token as unknown as string,
            TOKEN_SECRET as unknown as string
        );
        next();
    } catch (error) {
        res.status(401).json({ msg: 'not authorized' });
        return;
    }
};

export default validateUser;
