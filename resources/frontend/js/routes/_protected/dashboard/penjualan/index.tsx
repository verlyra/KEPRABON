import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Trash2, Plus, Save, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

import { useCatatPenjualan } from '@/hooks/transactions/useCatatPenjualan';

export const Route = createFileRoute('/_protected/dashboard/penjualan/')({
    component: CatatPenjualanPage,
});

function CatatPenjualanPage() {
    const {
        formResource, isLoading, isError,
        formData, handleHeaderChange,
        cart, handleAddItem, handleRemoveItem,
        selectedItemId, setSelectedItemId,
        inputQty, setInputQty,
        grandTotal,
        handleSubmit, isSubmitting,
        handleUpdateItemPrice,
        handleUpdateItemQty
    } = useCatatPenjualan();

    if (isLoading) return <div className="p-6">Loading form resources...</div>;
    if (isError) return <div className="p-6 text-red-500">Gagal memuat data form.</div>;

    return (
        <div className="p-6 space-y-6 pb-40">
            <CardHeader className="p-0">
                <CardTitle className="text-2xl font-bold">Catat Penjualan Baru</CardTitle>
            </CardHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Informasi Transaksi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Cabang</Label>
                            <Select value={formData.id_cabang} onValueChange={(v) => handleHeaderChange('id_cabang', v)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Cabang" />
                                </SelectTrigger>
                                <SelectContent>
                                    {formResource?.cabang.map(item => (
                                        <SelectItem key={item.value} value={item.value.toString()}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2 flex flex-col">
                            <Label>Tanggal Pembelian</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full justify-start text-left font-normal", !formData.tanggal_beli && "text-muted-foreground")}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.tanggal_beli ? format(formData.tanggal_beli, "PPP", { locale: idLocale }) : <span>Pilih Tanggal</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={formData.tanggal_beli}
                                        onSelect={(date) => date && handleHeaderChange('tanggal_beli', date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Tipe Penjualan</Label>
                                <Select value={formData.id_tipe_penjualan} onValueChange={(v) => handleHeaderChange('id_tipe_penjualan', v)}>
                                    <SelectTrigger><SelectValue placeholder="Pilih Tipe" /></SelectTrigger>
                                    <SelectContent>
                                        {formResource?.tipe_penjualan.map(item => (
                                            <SelectItem key={item.value} value={item.value.toString()}>{item.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Metode Pembayaran</Label>
                                <Select value={formData.id_pembayaran} onValueChange={(v) => handleHeaderChange('id_pembayaran', v)}>
                                    <SelectTrigger><SelectValue placeholder="Pilih Metode" /></SelectTrigger>
                                    <SelectContent>
                                        {formResource?.pembayaran.map(item => (
                                            <SelectItem key={item.value} value={item.value.toString()}>{item.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Data Pembeli</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Nama Pembeli</Label>
                            <Input 
                                value={formData.nama_pembeli}
                                onChange={(e) => handleHeaderChange('nama_pembeli', e.target.value)}
                                placeholder="Contoh: Verly"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>No. Telepon</Label>
                            <Input 
                                value={formData.telp_pembeli}
                                onChange={(e) => handleHeaderChange('telp_pembeli', e.target.value)}
                                placeholder="Contoh: 0812345678"
                                type="tel"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                        <div className="text-2xl font-bold">
                            Total: <span className="text-green-600">Rp {grandTotal.toLocaleString('id-ID')}</span>
                        </div>
                        <Button 
                            size="lg" 
                            className="bg-green-700 hover:bg-green-800 w-full sm:w-auto text-white"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                            Simpan Transaksi
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Item Transaksi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    
                    <div className="flex flex-col sm:flex-row gap-4 items-end p-4 rounded-md border">
                        <div className="space-y-2 flex-1 w-full">
                            <Label>Pilih Item</Label>
                            <Select value={selectedItemId} onValueChange={setSelectedItemId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Cari item..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {formResource?.items.map(item => (
                                        <SelectItem key={item.id} value={item.id.toString()}>
                                            {item.nama} - Rp {parseFloat(item.harga).toLocaleString('id-ID')}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2 w-full sm:w-[150px]">
                            <Label>Qty</Label>
                            <Input 
                                type="number" 
                                min="1" 
                                value={inputQty}
                                onChange={(e) => setInputQty(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleAddItem} className="bg-blue-500 hover:bg-blue-700 text-white">
                            <Plus className="w-4 h-4 mr-2" /> Tambah
                        </Button>
                    </div>

                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Item</TableHead>
                                    <TableHead>Harga Satuan</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead>Subtotal</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cart.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                            Belum ada item ditambahkan.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    cart.map((item, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{item.nama}</TableCell>
                                            <TableCell>
                                                <Input 
                                                    type="number" 
                                                    min="0"
                                                    className="h-8" 
                                                    value={item.transactionPrice}
                                                    onChange={(e) => handleUpdateItemPrice(idx, e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input 
                                                    type="number" 
                                                    min="1"
                                                    value={item.qty} 
                                                    onChange={(e) => handleUpdateItemQty(idx, e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                Rp {item.subtotal.toLocaleString('id-ID')}
                                            </TableCell>
                                            <TableCell>
                                                <Button className='bg-red-500' size="sm" onClick={() => handleRemoveItem(idx)}>
                                                    <Trash2 className="w-4 h-4 text-white" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}