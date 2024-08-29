import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faChartBar, faUser, faCog, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext';

const Sidebar = ({ onItemClick, isSidebarHidden }) => {
  const { theme } = useTheme(); 

  return (
    <div 
    className={`fixed top-[85px] h-screen bg-[#fafafa] shadow-lg rounded-sm text-black transition-transform transition-opacity duration-300 ease-in-out z-20
      ${isSidebarHidden ? 'w-16 translate-x-[-100%] opacity-100' : 'w-72 translate-x-0 opacity-100 '} ${theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-900 text-gray-200'}
    `}
    >
       <div className="mt-20">
        <ul className="flex flex-col space-y-2">
          <li 
            onClick={() => onItemClick('Home')} 
            className={`flex items-center p-4 cursor-pointer ${theme === 'light' ? 'hover:bg-gray-200' : 'bg-gray-700'} ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}
          >
            <FontAwesomeIcon icon={faHome} className="text-xl" />
            {!isSidebarHidden && <span className="ml-4">Home</span>}
          </li>
          <li 
            onClick={() => onItemClick('Analytics')} 
            className={`flex items-center p-4 cursor-pointer hover:${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} text-${theme === 'light' ? 'gray-700' : 'gray-200'}`}
          >
            <FontAwesomeIcon icon={faChartBar} className="text-xl" />
            {!isSidebarHidden && <span className="ml-4">Analytics</span>}
          </li>
          <li 
            onClick={() => onItemClick('Users')} 
            className={`flex items-center p-4 cursor-pointer hover:${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} text-${theme === 'light' ? 'gray-700' : 'gray-200'}`}
          >
            <FontAwesomeIcon icon={faUser} className="text-xl" />
            {!isSidebarHidden && <span className="ml-4">Users</span>}
          </li>
          <li 
            onClick={() => onItemClick('Form')} 
            className={`flex items-center p-4 cursor-pointer hover:${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} text-${theme === 'light' ? 'gray-700' : 'gray-200'}`}
          >
            <FontAwesomeIcon icon={faFileAlt} className="text-xl" />
            {!isSidebarHidden && <span className="ml-4">Form</span>}
          </li>
          <li 
            onClick={() => onItemClick('Settings')} 
            className={`flex items-center p-4 cursor-pointer hover:${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} text-${theme === 'light' ? 'gray-700' : 'gray-200'}`}
          >
            <FontAwesomeIcon icon={faCog} className="text-xl" />
            {!isSidebarHidden && <span className="ml-4">Settings</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;



