import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import Image from 'next/image';
import Link from 'next/link';

const WishlistPage = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleAddToCart = (item) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      
      {items.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-xl mb-4">Your wishlist is empty</p>
          <p className="mb-6">Add items to your wishlist by clicking the heart icon on product cards.</p>
          <Link 
            href="/"
            className="bg-[#ce102c] text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button 
              onClick={clearWishlist}
              className="text-gray-600 hover:text-[#ce102c] transition-colors"
            >
              Clear Wishlist
            </button>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="relative w-16 h-16 mr-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-[#ce102c] font-bold">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 hover:text-red-600 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistPage; 