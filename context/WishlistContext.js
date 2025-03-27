import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const WishlistContext = createContext();

// WishlistProvider component
export const WishlistProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [wishlistItems, setWishlistItems] = useState([]);
  
  // Load wishlist from localStorage on component mount
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlistItems]);
  
  // Add item to wishlist
  const addToWishlist = (product) => {
    setWishlistItems(prev => [...prev, product]);
  };
  
  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };
  
  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };
  
  // Get wishlist count
  const getWishlistCount = () => wishlistItems.length;
  
  // Get all wishlist items
  const getWishlistItems = () => wishlistItems;
  
  // Clear wishlist
  const clearWishlist = () => setWishlistItems([]);
  
  // Context value
  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistCount,
    getWishlistItems,
    clearWishlist
  };
  
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use the wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  
  return context;
}; 