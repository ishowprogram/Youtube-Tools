import { Router } from 'express';
import { YouTubeController } from '../controllers/youtube.controller';
import { validateApiKey } from '../middleware/auth';
import { limiter } from '../middleware/rateLimit';

const router = Router();

router.post('/info', validateApiKey, limiter, YouTubeController.getVideoInfo);
router.post('/download', validateApiKey, limiter, YouTubeController.downloadVideo);

export default router;