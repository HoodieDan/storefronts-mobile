/* eslint-disable @typescript-eslint/no-empty-object-type */
import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StoreInfo } from '../lib/interfaces';

interface StoreInfoState {
  storeInfo: StoreInfo | {};
  updateStoreInfo: (info: StoreInfo) => void;
}

// Correct wrapper implementing PersistStorage
const asyncStorage: PersistStorage<StoreInfoState> = {
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

const useStoreInfo = create<StoreInfoState>()(
  persist(
    (set, get) => ({
      storeInfo: {},
      updateStoreInfo: (info: StoreInfo) => {
        set({ storeInfo: { ...get().storeInfo, ...info } });
      },
    }),
    {
      name: 'storeInfo',
      storage: asyncStorage,
    }
  )
);

export default useStoreInfo;
