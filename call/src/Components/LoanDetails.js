import React, { useState,useEffect } from 'react';
import SearchFilter from './Loan_search_filter';
import LoanTable from './Loan_table';
import axios from 'axios';
import Delete from './Delete';
import Cancel from './Cancel';
import CenteredCard from './Loan_Button';

const MainComponent = () => {
    const [currentLoanPage, setCurrentLoanPage] = useState(1);
    const [loanDetailsData,setLoanDetailsData]=useState([]);
    const [loanDetailsSearch, setLoanDetailsSearch] = useState('');
    const [selectedRowsLoanDetails, setSelectedRowsLoanDetails] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(null); 
    const [openSection, setOpenSection] = useState(null);

    const itemsPerPage = 5;

    const handlePageChange = (page, section) => {
        if (section === 'loanDetails') setCurrentLoanPage(page);
    }

    useEffect(() => {
        const fetchLoanDetailsData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/loanDetails');
                setLoanDetailsData(response.data);
            } catch (error) {
                console.error('Error fetching account details data:', error);
            }
        }
        fetchLoanDetailsData();
    },[loanDetailsSearch]);
        
    const paginateData = (data, currentPage) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    };

    const handleBackward = (section) => {
        if (section === 'loanDetails' && currentLoanPage > 1) {
            setCurrentLoanPage(currentLoanPage - 1);
        }
    }

    const handleForward = (section) => {
        const totalPages = Math.ceil(filteredLoanDetails.length / itemsPerPage);
        if (section === 'loanDetails' && currentLoanPage < totalPages) {
            setCurrentLoanPage(currentLoanPage + 1);
        }
    }

    const getFilteredData = (section) => {
        if (section === 'loanDetails') {
            return loanDetailsData.filter((loan) =>
                // loan.account_id.toString().includes(loanDetailsSearch.toLowerCase())
                loan.loan_type.toLowerCase().includes(loanDetailsSearch.toLowerCase())
            );
        }
        return [];
    }

    const handleSelectAll = (e, tab) => {
        if (tab === 'loanDetails') {
            if (e.target.checked) {
                setSelectedRowsLoanDetails(filteredLoanDetails.map((_, index) => index));
            } else {
                setSelectedRowsLoanDetails([]);
            }
        }
    }
    
    const handleSelectRow = (index, tab) => {
        if (tab === 'loanDetails') {
            setSelectedRowsLoanDetails(prev => {
                if (prev.includes(index)) {
                    return prev.filter(i => i !== index);
                } else {
                    return [...prev, index];
                }
            });
        } 
    }

     //  dropdown item

     const handleDropdownItemClick = (action) => {
            console.log(`Action selected: ${action}`);
            setDropdownVisible(null);
    };
    const filteredLoanDetails=getFilteredData('loanDetails')

    const toggleDropdown = (index) => {
        setDropdownVisible(dropdownVisible === index ? null : index);
    };

    const [FilteredLoanDetails, setFilteredLoanDetails] = useState(loanDetailsData);
    const [selectedLoanType, setSelectedLoanType] = useState("All");
    const [showFilterModal, setShowFilterModal] = useState(false);
  
  
  
    const FilterLoanDetails = () => {
      let filterData = loanDetailsData;
      if (selectedLoanType !== "All") {
        filterData = filterData.filter(
          (loan) => loan.loan_type === selectedLoanType 
        );
      }
      if (loanDetailsSearch) {
        filterData = filterData.filter((loan) =>
          loan.account_id
            .toString()
            .toLowerCase()
            .includes(loanDetailsSearch.toLowerCase())
        );
      }
      setFilteredLoanDetails(filterData);
      setShowFilterModal(false);
    };
    const resetLoanDetails =()=>{
        setSelectedLoanType("All");
        setFilteredLoanDetails(loanDetailsData);
        setShowFilterModal(false);
    }

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
        setLoanDetailsData(prevData => prevData.filter(loan => loan.account_id !== id));
        setFilteredLoanDetails(prevFiltered => prevFiltered.filter(loan => loan.account_id !== id));
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
    <div  className="p-4">
       <SearchFilter
          loanDetailsSearch={loanDetailsSearch}
          setLoanDetailsSearch={setLoanDetailsSearch}
          setOpenSection={setOpenSection}
          resetLoanDetails={resetLoanDetails}
          handleLoanFilterButtonClick={() => setShowFilterModal(!showFilterModal)}
          FilteredLoanDetails={FilteredLoanDetails}
          FilterLoanDetails={FilterLoanDetails}
          showFilterModal={showFilterModal}
          selectedLoanType={selectedLoanType}
          setSelectedLoanType={setSelectedLoanType}
          setFilteredLoanDetails={setFilteredLoanDetails}
          setShowFilterModal={setShowFilterModal}
            />
      <LoanTable
        FilteredLoanDetails={FilteredLoanDetails}
        filteredLoanDetails={filteredLoanDetails}
        paginateData={paginateData}
        handleSelectAll={handleSelectAll}
        handleSelectRow={handleSelectRow}
        selectedRowsLoanDetails={selectedRowsLoanDetails}
        currentLoanPage={currentLoanPage}
        handlePageChange={handlePageChange}
        handleBackward={handleBackward}
        handleForward={handleForward}
        itemsPerPage={5} 
        toggleDropdown={toggleDropdown}
        dropdownVisible={dropdownVisible}
        handleDropdownItemClick={handleDropdownItemClick}
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

export default MainComponent;
