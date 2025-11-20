import api from '@/lib/axios';
import type { DashboardSuccessResponse } from '@/types/dashboard';
import type { ApiResponseError } from '@/types/api';

export const getDashboardData = async (): Promise<DashboardSuccessResponse['responseBody']> => {
    try {
        const { data } = await api.get<DashboardSuccessResponse | ApiResponseError>('/dashboard');
        if (!data.responseStatus) {
        throw new Error(data.responseMessage);
        }
        return data.responseBody;
    } catch (err: any) {
        const message = err.response?.data?.message || err.message || 'Sesi Anda telah berakhir. Silakan login kembali.';
        throw new Error(message);
    }
};