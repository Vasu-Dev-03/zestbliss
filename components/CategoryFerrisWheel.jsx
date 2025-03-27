import React from 'react';
import Link from 'next/link';

const CategoryFerrisWheel = ({ categories }) => {
  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-center mb-8">Explore Toy Categories</h2>
      
      <div className="ferris-wheel-container">
        <div className="ferris-wheel">
          {categories.map((category, index) => {
            // Calculate position in the circle
            const angle = (index / categories.length) * 2 * Math.PI;
            const radius = 120; // Adjust based on your container size
            const left = 150 + radius * Math.cos(angle);
            const top = 150 + radius * Math.sin(angle);
            
            return (
              <Link
                href={`/products?category=${category.slug}`}
                key={category.slug}
                className="ferris-item"
                style={{ 
                  left: `${left}px`, 
                  top: `${top}px`,
                  transform: `rotate(${angle * (180/Math.PI)}deg)`
                }}
              >
                <div className="flex flex-col items-center justify-center p-2">
                  <div className="text-center w-10 h-10 flex items-center justify-center mb-1">
                    {category.icon}
                  </div>
                  <div className="text-xs font-medium" style={{ transform: `rotate(${-angle * (180/Math.PI)}deg)` }}>
                    {category.name}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Ferris wheel structure */}
        <div className="absolute top-1/2 left-1/2 w-24 h-24 -ml-12 -mt-12 bg-[#ce102c] rounded-full"></div>
        <div className="absolute top-0 left-1/2 w-4 h-24 -ml-2 bg-gray-800 transform -translate-y-16"></div>
        <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-800"></div>
      </div>
    </div>
  );
};

export default CategoryFerrisWheel; 