import { useState } from 'react';
import { toast } from '@/lib/swal';
import { 
    useGetItems, 
    useCreateItem, 
    useUpdateItem, 
    useDeleteItem 
} from '@/api/master/items/hooks';
import { ItemTableData } from '@/types/master/items/items';

export const useMasterItems = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
    const [selectedItem, setSelectedItem] = useState<ItemTableData | null>(null);
    
    const [formData, setFormData] = useState({ 
        nama_item: '', 
        harga_item: '' 
    });
    
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<ItemTableData | null>(null);

    const query = useGetItems();
    const createMutation = useCreateItem();
    const updateMutation = useUpdateItem();
    const deleteMutation = useDeleteItem();

    const isSubmitting = createMutation.isPending || updateMutation.isPending;
    const isDeleting = deleteMutation.isPending;

    const handleOpenCreate = () => {
        setDialogMode('create');
        setSelectedItem(null);
        setFormData({ nama_item: '', harga_item: '' });
        setIsDialogOpen(true);
    };

    const handleOpenEdit = (item: ItemTableData) => {
        setDialogMode('edit');
        setSelectedItem(item);
        setFormData({ 
            nama_item: item.nama, 
            harga_item: item.harga 
        });
        setIsDialogOpen(true);
    };

    const handleFormChange = (key: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payloadHarga = parseFloat(formData.harga_item);

            if (dialogMode === 'create') {
                await createMutation.mutateAsync({ 
                    nama_item: formData.nama_item,
                    harga_item: payloadHarga
                });
                toast.success('Item berhasil ditambahkan');
            } else {
                if (selectedItem) {
                    await updateMutation.mutateAsync({ 
                        id_item: selectedItem.id,
                        nama_item: formData.nama_item,
                        harga_item: payloadHarga 
                    });
                    toast.success('Item berhasil diperbarui');
                }
            }
            setIsDialogOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('Gagal menyimpan item');
        }
    };

    const handleOpenDeleteModal = (item: ItemTableData) => {
        setItemToDelete(item);
        setIsDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            await deleteMutation.mutateAsync({ id_item: itemToDelete.id });
            toast.success('Item telah dihapus.');
            setIsDeleteOpen(false);
            setItemToDelete(null);
        } catch (error) {
            console.error(error);
            toast.error('Gagal menghapus item.');
        }
    };

    return {
        itemsList: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        isSubmitting,
        isDeleting,
        isDialogOpen, setIsDialogOpen,
        dialogMode,
        formData, handleFormChange,
        isDeleteOpen, setIsDeleteOpen, itemToDelete,
        handleOpenCreate, handleOpenEdit,
        handleSubmit, handleOpenDeleteModal, handleConfirmDelete
    };
};