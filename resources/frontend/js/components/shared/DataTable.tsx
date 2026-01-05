import React, { useState, useMemo, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { TableActionButtons } from '@/components/shared/TableActionButton';

export interface ColumnDef<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T, index: number) => React.ReactNode;
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
    enableSearch?: boolean;
    searchPlaceholder?: string;
    enablePagination?: boolean;
    defaultPageSize?: number;
    pageSizeOptions?: number[];
}

export function DataTable<T extends { value: string | number }>({
    columns,
    data,
    isLoading,
    isError,
    onEdit,
    onDelete,
    emptyMessage = "Tidak ada data ditemukan.",
    enableSearch = true,
    searchPlaceholder = "Cari data...",
    enablePagination = true,
    defaultPageSize = 10,
    pageSizeOptions = [5, 10, 20, 50, 100]
}: DataTableProps<T>) {

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    const filteredData = useMemo(() => {
        if (!data) return [];
        if (!searchTerm) return data;

        const lowerTerm = searchTerm.toLowerCase();

        return data.filter((item) => {
            return columns.some((col) => {
                if (col.accessorKey) {
                    const value = item[col.accessorKey];
                    return String(value).toLowerCase().includes(lowerTerm);
                }
                return false;
            });
        });
    }, [data, searchTerm, columns]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, pageSize]);

    const paginatedData = useMemo(() => {
        if (!enablePagination) return filteredData;
        
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage, pageSize, enablePagination]);

    const totalPages = Math.ceil(filteredData.length / pageSize);

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

    if (isError) {
        return (
            <div className="text-center text-red-500 py-6 border rounded-md bg-red-50">
                Gagal memuat data.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            
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
                                <TableHead key={idx} className={col.className}>
                                    {col.header}
                                </TableHead>
                            ))}
                            {(onEdit || onDelete) && (
                                <TableHead className="text-right">Aksi</TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, index) => {
                                const rowNumber = (currentPage - 1) * pageSize + index + 1;
                                return (
                                    <TableRow key={item.value}>
                                        <TableCell className="text-center font-medium">
                                            {rowNumber}
                                        </TableCell>
                                        {columns.map((col, colIdx) => (
                                            <TableCell key={colIdx} className={col.className}>
                                                {col.cell 
                                                    ? col.cell(item, index) 
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
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={1 + columns.length + (onEdit || onDelete ? 1 : 0)} className="text-center h-24 text-muted-foreground">
                                    {searchTerm ? "Tidak ada hasil pencarian." : emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {enablePagination && filteredData.length > 0 && (
                <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between px-2">
                    
                    <div className="flex items-center space-x-6 text-sm font-medium text-muted-foreground">

                        <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium">Baris per halaman</p>
                            <Select
                                value={`${pageSize}`}
                                onValueChange={(value) => {
                                    setPageSize(Number(value));
                                }}
                            >
                                <SelectTrigger className="h-8 w-[70px]">
                                    <SelectValue placeholder={pageSize} />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {pageSizeOptions.map((size) => (
                                        <SelectItem key={size} value={`${size}`}>
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="hidden sm:block">
                            Halaman {currentPage} dari {totalPages}
                        </div>
                    </div>


                    <div className="flex items-center space-x-2 self-end sm:self-auto">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                        >
                            <span className="sr-only">Awal</span>
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            <span className="sr-only">Sebelumnya</span>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <span className="sr-only">Selanjutnya</span>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                        >
                            <span className="sr-only">Akhir</span>
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}