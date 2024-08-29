import React, { useState } from 'react';
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [errors, setErrors] = useState({});
    const [isSubmitHovered, setSubmitHovered] = useState(false);
    const [isCancelHovered, setCancelHovered] = useState(false);
    const [activeTab, setActiveTab] = useState('Profile');
    const [profileData, setProfileData] = useState(null);
    const [notFoundError, setNotFoundError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [balance, setBalance] = useState(null)
    const [formData, setFormData] = useState({ name: '', id: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Customer name is required.';
    if (!formData.id.trim()) newErrors.id = 'Customer ID is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
const handleProfileData = (data) => {
    setProfileData(data); 
    setBalance(data.Balance);
    setActiveTab('Profile'); 
};
const handleSubmit = async (e) => {
    e.preventDefault();
    setNotFoundError(''); 

    if (validateForm()) {
        try {
            const response = await axios.get('http://localhost:4000/api/profileDetails', {
                params: {
                    FullName: formData.name,
                    Id: formData.id,
                },
            });
            
            if (response.data) {
                handleProfileData(response.data); 
                navigate('/form'); // Navigate to the Form component after successfully fetching data
            } else {
                setNotFoundError('Customer not found. Please check the Name and ID.');
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
            setNotFoundError('Customer is not found. Please check the Name and ID.');
        }
    }
};


  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="flex items-center justify-center h-screen  bg-[#FFFFFF]  text-gray-600 p-6 border-gray-120 border-b fixed top-0 left-0 w-full">
      <div className="w-full max-w-md mb-24 rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-600">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="text"
              name="name"
              placeholder="Customer Name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`form-control ${errors.name ? "border-red-500" : "border-gray-300"} w-full p-2 rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
            />
            <FaUser className="absolute right-3 top-3 text-gray-400" />
            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
          </div>
          <div className="relative mb-6">
            <input
              type={showPassword ? 'text' : 'password'}
              name="id"
              placeholder="Customer Id"
              value={formData.id}
              onChange={handleChange}
              required
              className={`form-control ${errors.id ? "border-red-500" : "border-gray-300"} w-full p-2 rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
            />
            <span onClick={toggleShowPassword} className="absolute right-3 top-3 text-gray-400 cursor-pointer">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.id && <div className="text-red-500 text-sm mt-1">{errors.id}</div>}
          </div>
          {notFoundError && <div className="text-red-500 text-center mb-4">{notFoundError}</div>}
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-500">Remember me</span>
            </label>
            <Link to="#" className="text-[#3699FF]">Forgot Password</Link>
          </div>
          <button
            type="submit"
            className="w-[120px] py-[13px] bg-[#3699FF] text-white ml-32 font-semibold rounded-lg hover:bg-[#187DE4]"
              onMouseEnter={() => setSubmitHovered(true)}
              onMouseLeave={() => setSubmitHovered(false)}
          >
            Login
          </button>
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don't Have an Account?
              <Link to="/" className="text-[#3699FF] ml-1">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
