import FolderController from '@/controllers/folders.controller';
import { FolderDto } from '@/dtos/folders.dto';
import { Routes } from '@/interfaces/routes.interface';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

class FolderRoute implements Routes {
  public path: string = '/folders';
  public router: Router = Router();
  public folder = new FolderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:id(\\d+)`, ValidationMiddleware(FolderDto, 'body'), this.folder.createFolder);
    this.router.get(`${this.path}`, this.folder.getFolders);
    this.router.get(`${this.path}/:id(\\d+)`, this.folder.getFoldersById);
    this.router.put(`${this.path}/:id(\\d+)/:fId(\\d+)`, ValidationMiddleware(FolderDto, 'body', true), this.folder.updateFolder);
    this.router.delete(`${this.path}/:fId(\\d+)/:id(\\d+)`, this.folder.deleteFolder);
  }
}

export default FolderRoute;
