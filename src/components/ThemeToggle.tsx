import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-gray-300 hover:bg-indigo-600/20 hover:text-indigo-400 mt-auto group"
    >
      <span className="transform transition-transform duration-300 group-hover:rotate-12">
        {isDark ? <Moon size={20} /> : <Sun size={20} />}
      </span>
      <span className="transform transition-transform duration-300 group-hover:translate-x-1">
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;