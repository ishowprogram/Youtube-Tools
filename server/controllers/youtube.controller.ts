import { Request, Response } from 'express';
import { YouTubeService } from '../services/youtube.service';
import { VideoFormat, VideoQuality } from '../types/youtube';

export class YouTubeController {
  static async getVideoInfo(req: Request, res: Response) {
    try {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }

      const info = await YouTubeService.getVideoInfo(url);
      res.json({ info });

    } catch (error) {
      console.error('Info fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch video information' });
    }
  }

  static async downloadVideo(req: Request, res: Response) {
    try {
      const { url, format, quality = VideoQuality.HIGHEST } = req.body;

      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }

      const info = await YouTubeService.getVideoInfo(url);
      const download = await YouTubeService.downloadVideo({ 
        url, 
        format: format as VideoFormat,
        quality: quality as VideoQuality
      });

      res.header('Content-Disposition', `attachment; filename="${info.title}.${format === VideoFormat.AUDIO ? 'mp3' : 'mp4'}"`);
      res.header('Content-Type', format === VideoFormat.AUDIO ? 'audio/mpeg' : 'video/mp4');

      download.pipe(res);

    } catch (error) {
      console.error('Download error:', error);
      res.status(500).json({ error: 'Download failed' });
    }
  }
}