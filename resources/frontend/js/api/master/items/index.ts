import axios from '@/lib/axios';
import { ApiResponseSuccess } from '@/types/api';
import { 
    ItemData, 
    CreateItemPayload, 
    UpdateItemPayload, 
    DeleteItemPayload 
} from '@/types/master/items/items';

export const getItemsList = async (): Promise<ItemData[]> => {
    const response = await axios.get<ApiResponseSuccess<ItemData[]>>('/master/items/list');
    return response.data.responseBody;
};

export const createItem = async (payload: CreateItemPayload): Promise<boolean> => {
    const response = await axios.post<ApiResponseSuccess<boolean>>('/master/items/store', payload);
    return response.data.responseBody;
};

export const updateItem = async (payload: UpdateItemPayload): Promise<boolean> => {
    const response = await axios.put<ApiResponseSuccess<boolean>>('/master/items/update', payload);
    return response.data.responseBody;
};

export const deleteItem = async (payload: DeleteItemPayload): Promise<boolean> => {
    const response = await axios.delete<ApiResponseSuccess<boolean>>('/master/items/delete', { data:payload });
    return response.data.responseBody;
};