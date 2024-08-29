// AccountDetails.js
import React, { useState,useEffect } from 'react';
import SearchAndFilter from './Acc_search_filter';
import Table from './Acc_table';
import axios from 'axios';
import Delete from './Delete';
import Cancel from './Cancel';
import CenteredCard from './Button';

const AccountDetails = () => {
  const [searchValue, setSearchValue] = useState('');
    const [accountDetailsSearch, setAccountDetailsSearch] = useState('');
    const [currentAccountPage, setCurrentAccountPage] = useState(1);
    const [dropdownVisible, setDropdownVisible] = useState(null); 
    const [accountDetailsData, setAccountDetailsData] = useState([]);
    const [selectedRowsAccountDetails, setSelectedRowsAccountDetails] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filterOpenAccountSection,setFilterOpenAccountSection]=useState(false);
    const [FilteredAccountDetails, setFilteredAccountDetails] = useState(accountDetailsData);   

    // Fetching account details data from the API
    useEffect(() => {  
        const fetchAccountDetailsData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/accountDetails');
                setAccountDetailsData(response.data);
            } catch (error) {
                console.error('Error fetching account details data:', error);
            }
        };
        fetchAccountDetailsData();
    }, [accountDetailsSearch]);
   
    // Items per page for pagination
    const itemsPerPage = 5;

    // Function to get filtered data
    const getFilteredData = () => {
        return accountDetailsData.filter((account) => {
            const formattedDate = new Date(account.Tnx_Date).toLocaleDateString("en-US");
            return formattedDate.includes(accountDetailsSearch);
        });
    };

    // Filtered data
    const filteredAccountDetails = getFilteredData('accountDetails');

    // Pagination functions
    const handlePageChange = (page, section) => {
        if (section === 'accountDetails') setCurrentAccountPage(page);
    };

    const paginateData = (data, currentPage) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    };

    const handleBackward = (section) => {
        if (section === 'accountDetails' && currentAccountPage > 1) {
            setCurrentAccountPage(currentAccountPage - 1);
        }
    };

    const handleForward = (section) => {
        const totalPages = Math.ceil(filteredAccountDetails.length / itemsPerPage);
        if (section === 'accountDetails' && currentAccountPage < totalPages) {
            setCurrentAccountPage(currentAccountPage + 1);
        }
    };

    // Dropdown toggle
    const toggleDropdown = (index) => {
        setDropdownVisible(dropdownVisible === index ? null : index);
    };

    // Select all rows
    const handleSelectAll = (e, tab) => {
        if (tab === 'accountDetails') {
            if (e.target.checked) {
                setSelectedRowsAccountDetails(filteredAccountDetails.map((_, index) => index));
            } else {
                setSelectedRowsAccountDetails([]);
            }
        }
    };

    // Select individual row
    const handleSelectRow = (index, tab) => {
        if (tab === "accountDetails") {
            setSelectedRowsAccountDetails((prev) => {
              if (prev.includes(index)) {
                return prev.filter((i) => i !== index);
              } else {
                return [...prev, index];
              }
            });
        }
    };
    

    // Handle dropdown item click
    const handleDropdownItemClick = (action) => {
        console.log(`Action selected: ${action}`);
        setDropdownVisible(null);
    };

    const handleSearchChange = (value) => {
        setSearchValue(value);
        setAccountDetailsSearch(value); 
    };

    const handleAccountFilter = () => {
        if (startDate && endDate) {
            const filtered = accountDetailsData.filter(account => {
                const txnDate = new Date(account.Tnx_Date);
                const fromDate = new Date(startDate);
                const toDate = new Date(endDate);
    
                return txnDate >= fromDate && txnDate <= toDate;
            });
    
            setFilteredAccountDetails(filtered);
            
        }
    };
    
    const resetAccountFilters =()=>{
        setStartDate("");
        setEndDate("");
        setFilterOpenAccountSection(false)
        setFilteredAccountDetails(accountDetailsData)
    }

    const handleAccountFilterButtonClick = () => {
        setFilterOpenAccountSection(!filterOpenAccountSection);
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
    setShowOpenModalButton(false); // Show the handleOpenModal button again after canceling
  };


  const handleCancelModel=()=>{
    setModalShow(false);
    setCurrentRoute('/'); 
  }

  const removeDeletedRow = (id) => {
    setAccountDetailsData(prevData => prevData.filter(account => account.id !== id));
    setFilteredAccountDetails(prevFiltered => prevFiltered.filter(account => account.id !== id));
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
    setRowIdToDelete(id); // Set the ID of the row to delete
    setModalShow(true);
    setDropdownVisible(null);
    setShowOpenModalButton(false); // Hide the handleOpenModal button
  };

 

  return (
    <div className="p-4">
      <SearchAndFilter
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onFilterClick={toggleDropdown}
        handleAccountFilter={handleAccountFilter}
        resetAccountFilters={resetAccountFilters}
        filterOpenAccountSection={filterOpenAccountSection}
        FilteredAccountDetails={FilteredAccountDetails}
        handleAccountFilterButtonClick={handleAccountFilterButtonClick}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
     <Table
        filteredAccountDetails={filteredAccountDetails}
        FilteredAccountDetails={FilteredAccountDetails}
        currentAccountPage={currentAccountPage} // Ensure this matches with the section 'accountDetails'
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onBackwardClick={handleBackward}
        onForwardClick={handleForward}
        onSelectAll={(e) => handleSelectAll(e, 'accountDetails')} 
        handleSelectRow={(index) => handleSelectRow(index, 'accountDetails')} 
        selectedRowsAccountDetails={selectedRowsAccountDetails} // Pass the correct selectedRows array
        onDropdownToggle={handleDropdownItemClick }
        dropdownVisible={dropdownVisible}
        paginateData={paginateData}
        handleDropdownItemClick={handleDropdownItemClick}
        toggleDropdown={toggleDropdown}
        handleOpenModal={handleOpenModal}
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

export default AccountDetails;
