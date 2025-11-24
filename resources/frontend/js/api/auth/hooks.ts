import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { login, logout } from '.';

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation({
    mutationFn: login,
    onSuccess: () => {
        navigate({ to: '/dashboard' });
    },
    });
};

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
        queryClient.clear();
        navigate({ to: '/' });
        },
    });
};