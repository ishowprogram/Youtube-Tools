import React, { useState } from 'react';
import { Youtube, Link as LinkIcon, AlertCircle, Video, Info } from 'lucide-react';
import { getErrorMessage } from '../utils/validation';

interface VideoInfo {
  title: string;
  duration: string;
  thumbnail: string;
}

interface Props {
  isDark: boolean;
}

const YoutubeDownloader: React.FC<Props> = ({ isDark }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);

  const fetchVideoInfo = async (videoUrl: string) => {
    try {
      const response = await fetch('/api/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY || ''
        },
        body: JSON.stringify({ url: videoUrl })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch video info');
      }

      const data = await response.json();
      setVideoInfo({
        title: data.info.title,
        duration: data.info.duration,
        thumbnail: data.info.thumbnail
      });
    } catch (err) {
      console.error('Info fetch error:', err);
    }
  };

  const handleDownload = async (e: React.FormEvent, format: 'video' | 'audio') => {
    e.preventDefault();
    const validationError = getErrorMessage(url);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY || ''
        },
        body: JSON.stringify({ url, format })
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      // Create a blob from the response and trigger download
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${videoInfo?.title || 'video'}.${format === 'audio' ? 'mp3' : 'mp4'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setError('');
    if (getErrorMessage(newUrl) === '') {
      fetchVideoInfo(newUrl);
    } else {
      setVideoInfo(null);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center space-y-4">
        <div className={`inline-block p-3 rounded-full ${isDark ? 'bg-indigo-600/20' : 'bg-indigo-100'} mb-4`}>
          <Youtube size={32} className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
        </div>
        <h1 className={`text-3xl font-bold bg-gradient-to-r ${
          isDark ? 'from-indigo-400 to-purple-400' : 'from-indigo-600 to-purple-600'
        } bg-clip-text text-transparent animate-gradientFlow`}>
          YouTube Downloader
        </h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto animate-slideUp`}>
          Download YouTube videos in MP4 format with the highest quality.
        </p>
      </div>

      <form className="space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <LinkIcon className={isDark ? 'text-gray-400' : 'text-gray-500'} size={20} />
          </div>
          <input
            type="url"
            value={url}
            onChange={handleUrlChange}
            placeholder="Paste YouTube URL here (e.g., https://youtube.com/watch?v=...)"
            className={`w-full pl-12 pr-4 py-4 ${
              isDark 
                ? 'bg-[#1a1a3a] border-indigo-900/30' 
                : 'bg-white border-indigo-100'
            } border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
              error ? 'border-red-500' : ''
            }`}
            required
          />
        </div>

        {videoInfo && (
          <div className={`p-4 rounded-xl ${
            isDark ? 'bg-[#1a1a3a] border-indigo-900/30' : 'bg-white border-indigo-100'
          } border`}>
            <div className="flex items-center gap-4">
              <img 
                src={videoInfo.thumbnail} 
                alt={videoInfo.title} 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                  {videoInfo.title}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Duration: {videoInfo.duration}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={(e) => handleDownload(e, 'video')}
            disabled={loading || !!error}
            className={`flex-1 py-4 ${
              isDark 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400'
            } rounded-xl font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-white`}
          >
            <Video size={20} />
            {loading ? 'Processing...' : 'Download MP4'}
          </button>

          <button
            onClick={(e) => handleDownload(e, 'audio')}
            disabled={loading || !!error}
            className={`flex-1 py-4 ${
              isDark 
                ? 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400' 
                : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600'
            } rounded-xl font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
          >
            <Info size={20} />
            Download MP3
          </button>
        </div>
      </form>

      {error && (
        <div className={`flex items-center gap-2 ${
          isDark ? 'text-red-400 bg-red-400/10' : 'text-red-500 bg-red-50'
        } p-4 rounded-lg animate-fadeIn`}>
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default YoutubeDownloader;