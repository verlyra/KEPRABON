import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format, parse } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { Loader2, Plus, Save, Trash2, CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { getTransactionFormData } from '@/api/transaction';
import { useUpdateTransaction } from '@/api/report/hooks';
import { TransactionReportItem } from '@/types/reports/penjualan';
import { toast } from '@/lib/swal';

interface EditTransactionModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    transaction: TransactionReportItem | null;
}

interface CartItem {
    id_item: number;
    nama_item: string;
    harga_satuan: number;
    qty: number;
    subtotal: number;
}

export function EditTransactionModal({ isOpen, onOpenChange, transaction }: EditTransactionModalProps) {
    const { data: formResource, isLoading: isResourceLoading } = useQuery({
        queryKey: ['transaction', 'form'],
        queryFn: getTransactionFormData,
        enabled: isOpen
    });

    const updateMutation = useUpdateTransaction();
    const [formData, setFormData] = useState({
        id_cabang: '',
        id_tipe_penjualan: '',
        id_pembayaran: '',
        tanggal_beli: new Date(),
        nama_pembeli: '',
        telp_pembeli: ''
    });
    
    const [cart, setCart] = useState<CartItem[]>([]);
    
    const [selectedItemId, setSelectedItemId] = useState<string>('');
    const [inputQty, setInputQty] = useState<string>('1');

    useEffect(() => {
        if (transaction && isOpen) {
            let parsedDate = new Date();
            try {
                parsedDate = parse(transaction.tanggal_beli, 'dd-MM-yyyy', new Date());
            } catch (e) { console.error("Invalid date format", e); }

            setFormData({
                id_cabang: transaction.id_cabang.toString(),
                id_tipe_penjualan: transaction.id_tipe_penjualan.toString(),
                id_pembayaran: transaction.id_pembayaran.toString(),
                tanggal_beli: parsedDate,
                nama_pembeli: transaction.nama_pembeli || '',
                telp_pembeli: transaction.telp_pembeli || ''
            });

            if (transaction.detail) {
                const mappedCart: CartItem[] = transaction.detail.map(d => {
                    const qty = parseFloat(d.kuantitas);
                    const hargaSatuan = parseFloat(d.harga); 

                    return {
                        id_item: d.id_item,
                        nama_item: d.nama_item,
                        qty: qty,
                        harga_satuan: hargaSatuan,
                        subtotal: qty * hargaSatuan 
                    };
                });
                setCart(mappedCart);
            }
        }
    }, [transaction, isOpen]);

    const handleAddItem = () => {
        if (!selectedItemId || !inputQty || parseInt(inputQty) <= 0) return;
        const itemMaster = formResource?.items.find(i => i.id === parseInt(selectedItemId));
        if (!itemMaster) return;

        const qty = parseInt(inputQty);
        const hargaMaster = parseFloat(itemMaster.harga);
        
        setCart(prev => [...prev, {
            id_item: itemMaster.id,
            nama_item: itemMaster.nama,
            harga_satuan: hargaMaster,
            qty: qty,
            subtotal: qty * hargaMaster
        }]);
        setSelectedItemId('');
        setInputQty('1');
    };

    const handleRemoveItem = (idx: number) => {
        setCart(prev => prev.filter((_, i) => i !== idx));
    };

    const handleUpdateItem = (idx: number, field: 'qty' | 'price', val: string) => {
        const newCart = [...cart];
        const numVal = parseFloat(val);
        
        if (field === 'qty') {
            newCart[idx].qty = isNaN(numVal) || numVal < 1 ? 1 : numVal;
        } else {
            newCart[idx].harga_satuan = isNaN(numVal) ? 0 : numVal;
        }
        
        newCart[idx].subtotal = newCart[idx].qty * newCart[idx].harga_satuan;
        setCart(newCart);
    };

    const handleSubmit = async () => {
        if (!transaction) return;
        if (cart.length === 0) {
            toast.error("Keranjang item tidak boleh kosong");
            return;
        }

        try {
            await updateMutation.mutateAsync({
                id_penjualan: transaction.id_penjualan,
                id_cabang: parseInt(formData.id_cabang),
                id_tipe_penjualan: parseInt(formData.id_tipe_penjualan),
                id_pembayaran: parseInt(formData.id_pembayaran),
                tanggal_beli: format(formData.tanggal_beli, 'dd-MM-yyyy'),
                nama_pembeli: formData.nama_pembeli,
                telp_pembeli: formData.telp_pembeli,
                items: cart.map(c => ({
                    id_item: c.id_item,
                    kuantitas: c.qty,
                    harga: c.harga_satuan
                }))
            });
            toast.success("Transaksi berhasil diupdate");
            onOpenChange(false);
        } catch (error) {
            toast.error("Gagal mengupdate transaksi");
        }
    };

    const grandTotal = cart.reduce((acc, curr) => acc + curr.subtotal, 0);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Transaksi #{transaction?.id_penjualan}</DialogTitle>
                </DialogHeader>

                {isResourceLoading ? (
                    <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
                ) : (
                    <div className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Cabang</Label>
                                <Select value={formData.id_cabang} onValueChange={(v) => setFormData({...formData, id_cabang: v})}>
                                    <SelectTrigger><SelectValue placeholder="Pilih Cabang" /></SelectTrigger>
                                    <SelectContent>
                                        {formResource?.cabang.map(i => <SelectItem key={i.value} value={i.value.toString()}>{i.label}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 flex flex-col pt-1">
                                <Label className="mb-1">Tanggal</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !formData.tanggal_beli && "text-muted-foreground")}>
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {formData.tanggal_beli ? format(formData.tanggal_beli, "PPP", { locale: idLocale }) : <span>Pilih Tanggal</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={formData.tanggal_beli} onSelect={(d) => d && setFormData({...formData, tanggal_beli: d})} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label>Tipe Penjualan</Label>
                                <Select value={formData.id_tipe_penjualan} onValueChange={(v) => setFormData({...formData, id_tipe_penjualan: v})}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {formResource?.tipe_penjualan.map(i => <SelectItem key={i.value} value={i.value.toString()}>{i.label}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Pembayaran</Label>
                                <Select value={formData.id_pembayaran} onValueChange={(v) => setFormData({...formData, id_pembayaran: v})}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {formResource?.pembayaran.map(i => <SelectItem key={i.value} value={i.value.toString()}>{i.label}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Pembeli</Label>
                                <Input value={formData.nama_pembeli} onChange={(e) => setFormData({...formData, nama_pembeli: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <Label>Telp</Label>
                                <Input value={formData.telp_pembeli} onChange={(e) => setFormData({...formData, telp_pembeli: e.target.value})} />
                            </div>
                        </div>

                        <div className="space-y-4 border rounded-md p-4 bg-slate-50">
                            <Label className="text-base font-semibold">Item Transaksi</Label>
                            
                            <div className="flex gap-2 items-end">
                                <div className="flex-1">
                                    <Label className="text-xs">Item</Label>
                                    <Select value={selectedItemId} onValueChange={setSelectedItemId}>
                                        <SelectTrigger><SelectValue placeholder="Tambah item..." /></SelectTrigger>
                                        <SelectContent>
                                            {formResource?.items.map(i => <SelectItem key={i.id} value={i.id.toString()}>{i.nama}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="w-20">
                                    <Label className="text-xs">Qty</Label>
                                    <Input type="number" value={inputQty} onChange={(e) => setInputQty(e.target.value)} />
                                </div>
                                <Button onClick={handleAddItem} size="icon"><Plus className="w-4 h-4" /></Button>
                            </div>

                            <Table className="bg-white border rounded-md">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead className="w-24 text-right">Harga</TableHead>
                                        <TableHead className="w-20 text-center">Qty</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                        <TableHead className="w-10"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cart.map((item, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell className="py-2">{item.nama_item}</TableCell>
                                            <TableCell className="py-2">
                                                <Input 
                                                    className="h-7 text-right px-1" 
                                                    value={item.harga_satuan} 
                                                    onChange={(e) => handleUpdateItem(idx, 'price', e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <Input 
                                                    className="h-7 text-center px-1" 
                                                    value={item.qty} 
                                                    onChange={(e) => handleUpdateItem(idx, 'qty', e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right py-2">
                                                {item.subtotal.toLocaleString('id-ID')}
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500" onClick={() => handleRemoveItem(idx)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="flex justify-end font-bold text-lg">
                                Total:<span className='text-green-500 pl-1'>Rp {grandTotal.toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
                            <Button onClick={handleSubmit} disabled={updateMutation.isPending} className="bg-green-600 hover:bg-green-700">
                                {updateMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                <Save className="w-4 h-4 mr-2" /> Simpan Perubahan
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}