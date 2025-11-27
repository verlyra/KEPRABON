import { useState } from 'react';
import { toast } from '@/lib/swal';
import { 
    useGetTipePenjualan, 
    useCreateTipePenjualan, 
    useUpdateTipePenjualan, 
    useDeleteTipePenjualan 
} from '@/api/master/tipe_penjualan/hooks';
import { TipePenjualanItem } from '@/types/master/tipe_penjualan/tipe-penjualan';

export const useMasterTipePenjualan = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
    const [selectedItem, setSelectedItem] = useState<TipePenjualanItem | null>(null);
    const [formData, setFormData] = useState({ nama_tipe_penjualan: '' });
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<TipePenjualanItem | null>(null);
    const query = useGetTipePenjualan();
    const createMutation = useCreateTipePenjualan();
    const updateMutation = useUpdateTipePenjualan();
    const deleteMutation = useDeleteTipePenjualan();
    const isSubmitting = createMutation.isPending || updateMutation.isPending;
    const isDeleting = deleteMutation.isPending;

    const handleOpenCreate = () => {
        setDialogMode('create');
        setSelectedItem(null);
        setFormData({ nama_tipe_penjualan: '' });
        setIsDialogOpen(true);
    };

    const handleOpenEdit = (item: TipePenjualanItem) => {
        setDialogMode('edit');
        setSelectedItem(item);
        setFormData({ nama_tipe_penjualan: item.label });
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
                    nama_tipe_penjualan: formData.nama_tipe_penjualan 
                });
                toast.success('Data berhasil ditambahkan');
            } else {
                if (selectedItem) {
                    await updateMutation.mutateAsync({ 
                        id_tipe_penjualan: selectedItem.value,
                        nama_tipe_penjualan: formData.nama_tipe_penjualan 
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

    const handleOpenDeleteModal = (item: TipePenjualanItem) => {
        setItemToDelete(item);
        setIsDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            await deleteMutation.mutateAsync({ id_tipe_penjualan: itemToDelete.value });
            toast.success('Data telah dihapus.');
            setIsDeleteOpen(false);
            setItemToDelete(null);
        } catch (error) {
            console.error(error);
            toast.error('Gagal menghapus data.');
        }
    };

    return {
        tipePenjualanList: query.data,
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