import { useState } from 'react';
import { EnvelopeIcon, GiftIcon, SparklesIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Simulate API call with loading state
    setIsLoading(true);
    
    // In a real app, you would send the email to your API
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulated delay
    
    console.log(`Subscribed with email: ${email}`);
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail('');
    
    // Reset the subscription message after 5 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  return (
    <section className="mt-20 overflow-hidden relative">
      {/* Background with animated shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-1/3 -right-20 w-64 h-64 bg-pink-400 opacity-20 rounded-full blur-xl animate-float animate-delay-200"></div>
          <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-yellow-300 opacity-10 rounded-full blur-xl animate-float animate-delay-300"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative py-16 px-8 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-block mb-4 p-2 bg-white/20 backdrop-blur-sm rounded-full">
            <EnvelopeIcon className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/85">
            Subscribe to get special offers, new product announcements, and educational content for kids. Be the first to know about exciting new toys!
          </p>
          
          {isSubscribed ? (
            <div className="bg-white text-emerald-600 py-4 px-8 rounded-lg inline-block font-semibold shadow-lg transition-all transform animate-bounce-once">
              <div className="flex items-center">
                <SparklesIcon className="h-5 w-5 mr-2" />
                <span>Thanks for subscribing!</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-lg mx-auto">
              <div className="relative flex-grow">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3.5 rounded-l-lg sm:rounded-r-none rounded-r-lg mb-2 sm:mb-0 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`${
                  isLoading 
                    ? 'bg-indigo-500 cursor-wait' 
                    : 'bg-white text-indigo-600 hover:bg-indigo-50'
                } px-6 py-3.5 rounded-r-lg sm:rounded-l-none rounded-l-lg font-semibold shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading ? 'animate-pulse' : 'hover:shadow-lg'
                }`}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          )}
          
          <p className="mt-4 text-sm text-white/75">
            We respect your privacy. Unsubscribe at any time.
          </p>
          
          {/* Newsletter Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-xl transition-transform hover:transform hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <GiftIcon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl mb-2">Early Access</h3>
              <p className="text-white/80">Be the first to know about new products and special promotions.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-xl transition-transform hover:transform hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Exclusive Discounts</h3>
              <p className="text-white/80">Receive subscriber-only discounts and special offers on our products.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-xl transition-transform hover:transform hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <BookOpenIcon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl mb-2">Educational Tips</h3>
              <p className="text-white/80">Get helpful advice and activities for children's development and learning.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter; 