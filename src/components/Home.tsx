import React from 'react';
import { Youtube, Music, Hash, FileText, Image, ArrowRight } from 'lucide-react';

interface HomeProps {
  onToolSelect: (route: string) => void;
  isDark: boolean;
}

const tools = [
  {
    name: 'YouTube Downloader',
    icon: <Youtube size={40} />,
    description: 'Download videos in high-quality MP4 format',
    route: 'youtube'
  },
  {
    name: 'MP3 Converter',
    icon: <Music size={40} />,
    description: 'Convert videos to MP3 audio format',
    route: 'converter'
  },
  {
    name: 'Hashtag Generator',
    icon: <Hash size={40} />,
    description: 'Generate trending hashtags for your content',
    route: 'hashtags'
  },
  {
    name: 'Subtitle Downloader',
    icon: <FileText size={40} />,
    description: 'Extract subtitles from any YouTube video',
    route: 'subtitles'
  },
  {
    name: 'Thumbnail Downloader',
    icon: <Image size={40} />,
    description: 'Download high-quality video thumbnails',
    route: 'thumbnails'
  }
];

const Home: React.FC<HomeProps> = ({ onToolSelect, isDark }) => {
  return (
    <div className="space-y-12 animate-fadeIn">
      <div className="text-center space-y-4">
        <h1 className={`text-4xl font-bold bg-gradient-to-r ${isDark ? 'from-indigo-400 to-purple-400' : 'from-indigo-600 to-purple-600'} bg-clip-text text-transparent animate-gradientFlow`}>
          YouTube Tools Hub
        </h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto animate-slideUp`}>
          Your one-stop destination for all YouTube-related tools. Download videos, convert to MP3, 
          generate hashtags, and more - all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <button
            key={tool.name}
            onClick={() => onToolSelect(tool.route)}
            className={`group ${
              isDark 
                ? 'bg-[#1a1a3a] border-indigo-900/30 hover:shadow-indigo-500/10' 
                : 'bg-white/80 border-indigo-100 hover:shadow-indigo-200'
            } p-6 rounded-xl border hover:border-indigo-500/50 transition-all duration-300 text-left hover:shadow-xl animate-fadeIn backdrop-blur-sm`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-lg ${
                isDark 
                  ? 'bg-indigo-600/20 text-indigo-400' 
                  : 'bg-indigo-100 text-indigo-600'
              } group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {tool.icon}
              </div>
              <ArrowRight className={`${
                isDark ? 'text-indigo-400' : 'text-indigo-600'
              } opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300`} />
            </div>
            <h3 className={`mt-4 text-xl font-semibold ${
              isDark 
                ? 'text-white group-hover:text-indigo-400' 
                : 'text-gray-900 group-hover:text-indigo-600'
            } transition-colors duration-300`}>
              {tool.name}
            </h3>
            <p className={`mt-2 ${
              isDark 
                ? 'text-gray-400 group-hover:text-gray-300' 
                : 'text-gray-600 group-hover:text-gray-900'
            } transition-colors duration-300`}>
              {tool.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;