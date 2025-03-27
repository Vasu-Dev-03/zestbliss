import { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Show button when page is scrolled
  const toggleVisibility = () => {
    if (typeof window !== 'undefined') {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      // Calculate scroll progress
      const scrollTop = window.pageYOffset;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / scrollHeight, 1);
      setScrollProgress(progress);
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', toggleVisibility);
      toggleVisibility(); // Initial check
      return () => window.removeEventListener('scroll', toggleVisibility);
    }
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        ${isHovered ? 'bg-[#b10f27] scale-110' : 'bg-[#ce102c]'}`}
      aria-label="Back to top"
    >
      <span className="sr-only">Back to top</span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-6 w-6 text-white transition-transform duration-300 ${isHovered ? '-translate-y-1' : 'translate-y-0'}`} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
      
      {/* Ripple effect */}
      <span className={`absolute inset-0 rounded-full bg-white transition-opacity duration-500 ${isHovered ? 'animate-ping opacity-20' : 'opacity-0'}`}></span>
      
      {/* Progress indicator - shows how far down the page the user has scrolled */}
      <svg className="absolute inset-0 w-12 h-12" viewBox="0 0 100 100">
        <circle
          className="text-gray-200 opacity-20"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="46"
          cx="50"
          cy="50"
        />
        <circle
          className="text-white"
          strokeWidth="4"
          strokeDasharray="289.027"
          strokeDashoffset={289.027 * (1 - scrollProgress)}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="46"
          cx="50"
          cy="50"
          style={{ transition: 'stroke-dashoffset 0.3s ease 0s' }}
        />
      </svg>
    </button>
  );
};

export default BackToTop; 