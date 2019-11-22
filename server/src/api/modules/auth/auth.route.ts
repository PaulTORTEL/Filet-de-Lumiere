import Express from 'express';
import AuthController from './auth.controller';

const authRouter = Express.Router();

/**
 * api/auth/login
 */
authRouter.post('/login', AuthController.login);

export default authRouter;
