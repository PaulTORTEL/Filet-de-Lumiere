import { Request, Response } from 'express';
import ErrorHandler from '../../utils/error-handler';
import AuthService from './auth.service';
import { UNAUTHORIZED, OK } from '../../utils/status-code';
import { TokenUser } from '../../utils/model-utils';

export default class AuthController {
  public static async login(req: Request, res: Response): Promise<Response | void> {
    const { username, password } = req.body;

    // If no username or no password
    if (!username || !password) {
      return ErrorHandler.sendError(res, UNAUTHORIZED);
    }
    // Try matching credentials
    AuthService.login(username, password)
      .then((data: TokenUser | number) => {
        data = data as TokenUser;
        return res
          .status(OK)
          .cookie('access_token', data.tokens.accessToken, { httpOnly: true })
          .cookie('refresh_token', data.tokens.refreshToken, { httpOnly: true })
          .send(data.user);
      })
      .catch(code => {
        return ErrorHandler.sendError(res, code, 'Wrong credentials');
      });
  }
}
