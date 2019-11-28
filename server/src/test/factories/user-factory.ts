import { UserRole } from '../../enum/role';
import { User } from '../../entities/user';
import bcrypt from 'bcryptjs';
import { getDbConnection } from '../../db/database';

export class UserFactory {
  public static async create(
    pseudo: string,
    email: string,
    password: string,
    role: UserRole,
    createdAt?: Date,
    updatedAt?: Date
  ): Promise<User> {
    const user = new User();
    user.pseudo = pseudo;
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

    const connection = await getDbConnection();
    return await connection.manager.save(user);
  }
}
