import axios, { AxiosError } from "axios";
import {
  DebitNoticeUpdateData,
  DeviceNoticeData,
  DeviceNoticeDetailData,
} from "./interface/DeviceNotice";

const DebitServiceApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const DebitNoticeApi = {
  create: async (
    bodyDebit: DeviceNoticeData,
    bodyDebitDetail: DeviceNoticeDetailData[]
  ): Promise<Array<object>> => {
    try {
      const response = await DebitServiceApi.post("/debit-notice/create", {
        bodyDebit,
        bodyDebitDetail,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message);
    }
  },
  put_aviso: async (
    id:number,
    bodyDebitUpdate: DebitNoticeUpdateData
  ): Promise<string> => {
    try {
      const response = await DebitServiceApi.put(`/debit-notice/update/${id}`,bodyDebitUpdate);
      return response.data.resultado;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message);
    }
  },
};

export default DebitServiceApi;
