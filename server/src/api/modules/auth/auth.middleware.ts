import { NextFunction, Request, Response } from 'express';
import { User } from '../../../entities/user';
import ErrorHandler from '../../utils/error-handler';
import { DecodedAuthJwt } from '../../utils/model-utils';
import { UNAUTHORIZED } from '../../utils/status-code';
import AuthService from './auth.service';

export default class AuthMiddleware {
  public static async isAuthenticated(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      return ErrorHandler.sendError(res, UNAUTHORIZED, 'No access token provided');
    }

    AuthService.isUserConnected(accessToken)
      .then((decoded: DecodedAuthJwt) => {
        res.locals.user = JSON.parse(decoded.user) as User;
        next();
      })
      .catch(() => {
        ErrorHandler.sendError(res, UNAUTHORIZED, 'Incorrect access token');
      });
  }
}
