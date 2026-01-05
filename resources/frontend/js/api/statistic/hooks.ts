import { useQuery } from '@tanstack/react-query';
import { getStatistics } from './index';

export const STATISTIC_KEYS = {
    all: ['statistic'] as const,
};

export const useGetStatistics = () => {
    return useQuery({
        queryKey: STATISTIC_KEYS.all,
        queryFn: getStatistics,
    });
};