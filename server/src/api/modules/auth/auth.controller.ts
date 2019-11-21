import { Request, Response, NextFunction } from 'express';
import AuthService from './auth.service';

export default class AuthController {
  public static async authenticate(req: Request, res: Response, next: NextFunction) {
    //TODO
    AuthService.authenticate('myjwt');
  }
}
