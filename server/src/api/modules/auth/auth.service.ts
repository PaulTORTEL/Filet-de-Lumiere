import getDbConnection from '../../../db/database';
import { User } from '../../../entities/user';
import bcrypt from 'bcryptjs';

export default class AuthService {
  public static async login(email: string, password: string) {
    const connection = await getDbConnection();

    const user: User = await connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    return new Promise(async (resolve, reject) => {
      if (user) {
        const success = await bcrypt.compare(password, user.password);
        //TODO: generate JWT
        success === true ? resolve() : reject();
      } else {
        reject();
      }
    });
  }
}
