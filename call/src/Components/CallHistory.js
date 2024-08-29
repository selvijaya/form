      // CallHistory.js
      import React, { useState,useEffect } from 'react';
      import SearchFilter from './Call_search_filter';
      import CallTable from './Call_table';
      import axios from 'axios';
      import Delete from './Delete';
      import Cancel from './Cancel';
      import CenteredCard from './call_Button';

      const CallHistory = () => {
          const [FilteredCallHistory, setFilteredCallHistory] = useState([]);
          const [callHistorySearch, setCallHistorySearch] = useState('');
          const [filterSectionOpen, setFilterSectionOpen] = useState(false);
          const [fromDate, setFromDate] = useState('');
          const [toDate, setToDate] = useState('');
          const [status, setStatus] = useState('');
          const [department, setDepartment] = useState('');
          const [dropdownVisible, setDropdownVisible] = useState(null);
          const [selectedRowsCallHistory, setSelectedRowsCallHistory] = useState([]);
          const [currentCallPage, setCurrentCallPage] = useState(1);
          const [callHistoryData, setCallHistoryData] = useState([]);


          useEffect(() => {
            const fetchCallHistoryData = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/api/callHistory', {
                        params: { search: callHistorySearch }
                    });
                    setCallHistoryData(response.data);
                } catch (error) {
                    console.error('Error fetching call history data:', error);
                }
            };
            fetchCallHistoryData();
        }, [callHistorySearch]);



          const handleFilterButtonClick = () => setFilterSectionOpen(!filterSectionOpen);

          const resetFilters = () => {
              setFromDate('');
              setToDate('');
              setStatus('');
              setDepartment('');
              setFilteredCallHistory([]);
          };

          const handleSelectAll = (e, tab) => {
              if (tab === 'callHistory') {
                  if (e.target.checked) {
                      setSelectedRowsCallHistory(filteredCallHistory.map((_, index) => index));
                  } else {
                      setSelectedRowsCallHistory([]);
                  }
              } 
          }

          const handleSelectRow = (index, tab) => {
              if (tab === 'callHistory') {
                  setSelectedRowsCallHistory(prev => {
                      if (prev.includes(index)) {
                          return prev.filter(i => i !== index);
                      } else {
                          return [...prev, index];
                      }
                  });
              }
          }
          // pagination

          const itemsPerPage = 5;

          const handlePageChange = (page, section) => {
              if (section === 'callHistory') setCurrentCallPage(page);
          }

          const paginateData = (data, currentPage) => {
              const startIndex = (currentPage - 1) * itemsPerPage;
              return data.slice(startIndex, startIndex + itemsPerPage);
          };

          const handleBackward = (section) => {
              if (section === 'callHistory' && currentCallPage > 1) {
                  setCurrentCallPage(currentCallPage - 1);
              }
          }
        
          const handleForward = (section) => {
              const totalPages = Math.ceil(filteredCallHistory.length / itemsPerPage);
              if (section === 'callHistory' && currentCallPage < totalPages) {
                  setCurrentCallPage(currentCallPage + 1);
              }
          }
        
          const getFilteredData = (section) => {
              if (section === 'callHistory') {
                  return callHistoryData.filter((call) =>
                      call.caller_id.includes(callHistorySearch)
                  );
                 
              }
              console.log("123",getFilteredData)
          }
      //  dropdown item

      const handleDropdownItemClick = (action) => {
          console.log(`Action selected: ${action}`);
          setDropdownVisible(null);
      };

      function handleRemoveRow(index) {
          const updatedCallHistory = FilteredCallHistory.filter((_, i) => i !== index);
          setFilteredCallHistory(updatedCallHistory);
          localStorage.setItem('callHistory', JSON.stringify(updatedCallHistory));
      }

      const filteredCallHistory = getFilteredData('callHistory');

      const applyFilters = () => {
          let filteredData = callHistoryData.filter(call => { 
            const callDate = new Date(call.call_date_time);
            const from = fromDate ? new Date(fromDate) : null;
            const to = toDate ? new Date(toDate) : null;
            console.log("Call Date:", call.call_date_time, " | Converted:", callDate);
            const isDateInRange = (!from || callDate >= from) && (!to || callDate <= to);
            const isStatusMatch = !status || call.call_status.toLowerCase() === status.toLowerCase();
            const isDepartmentMatch = !department || call.department.toLowerCase() === department.toLowerCase();
            return isDateInRange && isStatusMatch && isDepartmentMatch;
          });
          setFilteredCallHistory(filteredData);
          console.log("filteredData",filteredData)
          setFilterSectionOpen(false);
        };

        const toggleDropdown = (index) => {
          setDropdownVisible(dropdownVisible === index ? null : index);
      };


      const [modalShow, setModalShow] = useState(false);
      const [showOpenModalButton, setShowOpenModalButton] = useState(true); // New state to control the visibility of handleOpenModal button
      const [currentRoute, setCurrentRoute] = useState('/');



      const handleButtonClick = () => {
        setModalShow(false);
        setCurrentRoute('/delete');
        console.log("Deleted");
      };

      const handleCancel = () => {
        setModalShow(false);
        setCurrentRoute('/cancel');
        setShowOpenModalButton(false);
      };


      const handleCancelModel=()=>{
        setModalShow(false);
        setCurrentRoute('/'); 
      }

      const removeDeletedRow = (id) => {
        setCallHistoryData(prevData => prevData.filter(call => call.call_id !== id));
        setFilteredCallHistory(prevFiltered => prevFiltered.filter(call => call.call_id !== id));
      };

      const renderComponent = () => {
        switch (currentRoute) {
          case '/delete':
            return <Delete onClose={handleCancelModel}/>;
          case '/cancel':
            return <Cancel onClose={handleCancelModel}/>;
          default:
            return null;
        }
      };

      const [rowIdToDelete, setRowIdToDelete] = useState(null);

      const handleOpenModal = (id) => {
        console.log("id",id)
        setRowIdToDelete(id); 
        setModalShow(true);
        setDropdownVisible(null);
        setShowOpenModalButton(false); 
      };
      

        return (
          <div className="p-4">
          <SearchFilter
            FilteredCallHistory ={FilteredCallHistory }
            callHistorySearch={callHistorySearch}
            setCallHistorySearch={setCallHistorySearch}
            filterSectionOpen={filterSectionOpen}
            handleFilterButtonClick={handleFilterButtonClick}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            status={status}
            setStatus={setStatus}
            department={department}
            setDepartment={setDepartment}
            applyFilters={applyFilters}
            resetFilters={resetFilters}
            handleDropdownItemClick={handleDropdownItemClick}
          />
          <CallTable
            FilteredCallHistory ={FilteredCallHistory}
            filteredCallHistory={filteredCallHistory}
            selectedRowsCallHistory={selectedRowsCallHistory}
            handleSelectAll={handleSelectAll}
            handleSelectRow={handleSelectRow}
            handleRemoveRow={handleRemoveRow}
            toggleDropdown={toggleDropdown}
            dropdownVisible={dropdownVisible}
            currentCallPage={currentCallPage}
            handlePageChange={handlePageChange}
            handleBackward={handleBackward}
            handleForward={handleForward}
            itemsPerPage={itemsPerPage}
            paginateData={paginateData}
            handleOpenModal ={ handleOpenModal }
          />
          <CenteredCard
              show={modalShow}
              handleButtonClick={handleButtonClick}
              handleCancel={handleCancel}
              id={rowIdToDelete}
              removeDeletedRow={removeDeletedRow}
              
            />
            {renderComponent()}
        </div>
        );
      };

      export default CallHistory;



