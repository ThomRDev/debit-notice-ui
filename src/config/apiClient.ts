import axios, {AxiosError} from "axios";
import { ClientDataResponse } from "./interface/DeviceNotice";

const api= axios.create({
    baseURL: "http://localhost:3000/api/client"
})

export const ClientApi = {
    getAll: async():Promise<ClientDataResponse[]> =>{
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            throw new Error(axiosError.message);
        }
    }
} 
