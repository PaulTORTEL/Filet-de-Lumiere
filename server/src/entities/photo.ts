import { IsDate, IsInt, Min } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PhotoToGallery } from './photoToGallery';
import { PhotoLike } from './photo_like';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn({ name: 'pho_id' })
  id: number;

  @Column({ name: 'pho_name' })
  name: string;

  @Column({ name: 'pho_title', nullable: true })
  title: string;

  @Column({ name: 'pho_desc', nullable: true })
  desc: string;

  @Column({ name: 'pho_path' })
  path: string;

  @Column({ name: 'pho_views', default: 0 })
  @Min(0)
  @IsInt()
  views: number;

  @OneToMany(
    type => PhotoLike,
    photoLike => photoLike.photo,
    { lazy: true, onUpdate: 'NO ACTION', onDelete: 'NO ACTION' }
  )
  likes: Promise<PhotoLike[]>;

  @OneToMany(
    type => PhotoToGallery,
    photoToGallery => photoToGallery.photo,
    { onUpdate: 'NO ACTION', onDelete: 'NO ACTION' }
  )
  photoToGallery!: PhotoToGallery[];

  @Column({ name: 'pho_created_at' })
  @IsDate()
  createdAt: Date;

  @Column({ name: 'pho_updated_at' })
  @IsDate()
  updatedAt: Date;
}
