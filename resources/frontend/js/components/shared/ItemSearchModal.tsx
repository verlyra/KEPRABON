import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';
import { ItemResource } from '@/types/transactions/penjualan';

interface ItemSearchModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    items: ItemResource[] | undefined;
    onSelect: (item: ItemResource) => void;
}

export function ItemSearchModal({ isOpen, onOpenChange, items, onSelect }: ItemSearchModalProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = useMemo(() => {
        if (!items) return [];
        if (!searchTerm) return items;

        const lowerTerm = searchTerm.toLowerCase();
        return items.filter(item => 
            item.nama.toLowerCase().includes(lowerTerm) || 
            item.harga.includes(lowerTerm)
        );
    }, [items, searchTerm]);

    const handleSelect = (item: ItemResource) => {
        onSelect(item);
        onOpenChange(false);
        setSearchTerm('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] flex flex-col max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Cari Item</DialogTitle>
                </DialogHeader>

                <div className="relative my-2">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Ketik nama item atau harga..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                        autoFocus
                    />
                </div>

                <div className="flex-1 overflow-y-auto min-h-[300px] border rounded-md">
                    <Table>
                        <TableHeader className="sticky top-0 bg-secondary">
                            <TableRow>
                                <TableHead>Nama Item</TableHead>
                                <TableHead className="text-right">Harga</TableHead>
                                <TableHead className="w-[80px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredItems.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                        Item tidak ditemukan.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredItems.map((item) => (
                                    <TableRow 
                                        key={item.id} 
                                        className="cursor-pointer hover:bg-muted/50"
                                        onClick={() => handleSelect(item)}
                                    >
                                        <TableCell className="font-medium">{item.nama}</TableCell>
                                        <TableCell className="text-right">
                                            Rp {parseFloat(item.harga).toLocaleString('id-ID')}
                                        </TableCell>
                                        <TableCell>
                                            <Button size="sm" variant="ghost" onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelect(item);
                                            }} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                
                <div className="text-xs text-muted-foreground text-center pt-2">
                    Menampilkan {filteredItems.length} item
                </div>
            </DialogContent>
        </Dialog>
    );
}