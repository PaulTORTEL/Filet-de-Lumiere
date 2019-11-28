import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../../utils/error-handler';
import jwt from 'jsonwebtoken';
import Config from '../../../../config';
import { UNAUTHORIZED } from '../../utils/status-code';

export default class AuthMiddleware {
  public static async isAuthenticated(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      return ErrorHandler.sendError(res, UNAUTHORIZED, 'No access token provided');
    }

    const decoded = jwt.verify(accessToken, Config.secret);

    if (decoded === undefined) {
      return ErrorHandler.sendError(res, UNAUTHORIZED, 'Incorrect access token');
    }

    req.body._user = decoded;
    next();
  }
}
