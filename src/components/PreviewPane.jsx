import React from 'react';

const PreviewPane = ({ document }) => {
  if (!document) {
    return (
      <div className="text-gray-500 dark:text-gray-400 italic font-sans">
        Select a document to preview its content.
      </div>
    );
  }

  return (
    <div className="space-y-6 transition-opacity duration-300 ease-in-out opacity-100 text-gray-800 dark:text-gray-100 font-sans">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        {document.title}
      </h2>

      <div className="text-sm text-gray-600 dark:text-gray-300 flex flex-wrap gap-4">
        <span>
          <span className="font-medium text-gray-700 dark:text-gray-400">Team:</span>{' '}
          <strong>{document.team}</strong>
        </span>
        <span>
          <span className="font-medium text-gray-700 dark:text-gray-400">Project:</span>{' '}
          <strong>{document.project}</strong>
        </span>
      </div>

      <div className="whitespace-pre-line leading-relaxed text-base bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
        {document.content}
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        {document.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PreviewPane;