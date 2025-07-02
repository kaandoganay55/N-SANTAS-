import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: number;
  color: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string, size: number, color: string) => void;
  updateQuantity: (id: string, size: number, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Getters
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (newItem) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          item => 
            item.id === newItem.id && 
            item.size === newItem.size && 
            item.color === newItem.color
        );
        
        if (existingItemIndex > -1) {
          // Eğer item zaten varsa quantity'yi artır
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += newItem.quantity || 1;
          set({ items: updatedItems });
        } else {
          // Yeni item ekle
          set({ 
            items: [...items, { ...newItem, quantity: newItem.quantity || 1 }] 
          });
        }
      },
      
      removeItem: (id, size, color) => {
        set(state => ({
          items: state.items.filter(
            item => !(item.id === id && item.size === size && item.color === color)
          )
        }));
      },
      
      updateQuantity: (id, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size, color);
          return;
        }
        
        set(state => ({
          items: state.items.map(item =>
            item.id === id && item.size === size && item.color === color
              ? { ...item, quantity }
              : item
          )
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'cart-storage', // localStorage key
      partialize: (state) => ({ items: state.items }), // Sadece items'ı persist et
    }
  )
); 