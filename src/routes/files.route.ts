import FilesController from '@/controllers/files.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import multer from 'multer';

const uploads = multer({ dest: 'uploads/' });

class FileRoute implements Routes {
  public path: string = '/uploadfile';
  public router: Router = Router();
  public file = new FilesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:id(\\d+)(/:fid(\\d+)?)`, uploads.single('files'), this.file.uploadFile);
  }
}

export default FileRoute;
