import api from '@/lib/axios';
import type { ApiResponseError, ApiResponseSuccess } from '@/types/api';
import type { LoginCredentials } from '@/types/auth';
import { User } from '@/types/user';

export const login = async (credentials: LoginCredentials) => {
    try {
        const { data } = await api.post<ApiResponseSuccess<User> | ApiResponseError>(
            '/auth/login',
            credentials
        );

        if (!data.responseStatus) {
            throw new Error(data.responseMessage);
        }

        return data.responseBody;
    } catch (err: any) {
        const message = err.response?.data?.responseMessage || err.message || 'Terjadi kesalahan saat login.';
        throw new Error(message);
    }
};

export const logout = async () => {
    const { data } = await api.post('/logout');
    return data;
};