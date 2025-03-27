import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

const SearchPage = () => {
  const router = useRouter();
  const { q } = router.query;
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    if (q) {
      const query = q.toLowerCase();
      const results = productsData.products.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
      setSearchResults(results);
    }
  }, [q]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        {searchResults.length > 0 
          ? `Search results for "${q}" (${searchResults.length} products found)` 
          : `No products found for "${q}"`}
      </h1>
      
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-xl mb-4">We couldn't find any products matching your search.</p>
          <p className="mb-6">Try using different keywords or browse our categories.</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-[#ce102c] text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage; 