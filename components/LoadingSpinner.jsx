import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'primary', fullScreen = false }) => {
  // Determine the size class
  const sizeClass = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  }[size] || 'w-10 h-10';
  
  // Determine the color class
  const colorClass = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white'
  }[color] || 'text-blue-600';
  
  const spinner = (
    <div className={`${sizeClass} animate-spin`}>
      <svg 
        className={`${sizeClass} ${colorClass}`} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        ></circle>
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

export default LoadingSpinner; 