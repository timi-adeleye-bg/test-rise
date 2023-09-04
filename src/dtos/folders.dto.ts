import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class FolderDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9\s\-_]+$/, { message: 'Folder name should not contain special characters' })
  public folder_name: string;
}
