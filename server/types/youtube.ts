export enum VideoFormat {
  AUDIO = 'audio',
  VIDEO = 'video'
}

export enum VideoQuality {
  HIGHEST = 'highest',
  LOWEST = 'lowest'
}

export interface VideoInfo {
  title: string;
  duration: string;
  thumbnail: string;
  formats: any[];
}

export interface DownloadOptions {
  url: string;
  format: VideoFormat;
  quality?: VideoQuality;
}