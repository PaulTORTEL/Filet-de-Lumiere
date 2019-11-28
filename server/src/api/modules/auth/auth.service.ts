import { getDbConnection } from '../../../db/database';
import { User } from '../../../entities/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Config from '../../../../config';

export default class AuthService {
  /**
   * Performs the login process
   * @param email
   * @param password
   */
  public static async login(email: string, password: string): Promise<object | void> {
    const connection = await getDbConnection();

    const user = await connection
      .getRepository(User)
      .createQueryBuilder('user')
      .select(['user.id', 'user.password', 'user.pseudo', 'user.role'])
      .where('user.email = :email', { email })
      .getOne();

    return new Promise((resolve, reject) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, success) => {
          delete user.password;
          const accessToken = jwt.sign({ user: JSON.stringify(user) }, Config.secret, { expiresIn: Config.expiration });
          const refreshToken = jwt.sign({}, Config.refreshSecret, {
            expiresIn: Config.refreshExpiration
          });

          success === true ? resolve({ accessToken, refreshToken }) : reject(err);
        });
      } else {
        reject();
      }
    });
  }
}
