import React from 'react';
import { Youtube } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface Tool {
  name: string;
  icon: React.ReactNode;
  route: string;
}

interface SidebarProps {
  isOpen: boolean;
  tools: Tool[];
  onToolSelect: (route: string) => void;
  currentTool: string;
  isDark: boolean;
  onThemeToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  tools, 
  onToolSelect, 
  currentTool,
  isDark,
  onThemeToggle 
}) => {
  return (
    <aside className={`
      fixed lg:static inset-y-0 right-0 w-64 
      ${isDark 
        ? 'bg-[#1a1a3a] text-gray-100 border-indigo-900/30' 
        : 'bg-white/90 text-gray-900 border-indigo-100'
      } 
      transform transition-all duration-300 ease-out
      ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      border-l p-6 flex flex-col gap-6 z-40 h-screen
      backdrop-blur-lg
    `}>
      <button 
        onClick={() => onToolSelect('home')}
        className="flex items-center gap-3 mb-8 hover:opacity-80 transition-all duration-300 group"
      >
        <Youtube className={`${
          isDark ? 'text-indigo-400' : 'text-indigo-600'
        } transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`} size={32} />
        <h1 className={`text-xl font-bold bg-gradient-to-r ${
          isDark ? 'from-indigo-400 to-purple-400' : 'from-indigo-600 to-purple-600'
        } bg-clip-text text-transparent animate-gradientFlow`}>
          YouTube Tools
        </h1>
      </button>

      <nav className="space-y-2 flex-1">
        {tools.map((tool, index) => (
          <button
            key={tool.name}
            onClick={() => onToolSelect(tool.route)}
            style={{ animationDelay: `${index * 100}ms` }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 animate-fadeIn
              transform hover:translate-x-1
              ${currentTool === tool.route 
                ? isDark 
                  ? 'bg-indigo-600/20 text-indigo-400' 
                  : 'bg-indigo-100 text-indigo-600'
                : isDark
                  ? 'text-gray-300 hover:bg-indigo-600/10 hover:text-indigo-400'
                  : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
          >
            <span className="transition-transform duration-300 group-hover:scale-110">
              {tool.icon}
            </span>
            <span>{tool.name}</span>
          </button>
        ))}
      </nav>

      <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
    </aside>
  );
}

export default Sidebar;