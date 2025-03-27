import { useState } from 'react';
import AgeRangeRuler from './AgeRangeRuler';

const AdvancedFilter = ({ 
  categories,
  productTypes,
  ageRanges,
  brands,
  educationalValues,
  filters,
  onFilterChange
}) => {
  const [expandedSections, setExpandedSections] = useState({
    productType: true,
    category: true,
    ageRange: true,
    brand: false,
    educationalValue: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (filterType, value) => {
    const currentFilters = filters[filterType] || [];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(item => item !== value)
      : [...currentFilters, value];
    
    onFilterChange({
      ...filters,
      [filterType]: newFilters
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Filter Products</h2>
      
      {/* Product Type Filter */}
      <div className="mb-4 border-b pb-2">
        <button 
          className="flex items-center justify-between w-full text-left font-semibold text-lg"
          onClick={() => toggleSection('productType')}
        >
          <span>Product Type</span>
          <svg 
            className={`w-5 h-5 transition-transform ${expandedSections.productType ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSections.productType && (
          <div className="mt-2 ml-2 space-y-1">
            {productTypes.map(type => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(filters.productType || []).includes(type)}
                  onChange={() => handleCheckboxChange('productType', type)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Category Filter */}
      <div className="mb-4 border-b pb-2">
        <button 
          className="flex items-center justify-between w-full text-left font-semibold text-lg"
          onClick={() => toggleSection('category')}
        >
          <span>Category</span>
          <svg 
            className={`w-5 h-5 transition-transform ${expandedSections.category ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSections.category && (
          <div className="mt-2 ml-2 grid grid-cols-1 md:grid-cols-2 gap-1">
            {categories.map(category => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(filters.category || []).includes(category)}
                  onChange={() => handleCheckboxChange('category', category)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Age Range Filter */}
      <div className="mb-4 border-b pb-2">
        <button 
          className="flex items-center justify-between w-full text-left font-semibold text-lg"
          onClick={() => toggleSection('ageRange')}
        >
          <span>Age Range</span>
          <svg 
            className={`w-5 h-5 transition-transform ${expandedSections.ageRange ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSections.ageRange && (
          <div className="mt-2">
            <AgeRangeRuler 
              ageRanges={ageRanges}
              selectedRanges={filters.ageRange || []}
              onChange={(newRanges) => onFilterChange({
                ...filters,
                ageRange: newRanges
              })}
            />
          </div>
        )}
      </div>
      
      {/* Brand Filter */}
      <div className="mb-4 border-b pb-2">
        <button 
          className="flex items-center justify-between w-full text-left font-semibold text-lg"
          onClick={() => toggleSection('brand')}
        >
          <span>Brand</span>
          <svg 
            className={`w-5 h-5 transition-transform ${expandedSections.brand ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSections.brand && (
          <div className="mt-2 ml-2 grid grid-cols-1 md:grid-cols-2 gap-1 max-h-40 overflow-y-auto">
            {brands.map(brand => (
              <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(filters.brand || []).includes(brand)}
                  onChange={() => handleCheckboxChange('brand', brand)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Educational Value Filter */}
      <div className="mb-4">
        <button 
          className="flex items-center justify-between w-full text-left font-semibold text-lg"
          onClick={() => toggleSection('educationalValue')}
        >
          <span>Educational Value</span>
          <svg 
            className={`w-5 h-5 transition-transform ${expandedSections.educationalValue ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSections.educationalValue && (
          <div className="mt-2 ml-2 grid grid-cols-1 md:grid-cols-2 gap-1 max-h-40 overflow-y-auto">
            {educationalValues.map(value => (
              <label key={value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(filters.educationalValue || []).includes(value)}
                  onChange={() => handleCheckboxChange('educationalValue', value)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Clear Filters Button */}
      <button
        onClick={() => onFilterChange({})}
        className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors w-full"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default AdvancedFilter; 