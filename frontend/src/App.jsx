import React, { useState, useEffect } from 'react';
import { StatsProvider } from './backend-connector';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <StatsProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Dashboard />
      </div>
    </StatsProvider>
  );
};

export default App;
