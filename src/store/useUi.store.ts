import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface UIState {
  isShowEditDebitNotice: boolean;
  toogleEditDebitNotice: VoidFunction;
  setIsShowEditDebitNotice: (isShowEditDebitNotice: boolean) => void;
}

export const useUI = create<UIState>()(
  devtools((set) => ({
    isShowEditDebitNotice: false,
    toogleEditDebitNotice: () =>
      set((state) => ({ isShowEditDebitNotice: !state.isShowEditDebitNotice })),
    setIsShowEditDebitNotice: (isShowEditDebitNotice: boolean) =>
      set({ isShowEditDebitNotice }),
  }))
);
