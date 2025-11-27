export interface CabangItem {
    value: number;
    label: string;
}

export interface CreateCabangPayload {
    nama_cabang: string;
}

export interface UpdateCabangPayload {
    id_cabang: number;
    nama_cabang: string;
}

export interface DeleteCabangPayload {
    id_cabang: number;
}