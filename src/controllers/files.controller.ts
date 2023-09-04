import { Files } from '@/interfaces/files.interface';
import { FileService } from '@/services/file.service';
import { NextFunction, Request, Response } from 'express';

class FilesController {
  public file = new FileService();

  public uploadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const files = req.file;
      const userId = Number(req.params.id)
      const folderId = Number(req.params.fid)

      const uploadFileData: Files = await this.file.uploadFile(files, userId, folderId);
      res.status(200).json({ data: uploadFileData, message: 'File uploaded successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default FilesController;
