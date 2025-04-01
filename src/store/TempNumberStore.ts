import { create } from "zustand";


interface TempNumberStore {
  tempNumber: string ;
  setTempNumber: (number: string) => void;
}

const useTempNumberStore = create<TempNumberStore>((set) => ({
  tempNumber: '',
  setTempNumber: (number: string) => set({ tempNumber: number })
}));

export default useTempNumberStore;