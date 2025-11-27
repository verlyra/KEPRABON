export interface TipePenjualanItem {
    value: number;
    label: string;
}

export interface CreateTipePenjualanPayload {
    nama_tipe_penjualan: string;
}

export interface UpdateTipePenjualanPayload {
    id_tipe_penjualan: number;
    nama_tipe_penjualan: string;
}

export interface DeleteTipePenjualanPayload {
    id_tipe_penjualan: number;
}