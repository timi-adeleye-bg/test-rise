import { Files } from '@/interfaces/files.interface';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { FolderEntity } from './folder.entity';
import { UserEntity } from './users.entity';

@Entity()
export class FileEntity extends BaseEntity implements Files {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @IsNotEmpty()
  file_name: string;

  @Column()
  file_url: string;

  @ManyToOne(() => FolderEntity, folder => folder.files)
  folder: FolderEntity;

  @ManyToOne(() => UserEntity, user => user.files)
  user: UserEntity;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
