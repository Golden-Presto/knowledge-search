import { useState, useEffect } from 'react';

const SearchBar = ({ query, setQuery }) => {
  const [localQuery, setLocalQuery] = useState(query);

  // Sync localQuery when external query changes (e.g. tag click)
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  // Debounce input changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(localQuery);
    }, 300);
    return () => clearTimeout(timeout);
  }, [localQuery]);

  return (
    <div className="sticky top-0 z-10 w-full bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 px-4 py-4">
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Search documents..."
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
  );
};

export default SearchBar;