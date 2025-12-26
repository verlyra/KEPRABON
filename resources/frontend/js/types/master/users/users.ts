export interface UserData {
    nip: string;
    nama: string;
    aktif: number;
}

export interface UserTableData extends UserData {
    value: string;
    status_label: string;
}

export interface CreateUserPayload {
    nip: string;
    nama: string;
    password: string;
    aktif: boolean;
}

export interface UpdateUserPayload {
    nip_old: string;
    nip_new: string;
    nama: string;
    password: string;
    aktif: boolean;
}

export interface DeleteUserPayload {
    nip: string;
}