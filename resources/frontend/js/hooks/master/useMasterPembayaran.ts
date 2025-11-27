import { useState } from 'react';
import { toast } from '@/lib/swal';
import { 
    useGetPembayaran, 
    useCreatePembayaran, 
    useUpdatePembayaran, 
    useDeletePembayaran 
} from '@/api/master/pembayaran/hooks';
import { PembayaranItem } from '@/types/master/pembayaran/pembayaran';

export const useMasterPembayaran = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
    const [selectedItem, setSelectedItem] = useState<PembayaranItem | null>(null);
    const [formData, setFormData] = useState({ nama_pembayaran: '' });
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<PembayaranItem | null>(null);
    const query = useGetPembayaran();
    const createMutation = useCreatePembayaran();
    const updateMutation = useUpdatePembayaran();
    const deleteMutation = useDeletePembayaran();
    const isSubmitting = createMutation.isPending || updateMutation.isPending;
    const isDeleting = deleteMutation.isPending;

    const handleOpenCreate = () => {
        setDialogMode('create');
        setSelectedItem(null);
        setFormData({ nama_pembayaran: '' });
        setIsDialogOpen(true);
    };

    const handleOpenEdit = (item: PembayaranItem) => {
        setDialogMode('edit');
        setSelectedItem(item);
        setFormData({ nama_pembayaran: item.label });
        setIsDialogOpen(true);
    };

    const handleFormChange = (key: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (dialogMode === 'create') {
                await createMutation.mutateAsync({ 
                    nama_pembayaran: formData.nama_pembayaran 
                });
                toast.success('Data berhasil ditambahkan');
            } else {
                if (selectedItem) {
                    await updateMutation.mutateAsync({ 
                        id_pembayaran: selectedItem.value,
                        nama_pembayaran: formData.nama_pembayaran 
                    });
                    toast.success('Data berhasil diperbarui');
                }
            }
            setIsDialogOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('Terjadi kesalahan saat menyimpan data');
        }
    };

    const handleOpenDeleteModal = (item: PembayaranItem) => {
        setItemToDelete(item);
        setIsDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            await deleteMutation.mutateAsync({ id_pembayaran: itemToDelete.value });
            toast.success('Data telah dihapus.');
            setIsDeleteOpen(false);
            setItemToDelete(null);
        } catch (error) {
            console.error(error);
            toast.error('Gagal menghapus data.');
        }
    };

    return {
        pembayaranList: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        isSubmitting,
        isDialogOpen,
        setIsDialogOpen,
        dialogMode,
        formData,
        isDeleting,
        isDeleteOpen,
        setIsDeleteOpen,
        itemToDelete,
        handleOpenCreate,
        handleOpenEdit,
        handleFormChange,
        handleSubmit,
        handleOpenDeleteModal,
        handleConfirmDelete,  
    };
};