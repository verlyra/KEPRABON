import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { DateRange } from "react-day-picker";
import { useDeleteTransaction, useGetTransactionList } from '@/api/report/hooks';
import { toast } from '@/lib/swal';
import { TransactionReportItem } from '@/types/reports/penjualan';

const getUniqueOptions = (data: any[], keyId: string, keyLabel: string) => {
    if (!data) return [];
    const uniqueMap = new Map();
    data.forEach(item => {
        if (!uniqueMap.has(item[keyId])) {
            uniqueMap.set(item[keyId], {
                value: item[keyId].toString(),
                label: item[keyLabel]
            });
        }
    });
    return Array.from(uniqueMap.values());
};

export const useLaporanPenjualan = () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    });

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedCabang, setSelectedCabang] = useState<Set<string>>(new Set());
    const [selectedTipe, setSelectedTipe] = useState<Set<string>>(new Set());
    const [selectedPembayaran, setSelectedPembayaran] = useState<Set<string>>(new Set());

    const startDate = dateRange?.from || new Date();
    const endDate = dateRange?.to || dateRange?.from || new Date();

    const filters = {
        start_date: format(startDate, 'dd-MM-yyyy'),
        end_date: format(endDate, 'dd-MM-yyyy')
    };

    const listQuery = useGetTransactionList(filters);
    const rawData = listQuery.data || [];

    const cabangOptions = useMemo(() => getUniqueOptions(rawData, 'id_cabang', 'nama_cabang'), [rawData]);
    const tipeOptions = useMemo(() => getUniqueOptions(rawData, 'id_tipe_penjualan', 'nama_tipe_penjualan'), [rawData]);
    const pembayaranOptions = useMemo(() => getUniqueOptions(rawData, 'id_pembayaran', 'nama_pembayaran'), [rawData]);

    const filteredData = useMemo(() => {
        return rawData.filter(item => {
            const matchCabang = selectedCabang.size === 0 || selectedCabang.has(item.id_cabang.toString());
            const matchTipe = selectedTipe.size === 0 || selectedTipe.has(item.id_tipe_penjualan.toString());
            const matchPembayaran = selectedPembayaran.size === 0 || selectedPembayaran.has(item.id_pembayaran.toString());

            return matchCabang && matchTipe && matchPembayaran;
        });
    }, [rawData, selectedCabang, selectedTipe, selectedPembayaran]);

    const isFiltered = selectedCabang.size > 0 || selectedTipe.size > 0 || selectedPembayaran.size > 0;

    const handleResetFilters = () => {
        setSelectedCabang(new Set());
        setSelectedTipe(new Set());
        setSelectedPembayaran(new Set());
    };

    const selectedTransaction = listQuery.data?.find(item => item.id_penjualan === selectedId);
    const detailData = selectedTransaction?.detail || [];

    const handleOpenDetail = (id: number) => {
        setSelectedId(id);
        setIsDetailOpen(true);
    };

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [transactionAction, setTransactionAction] = useState<TransactionReportItem | null>(null);
    const [selectedRowNumber, setSelectedRowNumber] = useState<number>(0);

    const deleteMutation = useDeleteTransaction();

    const handleOpenEdit = (item: TransactionReportItem) => {
        setTransactionAction(item);
        setIsEditOpen(true);
    };

    const handleOpenDelete = (item: TransactionReportItem) => {
        setTransactionAction(item);

        if (filteredData) {
            const index = filteredData.findIndex(d => d.id_penjualan === item.id_penjualan);
            setSelectedRowNumber(index + 1);
        }
        
        setIsDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!transactionAction) return;
        try {
            await deleteMutation.mutateAsync({ id_penjualan: transactionAction.id_penjualan });
            toast.success("Transaksi berhasil dihapus");
            setIsDeleteOpen(false);
            setTransactionAction(null);
        } catch (error) {
            toast.error("Gagal menghapus transaksi");
        }
    };

    const handleExportExcel = () => {
        if (!filteredData || filteredData.length === 0) {
            toast.error("Tidak ada data yang bisa diprint.")
            return
        };

        let excelRows: any[] = [];
        let mergeConfig: XLSX.Range[] = [];
        let currentRowIndex = 1;

        filteredData.forEach(transaction => {
            const details = transaction.detail && transaction.detail.length > 0 
                ? transaction.detail 
                : [{ nama_item: '-', kuantitas: '0', harga: '0' }];

            const rowCount = details.length;

            details.forEach((item, idx) => {
                const isFirst = idx === 0;

                excelRows.push({
                    "No Transaksi": isFirst ? transaction.id_penjualan : "",
                    "Tanggal": isFirst ? transaction.tanggal_beli : "",
                    "Cabang": isFirst ? transaction.nama_cabang : "",
                    "Tipe": isFirst ? transaction.nama_tipe_penjualan : "",
                    "Metode Bayar": isFirst ? transaction.nama_pembayaran : "",
                    "Pembeli": isFirst ? (transaction.nama_pembeli || '-') : "",
                    "No. Telp": isFirst ? (transaction.telp_pembeli || '-') : "",
                    "Nama Item": item.nama_item || '-',
                    "Qty": parseFloat(item.kuantitas),
                    "Subtotal Item (Rp)": parseFloat(item.harga),
                    "Total Transaksi (Rp)": isFirst ? parseFloat(transaction.total) : ""
                });
            });

            if (rowCount > 1) {
                const columnsToMerge = [0, 1, 2, 3, 4, 5, 6, 10]; 

                columnsToMerge.forEach(colIndex => {
                    mergeConfig.push({
                        s: { r: currentRowIndex, c: colIndex },
                        e: { r: currentRowIndex + rowCount - 1, c: colIndex }
                    });
                });
            }
            currentRowIndex += rowCount;
        });

        const worksheet = XLSX.utils.json_to_sheet(excelRows);
        worksheet['!merges'] = mergeConfig;
        worksheet['!cols'] = [
            { wch: 10 },
            { wch: 15 },
            { wch: 20 },
            { wch: 15 },
            { wch: 15 },
            { wch: 20 },
            { wch: 15 },
            { wch: 25 },
            { wch: 8 }, 
            { wch: 20 },
            { wch: 20 },
        ];
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Penjualan");
        const fileName = `Laporan_Merged_${filters.start_date}_sd_${filters.end_date}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };

    return {
        reportData: filteredData, 
        isLoading: listQuery.isLoading,
        isError: listQuery.isError,
        dateRange,
        setDateRange,
        isDetailOpen, setIsDetailOpen,
        handleOpenDetail,
        handleExportExcel,
        detailData,
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
        isDeleting: deleteMutation.isPending,
        selectedRowNumber
    };
};