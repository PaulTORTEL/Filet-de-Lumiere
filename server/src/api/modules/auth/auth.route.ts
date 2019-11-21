import Express from 'express';
import AuthController from './auth.controller';

const authRouter = Express.Router();

authRouter.post('/', AuthController.authenticate);

export default authRouter;
