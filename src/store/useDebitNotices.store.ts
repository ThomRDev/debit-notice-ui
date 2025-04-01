import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface SearchParams {
  numero_aviso: string;
  estado: string;
  numero_sap: string;
  usuario_creador: string;
  fecha_servicio_desde: string;
  fecha_servicio_hasta: string;
  cliente: string;
  moneda: string;
  importe_desde: string;
  importe_hasta: string;
}

export const useSearchStore = create(
  devtools(
    persist<{
      searchParams: SearchParams;
      updateSearchParams: (params: Partial<SearchParams>) => void;
      resetSearchParams: () => void;
    }>(
      (set) => ({
        searchParams: {
          numero_aviso: "",
          estado: "Todos",
          numero_sap: "",
          usuario_creador: "",
          fecha_servicio_desde: "",
          fecha_servicio_hasta: "",
          moneda: "Todas",
          importe_desde: "0.00",
          importe_hasta: "0.00",
          cliente: "",
        },

        updateSearchParams: (params) =>
          set((state) => ({
            searchParams: { ...state.searchParams, ...params },
          })),

        resetSearchParams: () => {
          set({
            searchParams: {
              numero_aviso: "",
              estado: "Todos",
              numero_sap: "",
              usuario_creador: "",
              fecha_servicio_desde: "",
              fecha_servicio_hasta: "",
              moneda: "Todas",
              importe_desde: "0.00",
              importe_hasta: "0.00",
              cliente: "",
            },
          });
          localStorage.removeItem("search-params-storage");
        },
      }),
      {
        name: "search-params-storage",
      }
    )
  )
);
