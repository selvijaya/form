import React from 'react';
import { useTheme } from './ThemeContext';

function Cancel({onClose}) {
  const {theme} = useTheme()
  return (
    <div className="fixed inset-0 flex items-center justify-center white bg-opacity-50 z-50 mt-96">
      <div className="bg-white rounded-lg shadow-lg w-96 max-w-full border border-gray-200  transform-gpu scale-100 transition-transform duration-300 hover:scale-105">
        {/* Cross Icon */}
        <div className="flex justify-center mt-8">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Circle */}
            <div className="absolute inset-0 border-4 border-red-500 rounded-full"></div>
            {/* Cross Line 1 */}
            <div className="absolute w-1 h-8 bg-red-400 transform rotate-45" style={{ top: '28%', left: '47%' }}></div>
            {/* Cross Line 2 */}
            <div className="absolute w-1 h-8 bg-red-400 transform rotate-[-45deg]" style={{ top: '28%', left: '47%' }}></div>
          </div>
        </div>
        {/* Text */}
        <p className={`text-center mt-2 text-sm font-sans p-4 ${theme==='dark'?'text-gray-800':'text-gray-800'}`}>
          You have  was not deleted 
        </p>

        {/* Button */}
        <div className="flex justify-center mb-10 mt-5 text-sm font-bold">
          <button className="px-4 py-2 rounded bg-blue-600 text-white"
             onClick={onClose}
          >
            Ok, got it!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
