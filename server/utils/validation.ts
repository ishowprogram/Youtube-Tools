import ytdl from 'ytdl-core';

export const validateUrl = (url: string): boolean => {
  try {
    return ytdl.validateURL(url);
  } catch {
    return false;
  }
};