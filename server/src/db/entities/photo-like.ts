import { IsDate, IsIP } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Photo } from './photo';

@Entity()
@Unique(['visitorIp', 'photo'])
export class PhotoLike {
   @PrimaryGeneratedColumn({ name: 'pli_id' })
   id: number;

   @ManyToOne(
      type => Photo,
      photo => photo.likes,
      { onUpdate: 'CASCADE', onDelete: 'CASCADE' }
   )
   @JoinColumn({ name: 'pli_pho_id', referencedColumnName: 'id' })
   photo: Photo;

   @Column({ name: 'pli_visitor_ip' })
   @IsIP()
   visitorIp: string;

   @Column({ name: 'pli_created_at', default: new Date() })
   @IsDate()
   createdAt: Date;
}
