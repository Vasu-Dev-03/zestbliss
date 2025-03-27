import { useQuery } from 'react-query';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  numReviews: number;
  reviews: Array<{
    user: string;
    name: string;
    rating: number;
    comment: string;
  }>;
  featured: boolean;
}

interface ProductsResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
}

interface UseProductsOptions {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

const fetchProducts = async (options: UseProductsOptions = {}): Promise<ProductsResponse> => {
  const { category, search, page = 1, limit = 10 } = options;
  const params = new URLSearchParams();
  
  if (category) params.append('category', category);
  if (search) params.append('search', search);
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  const { data } = await axios.get(`/api/products?${params.toString()}`);
  return data;
};

export function useProducts(options: UseProductsOptions = {}) {
  return useQuery(
    ['products', options],
    () => fetchProducts(options),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
    }
  );
} 