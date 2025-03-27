import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import AdvancedFilter from '../components/AdvancedFilter';
import enhancedProductsData from '../data/enhanced-products.json';

const ProductsPage = () => {
  const [filters, setFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeView, setActiveView] = useState('grid');
  
  const {
    products,
    categories,
    productTypes,
    ageRanges,
    brands,
    educationalValues
  } = enhancedProductsData;

  // Filter products based on selected filters
  useEffect(() => {
    let result = [...products];
    
    // Filter by product type
    if (filters.productType && filters.productType.length > 0) {
      result = result.filter(product => 
        filters.productType.includes(product.type)
      );
    }
    
    // Filter by category
    if (filters.category && filters.category.length > 0) {
      result = result.filter(product => 
        filters.category.includes(product.category)
      );
    }
    
    // Filter by age range
    if (filters.ageRange && filters.ageRange.length > 0) {
      result = result.filter(product => 
        filters.ageRange.includes(product.ageRange)
      );
    }
    
    // Filter by brand
    if (filters.brand && filters.brand.length > 0) {
      result = result.filter(product => 
        filters.brand.includes(product.brand)
      );
    }
    
    // Filter by educational value
    if (filters.educationalValue && filters.educationalValue.length > 0) {
      result = result.filter(product => 
        product.educationalValue && 
        product.educationalValue.some(value => 
          filters.educationalValue.includes(value)
        )
      );
    }
    
    setFilteredProducts(result);
  }, [filters, products]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Count products by type
  const toyCount = products.filter(p => p.type === 'Toys').length;
  const stationeryCount = products.filter(p => p.type === 'Stationery').length;

  return (
    <div className="container mx-auto px-4 xl:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">All Products</h1>
      <p className="text-gray-600 mb-8">Find the perfect toys for every age and interest</p>
      
      {/* Product Type Summary */}
      <div className="flex items-center space-x-4 mb-8">
        <span className="text-gray-600">Browse:</span>
        <div className="flex space-x-2">
          <button 
            onClick={() => handleFilterChange({...filters, productType: ['Toys']})}
            className={`px-3 py-1 rounded-full text-sm ${
              filters.productType?.includes('Toys') 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Toys ({toyCount})
          </button>
          <button 
            onClick={() => handleFilterChange({...filters, productType: ['Stationery']})}
            className={`px-3 py-1 rounded-full text-sm ${
              filters.productType?.includes('Stationery') 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Stationery ({stationeryCount})
          </button>
          {(filters.productType?.length === 1) && (
            <button 
              onClick={() => {
                const { productType, ...restFilters } = filters;
                handleFilterChange(restFilters);
              }}
              className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              View All
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Panel */}
        <div className="md:w-1/4">
          <AdvancedFilter
            categories={categories}
            productTypes={productTypes}
            ageRanges={ageRanges}
            brands={brands}
            educationalValues={educationalValues}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
        
        {/* Products Display */}
        <div className="md:w-3/4">
          {/* Products Header with View Toggle and Count */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-600">
              Showing {filteredProducts.length} products
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveView('grid')}
                className={`p-2 rounded ${activeView === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
                aria-label="Grid view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`p-2 rounded ${activeView === 'list' ? 'bg-gray-200' : 'bg-white'}`}
                aria-label="List view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* No Results Message */}
          {filteredProducts.length === 0 && (
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <p className="text-xl mb-4">No products match your filter criteria</p>
              <button 
                onClick={() => handleFilterChange({})}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
          
          {/* Grid View */}
          {activeView === 'grid' && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          {/* List View */}
          {activeView === 'list' && filteredProducts.length > 0 && (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative w-40 h-40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold">{product.name}</h3>
                      <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex space-x-2 mb-2">
                      <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">{product.category}</span>
                      <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">{product.ageRange} years</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    
                    <div className="mt-auto flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-2">Brand: {product.brand}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                          Add to Cart
                        </button>
                        <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage; 