import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfileDetails = ({ profileId, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        FullName: '',
        Email: '',
        Address: '',
        PhoneNumber: '',
        AccountNumber: '',
        AccountType: '',
        IFSC: '',
        Branch: '',
    });
    
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/profileDetails`, {
                    params: { Id: profileId }
                });
                const { Balance, ...editableData } = response.data;
                setFormData(editableData);                 
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        if (profileId) {
            fetchProfileData();
        }
    }, [profileId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:4000/api/profileDetails/${profileId}`, formData);
            alert('Profile updated successfully');
            if (onSave) onSave(formData);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 ml-28">Profile Details</h2>
            <div className='mt-2 border-b border-gray-100'></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 md:ml-14 lg:ml-28 sm:ml-0">
                {Object.entries(formData).map(([key, value]) => (
                    <div key={key} className="col-span-2 md:col-span-1">
                        <label className="block text-base font-medium text-gray-700 capitalize">{key}</label>
                        <input
                            type="text"
                            name={key}
                            value={value}
                            onChange={handleChange}
                            className="mt-3 lg:w-[500px] md:w-[200px] sm:w-[200px] bg-[#F9F9F9] rounded-md p-[13px] md:text-base focus:outline-none sm:text-sm"
                            placeholder={`Enter ${key.toLowerCase()}`}
                        />
                    </div>
                ))}
                
               
                <div className="col-span-2">
                    <div className="flex lg:mr-32 sm:mr-0 justify-end space-x-4 mt-4">
                        <button
                            className="bg-[#F9F9F9] text-gray-600 rounded-md px-4 py-[12px] hover:bg-[#E9F3FF] hover:text-[#1B84FF] transition-colors duration-200"
                            onClick={onCancel}
                        >
                            Discard
                        </button>
                        <button
                            className="bg-[#1B84FF] text-white rounded-md px-4 py-2 hover:bg-[#056EE9] transition-colors duration-200"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfileDetails;


