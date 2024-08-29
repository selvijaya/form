// CallTable.js
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CallTable = ({
  FilteredCallHistory,
  filteredCallHistory,
  selectedRowsCallHistory,
  handleSelectAll,
  handleSelectRow,
  handleRemoveRow,
  toggleDropdown,
  dropdownVisible,
  currentCallPage,
  handlePageChange,
  handleBackward,
  handleForward,
  itemsPerPage,
  handleDropdownItemClick,
  paginateData,
  handleOpenModal
}) => (
  <div  className="relative max-h-[600px] w-[370px] md:w-[700px] lg:w-[970px]  2xl:w-[1450px] xl:w-[1200px] bg-white rounded-lg border border-gray-200 overflow-scroll">
    <table className="w-full">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          <th className="p-3 text-left whitespace-nowrap">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 bg-blue-50 rounded-sm focus:outline-none focus:ring-0"
              onChange={(e) => handleSelectAll(e, 'callHistory')} 
              checked={filteredCallHistory.length > 0 && filteredCallHistory.length === selectedRowsCallHistory.length}
            />
          </th>
          {/* Add other headers here */}
          <th className="p-3 text-center text-gray-700 text-sm whitespace-nowrap">Call ID</th>
          <th className="p-3 text-center text-gray-700 text-sm whitespace-nowrap">Caller ID</th>
          <th className="p-3 text-center text-gray-700 text-sm whitespace-nowrap">Receiver ID</th>
          <th className="p-3 text-center text-gray-700 text-sm whitespace-nowrap">Call Date & Time</th>
          <th className="p-3 text-center text-gray-700 text-sm whitespace-nowrap">Duration</th>
          <th className="p-3 text-center text-gray-700 text-sm whitespace-nowrap">Call Type</th>
          <th className="p-3 text-center text-gray-700 text-sm whitespace-nowrap">Call Status</th>
          <th className="p-3 text-center text-gray-700 text-sm whitespace-nowrap">Agent ID</th>
          <th className="p-3 text-center text-gray-700 text-sm whitespace-nowrap">Department</th>
          <th className="p-3 text-center text-gray-700 text-sm whitespace-nowrap">Call Recording</th>
          <th className="p-3 text-center text-gray-700 text-sm whitespace-nowrap">Customer Name</th>
          <th className="p-3 text-center text-gray-700 text-sm whitespace-nowrap">Customer Contact</th>
          <th className="p-3 text-center text-gray-700 text-sm whitespace-nowrap">Account Number</th>
          <th className="p-3 text-center text-gray-700 text-sm whitespace-nowrap">Call Notes</th>
          <th className="p-3 text-center text-gray-700 text-sm whitespace-nowrap">Resolution Status</th>
          <th className="p-3 text-center text-gray-700 text-sm whitespace-nowrap">Action</th>
        </tr>
      </thead>
      <tbody>
      {filteredCallHistory.length >0 ||
                      FilteredCallHistory.length > 0 ? (
                        paginateData(FilteredCallHistory.length > 0
                          ? FilteredCallHistory
                          : filteredCallHistory,currentCallPage
                        ).map((call,index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100 odd:bg-white-900 even:bg-gray-50"
            >
              <td className="p-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 bg-blue-50 rounded-sm focus:outline-none focus:ring-0"
                  checked={selectedRowsCallHistory.includes(index)}
                  onChange={() => handleSelectRow(index, 'callHistory')}
                />
              </td>
              {/* Render other cells */}
              <td className="p-2 text-gray-800 text-sm">{call.call_id}</td>
              <td className="p-2 text-gray-800 text-sm">{call.caller_id}</td>
              <td className="p-2 text-gray-800 text-sm">{call.receiver_id}</td>
              <td className="p-2 text-gray-800 text-sm">{call.call_date_time}</td>
              <td className="p-2 text-gray-800 text-sm">{call.duration}</td>
              <td className="p-2 text-gray-800 text-sm">{call.call_type}</td>
              <td className="p-2 text-gray-800 text-sm">{call.call_status}</td>
              <td className="p-2 text-gray-800 text-sm">{call.agent_id}</td>
              <td className="p-2 text-gray-800 text-sm">{call.department}</td>
              <td className="p-2 text-gray-800 text-sm">{call.call_recording}</td>
              <td className="p-2 text-gray-800 text-sm">{call.customer_name}</td>
              <td className="p-2 text-gray-800 text-sm">{call.customer_contact}</td>
              <td className="p-2 text-gray-800 text-sm">{call.account_number}</td>
              <td className="p-2 text-gray-800 text-sm">{call.call_notes}</td>
              <td className="p-2 text-gray-800 text-sm">{call.resolution_status}</td>
              <td className="p-2 text-gray-800 text-sm">
              <div className="relative inline-block text-left">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-x-2 rounded-md bg-[#f9f9f9] hover:bg-blue-50 hover:text-[#009EF7] text-gray-500  px-3 py-1 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#009EF7]"
                    onClick={() => toggleDropdown(index)}
                    aria-expanded={dropdownVisible === index}
                    aria-haspopup="true"
                  >
                    Actions
                    <svg className="-mr-1 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {dropdownVisible === index && (
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                      <div className="py-1">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#009EF7] no-underline" role="menuitem" tabIndex="-1" onClick={() => handleDropdownItemClick('Edit')}>Edit</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#009EF7] no-underline" role="menuitem" tabIndex="-1" onClick={() => handleOpenModal(call.call_id)}>Delete</a>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="15" className="text-center p-4 text-gray-500">
              No records found.
            </td>
          </tr>
        )}
      </tbody>
    </table>

    {filteredCallHistory.length > 0 && (
      <div className="flex justify-center mt-4 px-4 py-2">
      <button
        onClick={() => handleBackward("callHistory")}
        disabled={currentCallPage === 1}
        className="p-2 text-gray rounded-l-md disabled:opacity-50 flex items-center justify-center"
      >
        <FaChevronLeft />
      </button>
      {Array.from(
        {
          length: Math.ceil(
            filteredCallHistory.length / itemsPerPage
          ),
        },
        (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`p-2 text-gray-800 ${
              currentCallPage === index + 1
                ? " text-blue-600"
                : ""
            }`}
          >
            {index + 1}
          </button>
        )
      )}
      <button
        onClick={() => handleForward("callHistory")}
        disabled={
          currentCallPage ===
          Math.ceil(filteredCallHistory.length / itemsPerPage)
        }
        className="p-2 text-gray rounded-r-md disabled:opacity-50 flex items-center justify-center"
      >
        <FaChevronRight />
      </button>
    </div>
    )}
  </div>
);

export default CallTable;



