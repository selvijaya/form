import React from 'react';
import warning from '../assests/alert.png';
import axios from 'axios';
import { useTheme } from './ThemeContext';


const CenteredCard = ({ show, handleButtonClick, handleCancel, id, removeDeletedRow }) => {
  const theme=useTheme()
  if (!show) return null;

  const handleDelete = async () => {
    console.log("Attempting to delete ID:", id);
    try {
      const response = await axios.delete(`http://localhost:4000/api/loan_details/${id}`);
      if (response.status === 200) {
        console.log("Delete successful", response.data);
        removeDeletedRow(id);
        handleButtonClick();
      } else {
        console.error('Unexpected response status:', response.status); 
        alert('Unexpected error occurred. Please try again.');
      }
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
            onClick={handleDelete}
            className="text-white px-4 py-2 rounded hover:bg-red-700 mr-5"
            style={{ backgroundColor: 'rgb(216,26,72)' }}
          >
            Yes, delete!
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgb(233,243,255)';
              e.currentTarget.style.color = '#5086ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = 'black';
            }}
            
          >
            No, cancel!
          </button>
        </div>
      </div>
    </div>
  );
};



export default CenteredCard;