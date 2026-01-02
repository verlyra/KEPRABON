import React, { useState, useMemo } from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input'; // Pastikan sudah install input shadcn
import { Search } from 'lucide-react'; // Icon search
import { TableActionButtons } from '@/components/shared/TableActionButton';

export interface ColumnDef<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => React.ReactNode;
    className?: string;
}

interface DataTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[] | undefined;
    isLoading: boolean;
    isError: boolean;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    emptyMessage?: string;
    
    // --- PROPS BARU UNTUK SEARCH ---
    enableSearch?: boolean; // Default: true
    searchPlaceholder?: string;
}

export function DataTable<T extends { value: string | number }>({
    columns,
    data,
    isLoading,
    isError,
    onEdit,
    onDelete,
    emptyMessage = "Tidak ada data ditemukan.",
    enableSearch = true, // Default aktif
    searchPlaceholder = "Cari data..."
}: DataTableProps<T>) {

    // 1. State untuk menyimpan kata kunci pencarian
    const [searchTerm, setSearchTerm] = useState("");

    // 2. Logic Filtering (Menggunakan useMemo agar performa terjaga)
    const filteredData = useMemo(() => {
        if (!data) return [];
        if (!searchTerm) return data; // Jika kosong, kembalikan semua data

        const lowerTerm = searchTerm.toLowerCase();

        return data.filter((item) => {
            // Cek setiap kolom yang didefinisikan
            return columns.some((col) => {
                // Hanya cari di kolom yang punya accessorKey (data mentah)
                if (col.accessorKey) {
                    const value = item[col.accessorKey];
                    // Konversi ke string, lowercase, lalu cek includes
                    return String(value).toLowerCase().includes(lowerTerm);
                }
                return false;
            });
        });
    }, [data, searchTerm, columns]);
    
    // --- Render Loading ---
    if (isLoading) {
        return (
            <div className="space-y-4">
                {enableSearch && <Skeleton className="h-10 w-full" />}
                <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        );
    }

    // --- Render Error ---
    if (isError) {
        return (
            <div className="text-center text-red-500 py-6 border rounded-md bg-red-50">
                Gagal memuat data.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            
            {/* --- FITUR SEARCH BAR --- */}
            {enableSearch && (
                <div className="flex items-center">
                    <div className="relative w-full">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                </div>
            )}

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px] font-medium text-center">No</TableHead>

                            {columns.map((col, idx) => (
                                <TableHead 
                                    key={idx} 
                                    className={col.className}
                                >
                                    {col.header}
                                </TableHead>
                            ))}

                            {(onEdit || onDelete) && (
                                <TableHead className="text-right">Aksi</TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Gunakan filteredData di sini, bukan data asli */}
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <TableRow key={item.value}>
                                    <TableCell className="text-center font-medium">
                                        {index + 1}
                                    </TableCell>

                                    {columns.map((col, colIdx) => (
                                        <TableCell key={colIdx} className={col.className}>
                                            {col.cell 
                                                ? col.cell(item) 
                                                : col.accessorKey 
                                                    ? (item[col.accessorKey] as React.ReactNode)
                                                    : null
                                            }
                                        </TableCell>
                                    ))}

                                    {(onEdit || onDelete) && (
                                        <TableCell className="text-right">
                                            <TableActionButtons 
                                                onEdit={onEdit ? () => onEdit(item) : () => {}}
                                                onDelete={onDelete ? () => onDelete(item) : () => {}}
                                            />
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell 
                                    colSpan={1 + columns.length + (onEdit || onDelete ? 1 : 0)} 
                                    className="text-center h-24 text-muted-foreground"
                                >
                                    {searchTerm ? "Tidak ada hasil pencarian." : emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}