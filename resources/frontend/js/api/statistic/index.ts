import axios from '@/lib/axios';
import { ApiResponseSuccess } from '@/types/api'; // Generic response wrapper
import { StatisticResponse } from '@/types/statistics/statistics';

export const getStatistics = async (): Promise<StatisticResponse> => {
    const response = await axios.get<ApiResponseSuccess<StatisticResponse>>('/statistic'); 
    return response.data.responseBody;
};