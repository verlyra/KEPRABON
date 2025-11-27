import React from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { TableActionButtons } from '@/components/shared/TableActionButton';

export interface SimpleColumn<T> {
    header: string;
    accessorKey: keyof T; 
}

interface DataTableProps<T> {
    columns: SimpleColumn<T>[];   // Kolom data (tengah)
    data: T[] | undefined;
    isLoading: boolean;
    isError: boolean;
    // Handler dikirim langsung ke DataTable
    onEdit?: (item: T) => void;   
    onDelete?: (item: T) => void;
    emptyMessage?: string;
}

export function DataTable<T extends { value: string | number }>({
    columns,
    data,
    isLoading,
    isError,
    onEdit,
    onDelete,
    emptyMessage = "Tidak ada data ditemukan."
}: DataTableProps<T>) {
    
    // 1. Loading
    if (isLoading) {
        return (
            <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        );
    }

    // 2. Error
    if (isError) {
        return (
            <div className="text-center text-red-500 py-6 border rounded-md bg-red-50">
                Gagal memuat data.
            </div>
        );
    }

    // 3. Render
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {/* A. Kolom No (Hardcoded Style) */}
                        <TableHead className="w-[50px] font-medium text-center">No</TableHead>

                        {/* B. Kolom Data Dinamis */}
                        {columns.map((col, idx) => (
                            <TableHead key={idx}>{col.header}</TableHead>
                        ))}

                        {/* C. Kolom Aksi (Hanya muncul jika handler onEdit/onDelete ada) */}
                        {(onEdit || onDelete) && (
                            <TableHead className="text-right">Aksi</TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <TableRow key={item.value}>
                                {/* A. Cell No */}
                                <TableCell className="text-center font-medium">
                                    {index + 1}
                                </TableCell>

                                {/* B. Cell Data */}
                                {columns.map((col, colIdx) => (
                                    <TableCell key={colIdx}>
                                        {/* Render data berdasarkan key */}
                                        {item[col.accessorKey] as React.ReactNode}
                                    </TableCell>
                                ))}

                                {/* C. Cell Aksi */}
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
                        // Hitung total kolom untuk colspan (No + Data + Aksi)
                        <TableRow>
                            <TableCell 
                                colSpan={1 + columns.length + (onEdit || onDelete ? 1 : 0)} 
                                className="text-center h-24 text-muted-foreground"
                            >
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}