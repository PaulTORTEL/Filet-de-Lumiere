import { Request, Response } from 'express';
import ErrorHandler from '../../utils/errorHandler';
import AuthService from './auth.service';

export default class AuthController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // If no email nor password
    if (!email || !password) {
      return ErrorHandler.sendError(res, 401);
    }
    // Try matching credentials
    AuthService.login(email, password)
      .then(tokens => {
        return res.status(200).json(tokens);
      })
      .catch(e => {
        return ErrorHandler.sendError(res, 401, 'Wrong credentials');
      });
  }
}
