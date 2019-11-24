import { IsDate } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GalleryMetadata } from './galleryMetadata';
import { GalleryCategory } from './galleryCategory';
import { PhotoToGallery } from './photoToGallery';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn({ name: 'gal_id' })
  id: number;

  @Column({ name: 'gal_name', unique: true })
  name: string;

  @Column({ name: 'gal_desc', nullable: true })
  desc: string;

  @OneToOne(
    type => GalleryMetadata,
    galleryMetadata => galleryMetadata.gallery,
    { eager: true }
  )
  @JoinColumn({ name: 'gal_gme_id', referencedColumnName: 'id' })
  metadata: GalleryMetadata;

  @OneToOne(
    type => GalleryCategory,
    category => category.gallery,
    { eager: true }
  )
  @JoinColumn({ name: 'gal_gca_id', referencedColumnName: 'id' })
  category: Promise<GalleryCategory>;

  @OneToMany(
    type => PhotoToGallery,
    photoToGallery => photoToGallery.gallery
  )
  galleryToPhotos!: PhotoToGallery[];

  @Column({ name: 'gal_created_at' })
  @IsDate()
  createdAt: Date;
}
