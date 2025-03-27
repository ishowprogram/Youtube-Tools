export const isYouTubeUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return (
      urlObj.hostname === 'youtube.com' ||
      urlObj.hostname === 'www.youtube.com' ||
      urlObj.hostname === 'youtu.be' ||
      urlObj.hostname === 'm.youtube.com'
    );
  } catch {
    return false;
  }
};

export const getErrorMessage = (url: string): string => {
  if (!url) return 'Please enter a URL';
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'Please enter a valid URL starting with http:// or https://';
  }
  if (!isYouTubeUrl(url)) {
    return 'Please enter a valid YouTube URL';
  }
  return '';
};