import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { useMasterCabang } from '@/hooks/master/useMasterCabang';
import { DataTable } from '@/components/shared/DataTable';
import { ConfirmModal } from '@/components/shared/ConfirmModal';
import { PageHeader } from '@/components/shared/PageHeader';
import { FormModal } from '@/components/shared/FormModal';

export const Route = createFileRoute('/_protected/dashboard/master/cabang/')({
    component: MasterCabangPage,
});

function MasterCabangPage() {
    const {
        cabangList,
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
    } = useMasterCabang();

    return (
        <div className="p-6 space-y-6">
            <Card>
                <PageHeader title="Master Cabang" onAdd={handleOpenCreate} />

                <CardContent>
                    <DataTable
                        columns={[{ header: "Nama Cabang", accessorKey: "label" }]}
                        data={cabangList}
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
                title={dialogMode === 'create' ? 'Tambah Cabang' : 'Edit Cabang'}
                formData={formData}
                onFieldChange={handleFormChange}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                fields={[
                    { 
                        name: 'nama_cabang', 
                        label: 'Nama Cabang', 
                        placeholder: 'Contoh: Tunai, Transfer, dll',
                        required: true 
                    },
                ]}
            />

            <ConfirmModal 
                isOpen={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                onConfirm={handleConfirmDelete}
                title="Hapus Cabang?"
                description={`Apakah Anda yakin ingin menghapus "${itemToDelete?.label}"? Data yang dihapus tidak dapat dikembalikan.`}
                confirmLabel="Ya, Hapus"
                variant="destructive"
                isLoading={isDeleting}
            />
        </div>
    );
}