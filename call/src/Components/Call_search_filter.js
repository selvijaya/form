// SearchFilter.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext';

const SearchFilter = ({
  callHistorySearch,
  setCallHistorySearch,
  filterSectionOpen,
  handleFilterButtonClick,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  status,
  setStatus,
  department,
  setDepartment,
  applyFilters,
  resetFilters
}) => {
  const { theme } = useTheme();

  const filterSectionStyles = theme === 'dark'
    ? 'bg-gray-900 text-white border-gray-700'
    : 'bg-white text-gray-700 border-gray-300';

  return (
    <div className="flex items-center justify-between mb-4">
    <div className="flex justify-center">
      <div className="relative w-full sm:w-[10px] md:w-[250px] lg:w-[250px]">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Search"
          value={callHistorySearch}
          onChange={(e) => setCallHistorySearch(e.target.value)}
          className="block w-full pl-10 py-2 text-gray-700 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm md:text-base lg:text-lg"
        />
      </div>
    </div>
    <button
  onClick={handleFilterButtonClick}
  className="bg-[#F1FAFF] text-[#009EF7] hover:bg-[#009EF7] hover:text-white font-semibold py-1 px-2 rounded focus:outline-none 
    sm:w-16 sm:h-8 sm:text-xs sm:mr-0 md:w-28 md:h-10 md:text-lg md:mr-4 
    xs:w-12 xs:h-6 xs:text-xxs"
  style={{ border: 'none' }}
>
  <i className="fa-solid fa-filter"></i> Filter
</button>


{filterSectionOpen && (
        <div
          className={`absolute left-0 ml-40 mt-[420px] 2xl:ml-[1420px] 2xl:mt-[380px] xl:ml-[970px] xl:mt-[380px] lg:ml-[630px] lg:mt-[380px] md:ml-[400px] md:mt-[380px] md:mr-0 z-10 w-full md:w-96 h-auto md:h-72 px-4 py-2 rounded-md shadow-lg ${filterSectionStyles}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="space-y-2">
            <h6 className="text-lg mt-2 border-b border-gray-100 pb-2">Filter Options</h6>
            <label className="mt-2 px-2">Date Range</label>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 px-2">
              <input
                type="date"
                className={`border rounded-md p-2 focus:outline-none ${filterSectionStyles}`}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <span className="hidden md:inline mt-2 text-xl">-</span>
              <input
                type="date"
                className={`border rounded-md p-2 focus:outline-none ${filterSectionStyles}`}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2 mt-1">
            <label className="px-2">Status:</label>
            <select
              className={`border px-2 rounded-md p-2 focus:outline-none ${filterSectionStyles}`}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="Completed">Completed</option>
              <option value="Missed">Missed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
          <div className="space-y-2 mt-1">
            <label className="mt-2 px-2">Department:</label>
            <select
              className={`border mt-2 px-2 rounded-md p-2 focus:outline-none ${filterSectionStyles}`}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">All</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
              <option value="Customer Service">Customer Service</option>
              <option value="Technical Support">Technical Support</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 mt-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600"
              onClick={applyFilters}
            >
              Apply
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 text-sm rounded-md hover:bg-gray-400"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
