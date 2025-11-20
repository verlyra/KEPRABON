import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '.';
import type { DashboardData } from '@/types';

export const useDashboardData = () => {
    return useQuery<DashboardData, Error>({ 
        queryKey: ['dashboardData'],
        queryFn: getDashboardData,
        retry: 1
    });
};