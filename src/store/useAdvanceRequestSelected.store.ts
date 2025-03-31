import { create } from 'zustand';
import { AdvanceRequestData } from '../config/interface/AdvanceRequest';

interface AdvanceRequestSelected {
  selectedAdvances: AdvanceRequestData[];
  addSelectedAdvance: (advance: AdvanceRequestData) => void;
  removeSelectedAdvance: (id: string) => void;
  isSelected: (id: string) => boolean;
}

export const useAdvanceRequestSelected = create<AdvanceRequestSelected>((set,get) => ({
  selectedAdvances: [],
  addSelectedAdvance: (advance) => 
    set((state) => ({
      selectedAdvances: [...state.selectedAdvances, advance]
    })),
  removeSelectedAdvance: (id) => 
    set((state) => ({
      selectedAdvances: state.selectedAdvances.filter(a => a.id !== id)
    })),
    isSelected: (id: string) => {
      const currentState = get();
      return currentState.selectedAdvances.some((a: AdvanceRequestData) => a.id === id);
    }
}));