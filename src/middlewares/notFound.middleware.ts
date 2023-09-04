import { NextFunction, Request, Response } from 'express';
import { logger } from '@/utils/logger';

const NotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${404}, Message:: "URL NOT FOUND"`);
    res.status(404).json({ isSuccess: false, message: 'The URL you requested does npot esxist. Please check your url and try again', data: [] });
  } catch (error) {
    next(error);
  }
};

export default NotFoundHandler;
