export interface PembayaranItem {
    value: number;
    label: string;
}

export interface CreatePembayaranPayload {
    nama_pembayaran: string;
}

export interface UpdatePembayaranPayload {
    id_pembayaran: number;
    nama_pembayaran: string;
}

export interface DeletePembayaranPayload {
    id_pembayaran: number;
}