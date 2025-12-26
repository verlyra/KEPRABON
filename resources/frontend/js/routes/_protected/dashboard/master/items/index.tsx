import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { useMasterItems } from '@/hooks/master/useMasterItems';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { FormModal } from '@/components/shared/FormModal';
import { ConfirmModal } from '@/components/shared/ConfirmModal';

export const Route = createFileRoute('/_protected/dashboard/master/items/')({
    component: MasterItemsPage,
});

function MasterItemsPage() {
    const {
        itemsList, isLoading, isError,
        isSubmitting, isDeleting,
        isDialogOpen, setIsDialogOpen, dialogMode,
        formData, handleFormChange, handleSubmit,
        isDeleteOpen, setIsDeleteOpen, itemToDelete,
        handleOpenCreate, handleOpenEdit, 
        handleOpenDeleteModal, handleConfirmDelete
    } = useMasterItems();

    return (
        <div className="p-6 space-y-6">
            <Card>
                <PageHeader 
                    title="Master Items" 
                    onAdd={handleOpenCreate} 
                />

                <CardContent>
                    <DataTable
                        columns={[
                            { header: "Nama Item", accessorKey: "nama" },
                            { header: "Harga", accessorKey: "formatted_harga" }
                        ]}
                        data={itemsList}
                        isLoading={isLoading}
                        isError={isError}
                        onEdit={handleOpenEdit}
                        onDelete={handleOpenDeleteModal}
                    />
                </CardContent>
            </Card>

            <FormModal
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title={dialogMode === 'create' ? 'Tambah Item' : 'Edit Item'}
                formData={formData}
                onFieldChange={handleFormChange}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                fields={[
                    { 
                        name: 'nama_item', 
                        label: 'Nama Item', 
                        placeholder: 'Contoh: Ayam Goreng', 
                        required: true 
                    },
                    { 
                        name: 'harga_item', 
                        label: 'Harga (Rp)', 
                        type: 'number',
                        placeholder: 'Contoh: 15000', 
                        required: true 
                    }
                ]}
            />

            <ConfirmModal 
                isOpen={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                onConfirm={handleConfirmDelete}
                title="Hapus Item?"
                description={`Apakah Anda yakin ingin menghapus "${itemToDelete?.nama}"?`}
                confirmLabel="Ya, Hapus"
                variant="destructive"
                isLoading={isDeleting}
            />
        </div>
    );
}