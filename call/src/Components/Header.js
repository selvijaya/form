import { FaSun, FaBell, FaEnvelope, FaSearch, FaMoon, FaBars } from 'react-icons/fa';
import { useTheme } from './ThemeContext';
const Header = ({ onSidebarToggle }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className={`text-gray-600 p-6 border-gray-120 border-b fixed top-0 left-0 w-full z-10 flex items-center justify-between ${theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-900 text-white'}`}>

      <div className="flex items-center space-x-4">
        <button
          onClick={onSidebarToggle}
          className="p-2 rounded-md focus:outline-none"
        >
          <FaBars className={`text-xl ${theme === 'light' ? 'text-gray-700' : 'text-white'}`} />
        </button>
        {/* <nav className="flex space-x-2 lg:space-x-10 md:space-x-5 sm:space-x-3">
          <span
            className={`${
              theme === 'light' ? 'text-gray-700 font-semibold' : 'text-white font-semibold'
            } lg:text-xl md:text-base sm:text-base text-sm`}
          >
            Help
          </span>
          <span
            className={`${
              theme === 'light' ? 'text-gray-700 font-semibold' : 'text-white font-semibold'
            } lg:text-xl md:text-lg sm:text-base text-sm`}
          >
            Reports
          </span>
          <span
            className={`${
              theme === 'light' ? 'text-gray-700 font-semibold' : 'text-white font-semibold'
            } lg:text-xl md:text-lg sm:text-base text-sm`}
          >
            Applications
          </span>
          <span
            className={`${
              theme === 'light' ? 'text-gray-700 font-semibold' : 'text-white font-semibold'
            } lg:text-xl md:text-lg sm:text-base text-sm`}
          >
            Forms
          </span>
        </nav> */}
      </div>
      <div className="flex">
        <div className="relative flex items-center">
          <button 
            onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')} 
            className="p-2 mr-10 rounded-md focus:outline-none"
          >
            {theme === 'light' ? (
              <FaMoon 
                className={`text-lg md:text-xl ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`} 
              />
            ) : (
              <FaSun 
                className={`text-lg md:text-xl ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`} 
              />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
