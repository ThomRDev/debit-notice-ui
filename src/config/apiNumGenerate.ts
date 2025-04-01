import axios, {AxiosError} from "axios";

const api= axios.create({
    baseURL: "http://localhost:3000/api/debit-notice/create/number"
})

export const NumGenerateApi = {
    get: async():Promise<string> =>{
        try {
            const response = await api.get('/');
            return response.data.generar_numero_temporal;
        } catch (error) {
            const axiosError = error as AxiosError;
            throw new Error(axiosError.message);
        }
    }
} 
