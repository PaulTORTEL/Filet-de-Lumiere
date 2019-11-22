import { Response } from 'express';

export default class ErrorHandler {
  public static sendError(res: Response, code: number, message?: string) {
    if (message) {
      return res.status(code).json(message);
    }

    return res.sendStatus(code);
  }
}
