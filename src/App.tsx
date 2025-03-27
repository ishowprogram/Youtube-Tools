import React, { useState } from 'react';
import { Youtube, Music, Hash, FileText, Image, Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import SubtitleDownloader from './components/SubtitleDownloader';
import YoutubeDownloader from './components/YoutubeDownloader';
import Converter from './components/Converter';
import HashtagGenerator from './components/HashtagGenerator';
import ThumbnailDownloader from './components/ThumbnailDownloader';
import AuthButtons from './components/AuthButtons';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTool, setCurrentTool] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const tools = [
    { name: 'YouTube Downloader', icon: <Youtube size={20} />, route: 'youtube' },
    { name: 'MP3/MP4 Converter', icon: <Music size={20} />, route: 'converter' },
    { name: 'Hashtag Generator', icon: <Hash size={20} />, route: 'hashtags' },
    { name: 'Subtitle Downloader', icon: <FileText size={20} />, route: 'subtitles' },
    { name: 'Thumbnail Downloader', icon: <Image size={20} />, route: 'thumbnails' },
  ];

  const renderTool = () => {
    switch (currentTool) {
      case 'youtube':
        return <YoutubeDownloader isDark={isDark} />;
      case 'subtitles':
        return <SubtitleDownloader isDark={isDark} />;
      case 'converter':
        return <Converter isDark={isDark} />;
      case 'hashtags':
        return <HashtagGenerator isDark={isDark} />;
      case 'thumbnails':
        return <ThumbnailDownloader isDark={isDark} />;
      default:
        return <Home onToolSelect={setCurrentTool} isDark={isDark} />;
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a1f] text-gray-100' : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900'} flex`}>
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`fixed top-4 right-4 z-40 p-2 rounded-full ${isDark ? 'bg-indigo-600' : 'bg-indigo-500 shadow-lg'} lg:hidden text-white`}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AuthButtons isDark={isDark} />

      <Sidebar 
        isOpen={isMenuOpen} 
        tools={tools} 
        onToolSelect={(route) => {
          setCurrentTool(route);
          setIsMenuOpen(false);
        }}
        currentTool={currentTool}
        isDark={isDark}
        onThemeToggle={() => setIsDark(!isDark)}
      />

      <div className="flex-1 p-6 lg:p-10">
        <main className="max-w-4xl mx-auto">
          {renderTool()}
        </main>
      </div>
    </div>
  );
}

export default App;