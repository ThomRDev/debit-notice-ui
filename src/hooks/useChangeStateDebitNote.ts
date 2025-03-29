import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import DebitServiceApi from "../config/api";

const changeState = async (body: {
  avisos: string[];
  estado_final: string;
  usuario_modificador: string;
}) => {
  const { data } = await DebitServiceApi.put(
    "/debit-notice/change-state",
    body
  );
  return data;
};

export const useChangeStateDebitNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeState,
    onSuccess: () => {
      toast.success("Estado cambiado con éxito");
      queryClient.invalidateQueries({
        predicate: (query) =>
          typeof query.queryKey[0] === "string" &&
          query.queryKey[0].startsWith("debit-notice"),
      });
    },
    onError: () => {
      toast.error("Error al cambiar estado");
    },
  });
};
