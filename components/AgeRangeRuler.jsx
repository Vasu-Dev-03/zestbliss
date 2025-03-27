import React, { useState, useEffect } from 'react';

const AgeRangeRuler = ({ ageRanges, selectedRanges, onChange }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [activeRuler, setActiveRuler] = useState(false);
  const [highlightedRange, setHighlightedRange] = useState(null);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimated(true);
      
      // Delay the ruler growing animation for better sequence
      setTimeout(() => {
        setActiveRuler(true);
      }, 500);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const ageColors = {
    '0-2': 'bg-pink-400',
    '3-5': 'bg-purple-400',
    '6-8': 'bg-blue-400',
    '9-12': 'bg-green-400',
    '13+': 'bg-yellow-400'
  };
  
  const textColors = {
    '0-2': 'text-pink-600',
    '3-5': 'text-purple-600',
    '6-8': 'text-blue-600',
    '9-12': 'text-green-600',
    '13+': 'text-yellow-600'
  };
  
  const handleRangeClick = (range) => {
    const newSelected = selectedRanges.includes(range)
      ? selectedRanges.filter(r => r !== range)
      : [...selectedRanges, range];
    
    // Add visual feedback
    setHighlightedRange(range);
    setTimeout(() => setHighlightedRange(null), 500);
    
    onChange(newSelected);
  };
  
  // Calculate age positions on ruler
  const getAgePosition = (age) => {
    const minAge = 0;
    const maxAge = 14;
    const rangeStart = parseInt(age.split('-')[0] || age.split('+')[0]);
    return ((rangeStart - minAge) / (maxAge - minAge)) * 100;
  };
  
  return (
    <div className="my-6">
      <div className="mb-2 font-medium text-gray-700 flex justify-between items-center">
        <span className={`transition-all duration-500 ${isAnimated ? 'opacity-100' : 'opacity-0 transform -translate-x-4'}`}>
          Age Range
        </span>
        <span className={`text-xs text-gray-500 transition-all duration-500 ${isAnimated ? 'opacity-100' : 'opacity-0 transform translate-x-4'}`}>
          Select one or more ages
        </span>
      </div>
      
      <div className={`relative h-12 bg-gray-100 rounded-lg overflow-hidden shadow-inner transition-all duration-500 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}>
        {/* Animated ruler background */}
        <div 
          className={`absolute inset-0 bg-gray-200 transition-transform duration-1500 ease-out ${activeRuler ? '' : 'scale-x-0'}`} 
          style={{ transformOrigin: 'left' }}
        ></div>
        
        {/* Age positions on ruler */}
        {ageRanges.map((range) => {
          const position = getAgePosition(range);
          return (
            <div 
              key={range}
              className={`absolute top-0 -ml-0.5 w-1 h-8 ${ageColors[range] || 'bg-blue-400'} transition-all duration-500`}
              style={{ 
                left: `${position}%`,
                opacity: activeRuler ? 1 : 0,
                transform: activeRuler ? 'scaleY(1)' : 'scaleY(0)',
                transformOrigin: 'bottom',
                transitionDelay: `${position * 5}ms`
              }}
            >
              <div 
                className={`absolute -top-6 -left-3 text-xs font-medium w-6 text-center transition-all duration-300 ${textColors[range] || 'text-blue-600'}`}
                style={{ 
                  opacity: activeRuler ? 1 : 0,
                  transform: activeRuler ? 'translateY(0)' : 'translateY(10px)',
                  transitionDelay: `${position * 5 + 300}ms`
                }}
              >
                {range.includes('-') ? range.split('-')[0] : range.split('+')[0]}
              </div>
            </div>
          );
        })}
        
        {/* Ruler notches - more visible */}
        <div className="absolute inset-y-0 left-0 right-0 flex">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i} 
              className={`border-l ${i % 2 === 0 ? 'border-gray-500' : 'border-gray-300'} h-full transition-all`}
              style={{ 
                flex: 1,
                opacity: activeRuler ? 1 : 0,
                height: i % 2 === 0 ? '100%' : '50%',
                marginTop: i % 2 === 0 ? '0' : 'auto',
                transitionDelay: `${i * 50}ms`,
                transform: activeRuler ? 'scaleY(1)' : 'scaleY(0)',
                transformOrigin: 'bottom'
              }}
            >
              {i > 0 && i % 2 === 0 && (
                <div 
                  className="absolute bottom-0 -mb-5 -ml-2 text-xs text-gray-600 transition-all duration-300"
                  style={{ 
                    opacity: activeRuler ? 1 : 0,
                    transform: activeRuler ? 'translateY(0)' : 'translateY(-5px)',
                    transitionDelay: `${i * 50 + 200}ms`
                  }}
                >
                  {i}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-10 flex justify-between">
        {ageRanges.map((range, index) => (
          <div
            key={range}
            className={`relative px-3 py-2 rounded-full cursor-pointer transition-all duration-500 transform 
              ${selectedRanges.includes(range) 
                ? `text-white ${ageColors[range] || 'bg-blue-500'} shadow-lg scale-110` 
                : 'bg-white text-gray-700 border border-gray-300 hover:shadow'}
              ${highlightedRange === range ? 'animate-pulse-slow' : ''}
            `}
            onClick={() => handleRangeClick(range)}
            style={{ 
              zIndex: selectedRanges.includes(range) ? 10 : 1,
              opacity: isAnimated ? 1 : 0,
              transform: `${isAnimated ? 'translateY(0) scale(' + (selectedRanges.includes(range) ? '1.1' : '1') + ')' : 'translateY(20px) scale(0.9)'}`,
              transitionDelay: `${500 + (index * 100)}ms`
            }}
          >
            <div className="font-medium whitespace-nowrap">
              {range} {!range.includes('+') ? 'years' : ''}
            </div>
            
            {/* Animated indicator for connection to ruler */}
            <div 
              className={`absolute left-1/2 w-0.5 h-6 -top-8 -ml-0.5 transition-all duration-500 ${ageColors[range] || 'bg-blue-400'}`}
              style={{ 
                opacity: isAnimated ? (selectedRanges.includes(range) ? 1 : 0.3) : 0,
                transform: isAnimated ? 'scaleY(1)' : 'scaleY(0)',
                transformOrigin: 'bottom',
                transitionDelay: `${600 + (index * 100)}ms`
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgeRangeRuler; 