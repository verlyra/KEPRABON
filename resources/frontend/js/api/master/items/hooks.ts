import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getItemsList, createItem, updateItem, deleteItem } from './index';
import { 
    CreateItemPayload, 
    UpdateItemPayload, 
    DeleteItemPayload,
    ItemTableData 
} from '@/types/master/items/items';

export const ITEMS_KEYS = {
    all: ['master', 'items'] as const,
    lists: () => [...ITEMS_KEYS.all, 'list'] as const,
};

export const useGetItems = () => {
    return useQuery({
        queryKey: ITEMS_KEYS.lists(),
        queryFn: getItemsList,
        select: (data): ItemTableData[] => data.map(item => ({
            ...item,
            value: item.id,
            formatted_harga: new Intl.NumberFormat('id-ID', {
                style: 'currency', 
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(parseFloat(item.harga))
        })),
    });
};

export const useCreateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateItemPayload) => createItem(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ITEMS_KEYS.lists() });
        },
    });
};

export const useUpdateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: UpdateItemPayload) => updateItem(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ITEMS_KEYS.lists() });
        },
    });
};

export const useDeleteItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: DeleteItemPayload) => deleteItem(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ITEMS_KEYS.lists() });
        },
    });
};