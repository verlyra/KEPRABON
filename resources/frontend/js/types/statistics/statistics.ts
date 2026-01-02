export interface ChartItem {
    label: string;
    value: string | number;
}

export interface ForecastingData {
    historical: ChartItem[];
    forecast: ChartItem[];
    mape: number;
    alpha: number;
}

export interface StatisticResponse {
    omset_penjualan: ChartItem[];
    transaksi_harian: ChartItem[];
    produk_terlaris: ChartItem[];
    performa_cabang: ChartItem[];
    forecasting_penjualan: ForecastingData;
}