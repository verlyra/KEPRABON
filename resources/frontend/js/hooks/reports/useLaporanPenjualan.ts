import { useState } from 'react';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { DateRange } from "react-day-picker";
import { useGetTransactionList, useGetTransactionDetail } from '@/api/report/hooks';

export const useLaporanPenjualan = () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    });

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const startDate = dateRange?.from || new Date();
    const endDate = dateRange?.to || dateRange?.from || new Date();

    const filters = {
        start_date: format(startDate, 'dd-MM-yyyy'),
        end_date: format(endDate, 'dd-MM-yyyy')
    };

    const listQuery = useGetTransactionList(filters);
    const detailQuery = useGetTransactionDetail(selectedId, isDetailOpen);

    const handleOpenDetail = (id: number) => {
        setSelectedId(id);
        setIsDetailOpen(true);
    };

    const handleExportExcel = () => {
        if (!listQuery.data || listQuery.data.length === 0) return;

        const dataToExport = listQuery.data.map(item => ({
            "No Transaksi": item.id_penjualan,
            "Tanggal": item.tanggal_beli,
            "Cabang": item.nama_cabang,
            "Tipe": item.nama_tipe_penjualan,
            "Metode Bayar": item.nama_pembayaran,
            "Pembeli": item.nama_pembeli || '-',
            "No. Telp": item.telp_pembeli || '-',
            "Total (Rp)": parseFloat(item.total)
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Penjualan");
        const fileName = `Laporan_Penjualan_${filters.start_date}-${filters.end_date}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };

    return {
        reportData: listQuery.data,
        isLoading: listQuery.isLoading,
        isError: listQuery.isError,
        detailData: detailQuery.data,
        isDetailLoading: detailQuery.isLoading,
        dateRange,
        setDateRange,
        isDetailOpen, setIsDetailOpen,
        handleOpenDetail,
        handleExportExcel
    };
};