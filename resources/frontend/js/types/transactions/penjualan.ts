export interface ItemResource {
    id: number;
    nama: string;
    harga: string;
}

export interface CartItem extends ItemResource {
    qty: number;
    subtotal: number;
    transactionPrice: number; 
}

export interface OptionResource {
    value: number;
    label: string;
}

export interface TransactionFormResource {
    items: ItemResource[];
    tipe_penjualan: OptionResource[];
    pembayaran: OptionResource[];
    cabang: OptionResource[];
}

export interface TransactionItemPayload {
    id_item: string;
    kuantitas: string;
    harga: string;
}

export interface StoreTransactionPayload {
    id_cabang: number;
    id_tipe_penjualan: number;
    id_pembayaran: number;
    tanggal_beli: string;
    nama_pembeli: string | null;
    telp_pembeli: string | null;
    items: {
        id_item: number;
        kuantitas: number;
        harga: number;
    }[];
}