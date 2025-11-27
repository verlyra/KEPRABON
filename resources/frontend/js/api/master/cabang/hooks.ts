import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
    getCabangList, 
    createCabang, 
    updateCabang, 
    deleteCabang 
} from './index';
import { CreateCabangPayload, UpdateCabangPayload, DeleteCabangPayload } from '@/types/master/cabang/cabang';

export const CABANG_KEYS = {
    all: ['cabang'] as const,
    lists: () => [...CABANG_KEYS.all, 'list'] as const,
};

export const useGetCabang = () => {
    return useQuery({
        queryKey: CABANG_KEYS.lists(),
        queryFn: getCabangList,
    });
};

export const useCreateCabang = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateCabangPayload) => createCabang(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CABANG_KEYS.lists() });
        },
    });
};

export const useUpdateCabang = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: UpdateCabangPayload) => updateCabang(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CABANG_KEYS.lists() });
        },
    });
};

export const useDeleteCabang = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: DeleteCabangPayload) => deleteCabang(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CABANG_KEYS.lists() });
        },
    });
};