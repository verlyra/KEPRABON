import axios from '@/lib/axios';
import { ApiResponseSuccess } from '@/types/api';
import { 
    PembayaranItem, 
    CreatePembayaranPayload, 
    UpdatePembayaranPayload, 
    DeletePembayaranPayload 
} from '@/types/master/pembayaran/pembayaran';

export const getPembayaranList = async (): Promise<PembayaranItem[]> => {
    const response = await axios.get<ApiResponseSuccess<PembayaranItem[]>>('/master/pembayaran/list');
    return response.data.responseBody;
};

export const createPembayaran = async (payload: CreatePembayaranPayload): Promise<boolean> => {
    const response = await axios.post<ApiResponseSuccess<boolean>>('/master/pembayaran/store', payload);
    return response.data.responseBody;
};

export const updatePembayaran = async (payload: UpdatePembayaranPayload): Promise<boolean> => {
    const response = await axios.put<ApiResponseSuccess<boolean>>('/master/pembayaran/update', payload);
    return response.data.responseBody;
};

export const deletePembayaran = async (payload: DeletePembayaranPayload): Promise<boolean> => {
    const response = await axios.delete<ApiResponseSuccess<boolean>>('/master/pembayaran/delete', { data: payload});
    return response.data.responseBody;
};