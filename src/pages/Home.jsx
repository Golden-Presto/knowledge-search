import React, { useState, useEffect } from 'react';
import mockDocuments from '../data/mockDocuments.json';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import ResultList from '../components/ResultList';
import PreviewPane from '../components/PreviewPane';

const Home = ({ darkMode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [filteredDocs, setFilteredDocs] = useState(mockDocuments);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const docsPerPage = 5;
  useEffect(() => {
        const totalPages = Math.ceil(filteredDocs.length / docsPerPage);
        if (currentPage > totalPages) {
            setCurrentPage(1); 
        }
    }, [filteredDocs, docsPerPage]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="grid grid-cols-1 md:grid-cols-12 h-screen overflow-hidden bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans">

        <div className="col-span-2 border-r border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
          <Filters
                documents={mockDocuments}
                setFilteredDocs={setFilteredDocs}
                setIsLoading={setIsLoading}
                setCurrentPage={setCurrentPage}
            />
        </div>

        <div className="col-span-5 pt-0 pb-4 overflow-y-auto">
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />
          <ResultList
            documents={filteredDocs}
            query={searchQuery}
            setSelectedDoc={setSelectedDoc}
            currentPage={currentPage}
            docsPerPage={docsPerPage}
            setCurrentPage={setCurrentPage} 
            isLoading={isLoading}
            setQuery={setSearchQuery}
          />
        </div>

        <div className="col-span-5 border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto bg-white dark:bg-gray-900">
          <PreviewPane document={selectedDoc} />
        </div>
      </div>
    </div>
  );
};

export default Home;