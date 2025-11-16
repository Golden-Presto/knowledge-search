import React, { useMemo, useState, useEffect } from 'react';
import Fuse from 'fuse.js';

const ResultList = ({
  documents,
  query,
  setSelectedDoc,
  currentPage,
  docsPerPage,
  setCurrentPage, 
  isLoading, 
  setQuery
}) => {
  const fuse = useMemo(() => {
    return new Fuse(documents, {
      keys: ['title', 'content', 'tags'],
      threshold: 0.3,
    });
  }, [documents]);

  const filteredResults = query
    ? fuse.search(query).map((result) => result.item)
    : documents;

  const indexOfLastDoc = currentPage * docsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
  const currentDocs = filteredResults.slice(indexOfFirstDoc, indexOfLastDoc);
  const [pageInput, setPageInput] = useState(currentPage);

  const totalPages = Math.ceil(filteredResults.length / docsPerPage);

  useEffect(() => {
    setPageInput(currentPage);
  }, [currentPage]);

  if (!isLoading && filteredResults.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center flex-grow min-h-[200px] text-center text-sm text-gray-500 dark:text-gray-400">
        No documents found. Try adjusting your filters or search.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-4 px-4 space-y-4">
        {Array.from({ length: docsPerPage }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
            <div className="flex gap-2">
              <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4 px-4">
      {currentDocs.map((doc) => (
        <div
          key={doc.id}
          onClick={() => setSelectedDoc(doc)}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-200 ease-in-out cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label={doc.title}
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {doc.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
            {doc.team} • {doc.project}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {doc.tags.map((tag) => (
              <span
                key={tag}
                onClick={(e) => {
                  e.stopPropagation(); // prevent triggering document preview
                  setQuery(tag);
                  setCurrentPage(1);
                }}
                className="cursor-pointer inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs px-2 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-600 transition"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Prev
          </button>

          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            Page
            <input
              type="text"
              inputMode="numeric"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onBlur={() => {
                const page = Number(pageInput);
                if (!isNaN(page) && page >= 1 && page <= totalPages) {
                  setCurrentPage(page);
                } else {
                  setPageInput(currentPage); // reset if invalid
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const page = Number(pageInput);
                  if (!isNaN(page) && page >= 1 && page <= totalPages) {
                    setCurrentPage(page);
                  } else {
                    setPageInput(currentPage);
                  }
                }
              }}
              className="w-10 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-center focus:outline-none focus:ring focus:border-blue-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            of {totalPages}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev < totalPages ? prev + 1 : prev
              )
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultList;