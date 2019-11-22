import AuthService from './auth.service';
import ErrorHandler from '../../utils/errorHandler';
import { Request, Response, NextFunction } from 'express';

export default class AuthController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return ErrorHandler.sendError(res, 401);
    }
    AuthService.login(email, password)
      .then(() => {
        return res.sendStatus(200);
      })
      .catch(() => {
        return ErrorHandler.sendError(res, 401, 'Wrong credentials');
      });
  }
}
