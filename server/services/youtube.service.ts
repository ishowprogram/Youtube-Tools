import youtubeDl from 'youtube-dl-exec';
import { isYouTubeUrl } from '../utils/validation';
import { VideoFormat, VideoInfo, DownloadOptions } from '../types/youtube';

export class YouTubeService {
  private static formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  static async getVideoInfo(url: string): Promise<VideoInfo> {
    if (!isYouTubeUrl(url)) {
      throw new Error('Invalid YouTube URL');
    }

    try {
      const info = await youtubeDl(url, {
        dumpSingleJson: true,
        noCheckCertificates: true,
        noWarnings: true
      });

      return {
        title: info.title,
        duration: this.formatDuration(info.duration),
        thumbnail: info.thumbnail,
        formats: info.formats
      };
    } catch (error) {
      console.error('Video info error:', error);
      throw new Error('Failed to fetch video information');
    }
  }

  static async downloadVideo({ url, format, quality = 'highest' }: DownloadOptions) {
    if (!isYouTubeUrl(url)) {
      throw new Error('Invalid YouTube URL');
    }

    const options = format === VideoFormat.AUDIO 
      ? {
          extractAudio: true,
          audioFormat: 'mp3',
          audioQuality: 0,
          output: '%(title)s.%(ext)s'
        }
      : {
          format: quality === 'highest' 
            ? 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'
            : 'worstvideo[ext=mp4]+worstaudio[ext=m4a]/worst[ext=mp4]/worst',
          output: '%(title)s.%(ext)s'
        };

    try {
      return await youtubeDl(url, {
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        ...options
      });
    } catch (error) {
      console.error('Download error:', error);
      throw new Error('Failed to download video');
    }
  }
}