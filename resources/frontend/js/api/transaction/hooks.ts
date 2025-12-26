import { useQuery, useMutation } from '@tanstack/react-query';
import { getTransactionFormData, storeTransaction } from './index';
import { StoreTransactionPayload } from '@/types/transactions/penjualan';

export const TRANSACTION_KEYS = {
    form: ['transaction', 'form'] as const,
};

export const useGetTransactionForm = () => {
    return useQuery({
        queryKey: TRANSACTION_KEYS.form,
        queryFn: getTransactionFormData,
    });
};

export const useStoreTransaction = () => {
    return useMutation({
        mutationFn: (payload: StoreTransactionPayload) => storeTransaction(payload),
    });
};