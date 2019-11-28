import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Gallery } from './gallery';
import { Photo } from './photo';

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
    photo => photo.photoToGallery,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'ptg_pho_id', referencedColumnName: 'id' })
  public photo!: Photo;

  @ManyToOne(
    type => Gallery,
    gallery => gallery.galleryToPhotos,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'ptg_gal_id', referencedColumnName: 'id' })
  public gallery!: Gallery;
}
