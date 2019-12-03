import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../../utils/error-handler';
import jwt from 'jsonwebtoken';
import Config from '../../../../config';
import { UNAUTHORIZED } from '../../utils/status-code';
import { User } from '../../../entities/user';
import { DecodedAuthJwt } from '../../utils/model-utils';

export default class AuthMiddleware {
  public static async isAuthenticated(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      return ErrorHandler.sendError(res, UNAUTHORIZED, 'No access token provided');
    }

    const decoded = jwt.verify(accessToken, Config.secret) as DecodedAuthJwt;

    if (decoded === undefined) {
      return ErrorHandler.sendError(res, UNAUTHORIZED, 'Incorrect access token');
    }

    res.locals.user = JSON.parse(decoded.user) as User;
    next();
  }
}
