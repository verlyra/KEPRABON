import { useState } from 'react';
import { toast } from '@/lib/swal';
import { 
    useGetCabang, 
    useCreateCabang, 
    useUpdateCabang, 
    useDeleteCabang 
} from '@/api/master/cabang/hooks';
import { CabangItem } from '@/types/master/cabang/cabang';

export const useMasterCabang = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
    const [selectedItem, setSelectedItem] = useState<CabangItem | null>(null);
    const [formData, setFormData] = useState({ nama_cabang: '' });
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<CabangItem | null>(null);
    const query = useGetCabang();
    const createMutation = useCreateCabang();
    const updateMutation = useUpdateCabang();
    const deleteMutation = useDeleteCabang();
    const isSubmitting = createMutation.isPending || updateMutation.isPending;
    const isDeleting = deleteMutation.isPending;

    const handleOpenCreate = () => {
        setDialogMode('create');
        setSelectedItem(null);
        setFormData({ nama_cabang: '' });
        setIsDialogOpen(true);
    };

    const handleOpenEdit = (item: CabangItem) => {
        setDialogMode('edit');
        setSelectedItem(item);
        setFormData({ nama_cabang: item.label });
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
                    nama_cabang: formData.nama_cabang 
                });
                toast.success('Data berhasil ditambahkan');
            } else {
                if (selectedItem) {
                    await updateMutation.mutateAsync({ 
                        id_cabang: selectedItem.value,
                        nama_cabang: formData.nama_cabang 
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

    const handleOpenDeleteModal = (item: CabangItem) => {
        setItemToDelete(item);
        setIsDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            await deleteMutation.mutateAsync({ id_cabang: itemToDelete.value });
            toast.success('Data telah dihapus.');
            setIsDeleteOpen(false);
            setItemToDelete(null);
        } catch (error) {
            console.error(error);
            toast.error('Gagal menghapus data.');
        }
    };

    return {
        cabangList: query.data,
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