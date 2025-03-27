import { useRouter } from 'next/router';
import Image from 'next/image';
import productsData from '../../data/products.json';
import { useCartStore } from '../../store/cartStore';

const ProductPage = ({ product }) => {
  const router = useRouter();
  const { addItem } = useCartStore();

  // If the page is still generating via fallback
  if (router.isFallback) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center items-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  // Handle case when product is not found
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[400px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="flex space-x-4">
            <button 
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-700"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// This function gets called at build time
export const getStaticProps = async ({ params }) => {
  const product = productsData.products.find(
    (p) => p.id.toString() === params.id
  );

  // If product not found, return not found
  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
    // Re-generate at most once per 24 hours
    revalidate: 86400,
  };
};

// This function generates all possible paths at build time
export const getStaticPaths = async () => {
  const products = productsData.products;
  
  // Generate paths for each product
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: true, // Allow fallback for paths not generated at build time
  };
};

export default ProductPage; 