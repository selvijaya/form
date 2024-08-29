import React from 'react';
import { useTheme } from './ThemeContext';

const ProfileComponent = ({
    formData,
    handleChange,
    errors,
    handleSubmit,
    handleCancel,
    isSubmitHovered,
    setSubmitHovered,
    isCancelHovered,
    setCancelHovered,
    notFoundError,
  }) => {
    const { theme } = useTheme();
  
    const submitButtonStyle = {
      backgroundColor: isSubmitHovered ? "#17a589" : "#14b8a6",
      border: "none",
      fontSize: "16px",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    };
  
    const cancelButtonStyle = {
      backgroundColor: isCancelHovered ? "#a1a5a8" : "#bec1c5",
      border: "none",
      fontSize: "16px",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    };
  
    return (
      <form
        className={`form-container mt-20 p-4 md:p-6 md:max-w-4xl mx-auto ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}
        onSubmit={handleSubmit}
      >
        <h4 className="text-xl font-semibold mb-4  text-center md:text-left">Customer Details</h4>
        <hr className="border-gray-400 mb-4" />
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <label htmlFor="customerName" className="md:mx-28 block">
              Customer Name:<span className="text-red-500"> *</span>
            </label>
            <div>
              <input
                id="customerName"
                type="text"
                className={`form-control text-white w-60 h-12 md:w-80 md:h-12 lg:w-80 lg:h-12 ${errors.name ? "border-red-500" : "border-gray-300"} w-full p-2 rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
                placeholder="Enter the customer name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>
            <div className="flex items-center">
              <label htmlFor="customerId" className="md:mx-28 block">
                Customer ID:<span className="text-red-500"> *</span>
              </label>
            </div>
            <div>
              <input
                id="customerId"
                type="text"
                className={`form-control text-white w-60 h-12 md:w-80 md:h-12 lg:w-80 lg:h-12 ${errors.id ? "border-red-500" : "border-gray-300"} w-full p-2 rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
                placeholder="Enter customer ID"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
              {errors.id && <div className="text-red-500 text-sm mt-1">{errors.id}</div>}
            </div>
          </div>
          {notFoundError && <div className="text-red-500 text-center mb-4">{notFoundError}</div>}
          <div className="flex flex-col md:flex-row md:justify-center gap-2">
            <button
              type="submit"
              style={submitButtonStyle}
              onMouseEnter={() => setSubmitHovered(true)}
              onMouseLeave={() => setSubmitHovered(false)}
              className="text-white w-60 h-12 py-2 px-6 md:w-32 md:h-12 lg:w-40 lg:h-12"
            >
              Submit
            </button>
            <button
              type="button"
              style={cancelButtonStyle}
              onMouseEnter={() => setCancelHovered(true)}
              onMouseLeave={() => setCancelHovered(false)}
              onClick={handleCancel}
              className="text-white w-60 h-12 py-2 px-6  md:w-32 md:h-12 lg:w-40 lg:h-12"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  };
  
  export default ProfileComponent;

