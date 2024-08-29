import React, { useState } from 'react';
import ProfileComponent from './UserProfile';
import NavigationTabs from './NavigationTabs';
import CallHistory from './CallHistory';
import ProfileDetails from './ProfileDetails';
import LoanDetails from './LoanDetails';
import AccountDetails from './AccountDetails';
import EditProfileDetails from './EditProfileDetails'
import axios from 'axios';
import { useTheme } from './ThemeContext';
const Form = () => {
    const [errors, setErrors] = useState({});
    const [isSubmitHovered, setSubmitHovered] = useState(false);
    const [isCancelHovered, setCancelHovered] = useState(false);
    const [activeTab, setActiveTab] = useState('Profile');
    const [profileData, setProfileData] = useState(null);
    const [notFoundError, setNotFoundError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [balance, setBalance] = useState(null)
    const { theme } = useTheme();

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

    const handleCancel = () => {
        setFormData({
            name: '',
            id: '',
        });
        setErrors({});
        setProfileData(null); 
        setBalance(null);
        setNotFoundError(''); 
    };

    
    const handleNavClick = (e, tabName) => {
        e.preventDefault();
        setActiveTab(tabName);
    };

    const toggleEditProfile = () => {
        setIsEditing(!isEditing); 
    };

    const handleSave = (updatedProfile) => {
        setProfileData(updatedProfile); 
        setIsEditing(false); 
    };

    const handleEditCancel = () => {
        setIsEditing(false); 
    };


    return (
        <div className="container mr-20 p-4 shadow-sm">
            <ProfileComponent
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                isSubmitHovered={isSubmitHovered}   
                setSubmitHovered={setSubmitHovered}
                isCancelHovered={isCancelHovered}
                setCancelHovered={setCancelHovered}
                notFoundError={notFoundError}
            />
            <div className="card-body nav-container">
                <NavigationTabs activeTab={activeTab} handleNavClick={handleNavClick}/>
            </div>
            <div id="contentDiv" className={` ${theme === 'dark' ? 'bg-black' : 'bg-white'} w-[370px] md:w-[700px] lg:w-[970px]  2xl:w-[1450px] xl:w-[1200px]`}>

                {activeTab === 'Profile' && !isEditing && (
                    <ProfileDetails profile={profileData} toggleEditProfile={toggleEditProfile}  balance={balance}/>
                )}

                {activeTab === 'Profile' && isEditing && (
                    <EditProfileDetails 
                    profile={profileData}
                    profileId={profileData?.Id}
                    onSave={handleSave}
                    onCancel={handleEditCancel}
                    
                    />
                )}
                {activeTab === 'callHistory' && <CallHistory />}
                {activeTab === 'loanDetails' && <LoanDetails />}
                {activeTab === 'accountDetails' && <AccountDetails />}
            </div>
            </div>
      
    );
};

export default Form;