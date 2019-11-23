import { IsDate } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GalleryMetadata } from './galleryMetadata';

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

  @Column({ name: 'gal_created_at' })
  @IsDate()
  createdAt: Date;
}
