import Express from 'express';
import AuthController from './auth.controller';
import AuthMiddleware from './auth.middleware';

const authRouter = Express.Router();

/**
 * GET: /api/auth/login
 * Signs-in a user
 * No authentication verification process
 * 401: Unauthorized
 * OK (200)
 */
authRouter.post('/login', AuthController.login);

/**
 * GET: /api/auth/role
 * Getx the user's role
 * JWT verification via HTTP only cooki
 * 401: Unauthorized, 404: Not found
 * OK (200)
 */
authRouter.get('/role', AuthMiddleware.isAuthenticated, AuthController.getRole);

export default authRouter;
