import { Folder } from '@/interfaces/folder.interface';
import { FolderService } from '@/services/folder.service';
import { NextFunction, Request, Response } from 'express';

class FolderController {
  public folder = new FolderService();

  public createFolder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const folderData: Folder = req.body;
      const userId = Number(req.params.id);

      const createFolderData: Folder = await this.folder.createFolder(userId, folderData);
      res.status(201).json({ data: createFolderData, message: 'created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getFolders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const getFolderData: Folder[] = await this.folder.getFolders();
      res.status(200).json({ data: getFolderData, message: 'Fetched Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getFoldersById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const getUserFolders: Folder[] = await this.folder.getFoldersById(userId);
      res.status(200).json({ data: getUserFolders, message: 'User Folders Fetched Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateFolder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const folderId = Number(req.params.fId);
      const folderData: Folder = req.body;

      const updateFolderData: Folder = await this.folder.updateFolder(userId, folderId, folderData);
      res.status(200).json({ data: updateFolderData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteFolder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const folderId = Number(req.params.fId);

      const deleteFolderData: Folder = await this.folder.deleteFolder(userId, folderId);
      res.status(200).json({ data: deleteFolderData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default FolderController;
