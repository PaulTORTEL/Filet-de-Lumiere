import { IsDate, IsEmail, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enum/role';

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
}
