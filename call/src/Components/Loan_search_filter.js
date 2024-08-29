import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext';

const SearchFilter = ({
  loanDetailsSearch,
  setLoanDetailsSearch,
  handleLoanFilterButtonClick,
  FilterLoanDetails,
  showFilterModal,
  selectedLoanType,
  setSelectedLoanType,
  resetLoanDetails
}) => {
  const { theme } = useTheme();
  return(
  <div className="flex items-center justify-between mb-4 ">
    <div className="flex justify-center">
      <div className="relative w-full max-w-md">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Search"
          value={loanDetailsSearch}
          onChange={(e) => setLoanDetailsSearch(e.target.value)}
          className="block w-full pl-10 pr-4 py-2 text-gray-700 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <button
      onClick={handleLoanFilterButtonClick}
      className="md:mr-4 bg-[#F1FAFF] md:w-28 md:h-10 sm:w-16 md:text-lg sm:h-8 sm:mr-2 sm:text-xs xs:w-12 xs:h-6 xs:text-xxs hover:bg-[#009EF7] text-[#009EF7] hover:text-white font-semibold py-1 px-2 rounded focus:outline-none"
      style={{ border: 'none' }}
    >
      <i className="fa-solid fa-filter"></i> Filter
    </button>
    {showFilterModal && (
                  <div
                    className="absolute left-0 ml-16 mt-[280px] 2xl:ml-[1420px] 2xl:mt-[280px] xl:ml-[970px] xl:mt-[280px] lg:ml-[665px] lg:mt-[280px] md:ml-[410px] md:mt-[280px] w-96 z-10 h-48 px-4 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button" 
                    tabIndex="-1"
                  >
                    <div                                        
                      className={`p-4 rounded-lg shadow-lg max-w-sm w-full ${theme ==='dark'? 'bg-gray-800':'bg-white'}`}>
                      <h3 className={`mt-3 px-2 border-b pb-4 ${theme ==='dark' ?'text-white':'text-gray-700'}`}>
                        Filter Options
                      </h3>

                      <label className={`mt-3 px-2 ${theme ==='dark' ?'text-white':'text-gray-700'}`}>
                        Loan Type
                        <div className="mt-3 flex flex-col gap-2">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              value="All"
                              checked={selectedLoanType === "All"}
                              onChange={(e) =>
                                setSelectedLoanType(e.target.value)
                              }
                              className="appearance-none h-4 w-4 rounded-full border border-gray-300 bg-gray-100 checked:bg-[#009EF7] checked:ring-2 checked:ring-offset-2 checked:ring-[#009EF7] focus:outline-none"
                            />
                            <span className={`ml-2 ${theme === 'dark' ? 'text-white' :'text-gray-800'} text-gray-700`}>All</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              value="Personal"
                              checked={selectedLoanType === "Personal"}
                              onChange={(e) =>
                                setSelectedLoanType(e.target.value)
                              }
                              className="appearance-none h-4 w-4 rounded-full border border-gray-300 bg-gray-100 checked:bg-[#009EF7] checked:ring-2 checked:ring-offset-2 checked:ring-[#009EF7] focus:outline-none"
                            />
                            <span className={`ml-2 ${theme === 'dark' ? 'text-white' :'text-gray-800'} text-gray-700`}>Personal</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              value="Mortgage"
                              checked={selectedLoanType === "Mortgage"}
                              onChange={(e) =>
                                setSelectedLoanType(e.target.value)
                              }
                              className="appearance-none h-4 w-4 rounded-full border border-gray-300 bg-gray-100 checked:bg-[#009EF7] checked:ring-2 checked:ring-offset-2 checked:ring-[#009EF7] focus:outline-none"
                            />
                            <span className={`ml-2 ${theme === 'dark' ? 'text-white' :'text-gray-800'} text-gray-700`}>Mortgage</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              value="Housing Loan"
                              checked={selectedLoanType === "Housing Loan"}
                              onChange={(e) =>
                                setSelectedLoanType(e.target.value)
                              }
                              className="appearance-none h-4 w-4 rounded-full border border-gray-300 bg-gray-100 checked:bg-[#009EF7] checked:ring-2 checked:ring-offset-2 checked:ring-[#009EF7] focus:outline-none"
                            />
                            <span className={`ml-2 ${theme === 'dark' ? 'text-white' :'text-gray-800'} text-gray-700`}>
                              Housing Loan
                            </span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              value="Business Loans"
                              checked={selectedLoanType === "Business Loans"}
                              onChange={(e) =>
                                setSelectedLoanType(e.target.value)
                              }
                              className="appearance-none h-4 w-4 rounded-full border border-gray-300 bg-gray-100 checked:bg-[#009EF7] checked:ring-2 checked:ring-offset-2 checked:ring-[#009EF7] focus:outline-none"
                            />
                            <span className={`ml-2 ${theme === 'dark' ? 'text-white' :'text-gray-800'} text-gray-700`}>
                              Business Loans
                            </span>
                          </label>
                        </div>
                      </label>
                      <div className="flex justify-end space-x-2 mt-2">
                        <button
                         className="bg-[#1B84FF] text-white px-4 py-2 text-sm rounded-md hover:bg-[#056EE9] border-[#1B84FF]"
                         onClick={FilterLoanDetails}
                        >
                          Apply
                        </button>
                        <button
                          className="bg-gray-200 text-gray-700 px-4 py-2 text-sm rounded-md hover:bg-gray-400"
                          onClick={resetLoanDetails}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                )}

  </div>
);
}

export default SearchFilter;
