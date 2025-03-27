import React, { useState } from 'react';
import { Music, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { getErrorMessage } from '../utils/validation';

const Converter: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = getErrorMessage(url);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create a hidden iframe for download
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // Create a form to submit the download request
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = '/api/download';
      form.target = iframe.name;

      // Add URL and format as hidden inputs
      const urlInput = document.createElement('input');
      urlInput.type = 'hidden';
      urlInput.name = 'url';
      urlInput.value = url;
      form.appendChild(urlInput);

      const formatInput = document.createElement('input');
      formatInput.type = 'hidden';
      formatInput.name = 'format';
      formatInput.value = 'audio';
      form.appendChild(formatInput);

      // Submit the form
      document.body.appendChild(form);
      form.submit();

      // Clean up
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center space-y-4">
        <div className="inline-block p-3 rounded-full bg-indigo-600/20 mb-4">
          <Music size={32} className="text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradientFlow">
          MP3 Converter
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto animate-slideUp">
          Convert YouTube videos to MP3 format. Simply paste the video URL below.
        </p>
      </div>

      <form onSubmit={handleConvert} className="space-y-6">
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
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Music size={20} />
          {loading ? 'Converting...' : 'Convert to MP3'}
        </button>
      </form>

      {error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg animate-fadeIn">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Converter;