import { UserRole } from '../../enum/role';
import { User } from '../../db/entities/user';
import bcrypt from 'bcryptjs';
import { getDbConnection } from '../../db/database';

export class UserFactory {
   public static async create(
      username: string,
      email: string,
      password: string,
      role: UserRole,
      createdAt?: Date,
      updatedAt?: Date
   ): Promise<User> {

      const connection = await getDbConnection();
      const user = new User();
      user.username = username;
      user.email = email;
      user.role = role;

      user.password = bcrypt.hashSync(password);

      if (createdAt) {
         user.createdAt = createdAt;
      } else {
         user.createdAt = new Date();
      }
      if (updatedAt) {
         user.updatedAt = updatedAt;
      }

      return connection.manager.save(user);
   }
}
