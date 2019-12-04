import { Request, Response } from 'express';
import ErrorHandler from '../../utils/error-handler';
import AuthService from './auth.service';
import { UNAUTHORIZED, OK, NOTFOUND, INTERNALERROR } from '../../utils/status-code';
import { TokenUser, DecodedAuthJwt } from '../../utils/model-utils';
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
        ErrorHandler.sendError(res, code, 'Wrong credentials');
      });
  }

  public static async disconnect(req: Request, res: Response): Promise<Response | void> {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      return ErrorHandler.sendError(res, UNAUTHORIZED, 'No access token provided');
    }

    AuthService.isUserConnected(accessToken)
      .then(() => {})
      .catch(() => {
        // Invalid token, or expired one
      })
      .finally(() => {
        return res
          .status(OK)
          .cookie('access_token', '', { httpOnly: true, expires: new Date(Date.now() - 1) })
          .cookie('refresh_token', '', { httpOnly: true, expires: new Date(Date.now() - 1) })
          .json();
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
        ErrorHandler.sendError(res, code);
      });
  }
}
