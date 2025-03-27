import { useState, useEffect } from 'react';
import Head from 'next/head';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import FeaturedProducts from '../components/FeaturedProducts';
import Newsletter from '../components/Newsletter';
import enhancedProductsData from '../data/enhanced-products.json';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { products, categories } = enhancedProductsData;
  
  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  // Get featured products (toys from first 8 products)
  const featuredProducts = products
    .filter(product => product.type === 'Toys')
    .slice(0, 8);

  return (
    <div>
      <Head>
        <title>ZestBliss - Toys & Stationery Store</title>
        <meta name="description" content="Shop our collection of toys and stationery products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero />
        
        <div className="container mx-auto px-4 xl:px-8 py-12">
          <FeaturedProducts products={featuredProducts} />
          
          <section className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Browse Products</h2>
              
              {/* Product Type Quick Switch */}
              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    setSelectedCategory(null);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm transition-colors"
                >
                  All Products
                </button>
                <button 
                  onClick={() => {
                    setSelectedCategory(null);
                    // Filter toy categories
                    const toyCategories = products
                      .filter(p => p.type === 'Toys')
                      .map(p => p.category);
                    
                    // You could set a state here to filter by toy type
                  }}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm transition-colors"
                >
                  Toys
                </button>
                <button 
                  onClick={() => {
                    setSelectedCategory(null);
                    // Filter stationery categories
                    const stationeryCategories = products
                      .filter(p => p.type === 'Stationery')
                      .map(p => p.category);
                    
                    // You could set a state here to filter by stationery type
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm transition-colors"
                >
                  Stationery
                </button>
              </div>
            </div>
            
            <div className="mb-8">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length > 8 && (
              <div className="text-center mt-12">
                <a
                  href="/products"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition-colors"
                >
                  View All Products
                </a>
              </div>
            )}
          </section>
          
          {/* Age-Based Collection Showcase with Disney Character Icons */}
          <section className="mt-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Shop by Age</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { 
                  age: '0-2 years', 
                  character: 'Mickey Mouse', 
                  color: 'from-red-400 to-red-600',
                  description: 'Perfect for early development and sensory play.',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-24 h-24">
                      <circle cx="50" cy="50" r="30" fill="black"/>
                      <circle cx="30" cy="30" r="15" fill="black"/>
                      <circle cx="70" cy="30" r="15" fill="black"/>
                      <ellipse cx="50" cy="60" rx="10" ry="7" fill="white"/>
                      <rect x="45" y="55" width="10" height="5" fill="white"/>
                      <circle cx="40" cy="45" r="5" fill="white"/>
                      <circle cx="60" cy="45" r="5" fill="white"/>
                    </svg>
                  )
                },
                { 
                  age: '3-5 years', 
                  character: 'Frozen Princess', 
                  color: 'from-blue-400 to-blue-600',
                  description: 'Ideal for creativity and imagination building.',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-24 h-24">
                      <path d="M50,20 L65,35 L80,20 L75,50 L83,70 L65,65 L70,85 L50,75 L30,85 L35,65 L17,70 L25,50 L20,20 L35,35 z" fill="#86c5fc"/>
                      <circle cx="50" cy="35" r="15" fill="#f8e9e3"/>
                      <path d="M40,35 C40,30 60,30 60,35" stroke="#000" fill="transparent" strokeWidth="1"/>
                      <circle cx="44" cy="32" r="1" fill="#000"/>
                      <circle cx="56" cy="32" r="1" fill="#000"/>
                      <path d="M30,35 Q50,60 70,35" stroke="#86c5fc" fill="transparent" strokeWidth="5"/>
                    </svg>
                  )
                },
                { 
                  age: '6-8 years', 
                  character: 'Space Ranger', 
                  color: 'from-green-400 to-green-600',
                  description: 'Great for logic, strategy, and advanced play patterns.',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-24 h-24">
                      <rect x="25" y="20" width="50" height="55" rx="10" fill="#fff" stroke="#3e8948" strokeWidth="2"/>
                      <rect x="35" y="30" width="30" height="20" rx="5" fill="#9ee6ff" stroke="#3e8948" strokeWidth="1"/>
                      <rect x="20" y="50" width="20" height="10" rx="5" fill="#c43e1c" stroke="#3e8948" strokeWidth="1"/>
                      <rect x="60" y="50" width="20" height="10" rx="5" fill="#c43e1c" stroke="#3e8948" strokeWidth="1"/>
                      <rect x="40" y="75" width="10" height="10" fill="#3e8948"/>
                      <rect x="50" y="75" width="10" height="10" fill="#3e8948"/>
                      <circle cx="43" cy="40" r="2" fill="#000"/>
                      <circle cx="57" cy="40" r="2" fill="#000"/>
                      <path d="M43,45 Q50,50 57,45" stroke="#000" fill="transparent" strokeWidth="1"/>
                    </svg>
                  )
                }
              ].map((item) => (
                <div key={item.age} className="flex flex-col items-center text-center group">
                  {/* Character Icon Circle */}
                  <div className={`w-40 h-40 rounded-full bg-gradient-to-b ${item.color} p-1 mb-6 transform transition-transform group-hover:scale-105 duration-300 shadow-lg`}>
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden p-2">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Age Range */}
                  <h3 className="text-xl font-bold mb-2">Ages {item.age}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  
                  {/* Shop Now Button */}
                  <a 
                    href={`/products?age=${item.age}`}
                    className={`bg-gradient-to-r ${item.color} hover:opacity-90 text-white font-medium px-6 py-2 rounded-full inline-block transition-all shadow-md hover:shadow-lg`}
                  >
                    Shop Now
                  </a>
                </div>
              ))}
            </div>
          </section>
          
          {/* Educational Value Section */}
          <section className="mt-20 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2">Educational Value</h2>
            <p className="text-gray-600 mb-6">Discover toys that help children learn and develop important skills.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {['STEM', 'Creativity', 'Motor Skills', 'Problem Solving'].map((value) => (
                <div key={value} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-600">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                        value === 'STEM' ? "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.5 2.25M9.75 3.104c-1.067.1-2.101.25-3.092.45M14.25 8.829l-.591.506c-.91.78-1.584 1.747-1.584 2.833 0 1.097.703 2.105 1.584 2.836l.59.501m-3.75.674l-1.591-1.296A2.25 2.25 0 017.5 14.25c0-.88.512-1.679 1.312-2.047l1.562-.93" : 
                        value === 'Creativity' ? "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" : 
                        value === 'Motor Skills' ? "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" : 
                        "M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
                      } />
                    </svg>
                  </div>
                  <h3 className="font-bold mb-2">{value}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {value === 'STEM' ? 'Toys that teach science, technology, engineering, and math concepts.' : 
                     value === 'Creativity' ? 'Products that encourage imagination and artistic expression.' : 
                     value === 'Motor Skills' ? 'Toys that help develop fine and gross motor skills.' : 
                     'Games and puzzles that enhance problem-solving abilities.'}
                  </p>
                  <a 
                    href={`/products?educational=${value}`} 
                    className="text-blue-600 font-medium text-sm hover:text-blue-800 flex items-center"
                  >
                    Browse Products
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </section>
          
          <Newsletter />
        </div>
      </main>
    </div>
  );
} 