import { Column, Connection, DeleteResult, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsEmail, MinLength } from 'class-validator';
import { UserRole } from '../../enum/role';
import { getDbConnection } from '../database';

@Entity()
export class User {
   @PrimaryGeneratedColumn({ name: 'use_id' })
   id: number;

   @Column({ name: 'use_username' })
   username: string;

   @Column({ name: 'use_email' })
   @IsEmail()
   email: string;

   @Column({ name: 'use_password' })
   @MinLength(20)
   password: string;

   @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.NONE,
      name: 'use_role_id'
   })
   role: UserRole;

   @Column({ name: 'use_created_at', default: new Date() })
   @IsDate()
   createdAt: Date;

   @Column({ name: 'use_updated_at', nullable: true })
   @IsDate()
   updatedAt: Date;

   public static async get(
      selectClause: string[],
      whereClause: string,
      whereParams: {}): Promise<User | undefined> {

      const connection = await getDbConnection();

      return connection
			.getRepository(User)
			.createQueryBuilder('user')
			.select(selectClause)
         .where(whereClause, whereParams)
			.getOne();
   }

   public static async doesUserExist(userID: number): Promise<boolean> {
      const connection = await getDbConnection();
      return (await connection
         .getRepository(User)
         .createQueryBuilder('user')
         .where('user.id = :userID', { userID })
         .getCount()) == 1;
   }

   public static async deleteUser(userID: number): Promise<DeleteResult> {
      const connection = await getDbConnection();

      return connection
         .createQueryBuilder()
         .delete()
         .from(User)
         .where('id = :userID', { userID })
         .execute();
   }
}
