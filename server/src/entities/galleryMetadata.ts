import { IsDate, Min, IsBoolean } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gallery } from './gallery';
import { GalleryCategory } from './galleryCategory';

@Entity()
export class GalleryMetadata {
  @PrimaryGeneratedColumn({ name: 'gme_id' })
  id: number;

  @Column({ name: 'gme_position' })
  @Min(1)
  position: number;

  @Column({ name: 'gme_is_private', default: false })
  @IsBoolean()
  isPrivate: boolean;

  @Column({ name: 'gme_password', nullable: true })
  password: string;

  @OneToOne(
    type => Gallery,
    gallery => gallery.metadata
  )
  @JoinColumn({ name: 'gme_gal_id', referencedColumnName: 'id' })
  gallery: Gallery;

  @OneToOne(
    type => GalleryCategory,
    galleryCategory => galleryCategory.galleryMetadata,
    { lazy: true }
  )
  @JoinColumn({ name: 'gme_gca_id', referencedColumnName: 'id' })
  galleryCategory: Promise<GalleryCategory>;

  @Column({ name: 'gme_created_at' })
  @IsDate()
  createdAt: Date;
}
