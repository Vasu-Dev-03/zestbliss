import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-float absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
        <div className="animate-float animate-delay-100 absolute top-40 right-20 w-32 h-32 bg-white opacity-10 rounded-full"></div>
        <div className="animate-float animate-delay-200 absolute bottom-10 left-1/4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
        <div className="animate-bounce-slow absolute top-1/3 right-1/3 w-16 h-16 bg-white opacity-10 rounded-full"></div>
        
        {/* Additional decorative elements */}
        <div className="animate-pulse absolute top-1/2 left-1/5 w-40 h-40 bg-pink-300 opacity-10 rounded-full blur-xl"></div>
        <div className="animate-float animate-delay-300 absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-300 opacity-10 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 xl:px-8 py-16 sm:py-24 lg:py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="animate-slide-in-bottom text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Bringing <span className="text-yellow-300">Joy</span> & <span className="text-pink-300">Imagination</span> to Children
            </h1>
            <p className="animate-slide-in-bottom animate-delay-100 text-xl sm:text-2xl text-white opacity-90 mb-10 max-w-3xl mx-auto lg:mx-0">
              Discover our amazing collection of toys that spark creativity, learning, and endless fun for children of all ages.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 stagger-children">
              <Link 
                href="/products" 
                className="animate-scale-up px-8 py-4 bg-white text-[#ce102c] rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Shop Now
              </Link>
              <Link 
                href="/about" 
                className="animate-scale-up px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-[#ce102c] hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Learn More
              </Link>
            </div>
            
            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6">
              <div className="flex items-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Quality Guarantee</span>
              </div>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="lg:w-1/2 relative">
            <div className="relative w-full h-[350px] sm:h-[400px] lg:h-[450px] animate-float">
              <div className="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm shadow-xl border border-white/30"></div>
              <div className="absolute inset-8 overflow-hidden rounded-xl">
                <Image 
                  src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                  alt="Children playing with toys" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full animate-bounce-slow"></div>
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-pink-400 rounded-full animate-float animate-delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 