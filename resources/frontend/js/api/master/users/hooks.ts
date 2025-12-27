import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsersList, createUser, updateUser, deleteUser } from './index';
import { 
    CreateUserPayload, UpdateUserPayload, DeleteUserPayload, UserTableData 
} from '@/types/master/users/users';

export const USERS_KEYS = {
    all: ['master', 'users'] as const,
    lists: () => [...USERS_KEYS.all, 'list'] as const,
};

export const useGetUsers = () => {
    return useQuery({
        queryKey: USERS_KEYS.lists(),
        queryFn: getUsersList,
        select: (data): UserTableData[] => data.map(user => ({
            ...user,
            value: user.nip,
            // status_label: user.aktif === 1 ? 'Aktif' : 'Tidak Aktif'
        })),
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateUserPayload) => createUser(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USERS_KEYS.lists() });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: UpdateUserPayload) => updateUser(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USERS_KEYS.lists() });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: DeleteUserPayload) => deleteUser(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USERS_KEYS.lists() });
        },
    });
};