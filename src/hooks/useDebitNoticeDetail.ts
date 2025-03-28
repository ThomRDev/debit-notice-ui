import { useQuery } from "@tanstack/react-query";
import DebitServiceApi from "../config/api";

export const useDebitNoticeDetail = ({ nAviso }: { nAviso: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["debit-notice-detail", nAviso],
    queryFn: async () => {
      const response = await DebitServiceApi.get(`/debit-notice/${nAviso}`);
      return response.data;
    },
    staleTime: 10000,
  });

  return { data, isLoading, error };
};
