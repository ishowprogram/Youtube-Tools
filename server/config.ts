import dotenv from 'dotenv';
import { cleanEnv, str, num } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: num({ default: 3000 }),
  API_KEY: str(),
  RATE_LIMIT_WINDOW: num({ default: 15 }),
  RATE_LIMIT_MAX_REQUESTS: num({ default: 100 }),
  MAX_FILE_SIZE: num({ default: 104857600 }) // 100MB
});