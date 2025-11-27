import axios from '@/lib/axios';
import { ApiResponseSuccess } from '@/types/api';
import { 
    CabangItem, 
    CreateCabangPayload, 
    UpdateCabangPayload, 
    DeleteCabangPayload 
} from '@/types/master/cabang/cabang';

export const getCabangList = async (): Promise<CabangItem[]> => {
    const response = await axios.get<ApiResponseSuccess<CabangItem[]>>('/master/cabang/list');
    return response.data.responseBody;
};

export const createCabang = async (payload: CreateCabangPayload): Promise<boolean> => {
    const response = await axios.post<ApiResponseSuccess<boolean>>('/master/cabang/store', payload);
    return response.data.responseBody;
};

export const updateCabang = async (payload: UpdateCabangPayload): Promise<boolean> => {
    const response = await axios.put<ApiResponseSuccess<boolean>>('/master/cabang/update', payload);
    return response.data.responseBody;
};

export const deleteCabang = async (payload: DeleteCabangPayload): Promise<boolean> => {
    const response = await axios.delete<ApiResponseSuccess<boolean>>('/master/cabang/delete', { data: payload});
    return response.data.responseBody;
};