import { FolderEntity } from '@/entities/folder.entity';
import { UserEntity } from '@/entities/users.entity';
import { HttpException } from '@/exceptions/httpException';
import { Folder } from '@/interfaces/folder.interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
export class FolderService extends Repository<FolderEntity> {
  public async createFolder(userId: number, folderData: Folder): Promise<Folder> {
    const findFolder: Folder = await FolderEntity.findOne({ where: { folder_name: folderData.folder_name, user: { id: userId } } });
    if (findFolder) throw new HttpException(409, `This folder name ${folderData.folder_name} already exists`);

    const user = await UserEntity.findOne(userId);
    if (!user) throw new HttpException(409, 'Folder can not be created as User does not exist');

    const createFolderData: Folder = await FolderEntity.create({ ...folderData, user: {id: user.id} }).save();
    return createFolderData;
  }

  public async getFolders(): Promise<Folder[]> {
    const folders: Folder[] = await FolderEntity.find();
    return folders;
  }

  public async getFoldersById(userId: number): Promise<Folder[]> {
    const folders: Folder[] = await FolderEntity.find({ where: { user: { id: userId } } });
    if (!folders.length) throw new HttpException(409, 'User has no Folders');

    return folders;
  }

  public async updateFolder(userId: number, folderId: number, folderData: Folder): Promise<Folder> {
    const findFolder: Folder = await FolderEntity.findOne({ where: { id: folderId, user: { id: userId } } });
    if (!findFolder) throw new HttpException(409, "Folder doesn't exist");

    const duplicateFolder: Folder = await FolderEntity.findOne({ where: { folder_name: folderData.folder_name, user: { id: userId } } });
    if (duplicateFolder) throw new HttpException(409, `This folder name ${folderData.folder_name} already exists`);

    const folderName = folderData.folder_name;
    await FolderEntity.update({id: folderId, user: {id: userId}}, {folder_name: folderName});

    const updatedFolder: Folder = await FolderEntity.findOne({ where: { id: folderId, user: { id: userId } } });
    return updatedFolder;
  }

  public async deleteFolder(folderId: number, userId: number): Promise<Folder> {
    const findFolder: Folder = await FolderEntity.findOne({ where: { id: folderId, user: { id: userId } } });
    if (!findFolder) throw new HttpException(409, "Folder doesn't exist");

    await FolderEntity.delete({ id: folderId, user: { id: userId } });
    return findFolder;
  }
}
