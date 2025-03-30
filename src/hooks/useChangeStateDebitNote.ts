import { useMutation, useQueryClient } from "@tanstack/react-query";
import DebitServiceApi from "../config/api";

interface ChangeStateDebitNote {
  avisos: string[];
  estado_final: string;
  usuario_modificador: string;
}

const changeState = async (body: ChangeStateDebitNote) => {
  const { data } = await DebitServiceApi.put(
    "/debit-notice/change-state",
    body
  );
  return data;
};

export const useChangeStateDebitNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: ChangeStateDebitNote) => {
      const data = await changeState(body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          typeof query.queryKey[0] === "string" &&
          query.queryKey[0].startsWith("debit-notice"),
      });
    },
  });
};
