import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, Index } from 'typeorm';
import { Photo } from './photo';
import { Gallery } from './gallery';

@Entity()
@Unique(['galleryId', 'position'])
@Unique(['photoId', 'galleryId'])
export class PhotoToGallery {
  @PrimaryGeneratedColumn({ name: 'ptg_id' })
  public photoToGalleryId!: number;

  @Index()
  @Column({ name: 'ptg_pho_id' })
  public photoId!: number;

  @Index()
  @Column({ name: 'ptg_gal_id' })
  public galleryId!: number;

  @Column({ name: 'ptg_position' })
  public position!: number;

  @ManyToOne(
    type => Photo,
    photo => photo.photoToGallery
  )
  @JoinColumn({ name: 'ptg_pho_id', referencedColumnName: 'id' })
  public photo!: Photo;

  @ManyToOne(
    type => Gallery,
    gallery => gallery.galleryToPhotos
  )
  @JoinColumn({ name: 'ptg_gal_id', referencedColumnName: 'id' })
  public gallery!: Gallery;
}
