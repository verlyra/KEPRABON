import axios from '@/lib/axios';
import { ApiResponseSuccess } from '@/types/api';
import { TransactionFormResource, StoreTransactionPayload } from '@/types/transactions/penjualan';

export const getTransactionFormData = async (): Promise<TransactionFormResource> => {
    const response = await axios.get<ApiResponseSuccess<TransactionFormResource>>('/transaction/form');
    return response.data.responseBody;
};

export const storeTransaction = async (payload: StoreTransactionPayload): Promise<boolean> => {
    const response = await axios.post<ApiResponseSuccess<boolean>>('/transaction/store', payload);
    return response.data.responseBody;
};