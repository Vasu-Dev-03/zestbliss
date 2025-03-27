import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create()(
  persist(
    (set, get) => ({
      items: [],
      // Add item to wishlist
      addItem: (item) => {
        set((state) => {
          // Check if item already exists
          const exists = state.items.some((i) => i.id === item.id);
          if (exists) return state; // No change if item already exists
          return { items: [...state.items, item] };
        });
      },
      // Remove item from wishlist
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      // Check if an item is in wishlist
      isInWishlist: (id) => {
        const state = get();
        return state.items.some((item) => item.id === id);
      },
      // Clear all items from wishlist
      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
); 