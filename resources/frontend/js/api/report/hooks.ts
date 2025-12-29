import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTransactionList, getTransactionDetail, updateTransaction, deleteTransaction } from './index';
import { ReportFilterPayload } from '@/types/reports/penjualan';

export const REPORT_KEYS = {
    sales: (filters: ReportFilterPayload) => ['report', 'sales', filters] as const,
    detail: (id: number | null) => ['report', 'detail', id] as const,
};

export const useGetTransactionList = (filters: ReportFilterPayload) => {
    return useQuery({
        queryKey: REPORT_KEYS.sales(filters),
        queryFn: () => getTransactionList(filters),
        placeholderData: (previousData) => previousData, 
    });
};

export const useGetTransactionDetail = (id: number | null, isOpen: boolean) => {
    return useQuery({
        queryKey: REPORT_KEYS.detail(id),
        queryFn: () => getTransactionDetail({ id: id! }),
        enabled: isOpen && id !== null,
    });
};

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['report', 'sales'] });
        },
    });
};

export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['report', 'sales'] });
        },
    });
};