import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CartItem, Product, Selections } from '../lib/interfaces';

interface CartState {
  cart: CartItem[];
  cartTotal: () => number;
  cartLength: () => number;
  totalProductsCount: () => number;
  addToCart: (
    product: Product,
    selections: Selections,
    price: number,
    stockLeft: number,
    sku: number
  ) => void;
  getCartItemQuantity: (product: Product) => number;
  isProductInCart: (product: Product) => boolean;
  isInStock: (product: Product, selections: Selections) => boolean;
  removeSelection: (cartItem: CartItem) => void;
  increaseSelectionQuantity: (cartItem: CartItem) => void;
  decreaseSelectionQuantity: (cartItem: CartItem) => void;
  updateSelectionQuantity: (cartItem: CartItem, quantity: number) => void;
  clearCart: () => void;
}

const asyncStorage: PersistStorage<CartState> = {
  getItem: async (name) => {
    const storedValue = await AsyncStorage.getItem(name);
    return storedValue ? JSON.parse(storedValue) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      cartTotal: () =>
        get().cart.reduce((sum, item) => sum + item.variant_price * item.selected_quantity, 0),

      cartLength: () => get().cart.length,

      totalProductsCount: () => get().cart.reduce((sum, item) => sum + item.selected_quantity, 0),

      addToCart: (product, selections, price, stockLeft, sku) => {
        const { cart } = get();

        const item = cart.find(
          (i) =>
            i.id === product.id &&
            i.selected_variant1 === selections.variant1 &&
            i.selected_variant2 === selections.variant2 &&
            i.selected_variant3 === selections.variant3
        );

        if (item) {
          if (item.selected_quantity < item.variant_total_stock) {
            item.selected_quantity += 1;
            item.itemTotal = item.variant_price * item.selected_quantity;
            set({ cart: [...cart] });
          }
          return;
        }

        const cartItem: CartItem = {
          ...product,
          selected_variant1: selections.variant1,
          selected_variant2: selections.variant2,
          selected_variant3: selections.variant3,
          selected_quantity: 1,
          variant_price: price,
          variant_total_stock: stockLeft,
          itemTotal: price * selections.quantity,
          selected_sku: sku,
        };

        set({ cart: [...cart, cartItem] });
      },

      getCartItemQuantity: (product) =>
        get()
          .cart.filter((i) => i.id === product.id)
          .reduce((sum, item) => sum + item.selected_quantity, 0),

      isProductInCart: (product) => get().cart.some((i) => i.id === product.id),

      isInStock: (product, selections) => {
        const item = get().cart.find(
          (i) =>
            i.id === product.id &&
            i.selected_variant1 === selections.variant1 &&
            i.selected_variant2 === selections.variant2 &&
            i.selected_variant3 === selections.variant3
        );

        return item ? item.variant_total_stock > item.selected_quantity : true;
      },

      removeSelection: (cartItem) => {
        const cart = get().cart.filter(
          (i) =>
            !(
              i.id === cartItem.id &&
              (!cartItem.selected_variant1 || i.selected_variant1 === cartItem.selected_variant1) &&
              (!cartItem.selected_variant2 || i.selected_variant2 === cartItem.selected_variant2) &&
              (!cartItem.selected_variant3 || i.selected_variant3 === cartItem.selected_variant3)
            )
        );
        set({ cart });
      },

      increaseSelectionQuantity: (cartItem) => {
        const cart = [...get().cart];
        const item = cart.find(
          (i) =>
            i.id === cartItem.id &&
            (!cartItem.selected_variant1 || i.selected_variant1 === cartItem.selected_variant1) &&
            (!cartItem.selected_variant2 || i.selected_variant2 === cartItem.selected_variant2) &&
            (!cartItem.selected_variant3 || i.selected_variant3 === cartItem.selected_variant3)
        );

        if (item && item.selected_quantity < (item.variant_total_stock || item.total_stock)) {
          item.selected_quantity += 1;
          item.itemTotal = item.variant_price * item.selected_quantity;
          set({ cart });
        }
      },

      decreaseSelectionQuantity: (cartItem) => {
        const cart = [...get().cart];
        const item = cart.find(
          (i) =>
            i.id === cartItem.id &&
            (!cartItem.selected_variant1 || i.selected_variant1 === cartItem.selected_variant1) &&
            (!cartItem.selected_variant2 || i.selected_variant2 === cartItem.selected_variant2) &&
            (!cartItem.selected_variant3 || i.selected_variant3 === cartItem.selected_variant3)
        );

        if (item && item.selected_quantity > 1) {
          item.selected_quantity -= 1;
          item.itemTotal = item.variant_price * item.selected_quantity;
          set({ cart });
        }
      },

      updateSelectionQuantity: (cartItem, quantity) => {
        const cart = [...get().cart];
        const item = cart.find(
          (i) =>
            i.id === cartItem.id &&
            (!cartItem.selected_variant1 || i.selected_variant1 === cartItem.selected_variant1) &&
            (!cartItem.selected_variant2 || i.selected_variant2 === cartItem.selected_variant2) &&
            (!cartItem.selected_variant3 || i.selected_variant3 === cartItem.selected_variant3)
        );

        if (item) {
          item.selected_quantity = Math.min(quantity, item.variant_total_stock);
          item.itemTotal = item.variant_price * item.selected_quantity;
          set({ cart });
        }
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cartStore',
      storage: asyncStorage,
    }
  )
);

export default useCartStore;
