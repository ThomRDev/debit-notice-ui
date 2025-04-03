import { useMutation, useQuery } from "@tanstack/react-query";
import { SearchParams, useSearchStore } from "../store/useDebitNotices.store";
import DebitServiceApi, { DebitNoticeApi } from "../config/api";
import { DebitNoticeUpdateData } from "../config/interface/DeviceNotice";

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


export const usePutDebitNotice = () => {
  const { mutate, error } = useMutation({
    mutationFn: async (params: { id: number; data: DebitNoticeUpdateData }) =>
      DebitNoticeApi.put_aviso(params.id, params.data),
  });

  return { mutate, error };
};