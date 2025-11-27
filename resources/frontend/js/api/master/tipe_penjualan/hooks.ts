import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
    getTipePenjualanList, 
    createTipePenjualan, 
    updateTipePenjualan, 
    deleteTipePenjualan 
} from './index';
import { CreateTipePenjualanPayload, UpdateTipePenjualanPayload, DeleteTipePenjualanPayload } from '@/types/master/tipe_penjualan/tipe-penjualan';

export const TIPE_PENJUALAN_KEYS = {
    all: ['tipe_penjualan'] as const,
    lists: () => [...TIPE_PENJUALAN_KEYS.all, 'list'] as const,
};

export const useGetTipePenjualan = () => {
    return useQuery({
        queryKey: TIPE_PENJUALAN_KEYS.lists(),
        queryFn: getTipePenjualanList,
    });
};

export const useCreateTipePenjualan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateTipePenjualanPayload) => createTipePenjualan(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TIPE_PENJUALAN_KEYS.lists() });
        },
    });
};

export const useUpdateTipePenjualan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: UpdateTipePenjualanPayload) => updateTipePenjualan(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TIPE_PENJUALAN_KEYS.lists() });
        },
    });
};

export const useDeleteTipePenjualan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: DeleteTipePenjualanPayload) => deleteTipePenjualan(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TIPE_PENJUALAN_KEYS.lists() });
        },
    });
};