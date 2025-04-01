import { create } from "zustand";
import { DeviceNoticeData } from "../config/interface/DeviceNotice";

interface Data {
  formData: DeviceNoticeData;
  updateFormData: (data: Partial<DeviceNoticeData>) => void;
  resetFormData: () => void;
}
export const useDebitNoticeStore = create<Data>(
      (
        (set) => ({
          formData: {
            fecha_emision: "",
            cliente: "",
            ruc: "",
            direccion: "",
            contacto: "",
            moneda: "",
            tipo_cambio_moneda: 0,
            condicion_pago: "",
            estado: "",
            observaciones: "",
          },
          updateFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
          resetFormData: () => set({ formData: { fecha_emision: "", cliente: "", ruc: "", direccion: "", contacto: "", moneda: "", tipo_cambio_moneda: 0, condicion_pago: "", estado: "", observaciones: "" } }),
        })
    )
  );