import axios, {AxiosError} from "axios";
import { AdvanceRequestData, ApiResponse } from "./interface/AdvanceRequest";

const api= axios.create({
    baseURL: "http://localhost:3000/api/advance-request"
})

export const AdvanceRequestApi = {
    getAll: async(numero_solicitud: null,page: number = 1, pageSize: number = 10):Promise<ApiResponse> =>{
        try {
            const response = await api.get(`/${numero_solicitud}/${page}/${pageSize}`);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            throw new Error(axiosError.message);
        }
    },

    getByNumber: async(numeroSolicitud:string):Promise<AdvanceRequestData> =>{
        try {
            const response = await api.get(`/${numeroSolicitud}`);
            if (!response.data) {
                throw new Error("No se encontraron datos en la respuesta");
            }
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            throw new Error(axiosError.message);
        }
    }
} 

