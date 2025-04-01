import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DeviceNoticeData } from "../config/interface/DeviceNotice";

export const useDebitNoticeStore = create(
    devtools(
      persist<{
        formData: DeviceNoticeData;
        updateFormData: (data: Partial<DeviceNoticeData>) => void;
        resetFormData: () => void;
      }>(
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
        }),
        {
          name: "debit-notice-form-storage",
        }
      )
    )
  );