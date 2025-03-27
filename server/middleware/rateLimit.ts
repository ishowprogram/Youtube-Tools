import rateLimit from 'express-rate-limit';
import { env } from '../config';

export const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW * 60 * 1000,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  message: { error: 'Too many requests, please try again later.' }
});