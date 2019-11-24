import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../../../api/utils/errorHandler';
import jwt from 'jsonwebtoken';
import Config from '../../../../config';

export default class AuthMiddleware {
  public static async isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      return ErrorHandler.sendError(res, 401, 'No access token provided');
    }

    const decoded = jwt.verify(accessToken, Config.secret);

    if (decoded === undefined) {
      return ErrorHandler.sendError(res, 401, 'Incorrect access token');
    }

    req.body._user = decoded;
    next();
  }
}
