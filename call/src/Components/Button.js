import React from 'react';
import warning from '../assests/alert.png';
import axios from 'axios';
import { useTheme } from './ThemeContext';

const CenteredCard = ({ show, handleButtonClick, handleCancel, id, removeDeletedRow }) => {
  const {theme} = useTheme()
  if (!show) return null;
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/accountDetails/${id}`);
      removeDeletedRow(id); 
      handleButtonClick(); 
    } catch (error) {
      console.error('Error deleting record:', error.message);
      alert('An error occurred. Please try again. Error: ' + error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 mt-96">
      <div className="bg-white rounded-lg shadow-lg w-96 max-w-full border border-gray-200 transform-gpu scale-100 transition-transform duration-300 hover:scale-105"> 
        <div className="flex justify-center mt-16 w-full">
          <img src={warning} alt="Warning" className="h-16" />
        </div>

        <p className={`text-center mt-2 text-sm font-sans p-4 ${theme==='dark'?'text-gray-800':'text-gray-800'}`}>
          Are you sure you want to delete this item?
        </p>

        <div className="text-center font-sans flex justify-center mb-10 mt-5 text-sm font-bold">
          <button
            onClick={handleDelete} // Call handleDelete function
            className="text-white px-4 py-2 rounded hover:bg-red-700 mr-5"
            style={{ backgroundColor: 'rgb(216,26,72)' }}
          >
            Yes, delete!
          </button>
          <button
            onClick={handleCancel} // Call handleCancel function
            className="px-4 py-2 rounded"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgb(233,243,255)'; // Hover background color
              e.currentTarget.style.color = '#5086ff'; // Hover text color
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white'; // Revert background color
              e.currentTarget.style.color = 'black'; // Revert text color
            }}
          >
            No, cancel!
          </button>
        </div>
      </div>
    </div>


  //   <div className={`fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 mt-96 ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-900'}`}>
  //   <div className={`rounded-lg shadow-lg w-96 max-w-full border transform-gpu scale-100 transition-transform duration-300 hover:scale-105 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
  //     <div className="flex justify-center mt-16 w-full">
  //       <img src={warning} alt="Warning" className="h-16" />
  //     </div>

  //     <p className={`text-center mt-2 text-sm font-sans p-4 ${theme === 'light' ? 'text-gray-900' : 'text-gray-900'}`}>
  //       Are you sure you want to delete this item?
  //     </p>

  //     <div className="text-center font-sans flex justify-center mb-10 mt-5 text-sm font-bold">
  //       <button
  //         onClick={handleDelete}
  //         className="text-white px-4 py-2 rounded hover:bg-red-700 mr-5"
  //         style={{ backgroundColor: 'rgb(216,26,72)' }}
  //       >
  //         Yes, delete!
  //       </button>
  //       <button
  //         onClick={handleCancel}
  //         className={`px-4 py-2 rounded ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-700 text-gray-200'}`}
  //         onMouseEnter={(e) => {
  //           e.currentTarget.style.backgroundColor = 'rgb(233,243,255)';
  //           e.currentTarget.style.color = '#5086ff';
  //         }}
  //         onMouseLeave={(e) => {
  //           e.currentTarget.style.backgroundColor = theme === 'light' ? 'white' : 'rgb(55,65,81)'; // Adjust based on theme
  //           e.currentTarget.style.color = theme === 'light' ? 'black' : 'rgb(229,231,235)'; // Adjust based on theme
  //         }}
  //       >
  //         No, cancel!
  //       </button>
  //     </div>
  //   </div>
  // </div>
  );
};


export default CenteredCard;