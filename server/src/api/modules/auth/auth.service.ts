import { getDbConnection } from '../../../db/database';
import { User } from '../../../entities/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Config from '../../../../config';
import { TokenUser } from '../../utils/model-utils';

export default class AuthService {
  /**
   * Performs the login process
   * @param username
   * @param password
   */
  public static async login(username: string, password: string): Promise<TokenUser> {
    const connection = await getDbConnection();

    const user = await connection
      .getRepository(User)
      .createQueryBuilder('user')
      .select(['user.id', 'user.password', 'user.username'])
      .where('user.username = :username', { username })
      .getOne();

    return new Promise((resolve, reject) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, success) => {
          delete user.password;
          const accessToken = jwt.sign({ user: JSON.stringify(user) }, Config.secret, { expiresIn: Config.expiration });
          const refreshToken = jwt.sign({}, Config.refreshSecret, {
            expiresIn: Config.refreshExpiration
          });

          success === true
            ? resolve({ user: { id: user.id, username: user.username }, tokens: { accessToken, refreshToken } })
            : reject(401);
        });
      } else {
        reject(404);
      }
    });
  }

  public static isUserConnected(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        jwt.verify(token, Config.secret);
        resolve();
      } catch (err) {
        reject();
      }
    });
  }
}
