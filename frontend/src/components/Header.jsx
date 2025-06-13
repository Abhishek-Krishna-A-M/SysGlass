import React from 'react';
import { Monitor, RotateCcw, Sun, Moon } from 'lucide-react';
import { useStats } from '../backend-connector';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? 
        <Sun size={20} className="text-yellow-500" /> : 
        <Moon size={20} className="text-gray-600 dark:text-gray-400" />
      }
    </button>
  );
};
const Header = ({ darkMode, setDarkMode }) => {
  const { refreshData } = useStats();

  const handleRefresh = () => {
    if (refreshData && typeof refreshData === 'function') {
      refreshData();
    }
  };

  return (
    <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Monitor size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Sysglass</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Your Device. Demystified.</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button  
          onClick={handleRefresh}  
          className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          aria-label="Refresh data"
        >
          <RotateCcw size={16} />
          Refresh
        </button>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
};

export default Header;
