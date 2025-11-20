import type { ApiResponseSuccess } from './api';

export interface DashboardData {
    nip: string;
    nama: string;
    aktif: boolean;
}

export type DashboardSuccessResponse = ApiResponseSuccess<DashboardData>;