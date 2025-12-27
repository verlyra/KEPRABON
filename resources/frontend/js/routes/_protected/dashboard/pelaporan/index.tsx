import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { FileSpreadsheet, Eye } from "lucide-react";
import { useLaporanPenjualan } from '@/hooks/reports/useLaporanPenjualan';
import { DataTable } from '@/components/shared/DataTable';
import { DateRangePicker } from '@/components/shared/DateRangePicker';

export const Route = createFileRoute('/_protected/dashboard/pelaporan/')({
    component: LaporanPenjualanPage,
});

function LaporanPenjualanPage() {
    const {
        reportData, isLoading, isError,
        detailData, isDetailLoading,
        dateRange, isDetailOpen, setIsDetailOpen,
        handleOpenDetail, handleExportExcel, setDateRange
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

                <CardContent>
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
                                header: "Detail",
                                accessorKey: "id_penjualan",
                                cell: (item) => (
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => handleOpenDetail(item.id_penjualan)}
                                    >
                                        <Eye className="w-4 h-4 mr-1" /> Lihat
                                    </Button>
                                )
                            }
                        ]}
                        data={reportData?.map(item => ({ ...item, value: item.id_penjualan }))}
                        isLoading={isLoading}
                        isError={isError}
                    />
                </CardContent>
            </Card>

            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Detail Item Transaksi</DialogTitle>
                    </DialogHeader>
                    
                    {isDetailLoading ? (
                        <div className="space-y-2 py-4">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    ) : (
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
                                                    Rp {parseFloat(item.harga).toLocaleString('id-ID')}
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
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}