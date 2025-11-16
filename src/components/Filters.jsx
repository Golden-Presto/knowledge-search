import React, { useState } from 'react';

const Filters = ({ documents, setFilteredDocs, setIsLoading, setCurrentPage }) => {
  const teams = [...new Set(documents.map((doc) => doc.team))];
  const projects = [...new Set(documents.map((doc) => doc.project))];

  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const applyFilters = () => {
    setIsLoading(true);

    const filtered = documents.filter((doc) => {
      const teamMatch = selectedTeam === '' || doc.team === selectedTeam;
      const projectMatch = selectedProject === '' || doc.project === selectedProject;
      return teamMatch && projectMatch;
    });

    setTimeout(() => {
      setFilteredDocs(filtered);
      setCurrentPage(1); // reset pagination
      setIsLoading(false);
    }, 300); // simulate async delay
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 md:px-4 text-gray-800 dark:text-gray-100 font-sans">
      <div>
        <label className="block text-sm sm:text-base font-medium mb-2">Team</label>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring focus:border-blue-400"
        >
          <option value="">All</option>
          {teams.map((team) => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm sm:text-base font-medium mb-2">Project</label>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring focus:border-blue-400"
        >
          <option value="">All</option>
          {projects.map((project) => (
            <option key={project} value={project}>{project}</option>
          ))}
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-blue-600 text-white py-2 sm:py-2.5 text-sm sm:text-base rounded-md hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;