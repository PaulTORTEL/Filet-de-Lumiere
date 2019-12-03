import { getDbConnection } from '../../../db/database';
import { User } from '../../../entities/user';
import { NOTFOUND } from '../../utils/status-code';
import { UserRole } from '../../../enum/role';

export default class UserService {
  public static async getUserRole(userId: number): Promise<UserRole> {
    const connection = await getDbConnection();

    const user = await connection
      .getRepository(User)
      .createQueryBuilder('user')
      .select(['user.role'])
      .where('user.id = :id', { id: userId })
      .getOne();

    return new Promise((resolve, reject) => {
      if (!user) {
        return reject(NOTFOUND);
      }
      return resolve(user.role);
    });
  }
}
