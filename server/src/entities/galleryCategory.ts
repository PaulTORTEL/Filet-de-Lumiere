import { IsDate } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GalleryMetadata } from './galleryMetadata';
import { Gallery } from './gallery';

@Entity()
export class GalleryCategory {
  @PrimaryGeneratedColumn({ name: 'gca_id' })
  id: number;

  @Column({ name: 'gca_name', unique: true })
  name: string;

  @OneToOne(
    type => Gallery,
    gallery => gallery.category
  )
  @JoinColumn({ name: 'gca_gal_id', referencedColumnName: 'id' })
  gallery: Gallery;

  @Column({ name: 'gca_created_at' })
  @IsDate()
  createdAt: Date;
}
