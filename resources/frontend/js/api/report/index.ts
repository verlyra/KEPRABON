import axios from '@/lib/axios';
import { ApiResponseSuccess } from '@/types/api';
import { 
    TransactionReportItem, 
    TransactionDetailItem, 
    ReportFilterPayload,
    DetailPayload 
} from '@/types/reports/penjualan';

export const getTransactionList = async (payload: ReportFilterPayload): Promise<TransactionReportItem[]> => {
    const response = await axios.get<ApiResponseSuccess<TransactionReportItem[]>>('/transaction/list', {params: payload});
    return response.data.responseBody;
};

export const getTransactionDetail = async (payload: DetailPayload): Promise<TransactionDetailItem[]> => {
    const response = await axios.get<ApiResponseSuccess<TransactionDetailItem[]>>('/transaction/detail', {params: payload});
    return response.data.responseBody;
};