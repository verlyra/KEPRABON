import axios from '@/lib/axios';
import { ApiResponseSuccess } from '@/types/api';
import { 
    TipePenjualanItem, 
    CreateTipePenjualanPayload, 
    UpdateTipePenjualanPayload, 
    DeleteTipePenjualanPayload
} from '@/types/master/tipe_penjualan/tipe-penjualan';

export const getTipePenjualanList = async (): Promise<TipePenjualanItem[]> => {
    const response = await axios.get<ApiResponseSuccess<TipePenjualanItem[]>>('/master/tipe-penjualan/list');
    return response.data.responseBody;
};

export const createTipePenjualan = async (payload: CreateTipePenjualanPayload): Promise<boolean> => {
    const response = await axios.post<ApiResponseSuccess<boolean>>('/master/tipe-penjualan/store', payload);
    return response.data.responseBody;
};

export const updateTipePenjualan = async (payload: UpdateTipePenjualanPayload): Promise<boolean> => {
    const response = await axios.put<ApiResponseSuccess<boolean>>('/master/tipe-penjualan/update', payload);
    return response.data.responseBody;
};

export const deleteTipePenjualan = async (payload: DeleteTipePenjualanPayload): Promise<boolean> => {
    const response = await axios.delete<ApiResponseSuccess<boolean>>('/master/tipe-penjualan/delete', { data: payload});
    return response.data.responseBody;
};