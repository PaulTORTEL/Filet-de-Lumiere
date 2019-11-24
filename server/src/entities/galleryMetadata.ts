import { IsBoolean, IsDate, Min } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gallery } from './gallery';

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
    gallery => gallery.metadata,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'gme_gal_id', referencedColumnName: 'id' })
  gallery: Gallery;

  @Column({ name: 'gme_created_at' })
  @IsDate()
  createdAt: Date;
}
