import React, { useState } from 'react';
import { FileText, Download, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { getErrorMessage } from '../utils/validation';

const SubtitleDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [subtitles, setSubtitles] = useState('');
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
    setSubtitles('');

    try {
      const response = await fetch('/api/subtitles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch subtitles');
      }

      const data = await response.json();
      if (data.subtitles) {
        setSubtitles(data.subtitles);
      } else {
        setError('No subtitles found for this video');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch subtitles');
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError('');
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([subtitles], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'subtitles.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-block p-3 rounded-full bg-indigo-600/20 mb-4">
          <FileText size={32} className="text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          YouTube Subtitle Downloader
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Extract and download subtitles from any YouTube video. Simply paste the video URL below.
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
            onChange={handleUrlChange}
            placeholder="Paste YouTube URL here (e.g., https://youtube.com/watch?v=...)"
            className={`w-full pl-12 pr-4 py-4 bg-[#1a1a3a] border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
              error ? 'border-red-500' : 'border-indigo-900/30'
            }`}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !!error}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Get Subtitles'}
        </button>
      </form>

      {error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {subtitles && (
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute right-4 top-4">
              <button
                onClick={handleDownload}
                className="p-2 bg-indigo-600/20 hover:bg-indigo-600/30 rounded-lg transition-colors"
                title="Download subtitles"
              >
                <Download size={20} className="text-indigo-400" />
              </button>
            </div>
            <pre className="w-full h-64 p-4 bg-[#1a1a3a] border border-indigo-900/30 rounded-xl overflow-auto whitespace-pre-wrap">
              {subtitles}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubtitleDownloader;