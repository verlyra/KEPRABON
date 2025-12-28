export interface ReportFilterPayload {
    start_date: string;
    end_date: string;  
}

export interface TransactionReportItem {
    id_penjualan: number;
    id_cabang: number;
    nama_cabang: string;
    id_tipe_penjualan: number;
    nama_tipe_penjualan: string;
    id_pembayaran: number;
    nama_pembayaran: string;
    tanggal_beli: string;
    nama_pembeli: string | null;
    telp_pembeli: string | null;
    total: string;
}

export interface TransactionDetailItem {
    id_item: number;
    nama_item: string;
    kuantitas: string;
    harga: string;
}

export interface DetailPayload {
    id: number;
}