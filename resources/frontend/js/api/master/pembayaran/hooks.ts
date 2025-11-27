import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
    getPembayaranList, 
    createPembayaran, 
    updatePembayaran, 
    deletePembayaran 
} from './index';
import { CreatePembayaranPayload, UpdatePembayaranPayload, DeletePembayaranPayload } from '@/types/master/pembayaran/pembayaran';

export const PEMBAYARAN_KEYS = {
    all: ['pembayaran'] as const,
    lists: () => [...PEMBAYARAN_KEYS.all, 'list'] as const,
};

export const useGetPembayaran = () => {
    return useQuery({
        queryKey: PEMBAYARAN_KEYS.lists(),
        queryFn: getPembayaranList,
    });
};

export const useCreatePembayaran = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreatePembayaranPayload) => createPembayaran(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PEMBAYARAN_KEYS.lists() });
        },
    });
};

export const useUpdatePembayaran = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: UpdatePembayaranPayload) => updatePembayaran(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PEMBAYARAN_KEYS.lists() });
        },
    });
};

export const useDeletePembayaran = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: DeletePembayaranPayload) => deletePembayaran(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PEMBAYARAN_KEYS.lists() });
        },
    });
};