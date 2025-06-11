import { create } from 'zustand';
import { Product, StoreInfo } from '../lib/interfaces';
import useStoreInfo from './storeinfo';

interface ProductState {
  activeTab: string;
  searchInput: string;
  inventory: Product[];
  originalInventory: Product[];
  sortOrder: 'asc' | 'desc' | 'def';
  setProducts: (products: Product[]) => void;
  toggleTab: (tab: string) => void;
  updateSearch: (input: string) => void;
  selectSortOrder: (order: 'asc' | 'desc' | 'def') => void;
  resetSort: () => void;
  filteredProducts: () => Product[];
  syncWithStoreInfo: () => void;
}

const useProductStore = create<ProductState>((set, get) => ({
  activeTab: 'all',
  searchInput: '',
  inventory: [],
  originalInventory: [],
  sortOrder: 'def',

  setProducts: (products) =>
    set({
      inventory: [...products],
      originalInventory: [...products],
    }),

  toggleTab: (tab) => set({ activeTab: tab }),

  updateSearch: (input) => set({ searchInput: input }),

  selectSortOrder: (order) => {
    const { originalInventory, inventory } = get();
    let sorted = [...inventory];

    if (order === 'asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      sorted = [...originalInventory];
    }

    set({ sortOrder: order, inventory: sorted });
  },

  resetSort: () => {
    const { originalInventory } = get();
    set({ sortOrder: 'def', inventory: [...originalInventory] });
  },

  filteredProducts: () => {
    const { inventory, activeTab, searchInput } = get();
    let filtered = inventory;

    if (activeTab !== 'all') {
      filtered = filtered.filter((product) => product.category === activeTab);
    }

    if (searchInput.trim()) {
      filtered = filtered.filter((product) =>
        product.product_name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    return filtered.filter((product) => product.display === true);
  },

  // ✅ Sync with storeInfo.products (like Pinia's watch)
  syncWithStoreInfo: () => {
    const storeInfo = useStoreInfo.getState().storeInfo as StoreInfo;
    if (storeInfo && storeInfo.products) {
      set({
        inventory: [...storeInfo.products],
        originalInventory: [...storeInfo.products],
        sortOrder: 'def',
      });
    }
  },
}));

export default useProductStore;