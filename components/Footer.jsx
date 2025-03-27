import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      // Here you would typically call an API to register the email
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4 xl:px-8">
        {/* Top section with logo and newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 pb-12 border-b border-gray-800">
          <div className="mb-8 lg:mb-0">
            <Image 
              src="https://cdn.dotpe.in/longtail/themes/8859817/vS1I1qzu.webp" 
              alt="ZestBliss Logo" 
              width={180} 
              height={60} 
              className="object-contain brightness-150 mb-4"
            />
            <p className="text-gray-400 max-w-md">
              Bringing joy and imagination to children everywhere with our carefully curated collection of toys. Making learning fun since 2010.
            </p>
          </div>
          
          <div className="w-full lg:w-auto">
            <h4 className="text-xl font-bold mb-4 text-center lg:text-left">Subscribe to our Newsletter</h4>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
              <div className="relative flex-grow">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-gray-800 text-white rounded-full py-3 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#ce102c] focus:bg-gray-700 transition-all"
                  required
                />
              </div>
              <button 
                type="submit"
                className="bg-[#ce102c] hover:bg-[#b10f27] text-white font-bold py-3 px-6 rounded-full transition-colors"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-lg font-bold mb-4 text-white relative inline-block">
              About Us
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#ce102c]"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about#team" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 text-white relative inline-block">
              Customer Service
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#ce102c]"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors inline-block">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 text-white relative inline-block">
              Shop by Category
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#ce102c]"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=educational" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Educational Toys
                </Link>
              </li>
              <li>
                <Link href="/products?category=outdoor" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Outdoor Toys
                </Link>
              </li>
              <li>
                <Link href="/products?category=creative" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Arts & Crafts
                </Link>
              </li>
              <li>
                <Link href="/products?category=puzzles" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Puzzles & Games
                </Link>
              </li>
              <li>
                <Link href="/products?category=toddlers" className="text-gray-400 hover:text-white transition-colors inline-block">
                  Toddler Toys
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 text-white relative inline-block">
              Connect With Us
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#ce102c]"></span>
            </h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-3 rounded-full hover:bg-gray-700">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-3 rounded-full hover:bg-gray-700">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.09 1.064.077 1.791.232 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.233.636.388 1.363.465 2.427.077 1.067.09 1.407.09 4.123v.08c0 2.643-.012 2.987-.09 4.043-.077 1.064-.232 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.233-1.363.388-2.427.465-1.067.077-1.407.09-4.123.09h-.08c-2.643 0-2.987-.012-4.043-.09-1.064-.077-1.791-.232-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.233-.636-.388-1.363-.465-2.427-.077-1.024-.09-1.379-.09-3.808v-.63c0-2.43.013-2.784.09-3.808.077-1.064.232-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.233 1.363-.388 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-3 rounded-full hover:bg-gray-700">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-3 rounded-full hover:bg-gray-700">
                <span className="sr-only">YouTube</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
            
            <h4 className="text-lg font-bold mb-3 text-white">Contact Us</h4>
            <address className="text-gray-400 not-italic">
              <p className="mb-2 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#ce102c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                123 Toy Lane, Playville
              </p>
              <p className="mb-2 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#ce102c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (555) 123-4567
              </p>
              <p className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-[#ce102c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@zestbliss.com
              </p>
            </address>
          </div>
        </div>
        
        {/* Payment methods */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="bg-gray-800 p-2 rounded">
            <svg className="h-8 w-auto" viewBox="0 0 60 40" fill="none">
              <rect width="60" height="40" rx="4" fill="#252525"/>
              <path d="M20 20H40M20 15H35M25 25H40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="bg-gray-800 p-2 rounded">
            <svg className="h-8 w-auto" viewBox="0 0 60 40" fill="none">
              <rect width="60" height="40" rx="4" fill="#252525"/>
              <circle cx="30" cy="20" r="8" stroke="#FFB800" strokeWidth="2"/>
              <circle cx="26" cy="20" r="8" stroke="#FF4B4B" strokeWidth="2"/>
            </svg>
          </div>
          <div className="bg-gray-800 p-2 rounded">
            <svg className="h-8 w-auto" viewBox="0 0 60 40" fill="none">
              <rect width="60" height="40" rx="4" fill="#252525"/>
              <path d="M20 25L30 15L40 25" stroke="#0066FF" strokeWidth="2"/>
            </svg>
          </div>
          <div className="bg-gray-800 p-2 rounded">
            <svg className="h-8 w-auto" viewBox="0 0 60 40" fill="none">
              <rect width="60" height="40" rx="4" fill="#252525"/>
              <path d="M32 15C36.4183 15 40 18.5817 40 23C40 27.4183 36.4183 31 32 31H26C21.5817 31 18 27.4183 18 23C18 18.5817 21.5817 15 26 15H32Z" stroke="#00C785" strokeWidth="2"/>
            </svg>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ZestBliss Toys. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-gray-400 hover:text-white text-sm transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 