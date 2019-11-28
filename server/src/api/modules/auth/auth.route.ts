import Express from 'express';
import AuthController from './auth.controller';

const authRouter = Express.Router();

/**
 * GET: /api/auth/login
 * Sign-in a user
 * No authentication verification process
 * 401: Unauthorized
 * OK (200)
 */
authRouter.post('/login', AuthController.login);

export default authRouter;
