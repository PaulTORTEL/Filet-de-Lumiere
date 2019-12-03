import { Request, Response } from 'express';
import ErrorHandler from '../../utils/error-handler';
import AuthService from './auth.service';
import { UNAUTHORIZED, OK, NOTFOUND } from '../../utils/status-code';
import { TokenUser } from '../../utils/model-utils';
import { User } from '../../../entities/user';
import UserService from '../user/user.service';
import { UserRole } from '../../../enum/role';

export default class AuthController {
  public static async login(req: Request, res: Response): Promise<Response | void> {
    const { username, password } = req.body;

    // If no username or no password
    if (!username || !password) {
      return ErrorHandler.sendError(res, UNAUTHORIZED);
    }
    // Try matching credentials
    AuthService.login(username, password)
      .then((data: TokenUser) => {
        return res
          .status(OK)
          .cookie('access_token', data.tokens.accessToken, { httpOnly: true })
          .cookie('refresh_token', data.tokens.refreshToken, { httpOnly: true })
          .json(data.user);
      })
      .catch(code => {
        return ErrorHandler.sendError(res, code, 'Wrong credentials');
      });
  }

  public static async getRole(req: Request, res: Response): Promise<Response | void> {
    // Only a verified JWT puts such data in res.locals
    const user: User = res.locals.user;

    if (!user || !user.id) {
      return ErrorHandler.sendError(res, NOTFOUND, 'User not supplied');
    }

    UserService.getUserRole(user.id)
      .then((role: UserRole) => {
        return res.status(OK).json(role);
      })
      .catch(code => {
        return ErrorHandler.sendError(res, code);
      });
  }
}
