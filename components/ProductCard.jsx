import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, ShoppingCartIcon, StarIcon } from '@heroicons/react/24/solid';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useWishlist } from '../context/WishlistContext';
import { useCartStore } from '../store/cartStore';

const ProductCard = ({ product, index = 0 }) => {
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addItem } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const { id, name, price, description, category, image, brand, type, ageRange, educationalValue, rating = 4.5 } = product;
  
  const inWishlist = isInWishlist(id);
  
  // Staggered animation on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100 * (index % 10)); // Stagger effect based on index
    
    return () => clearTimeout(timeout);
  }, [index]);
  
  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };
  
  const navigateToProduct = () => {
    router.push(`/product/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    
    // Add item to cart
    addItem(product);
    
    // Reset animation after a short delay
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };
  
  // Get type color
  const getTypeColor = () => {
    return type === 'Toys' ? 'bg-pink-500' : 'bg-green-500';
  };

  // Render star rating
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} className="w-4 h-4 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <StarIcon className="w-4 h-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIcon className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<StarIcon key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    
    return (
      <div className="flex items-center">
        <div className="flex">{stars}</div>
        <span className="ml-1 text-xs text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div 
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-100 ${isVisible ? 'toy-box-reveal' : 'opacity-0'}`}
      style={{ animationDelay: `${50 * (index % 10)}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={navigateToProduct}
    >
      {/* Sale badge if applicable */}
      {product.onSale && (
        <div className="absolute top-2 left-2 z-20 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
          SALE
        </div>
      )}
      
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110 brightness-105' : 'scale-100'}`}
        />
        
        {/* Type Badge */}
        <span className={`absolute top-2 right-12 ${getTypeColor()} text-white px-2 py-1 rounded-full text-xs font-medium transform transition-transform duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-90'}`}>
          {type}
        </span>
        
        {/* Wishlist Button */}
        <button
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-10 hover:scale-110"
          onClick={toggleWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {inWishlist ? (
            <HeartSolidIcon className="w-5 h-5 text-red-500 animate-heartbeat" />
          ) : (
            <HeartOutlineIcon className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
          )}
        </button>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex flex-wrap gap-1 mb-2">
          <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs transform transition hover:scale-105">
            {category}
          </span>
          {ageRange && (
            <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs transform transition hover:scale-105">
              {ageRange} years
            </span>
          )}
          {brand && (
            <span className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs transform transition hover:scale-105">
              {brand}
            </span>
          )}
        </div>
        
        <h3 className="font-bold text-lg mb-1 truncate group-hover:text-blue-600 transition-colors duration-300">{name}</h3>
        
        {/* Rating */}
        <div className="mb-2">
          {renderRating()}
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">{description}</p>
        
        {/* Educational Tags */}
        {educationalValue && educationalValue.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {educationalValue.map((value, idx) => (
              <span 
                key={value}
                className="inline-flex items-center bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs transform transition hover:scale-105"
                style={{ transitionDelay: `${30 * idx}ms` }}
              >
                <CheckBadgeIcon className="w-3 h-3 mr-1" />
                {value}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-gray-500 text-sm line-through">${product.originalPrice.toFixed(2)}</span>
            )}
            <span className="font-bold text-lg text-blue-600 group-hover:text-blue-700 transition-colors">${price.toFixed(2)}</span>
          </div>
          <button
            className={`flex items-center ${isAddingToCart ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-3 py-1.5 rounded-full transition-all duration-300 transform ${isAddingToCart ? 'scale-110' : 'hover:scale-105'} shadow-md hover:shadow-lg`}
            onClick={handleAddToCart}
          >
            {isAddingToCart ? (
              <span className="flex items-center">
                <svg className="animate-check w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Added!
              </span>
            ) : (
              <>
                <ShoppingCartIcon className="w-4 h-4 mr-1 group-hover:animate-bounce" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 