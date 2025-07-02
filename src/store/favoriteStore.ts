import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: string[];
  category?: string;
  addedDate: string;
}

interface FavoriteStore {
  favorites: FavoriteItem[];
  addToFavorites: (item: Omit<FavoriteItem, 'addedDate'>) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  getFavoriteCount: () => number;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addToFavorites: (item) => {
        const { favorites } = get();
        const existingItem = favorites.find(fav => fav.id === item.id);
        
        if (!existingItem) {
          set({
            favorites: [
              ...favorites,
              {
                ...item,
                addedDate: new Date().toISOString()
              }
            ]
          });
        }
      },
      
      removeFromFavorites: (id) => {
        const { favorites } = get();
        set({
          favorites: favorites.filter(item => item.id !== id)
        });
      },
      
      isFavorite: (id) => {
        const { favorites } = get();
        return favorites.some(item => item.id === id);
      },
      
      clearFavorites: () => {
        set({ favorites: [] });
      },
      
      getFavoriteCount: () => {
        const { favorites } = get();
        return favorites.length;
      }
    }),
    {
      name: 'nisantasi-favorites',
      version: 1
    }
  )
); 