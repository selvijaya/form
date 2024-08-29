import React from 'react';
import { useTheme } from './ThemeContext';

function Delete({onClose}) {
  const {theme} = useTheme()
  return (
    <div className="fixed inset-0 flex items-center justify-center white bg-opacity-50 z-50 mt-96">
      <div className="bg-white rounded-lg shadow-lg w-96 max-w-full border border-gray-200 transform-gpu scale-100 transition-transform duration-300 hover:scale-105">
        {/* Success Icon */}
        <div className="flex justify-center mt-8">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Circle */}
            <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
            {/* Tick Mark - Tip */}
            <div className="absolute w-1 h-5 bg-green-500 transform rotate-[-35deg]" style={{ top: '43%', left: '34%' }}></div>
            {/* Tick Mark - Long */}
            <div className="absolute w-1 h-8 bg-green-500 transform rotate-[-131deg]" style={{ top: '28%', left: '60%' }}></div>
          </div>
        </div>

        {/* Text */}
        <p className={`text-center mt-2 text-sm font-sans p-4 ${theme==='dark'?'text-gray-800':'text-gray-800'}`}>
          You have deleted 
        </p>

        {/* Button */}
       
        <div className="flex justify-center mb-10 mt-5 text-sm font-bold">
          <button className="  px-4 py-2 rounded bg-blue-600 text-white "
            onClick={onClose}
          >
            Ok, got it!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
