import { create } from "zustand";

interface DrawerStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useDrawerStore = create<DrawerStore>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));
