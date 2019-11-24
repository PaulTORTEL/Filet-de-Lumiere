import { IsDate, Min, IsBoolean } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Gallery } from './gallery';
import { GalleryCategory } from './galleryCategory';

@Entity()
export class GalleryMetadata {
  @PrimaryGeneratedColumn({ name: 'gme_id' })
  id: number;

  @Column({ name: 'gme_position' })
  @Min(1)
  position: number;

  @Column({ name: 'gme_is_hidden', default: false })
  @IsBoolean()
  isHidden: boolean;

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

  @Column({ name: 'gme_created_at' })
  @IsDate()
  createdAt: Date;
}
