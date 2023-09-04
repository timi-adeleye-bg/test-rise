import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Folder } from '@/interfaces/folder.interface';
import { UserEntity } from './users.entity';
import { FileEntity } from './files.entity';

@Entity()
export class FolderEntity extends BaseEntity implements Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  folder_name: string;

  @ManyToOne(() => UserEntity, user => user.folders)
  user: UserEntity;

  @OneToMany(() => FileEntity, file => file.folder)
  files: FileEntity[];

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
