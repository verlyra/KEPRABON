import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { useMasterTipePenjualan } from '@/hooks/master/useMasterTipePenjualan';
import { DataTable } from '@/components/shared/DataTable';
import { ConfirmModal } from '@/components/shared/ConfirmModal';
import { PageHeader } from '@/components/shared/PageHeader';
import { FormModal } from '@/components/shared/FormModal';

export const Route = createFileRoute('/_protected/dashboard/master/tipe-penjualan/')({
    component: MasterTipePenjualanPage,
});

function MasterTipePenjualanPage() {
    const {
        tipePenjualanList,
        isLoading,
        isError,
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
        handleConfirmDelete
    } = useMasterTipePenjualan();

    return (
        <div className="p-6 space-y-6">
            <Card>
                <PageHeader title="Master Tipe Penjualan" onAdd={handleOpenCreate} />

                <CardContent>
                    <DataTable
                        columns={[{ header: "Nama Tipe Penjualan", accessorKey: "label" }]}
                        data={tipePenjualanList}
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
                title={dialogMode === 'create' ? 'Tambah Tipe Penjualan' : 'Edit Tipe Penjualan'}
                formData={formData}
                onFieldChange={handleFormChange}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                fields={[
                    { 
                        name: 'nama_tipe_penjualan', 
                        label: 'Nama Tipe Penjualan', 
                        placeholder: 'Contoh: GoFood, Orderan',
                        required: true 
                    },
                ]}
            />

            <ConfirmModal 
                isOpen={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                onConfirm={handleConfirmDelete}
                title="Hapus Tipe Penjualan?"
                description={`Apakah Anda yakin ingin menghapus "${itemToDelete?.label}"? Data yang dihapus tidak dapat dikembalikan.`}
                confirmLabel="Ya, Hapus"
                variant="destructive"
                isLoading={isDeleting}
            />
        </div>
    );
}