import React from 'react';
import { useTheme } from './ThemeContext';

const ProfileDetails = ({ profile, balance, toggleEditProfile }) => {
    const defaultProfile = {
        FullName: 'xxx',
        Email: 'example@gmail.com',
        PhoneNumber: '+91 9876543210',
        Address: 'xyz',
        AccountNumber: '1234567890',
        AccountType: 'Savings',
        Branch: 'Main Branch',
        IFSC: 'ABC1234',
    };
    
    const { theme } = useTheme();
    const currentProfile = profile || defaultProfile;

    return (
        <div className={`mx-auto p-6  rounded-xl ${theme === 'dark' ? 'border-none bg-black' : 'border-gray-100 bg-white'}`}>
            <div className={`flex justify-between items-center border-b pb-2 mb-6 ${theme === 'dark' ? 'border-gray-600 text-white' : 'border-gray-100 text-gray-700'}`}>
                <h3 className={`text-2xl font-bold ml-10 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Profile Details</h3>
                <button 
                    onClick={toggleEditProfile}
                    className="bg-[#1b84ff] text-white px-2 py-2 rounded-xl mr-8 hover:bg-[#056EE9] transition-colors duration-300"
                >
                    Edit Profile
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(currentProfile).map(([key, value], index) => (
                    <div className="flex flex-col ml-10" key={index}>
                        <p className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{key}</p>
                        <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{value || 'Not available'}</p>
                    </div>
                ))}
               
            </div>
        </div>
    );
};

export default ProfileDetails;

