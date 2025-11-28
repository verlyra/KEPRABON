import React from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
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
    
    if (isLoading) {
        return (
            <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 py-6 border rounded-md bg-red-50">
                Gagal memuat data.
            </div>
        );
    }

    return (
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
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
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
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}