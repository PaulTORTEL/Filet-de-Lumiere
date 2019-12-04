import Express from 'express';
import AuthController from './auth.controller';
import AuthMiddleware from './auth.middleware';

const authRouter = Express.Router();

/**
 * GET: /api/auth/login
 * Signs-in a user
 * No authentication verification process
 * 401: Unauthorized, 404: Not found
 * OK (200)
 */
authRouter.post('/login', AuthController.login);

/**
 * GET: /api/auth/disconnect
 * Disconnects a user
 * No authentication verification process to enter the function, then token is verified
 * 401: Unauthorized, 404: Not found
 * OK (200)
 */
authRouter.post('/disconnect', AuthController.disconnect);

/**
 * GET: /api/auth/role
 * Getx the user's role
 * JWT verification via HTTP only cookie
 * 401: Unauthorized, 404: Not found
 * OK (200)
 */
authRouter.get('/role', AuthMiddleware.isAuthenticated, AuthController.getRole);

export default authRouter;
