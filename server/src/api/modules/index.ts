import Express from 'express';
import authRouter from './auth/auth.route';

const router = Express.Router();

router.use('auth', authRouter);

export default router;
