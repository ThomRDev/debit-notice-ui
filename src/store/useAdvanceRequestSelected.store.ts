import { create } from 'zustand';
import { AdvanceRequestData } from '../config/interface/AdvanceRequest';
import {DeviceNoticeDetailData} from '../config/interface/DeviceNotice'

interface AdvanceRequestSelected {
  selectedAdvances: AdvanceRequestData[];
  details: DeviceNoticeDetailData[];
  addSelectedAdvance: (advance: AdvanceRequestData) => void;
  removeSelectedAdvance: (id: string) => void;
  isSelected: (id: string) => boolean;
  addDetail: (detail: DeviceNoticeDetailData) => void;
  clear:VoidFunction
}

export const useAdvanceRequestSelected = create<AdvanceRequestSelected>((set,get) => ({
  selectedAdvances: [],
  details: [],
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
    },
  addDetail: (detail) => set((state) => ({
      details: [...state.details, { ...detail, id: (state.details.length + 1).toString() }]
    })),
  clear: ()=> set(() =>({
    selectedAdvances: [],
    details: [],
  }))
}));