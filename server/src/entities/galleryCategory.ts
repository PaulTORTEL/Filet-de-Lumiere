import { IsDate } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GalleryMetadata } from './galleryMetadata';

@Entity()
export class GalleryCategory {
  @PrimaryGeneratedColumn({ name: 'gca_id' })
  id: number;

  @Column({ name: 'gca_name', unique: true })
  name: string;

  @OneToOne(
    type => GalleryMetadata,
    galleryMetadata => galleryMetadata.galleryCategory
  )
  @JoinColumn({ name: 'gca_gme_id', referencedColumnName: 'id' })
  galleryMetadata: GalleryMetadata;

  @Column({ name: 'gca_created_at' })
  @IsDate()
  createdAt: Date;
}
