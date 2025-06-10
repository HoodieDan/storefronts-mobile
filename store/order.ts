import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StoreInfo, ShippingDetails } from '../lib/interfaces';
import useStoreInfo from './storeinfo';

interface OrderState {
  shippingDetails: ShippingDetails;
  updateShippingDetails: (details: Partial<ShippingDetails>) => void;
  resetShippingDetails: () => void;
  deliveryFee: () => number;
}

const asyncStorage: PersistStorage<OrderState> = {
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

const defaultDetails: ShippingDetails = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  shippingMethod: '',
  location: '',
  address: '',
};

const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      shippingDetails: { ...defaultDetails },

      updateShippingDetails: (details) =>
        set((state) => ({
          shippingDetails: { ...state.shippingDetails, ...details },
        })),

      resetShippingDetails: () => set({ shippingDetails: { ...defaultDetails } }),

      deliveryFee: () => {
        const { shippingDetails } = get();
        const { storeInfo } = useStoreInfo.getState();

        const prices = (storeInfo as StoreInfo)?.shipping_prices;

        if (!Array.isArray(prices) || prices.length === 0) return 0;

        const match = prices.find((area: any) => area.area === shippingDetails.location);
        return Number(match?.amount) || 0;
      },
    }),
    {
      name: 'orderStore',
      storage: asyncStorage,
    }
  )
);

export default useOrderStore;
