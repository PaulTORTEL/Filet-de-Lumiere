import { IsDate } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Gallery } from './gallery';

@Entity()
export class GalleryCategory {
  @PrimaryGeneratedColumn({ name: 'gca_id' })
  id: number;

  @Column({ name: 'gca_name', unique: true })
  name: string;

  @OneToMany(
    type => Gallery,
    gallery => gallery.category,
    { onUpdate: 'CASCADE', onDelete: 'NO ACTION' }
  )
  @JoinColumn({ name: 'gca_gal_id', referencedColumnName: 'id' })
  gallery: Gallery;

  @Column({ name: 'gca_created_at' })
  @IsDate()
  createdAt: Date;
}
