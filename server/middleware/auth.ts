import { Request, Response, NextFunction } from 'express';
import { env } from '../config';

export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};