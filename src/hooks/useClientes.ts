import { useQuery } from "@tanstack/react-query";
import DebitServiceApi from "../config/api";

async function getClientes(filter?: string | null) {
  const response = await DebitServiceApi.get("/client", {
    params: { filter },
  });
  return response.data;
}

export const useClientes = (filter?: string | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clientes", filter],
    queryFn: () => getClientes(filter),
  });
  return { data, isLoading, error };
};
