import { useQuery } from "@tanstack/react-query";
import { SearchParams, useSearchStore } from "../store/useDebitNotices.store";
import DebitServiceApi from "../config/api";

const buildQueryParams = (params: SearchParams): string => {
  const queryParams = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  );
  return queryParams.toString();
};

export const useDebitNotices = () => {
  const { searchParams } = useSearchStore();
  const queryParams = buildQueryParams(searchParams);
  const { data, isLoading, error } = useQuery({
    queryKey: ["debit-notice", queryParams],
    queryFn: async () => {
      const response = await DebitServiceApi.get(
        `/debit-notice?${queryParams}`
      );
      return response.data;
    },
    staleTime: 10000,
  });

  return { data, isLoading, error };
};
