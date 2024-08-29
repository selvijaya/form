import React from 'react';
import { useTheme } from './ThemeContext';

const NavigationTabs = ({ activeTab, handleNavClick }) => {
    const { theme } = useTheme();

    const linkClassName = (tabName) => `
        nav-link-custom block py-2 px-4 
        ${activeTab === tabName ? 'font-semibold border-b-2' : 'text-gray-600'} 
        ${activeTab === tabName ? (theme === 'dark' ? 'text-blue-300 border-blue-300 ' : 'text-blue-400 border-blue-400') : (theme === 'dark' ? 'text-white' : 'text-gray-600')}
    `;

    return (
        <div className="card-body nav-container">
            <ul className="flex flex-wrap justify-start sm:justify-start lg:justify-start ml-10">
                <li className="mr-2 mb-2 sm:mb-0">
                    <a
                        className={linkClassName('Profile')}
                        aria-current={activeTab === 'Profile' ? 'page' : undefined}
                        href="#"
                        onClick={(e) => handleNavClick(e, 'Profile')}
                        style={{ textDecoration: 'none' }}
                    >
                        Profile
                    </a>
                </li>
                <li className="mr-2 mb-2 sm:mb-0">
                    <a
                        className={linkClassName('callHistory')}
                        aria-current={activeTab === 'callHistory' ? 'page' : undefined}
                        href="#"
                        onClick={(e) => handleNavClick(e, 'callHistory')}
                        style={{ textDecoration: 'none' }}
                    >
                        Call History
                    </a>
                </li>
                <li className="mr-2 mb-2 sm:mb-0">
                    <a
                        className={linkClassName('loanDetails')}
                        href="#"
                        onClick={(e) => handleNavClick(e, 'loanDetails')}
                        style={{ textDecoration: 'none' }}
                    >
                        Loan Details
                    </a>
                </li>
                <li className="mr-2 mb-2 sm:mb-0">
                    <a
                        className={linkClassName('accountDetails')}
                        href="#"
                        onClick={(e) => handleNavClick(e, 'accountDetails')}
                        style={{ textDecoration: 'none' }}
                    >
                        Account Details
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default NavigationTabs;

