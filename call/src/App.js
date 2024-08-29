    import React, { useState,useEffect} from 'react';
    import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
    import Header from './Components/Header';
    import Sidebar from './Components/Sidebar';
    import Form from './Components/Form';
    import Login from './Components/Login';
    import { ThemeProvider } from './Components/ThemeContext';
    import axios from 'axios';
    const App = () => {
      const [isSidebarHidden, setIsSidebarHidden] = useState(false);
      const [isFormVisible, setIsFormVisible] = useState(false);

       
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) { 
      setIsSidebarHidden(false);
    }
    if (window.innerWidth <= 768) {
      setIsSidebarHidden(true);
    }
  };

  window.addEventListener('resize', handleResize);
  handleResize(); 

  return () => window.removeEventListener('resize', handleResize);
}, []);

    
      const handleSidebarToggle = (component) => {
        if (component === 'Form') {
          setIsFormVisible(true);
          setIsSidebarHidden(true )
        } else {
          setIsFormVisible(false);
        }
      };
    
      const handleSidebarItemClick = () => {
        setIsSidebarHidden((prev) => !prev);
      };
      const [errors, setErrors] = useState({});
      const [isSubmitHovered, setSubmitHovered] = useState(false);
      const [isCancelHovered, setCancelHovered] = useState(false);
      const [activeTab, setActiveTab] = useState('Profile');
      const [profileData, setProfileData] = useState(null);
      const [notFoundError, setNotFoundError] = useState('');
      const [balance, setBalance] = useState(null)
  
      const [formData, setFormData] = useState({ name: '', id: '' });
  
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
                  } else {
                      setNotFoundError('Customer not found. Please check the Name and ID.');
                  }
              } catch (error) {
                  console.error('Error fetching profile data:', error);
                  setNotFoundError('Customer is not found. Please check the Name and ID.');
              }
          }
      };
      return (
        <ThemeProvider>
          <Router>
            <div className="min-h-screen flex ">
              <Sidebar
                isSidebarHidden={isSidebarHidden}
                onItemClick={handleSidebarToggle}
              />
              <div className="flex-1 flex flex-col">
                <Header onSidebarToggle={handleSidebarItemClick} />
                <div className="flex-1 ">
                  <Routes>
                    {isFormVisible ? (
                      <Route path="/" element={<Login  formData={formData}
                      handleChange={handleChange}
                      errors={errors}
                      handleSubmit={handleSubmit}
                      isSubmitHovered={isSubmitHovered}
                      setSubmitHovered={setSubmitHovered}
                      isCancelHovered={isCancelHovered}
                      setCancelHovered={setCancelHovered}
                      notFoundError={notFoundError}/>} />
                    ) : (
                      <Route path="/" element={<div />} /> 
                    )}
                    <Route path="/form" element={isFormVisible ? <Form /> : <Navigate to="/" />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </div>
              </div>
            </div>
          </Router>
        </ThemeProvider>
      );
    };
    
    export default App;
    