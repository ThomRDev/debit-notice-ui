import { create } from "zustand";

interface ModalStore {
  modals: { id: string; content: (close: () => void) => React.ReactNode }[];
  openModal: (
    id: string,
    content: (close: () => void) => React.ReactNode
  ) => void;
  closeModal: (id: string) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modals: [],
  openModal: (id, content) =>
    set((state) => ({ modals: [...state.modals, { id, content }] })),
  closeModal: (id) =>
    set((state) => ({
      modals: state.modals.filter((modal) => modal.id !== id),
    })),
}));

export default useModalStore;
