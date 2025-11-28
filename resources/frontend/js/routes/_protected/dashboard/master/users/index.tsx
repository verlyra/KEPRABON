import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMasterUsers } from '@/hooks/master/useMasterUsers';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { FormModal } from '@/components/shared/FormModal';
import { ConfirmModal } from '@/components/shared/ConfirmModal';

export const Route = createFileRoute('/_protected/dashboard/master/users/')({
    component: MasterUsersPage,
});

function MasterUsersPage() {
    const {
        usersList, isLoading, isError,
        isSubmitting, isDeleting,
        isDialogOpen, setIsDialogOpen, dialogMode,
        formData, handleFormChange, handleSubmit,
        isDeleteOpen, setIsDeleteOpen, itemToDelete,
        handleOpenCreate, handleOpenEdit, 
        handleOpenDeleteModal, handleConfirmDelete
    } = useMasterUsers();

    return (
        <div className="p-6 space-y-6">
            <Card>
                <PageHeader 
                    title="Master Users" 
                    onAdd={handleOpenCreate} 
                    addButtonLabel="Tambah User"
                />

                <CardContent>
                    <DataTable
                        columns={[
                            { header: "NIP", accessorKey: "nip" },
                            { header: "Nama User", accessorKey: "nama" },
                            { 
                                header: "Status", 
                                accessorKey: "aktif",
                                cell: (item) => (
                                    <Badge variant={item.aktif === 1 ? 'default' : 'secondary'} className={item.aktif === 1 ? 'bg-green-500' : 'bg-red-800'}>
                                        {item.status_label}
                                    </Badge>
                                )
                            }
                        ]}
                        
                        data={usersList}
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
                title={dialogMode === 'create' ? 'Tambah User' : 'Edit User'}
                
                formData={formData}
                onFieldChange={handleFormChange}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}

                fields={[
                    { 
                        name: 'nip', 
                        label: 'NIP', 
                        placeholder: 'Nomor Induk Pegawai', 
                        required: true 
                    },
                    { 
                        name: 'nama', 
                        label: 'Nama Lengkap', 
                        placeholder: 'Contoh: Budi Santoso', 
                        required: true 
                    },
                    { 
                        name: 'password', 
                        label: 'Password', 
                        type: 'password',
                        placeholder: 'Minimal 6 karakter', 
                        required: true 
                    },
                    { 
                        name: 'aktif', 
                        label: 'Status Aktif', 
                        type: 'select',
                        options: [
                            { label: 'Aktif', value: '1' },
                            { label: 'Tidak Aktif', value: '0' }
                        ],
                        required: true 
                    }
                ]}
            />

            <ConfirmModal 
                isOpen={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                onConfirm={handleConfirmDelete}
                title="Hapus User?"
                description={`Apakah Anda yakin ingin menghapus user "${itemToDelete?.nama}" (NIP: ${itemToDelete?.nip})?`}
                confirmLabel="Ya, Hapus"
                variant="destructive"
                isLoading={isDeleting}
            />
        </div>
    );
}