// SearchAndFilter.js
import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext';

const SearchAndFilter = ({ filterOpenAccountSection,
  searchValue, 
  onSearchChange,
  resetAccountFilters,
  handleAccountFilter,
  handleAccountFilterButtonClick,
  startDate,
  endDate,
  setStartDate,
  setEndDate
}) => {
  const { theme } = useTheme();
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
             className="block w-full pl-10 pr-4 py-2 text-gray-700 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
       onClick={handleAccountFilterButtonClick}
       className="md:mr-4 bg-[#F1FAFF] md:w-28 md:h-10 md:text-lg sm:w-16 sm:h-8 sm:mr-2 sm:text-xs xs:w-12 xs:h-6 xs:text-xxs hover:bg-[#009EF7] text-[#009EF7] hover:text-white font-semibold py-1 px-2 rounded focus:outline-none"
       style={{ border: "none" }}
       >
      <i className="fa-solid fa-filter"></i> Filter
       </button>
       {filterOpenAccountSection && (
                  <div
                  className={`absolute left-0 ml-10 mt-[420px] 2xl:ml-[1420px] 2xl:mt-[420px] xl:ml-[970px] xl:mt-[420px] lg:ml-[630px] lg:mt-[420px] md:ml-[380px] md:mt-[420px] mr-10 z-10 mb-20 w-96 h-64 px-4 rounded-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg focus:outline-none`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="space-y-2">
                      <h6 className="text-lg mt-3 border-b border-gray-100 pb-2">
                        Filter option
                      </h6>
                      <label className={`mt-3 px-2 ${theme ==='dark' ?'text-white':'text-gray-700'}`}>
                        Date Range
                      </label>
                      <div className="flex space-x-2 px-2 mt-3">
                        <input
                          type="date"
                          className={`border border-gray-50 rounded-md p-2 focus:outline-none ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}  focus:outline-none`}
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                        <span className="mt-2 text-xl">-</span>
                        <input
                          type="date"
                          className={`border border-gray-50 rounded-md p-2 focus:outline-none ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} focus:outline-none`}
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                   
                    <div className="flex justify-end space-x-2 mt-5">
                      <button
                        className="bg-[#1B84FF] text-white px-4 py-2 text-sm rounded-md hover:bg-[#056EE9] border-[#1B84FF]"
                        onClick={handleAccountFilter}
                      >
                        Apply
                      </button>
                      <button
                        className="bg-gray-200 text-gray-700 px-4 py-2 text-sm rounded-md hover:bg-gray-400"
                        onClick={resetAccountFilters}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}
    </div>
  );
};

export default SearchAndFilter;
