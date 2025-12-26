export interface ItemData {
    id: number;
    nama: string;
    harga: string;
}

export interface ItemTableData extends ItemData {
    value: number; 
    formatted_harga: string;
}

export interface CreateItemPayload {
    nama_item: string;
    harga_item: number;
}

export interface UpdateItemPayload {
    id_item: number;
    nama_item: string;
    harga_item: number;
}

export interface DeleteItemPayload {
    id_item: number;
}