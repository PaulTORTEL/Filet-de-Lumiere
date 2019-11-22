import Express from 'express';
import authRouter from './auth/auth.route';

const router = Express.Router();

/**
 * api/auth
 */
router.use('/auth', authRouter);

export default router;
