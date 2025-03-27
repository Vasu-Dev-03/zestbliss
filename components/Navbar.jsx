import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { items } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#ce102c] to-[#e4263c] shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 xl:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <Image 
                src="https://cdn.dotpe.in/longtail/themes/8859817/vS1I1qzu.webp" 
                alt="ZestBliss Logo" 
                width={150} 
                height={50} 
                className="object-contain py-2 transform transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>
          
          <div className="hidden md:block flex-1 max-w-md mx-auto">
            <SearchBar />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white toy-train-nav-item">
              Home
            </Link>
            <Link href="/products" className="text-white toy-train-nav-item">
              Products
            </Link>
            <Link href="/about" className="text-white toy-train-nav-item">
              About
            </Link>
            <Link href="/wishlist" className="text-white hover:text-gray-200 relative group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#ce102c] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link 
              href="/checkout" 
              className="flex items-center bg-white text-[#ce102c] px-4 py-2 rounded-full hover:bg-gray-100 transition-colors duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Cart {itemCount > 0 && <span className="ml-1 bg-[#ce102c] text-white rounded-full px-2 text-xs font-bold">{itemCount}</span>}
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 bg-[#ce102c]">
          <div className="px-4 py-2">
            <SearchBar />
          </div>
          <Link href="/" className="block text-white hover:bg-[#b10f27] px-3 py-2 rounded-md font-medium">Home</Link>
          <Link href="/products" className="block text-white hover:bg-[#b10f27] px-3 py-2 rounded-md font-medium">Products</Link>
          <Link href="/about" className="block text-white hover:bg-[#b10f27] px-3 py-2 rounded-md font-medium">About</Link>
          <Link href="/wishlist" className="block text-white hover:bg-[#b10f27] px-3 py-2 rounded-md font-medium">
            Wishlist {wishlistCount > 0 && <span className="ml-1 bg-white text-[#ce102c] rounded-full px-2 text-xs">{wishlistCount}</span>}
          </Link>
          <Link href="/checkout" className="block bg-white text-[#ce102c] hover:bg-gray-100 px-3 py-2 rounded-md font-medium">
            Cart {itemCount > 0 && <span className="ml-1 bg-[#ce102c] text-white rounded-full px-2 text-xs">{itemCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 