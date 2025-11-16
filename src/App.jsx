import React, { useEffect, useState } from 'react';
import Home from './pages/Home';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Home darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="absolute top-4 right-4 z-20 flex items-center gap-3" title="Toggle theme">
        <span className="text-sm text-gray-600 dark:text-gray-400">Light</span>

        <label className="inline-flex items-center cursor-pointer">
          <span className="sr-only">Toggle dark mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="sr-only"
          />
          <span className="w-10 h-6 bg-gray-300 dark:bg-gray-700 rounded-full relative transition-colors duration-300">
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                darkMode ? 'translate-x-4' : ''
              }`}
            />
          </span>
        </label>

        <span className="text-sm text-gray-600 dark:text-gray-400">Dark</span>
      </div>
    </div>
  );
}

export default App;