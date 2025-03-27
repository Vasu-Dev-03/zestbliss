import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const POPULAR_SEARCHES = [
  'Educational toys',
  'STEM toys',
  'Outdoor games',
  'Board games',
  'Puzzles',
  'Arts and crafts',
  'Toddler toys'
];

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const router = useRouter();
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches).slice(0, 3));
      } catch (e) {
        console.error('Error parsing recent searches', e);
      }
    }
  }, []);

  // Save search term to recent searches
  const saveToRecentSearches = (term) => {
    const updatedSearches = [term, ...recentSearches.filter(s => s !== term)].slice(0, 3);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      saveToRecentSearches(searchTerm);
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    saveToRecentSearches(suggestion);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  // Handle clicks outside the search component to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get filtered suggestions based on search term
  const getFilteredSuggestions = () => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return POPULAR_SEARCHES.filter(s => s.toLowerCase().includes(term));
  };

  const filteredSuggestions = getFilteredSuggestions();
  const hasResults = recentSearches.length > 0 || filteredSuggestions.length > 0;

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => setIsFocused(false)}
            className={`w-full px-4 py-2 rounded-full 
              ${isFocused 
                ? 'bg-white text-gray-900 placeholder-gray-500 shadow-lg' 
                : 'bg-white bg-opacity-20 text-white placeholder-gray-200 border border-white border-opacity-30'} 
              focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 transition-all`}
          />
          <button 
            type="submit" 
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 
              ${isFocused ? 'text-gray-700 hover:text-gray-900' : 'text-white'} 
              transition-colors`}
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      {/* Search suggestions dropdown */}
      {showSuggestions && (searchTerm || recentSearches.length > 0) && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {!hasResults && (
            <div className="p-4 text-gray-500 text-center">
              No matching results found
            </div>
          )}

          {recentSearches.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1 px-2">Recent Searches</div>
              {recentSearches.map((search, index) => (
                <div
                  key={`recent-${index}`}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded flex items-center"
                  onClick={() => handleSuggestionClick(search)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-800">{search}</span>
                </div>
              ))}
            </div>
          )}

          {filteredSuggestions.length > 0 && (
            <div className={`${recentSearches.length > 0 ? 'border-t border-gray-200' : ''} p-2`}>
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1 px-2">Suggestions</div>
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={`suggestion-${index}`}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded flex items-center"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-gray-800">{suggestion}</span>
                </div>
              ))}
            </div>
          )}

          {/* Show popular categories */}
          <div className="bg-gray-50 p-2 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase px-2">Popular Categories</span>
              <Link href="/products" className="text-xs text-blue-600 hover:text-blue-800 px-2">
                View All
              </Link>
            </div>
            <div className="flex flex-wrap gap-1 mt-1 px-2">
              <Link href="/products?category=educational" className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
                Educational
              </Link>
              <Link href="/products?category=outdoor" className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 transition-colors">
                Outdoor
              </Link>
              <Link href="/products?category=creative" className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded hover:bg-purple-200 transition-colors">
                Creative
              </Link>
              <Link href="/products?age=0-2" className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded hover:bg-pink-200 transition-colors">
                Babies
              </Link>
              <Link href="/products?age=3-5" className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded hover:bg-yellow-200 transition-colors">
                Toddlers
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 