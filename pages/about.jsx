import Image from 'next/image';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 xl:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About ZestBliss</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Bringing joy and imagination to children everywhere with our carefully curated collection of toys.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=60"
            alt="Children playing with toys"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2023, ZestBliss started with a simple mission: to provide high-quality, imaginative toys that spark joy and creativity in children of all ages.
          </p>
          <p className="text-gray-600 mb-4">
            We believe that play is an essential part of childhood development. Through play, children learn, grow, and discover the world around them. Our carefully selected toys encourage exploration, creativity, and fun.
          </p>
          <p className="text-gray-600">
            Today, we offer a wide range of toys for all ages, from educational puzzles to imaginative playsets, ensuring there's something for every child at ZestBliss.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-xl mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Quality</h3>
            <p className="text-gray-600">
              We carefully select toys that meet the highest standards of quality and safety.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-green-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Education</h3>
            <p className="text-gray-600">
              We believe in toys that combine fun with learning, helping children develop essential skills.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-purple-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Imagination</h3>
            <p className="text-gray-600">
              We support toys that spark creativity and allow children to explore their imagination.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Explore?</h2>
        <Link 
          href="/products" 
          className="inline-block bg-[#ce102c] text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors"
        >
          Shop Our Collection
        </Link>
      </div>
    </div>
  );
};

export default AboutPage; 