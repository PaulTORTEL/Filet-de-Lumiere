import { User } from '../../../db/entities/user';
import { NOTFOUND } from '../../utils/status-code';
import { UserRole } from '../../../enum/role';

export default class UserService {

  public static async getUserRole(userID: number): Promise<UserRole> {

    const user = await User.get(['user.role'], 'user.id = :userID', { userID });

    return new Promise((resolve, reject) => {
      if (!user) {
        return reject(NOTFOUND);
      }
      return resolve(user.role);
    });
  }
}
