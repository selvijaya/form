import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const LoanTable = ({
  FilteredLoanDetails,
  filteredLoanDetails,
  paginateData,
  handleSelectAll,
  handleSelectRow,
  selectedRowsLoanDetails,
  currentLoanPage,
  handlePageChange,
  handleBackward,
  handleForward,
  itemsPerPage,
  toggleDropdown,
  dropdownVisible,
  handleDropdownItemClick,
  handleOpenModal
}) => (
  <div className="relative max-h-[600px] w-[370px] md:w-[700px] lg:w-[970px]  2xl:w-[1450px] xl:w-[1200px] bg-white rounded-lg border border-gray-200 overflow-x-auto">
    <table className="min-w-full ">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          <th className="p-3 text-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 bg-blue-50 rounded-sm focus:outline-none focus:ring-0"
              onChange={(e) => handleSelectAll(e, 'loanDetails')}
              checked={filteredLoanDetails.length > 0 && filteredLoanDetails.length === selectedRowsLoanDetails.length}
            />
          </th>
          <th className="p-3 text-center text-gray-700 text-sm">Account ID</th>
          <th className="p-3 text-center text-gray-700 text-sm">Loan Amount</th>
          <th className="p-3 text-center text-gray-700 text-sm">Loan Type</th>
          <th className="p-3 text-center text-gray-700 text-sm">Interest Rate</th>
          <th className="p-3 text-center text-gray-700 text-sm">Start Date</th>
          <th className="p-3 text-center text-gray-700 text-sm">End Date</th>
          <th className="p-3 text-center text-gray-700 text-sm">Status</th>
          <th className="p-3 text-center text-gray-700 text-sm">Last Payment Date</th>
          <th className="p-3 text-center text-gray-700 text-sm">Next Payment Date</th>
          <th className="p-3 text-center text-gray-700 text-sm">Balance</th>
          <th className="p-3 text-center text-gray-700 text-sm">Payment Frequency</th>
          <th className="p-3 text-center text-gray-700 text-sm">Branch Name</th>
          <th className="p-3 text-center text-gray-700 text-sm">Contact Number</th>
          <th className="p-3 text-center text-gray-700 text-sm">Email</th>
          <th className="p-2 text-center text-gray-700 text-sm">Actions</th>
        </tr>
      </thead>
      <tbody>
                
        {filteredLoanDetails.length > 0 || FilteredLoanDetails.length > 0 ? (
                    paginateData(
                        FilteredLoanDetails.length > 0 ? FilteredLoanDetails : filteredLoanDetails,
                        currentLoanPage
                    ).map((loan, index) => (
                        <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-100 odd:bg-white even:bg-gray-50"
                        >
                        <td className="p-3">
                            <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 bg-blue-50 rounded-sm focus:outline-none focus:ring-0"
                            checked={selectedRowsLoanDetails.includes(index)}
                            onChange={() => handleSelectRow(index, "loanDetails")}
                            />
                        </td>
                        <td className="p-3 text-gray-800 text-sm">{loan.account_id}</td>
                        <td className="p-3 text-gray-800 text-sm">{loan.loan_amount}</td>
                        <td className="p-3 text-gray-800 text-sm">{loan.loan_type}</td>
                        <td className="p-3 text-gray-800 text-sm">{loan.interest_rate}</td>
                        <td className="p-3 text-gray-800 text-sm">
                            {new Date(loan.start_date).toLocaleDateString("en-US")}
                        </td>
                        <td className="p-3 text-gray-800 text-sm">
                            {new Date(loan.end_date).toLocaleDateString("en-US")}
                        </td>
                        <td className="p-3 text-gray-800 text-sm">{loan.status}</td>
                        <td className="p-3 text-gray-800 text-sm">
                            {new Date(loan.last_payment_date).toLocaleDateString("en-US")}
                        </td>
                        <td className="p-3 text-gray-800 text-sm">
                            {new Date(loan.next_payment_date).toLocaleDateString("en-US")}
                        </td>
                        <td className="p-3 text-gray-800 text-sm">{loan.balance}</td>
                        <td className="p-3 text-gray-800 text-sm">{loan.payment_frequency}</td>
                        <td className="p-3 text-gray-800 text-sm">{loan.branch_name}</td>
                        <td className="p-3 text-gray-800 text-sm">{loan.contact_number}</td>
                        <td className="p-3 text-gray-800 text-sm">{loan.email_address}</td>
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
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#009EF7] no-underline"
                                    role="menuitem"
                                    tabIndex="-1"
                                    onClick={() => handleOpenModal(loan.account_id)}
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
                        colSpan="17"
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
        onClick={() => handleBackward('loanDetails')}
        disabled={currentLoanPage === 1}
        className="p-2 text-gray rounded-l-md disabled:opacity-50 flex items-center justify-center"
      >
        <FaChevronLeft />
      </button>
      {Array.from({ length: Math.ceil(filteredLoanDetails.length / itemsPerPage) }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1, 'loanDetails')}
          className={`p-2 ${currentLoanPage === index + 1 ? 'text-gray-700' : 'text-gray-400'} mx-1 rounded-md`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handleForward('loanDetails')}
        disabled={currentLoanPage === Math.ceil(filteredLoanDetails.length / itemsPerPage)}
        className="p-2 text-gray rounded-r-md disabled:opacity-50 flex items-center justify-center"
      >
        <FaChevronRight />
      </button>
    </div>
  </div>
);

export default LoanTable;
