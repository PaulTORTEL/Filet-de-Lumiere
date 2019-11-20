import { IsDate, IsEmail, MinLength } from 'class-validator';
import { UserRole } from '../enum/role';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'use_id' })
  id: number;

  @Column({ name: 'use_pseudo' })
  pseudo: string;

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
  role: Role;

  @Column({ name: 'use_created_at' })
  @IsDate()
  createdAt: Date;

  @Column({ name: 'use_updated_at' })
  @IsDate()
  updatedAt: Date;
}
