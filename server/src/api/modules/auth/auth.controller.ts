import { Request, Response } from 'express';
import ErrorHandler from '../../utils/error-handler';
import AuthService from './auth.service';
import { UNAUTHORIZED, OK } from '../../utils/status-code';

export default class AuthController {
  public static async login(req: Request, res: Response): Promise<Response | void> {
    const { email, password } = req.body;
    // If no email nor password
    if (!email || !password) {
      return ErrorHandler.sendError(res, UNAUTHORIZED);
    }
    // Try matching credentials
    AuthService.login(email, password)
      .then(tokens => {
        return res.status(OK).json(tokens);
      })
      .catch(code => {
        return ErrorHandler.sendError(res, code, 'Wrong credentials');
      });
  }
}
