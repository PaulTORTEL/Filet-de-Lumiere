import Express from 'express';
import AuthController from './auth.controller';
import AuthMiddleware from '../../middlewares/auth/auth.middleware';

const authRouter = Express.Router();

/**
 * api/auth/login
 */
authRouter.post('/login', AuthController.login);
authRouter.get('/test', AuthMiddleware.isAuthenticated, AuthController.test);

export default authRouter;
