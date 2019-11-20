import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn({ name: 'pho_id' })
  id: number;

  @Column({ name: 'pho_name' })
  name: string;

  @Column({ name: 'pho_title' })
  title: string;

  @Column({ name: 'pho_desc' })
  desc: string;

  @Column({ name: 'pho_path' })
  path: string;

  @Column({ name: 'pho_views' })
  views: number;

  @Column({ name: 'pho_created_at' })
  createdAt: Date;

  @Column({ name: 'pho_updated_at' })
  updatedAt: Date;
}
