import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileSpreadsheet, Eye, Search, X, Filter, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { useLaporanPenjualan } from '@/hooks/reports/useLaporanPenjualan';
import { DataTable } from '@/components/shared/DataTable';
import { DateRangePicker } from '@/components/shared/DateRangePicker';
import { DataTableFacetedFilter } from '@/components/shared/DataTableFacetedFilter';
import { EditTransactionModal } from '@/components/report/EditTransactionModal';
import { ConfirmModal } from '@/components/shared/ConfirmModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

export const Route = createFileRoute('/_protected/dashboard/pelaporan/')({
    component: LaporanPenjualanPage,
});

function LaporanPenjualanPage() {
    const {
        reportData, isLoading, isError,
        detailData,
        dateRange, isDetailOpen, setIsDetailOpen,
        handleOpenDetail, handleExportExcel, setDateRange,
        selectedCabang, setSelectedCabang, cabangOptions,
        selectedTipe, setSelectedTipe, tipeOptions,
        selectedPembayaran, setSelectedPembayaran, pembayaranOptions,
        handleResetFilters,
        isFiltered,
        isEditOpen, setIsEditOpen,
        isDeleteOpen, setIsDeleteOpen,
        transactionAction,
        handleOpenEdit,
        handleOpenDelete,
        handleConfirmDelete,
        isDeleting,
        selectedRowNumber
    } = useLaporanPenjualan();

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <CardTitle>Laporan Penjualan</CardTitle>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="text-sm whitespace-nowrap">
                            Pilih Rentang Tanggal:
                        </span>
                        <DateRangePicker 
                            date={dateRange}
                            setDate={setDateRange}
                        />

                        <Button onClick={handleExportExcel} className="bg-green-600 hover:bg-green-700 text-white">
                            <FileSpreadsheet className="w-4 h-4 mr-2" />
                            Export Excel
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="flex flex-col gap-3 p-4 bg-slate-50 border rounded-md">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                            <Filter className="w-4 h-4" />
                            Filter Data:
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <DataTableFacetedFilter
                                title="Cabang"
                                options={cabangOptions}
                                selectedValues={selectedCabang}
                                setSelectedValues={setSelectedCabang}
                            />
                            <DataTableFacetedFilter
                                title="Tipe Penjualan"
                                options={tipeOptions}
                                selectedValues={selectedTipe}
                                setSelectedValues={setSelectedTipe}
                            />
                            <DataTableFacetedFilter
                                title="Metode Pembayaran"
                                options={pembayaranOptions}
                                selectedValues={selectedPembayaran}
                                setSelectedValues={setSelectedPembayaran}
                            />
                        </div>

                        {isFiltered && (
                            <div className="pt-1">
                                <Button
                                    variant="ghost"
                                    onClick={handleResetFilters}
                                    className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 -ml-2"
                                >
                                    <X className="mr-2 h-4 w-4" />
                                    Reset Filter
                                </Button>
                            </div>
                        )}
                    </div>

                    <DataTable
                        columns={[
                            { header: "Tanggal", accessorKey: "tanggal_beli" },
                            { header: "Cabang", accessorKey: "nama_cabang" },
                            { header: "Pembeli", accessorKey: "nama_pembeli" },
                            { header: "No. Telp", accessorKey: "telp_pembeli" },
                            { header: "Tipe", accessorKey: "nama_tipe_penjualan" },
                            { header: "Pembayaran", accessorKey: "nama_pembayaran" },
                            { 
                                header: "Total", 
                                accessorKey: "total",
                                cell: (item) => (
                                    <span className="font-semibold text-green-700">
                                        Rp {parseFloat(item.total).toLocaleString('id-ID')}
                                    </span>
                                )
                            },
                            {
                                header: "Aksi",
                                accessorKey: "id_penjualan",
                                cell: (item) => (
                                    <div className="flex flex-col gap-2"> 
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="w-full justify-start h-auto py-1.5" 
                                            onClick={() => handleOpenDetail(item.id_penjualan)}
                                        >
                                            <Eye className="w-3.5 h-3.5 mr-2" /> Detail
                                        </Button>

                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="w-full justify-start h-auto py-1.5 border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                                            onClick={() => handleOpenEdit(item)}
                                        >
                                            <Pencil className="w-3.5 h-3.5 mr-2" /> Update
                                        </Button>

                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="w-full justify-start h-auto py-1.5 border-red-500 text-red-600 hover:bg-red-50"
                                            onClick={() => handleOpenDelete(item)}
                                        >
                                            <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
                                        </Button>
                                    </div>
                                )
                            }
                        ]}
                        data={reportData?.map(item => ({ ...item, value: item.id_penjualan }))}
                        isLoading={isLoading}
                        isError={isError}
                        emptyMessage="Tidak ada data yang sesuai filter."
                    />
                </CardContent>

            </Card>

            <EditTransactionModal
                isOpen={isEditOpen}
                onOpenChange={setIsEditOpen}
                transaction={transactionAction}
            />

            <ConfirmModal
                isOpen={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                onConfirm={handleConfirmDelete}
                title="Hapus Transaksi?"
                description={`Anda yakin ingin menghapus transaksi No. ${selectedRowNumber}? Data tidak dapat dikembalikan.`}
                confirmLabel="Ya, Hapus"
                variant="destructive"
                isLoading={isDeleting}
            />

            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Detail Item Transaksi</DialogTitle>
                    </DialogHeader>

                    <div className="border rounded-md mt-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Item</TableHead>
                                    <TableHead className="text-center">Satuan</TableHead>
                                    <TableHead className="text-center">Qty</TableHead>
                                    <TableHead className="text-right">Total Harga</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {detailData && detailData.length > 0 ? (
                                    detailData.map((item, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{item.nama_item}</TableCell>
                                            <TableCell className="text-center">{parseFloat(item.harga)}</TableCell>
                                            <TableCell className="text-center">{parseFloat(item.kuantitas)}</TableCell>
                                            <TableCell className="text-right font-medium">
                                                Rp {(parseFloat(item.harga) * parseFloat(item.kuantitas)).toLocaleString('id-ID')}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                                            Tidak ada detail item.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}