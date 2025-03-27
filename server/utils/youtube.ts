import youtubeDl from 'youtube-dl-exec';
import { isYouTubeUrl } from './validation';

interface DownloadOptions {
  url: string;
  format: 'audio' | 'video';
}

export const downloadVideo = async ({ url, format }: DownloadOptions) => {
  if (!isYouTubeUrl(url)) {
    throw new Error('Invalid YouTube URL');
  }

  const options = format === 'audio' 
    ? {
        extractAudio: true,
        audioFormat: 'mp3',
        audioQuality: 0, // Best quality
        output: '%(title)s.%(ext)s'
      }
    : {
        format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
        output: '%(title)s.%(ext)s'
      };

  try {
    const info = await youtubeDl(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      ...options
    });

    return info;
  } catch (error) {
    console.error('Download error:', error);
    throw new Error('Failed to download video');
  }
};

export const getVideoInfo = async (url: string) => {
  if (!isYouTubeUrl(url)) {
    throw new Error('Invalid YouTube URL');
  }

  try {
    const info = await youtubeDl(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true
    });

    return info;
  } catch (error) {
    console.error('Info fetch error:', error);
    throw new Error('Failed to fetch video information');
  }
};