import React, { useState } from 'react';
import { Image, Link as LinkIcon, AlertCircle, Download } from 'lucide-react';
import { getErrorMessage } from '../utils/validation';

interface Thumbnail {
  url: string;
  quality: string;
}

const ThumbnailDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = getErrorMessage(url);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setThumbnails([]);

    try {
      const response = await fetch('/api/thumbnails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch thumbnails');
      }

      if (!data.thumbnails?.length) {
        throw new Error('No thumbnails found for this video');
      }

      setThumbnails(data.thumbnails);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch thumbnails');
    } finally {
      setLoading(false);
    }
  };

  const downloadThumbnail = async (thumbnailUrl: string, quality: string) => {
    try {
      const response = await fetch(thumbnailUrl);
      if (!response.ok) {
        throw new Error('Failed to download thumbnail');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `thumbnail-${quality}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download thumbnail');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center space-y-4">
        <div className="inline-block p-3 rounded-full bg-indigo-600/20 mb-4">
          <Image size={32} className="text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradientFlow">
          Thumbnail Downloader
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto animate-slideUp">
          Download high-quality thumbnails from any YouTube video.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <LinkIcon className="text-gray-400" size={20} />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
            placeholder="Paste YouTube URL here (e.g., https://youtube.com/watch?v=...)"
            className={`w-full pl-12 pr-4 py-4 bg-[#1a1a3a] border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
              error ? 'border-red-500' : 'border-indigo-900/30'
            }`}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Image size={20} />
          {loading ? 'Processing...' : 'Get Thumbnails'}
        </button>
      </form>

      {error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg animate-fadeIn">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {thumbnails.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {thumbnails.map((thumb, index) => (
            <div 
              key={`${thumb.quality}-${index}`} 
              className="bg-[#1a1a3a] rounded-xl overflow-hidden border border-indigo-900/30 hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="aspect-video relative">
                <img 
                  src={thumb.url} 
                  alt={`Thumbnail ${thumb.quality}`} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-gray-400">{thumb.quality}</span>
                <button
                  onClick={() => downloadThumbnail(thumb.url, thumb.quality)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 rounded-lg transition-colors text-indigo-400"
                >
                  <Download size={20} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThumbnailDownloader;