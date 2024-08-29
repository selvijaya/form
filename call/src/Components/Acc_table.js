// Table.js
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const Table = ({
  filteredAccountDetails,
  currentAccountPage,
  itemsPerPage,
  onPageChange,
  onBackwardClick,
  onForwardClick,
  onSelectAll,
  handleSelectRow,
  selectedRowsAccountDetails = [], // Default to an empty array if not passed
  toggleDropdown,
  dropdownVisible,
  paginateData,
  FilteredAccountDetails,
  handleDropdownItemClick, 
  handleOpenModal,
}) => {
  return (
    <div className="relative max-h-[600px] w-[370px] md:w-[700px] lg:w-[970px]  2xl:w-[1450px] xl:w-[1200px] bg-white rounded-lg border border-gray-50 overflow-x-auto">
    <table className="min-w-full table-auto">
      <thead className="bg-gray-50  border-gray-200">
        <tr>
          <th className="p-3 text-left">
            <input
              type="checkbox"
             className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 bg-blue-50 rounded-sm focus:outline-none focus:ring-0"
              onChange={onSelectAll}
              checked={filteredAccountDetails.length > 0 && filteredAccountDetails.length === selectedRowsAccountDetails.length}
            />
            </th>
            <th className="p-3 text-left text-gray-700 text-sm"> Account Id</th>
            <th className="p-3 text-left text-gray-700 text-sm">
                            Tnx Date
                            </th>
                            <th className="p-3 text-left text-gray-700 text-sm">
                            Value Date
                            </th>
                            <th className="p-3 text-left text-gray-700 text-sm">
                            Description
                            </th>
                            <th className="p-3 text-left text-gray-700 text-sm">
                            Refno
                            </th>
                            <th className="p-3 text-left text-gray-700 text-sm">
                            Debit
                            </th>
                            <th className="p-3 text-left text-gray-700 text-sm">
                            Credit
                            </th>
                            <th className="p-3 text-left text-gray-700 text-sm">
                            Balance
                            </th>
                            <th className="p-3 text-left text-gray-700 text-sm">
                            Actions
                            </th>
                        </tr>
                  </thead>
                  <tbody>
                        {filteredAccountDetails.length > 0 || FilteredAccountDetails.length > 0 ? (
                            paginateData(
                                FilteredAccountDetails.length > 0 ? FilteredAccountDetails : filteredAccountDetails,
                                currentAccountPage
                            ).map((account, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 hover:bg-gray-100 odd:bg-white even:bg-gray-50"
                                >
                                    <td className="p-3">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 bg-blue-50 rounded-sm focus:outline-none focus:ring-0"
                                            checked={selectedRowsAccountDetails.includes(index)}
                                            onChange={() => handleSelectRow(index, "accountDetails")}
                                        />
                                    </td>
                                    <td className="p-3 text-gray-800 text-sm">{account.id}</td>
                                    <td className="p-3 text-gray-800 text-sm">{new Date(account.Tnx_Date).toLocaleDateString("en-US")}</td>
                                    <td className="p-3 text-gray-800 text-sm">{new Date(account.Value_Date).toLocaleDateString("en-US")}</td>
                                    <td className="p-3 text-gray-800 text-sm">{account.Description}</td>
                                    <td className="p-3 text-gray-800 text-sm">{account.Refno}</td>
                                    <td className="p-3 text-gray-800 text-sm">{account.Debit}</td>
                                    <td className="p-3 text-gray-800 text-sm">{account.Credit}</td>
                                    <td className="p-3 text-gray-800 text-sm">{account.Balance}</td>
                                    <td className="p-3">
                                        <div className="relative inline-block text-left">
                                            <button
                                                type="button"
                                                className="inline-flex items-center justify-center gap-x-2 rounded-md bg-[#f9f9f9] hover:bg-blue-50 hover:text-[#009EF7] text-gray-500 px-3 py-1 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#009EF7]"
                                                onClick={() => toggleDropdown(index)}
                                                aria-expanded={dropdownVisible === index}
                                                aria-haspopup="true"
                                            >
                                                Actions
                                                <svg
                                                    className="-mr-1 h-5 w-5 text-gray-500"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>

                                            {dropdownVisible === index && (
                                                <div
                                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    aria-labelledby="menu-button"
                                                    tabIndex="-1"
                                                >
                                                    <div className="py-1">
                                                        <a
                                                            href="#"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#009EF7] no-underline"
                                                            role="menuitem"
                                                            tabIndex="-1"
                                                            onClick={() => handleDropdownItemClick("Edit")}
                                                        >
                                                            Edit
                                                        </a>
                                                   
                                                        <a
                                                            href="#                                     "
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#009EF7] no-underline"
                                                            role="menuitem"
                                                            tabIndex="-1"
                                                            onClick={() => handleOpenModal(account.id)}
                                                        >
                                                            Delete
                                                        </a>
                                                       
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="9" // Adjust this value if you have more or fewer columns
                                    className="text-center py-4 text-gray-500"
                                >
                                    Result not found
                                </td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                        <div className="flex justify-center mt-4 px-4 py-2">
                            <button
                                onClick={() => onBackwardClick('accountDetails')}
                                disabled={currentAccountPage === 1}
                                className="p-2 text-gray rounded-l-md disabled:opacity-50 flex items-center justify-center"
                            >
                                <FaChevronLeft />
                            </button>
                            {Array.from({ length: Math.ceil(filteredAccountDetails.length / itemsPerPage) }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => onPageChange(index + 1, 'accountDetails')}
                                    className={`p-2 ${currentAccountPage === index + 1 ? 'text-gray-700' : 'text-gray-400'} mx-1 rounded-md`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => onForwardClick('accountDetails')}
                                disabled={currentAccountPage=== Math.ceil(filteredAccountDetails.length / itemsPerPage)}
                                className="p-2 text-gray rounded-r-md disabled:opacity-50 flex items-center justify-center"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                        </div>
  );
};

export default Table;


