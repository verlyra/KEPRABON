import { useState } from 'react';
import { toast } from '@/lib/swal';
import { 
    useGetUsers, useCreateUser, useUpdateUser, useDeleteUser 
} from '@/api/master/users/hooks';
import { UserTableData } from '@/types/master/users/users';

export const useMasterUsers = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
    const [selectedItem, setSelectedItem] = useState<UserTableData | null>(null);
    
    const [formData, setFormData] = useState({ 
        nip: '', 
        nama: '', 
        password: '',
        aktif: '1' 
    });
    
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<UserTableData | null>(null);

    const query = useGetUsers();
    const createMutation = useCreateUser();
    const updateMutation = useUpdateUser();
    const deleteMutation = useDeleteUser();

    const isSubmitting = createMutation.isPending || updateMutation.isPending;
    const isDeleting = deleteMutation.isPending;

    const handleOpenCreate = () => {
        setDialogMode('create');
        setSelectedItem(null);
        setFormData({ nip: '', nama: '', password: '', aktif: '1' });
        setIsDialogOpen(true);
    };

    const handleOpenEdit = (item: UserTableData) => {
        setDialogMode('edit');
        setSelectedItem(item);
        setFormData({ 
            nip: item.nip, 
            nama: item.nama, 
            password: '',
            aktif: String(item.aktif)
        });
        setIsDialogOpen(true);
    };

    const handleFormChange = (key: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payloadAktif = formData.aktif === '1';

            if (dialogMode === 'create') {
                await createMutation.mutateAsync({ 
                    nip: formData.nip,
                    nama: formData.nama,
                    password: formData.password,
                    aktif: payloadAktif
                });
                toast.success('User berhasil ditambahkan');
            } else {
                if (selectedItem) {
                    if (!formData.password) {
                        toast.error('Password wajib diisi untuk update data.');
                        return;
                    }

                    await updateMutation.mutateAsync({ 
                        nip_old: selectedItem.nip,
                        nip_new: formData.nip,    
                        nama: formData.nama,
                        password: formData.password,
                        aktif: payloadAktif
                    });
                    toast.success('User berhasil diperbarui');
                }
            }
            setIsDialogOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('Gagal menyimpan data user');
        }
    };

    const handleOpenDeleteModal = (item: UserTableData) => {
        setItemToDelete(item);
        setIsDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            await deleteMutation.mutateAsync({ nip: itemToDelete.nip });
            toast.success('User telah dihapus.');
            setIsDeleteOpen(false);
            setItemToDelete(null);
        } catch (error) {
            console.error(error);
            toast.error('Gagal menghapus user.');
        }
    };

    return {
        usersList: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        isSubmitting, isDeleting,
        isDialogOpen, setIsDialogOpen, dialogMode,
        formData, handleFormChange, handleSubmit,
        isDeleteOpen, setIsDeleteOpen, itemToDelete,
        handleOpenCreate, handleOpenEdit, 
        handleOpenDeleteModal, handleConfirmDelete
    };
};