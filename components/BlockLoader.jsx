import React from 'react';

const BlockLoader = ({ color = 'text-blue-500', size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };
  
  const blockSize = sizeClasses[size] || sizeClasses.md;
  
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="flex items-end mb-2">
        <div className={`building-block building-block-1 ${blockSize} ${color}`}></div>
        <div className={`building-block building-block-2 ${blockSize} ${color}`}></div>
        <div className={`building-block building-block-3 ${blockSize} ${color}`}></div>
        <div className={`building-block building-block-4 ${blockSize} ${color}`}></div>
      </div>
      {text && <p className="text-sm text-gray-500 mt-2">{text}</p>}
    </div>
  );
};

export default BlockLoader; 