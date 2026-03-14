import { useState } from 'react';
import { toast } from '@/lib/swal';
import { format } from 'date-fns';
import { useGetTransactionForm, useStoreTransaction } from '@/api/transaction/hooks';
import { CartItem } from '@/types/transactions/penjualan';
import { jsPDF } from 'jspdf';

export const useCatatPenjualan = () => {
    const { data: formResource, isLoading, isError } = useGetTransactionForm();
    const storeMutation = useStoreTransaction();

    const [formData, setFormData] = useState({
        id_cabang: '',
        id_tipe_penjualan: '',
        id_pembayaran: '',
        tanggal_beli: new Date(),
        nama_pembeli: '',
        telp_pembeli: '',
        alamat: ''
    });

    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<string>('');
    const [inputQty, setInputQty] = useState<string>('1');
    const grandTotal = cart.reduce((acc, item) => acc + item.subtotal, 0);
    const isSubmitting = storeMutation.isPending;
    
    const handleHeaderChange = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleAddItem = () => {
        if (!selectedItemId || !inputQty || parseInt(inputQty) <= 0) {
            toast.error("Pilih item dan masukkan jumlah yang valid.");
            return;
        }

        const itemMaster = formResource?.items.find(i => i.id === parseInt(selectedItemId));
        if (!itemMaster) return;
        
        const qty = parseInt(inputQty);
        const hargaMaster = parseFloat(itemMaster.harga);

        setCart(prev => [...prev, {
            ...itemMaster,
            qty: qty,
            transactionPrice: hargaMaster,
            subtotal: qty * hargaMaster
        }]);

        setSelectedItemId('');
        setInputQty('1');
    };

    const handleRemoveItem = (index: number) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const handleUpdateItemPrice = (index: number, newPriceStr: string) => {
        const newCart = [...cart];
        const newPrice = parseFloat(newPriceStr);
        const validPrice = isNaN(newPrice) ? 0 : newPrice;

        newCart[index].transactionPrice = validPrice;
        newCart[index].subtotal = newCart[index].qty * validPrice;
        
        setCart(newCart);
    };

    const handleUpdateItemQty = (index: number, newQtyStr: string) => {
        const newCart = [...cart];
        let newQty = parseInt(newQtyStr);
        if (isNaN(newQty) || newQty < 1) newQty = 1;

        newCart[index].qty = newQty;
        newCart[index].subtotal = newCart[index].qty * newCart[index].transactionPrice;
        
        setCart(newCart);
    };

    const handleSubmit = async () => {
        if (!formData.id_cabang || !formData.id_tipe_penjualan || !formData.id_pembayaran) {
            toast.error("Mohon lengkapi Cabang, Tipe Penjualan, dan Pembayaran.");
            return;
        }
        if (cart.length === 0) {
            toast.error("Keranjang belanja masih kosong.");
            return;
        }

        try {
            const result = await storeMutation.mutateAsync({
                id_cabang: parseInt(formData.id_cabang),
                id_tipe_penjualan: parseInt(formData.id_tipe_penjualan),
                id_pembayaran: parseInt(formData.id_pembayaran),
                tanggal_beli: format(formData.tanggal_beli, 'dd-MM-yyyy'),
                nama_pembeli: formData.nama_pembeli.trim() === '' ? null : formData.nama_pembeli,
                telp_pembeli: formData.telp_pembeli.trim() === '' ? null : formData.telp_pembeli,
                alamat: formData.alamat.trim() === '' ? null : formData.alamat,
                items: cart.map(item => ({
                    id_item: item.id,
                    kuantitas: item.qty,
                    harga: item.transactionPrice
                }))
            });

            // build invoice payload (generate local invoice number)
            await generateInvoicePdf({
                invoiceNumber: `INV-${Date.now()}`,
                tanggal: format(formData.tanggal_beli, 'dd-MM-yyyy'),
                nama_pembeli: formData.nama_pembeli.trim() === '' ? null : formData.nama_pembeli,
                telp_pembeli: formData.telp_pembeli.trim() === '' ? null : formData.telp_pembeli,
                alamat: formData.alamat.trim() === '' ? null : formData.alamat,
                items: cart.map(item => ({
                    id_item: item.id,
                    nama: item.nama,
                    kuantitas: item.qty,
                    harga: item.transactionPrice,
                    subtotal: item.subtotal
                })),
                total: grandTotal
            });

            toast.success("Transaksi berhasil disimpan!");
            setCart([]);
            setFormData(prev => ({ 
                ...prev, 
                nama_pembeli: '', 
                telp_pembeli: '',
                tanggal_beli: new Date()
            }));
            
        } catch (error) {
            console.error(error);
            toast.error("Gagal menyimpan transaksi.");
        }
    };

        const generateInvoicePdf = async (invoiceData: any) => {
            try {
                const doc = new jsPDF();
                let y = 20;
                doc.setFontSize(16);
                doc.text('Invoice Penjualan', 14, y);
                y += 10;

                const invoiceNumber = invoiceData.invoiceNumber || `INV-${Date.now()}`;
                doc.setFontSize(10);
                doc.text(`No: ${invoiceNumber}`, 14, y);
                doc.text(`Tanggal: ${invoiceData.tanggal || format(new Date(), 'dd-MM-yyyy')}`, 140, y);
                y += 8;

                doc.text(`Nama Pembeli: ${invoiceData.nama_pembeli || '-'}`, 14, y);
                y += 6;
                doc.text(`Telp: ${invoiceData.telp_pembeli || '-'}`, 14, y);
                y += 6;
                if (invoiceData.alamat) {
                    doc.text(`Alamat: ${invoiceData.alamat}`, 14, y);
                    y += 8;
                } else {
                    y += 2;
                }

                doc.text('------------------------------------------------------------', 14, y);
                y += 6;
                doc.text('Nama Item', 14, y);
                doc.text('Qty', 100, y);
                doc.text('Harga', 125, y);
                doc.text('Subtotal', 160, y);
                y += 6;
                doc.text('------------------------------------------------------------', 14, y);
                y += 6;

                const currency = (v: number) => new Intl.NumberFormat('id-ID').format(v);

                invoiceData.items.forEach((it: any) => {
                    const name = it.nama || it.id_item?.toString() || '-';
                    doc.text(name, 14, y);
                    doc.text(String(it.kuantitas || it.qty || 0), 100, y);
                    doc.text(currency(Number(it.harga || it.transactionPrice || 0)), 125, y);
                    const subtotal = Number(it.subtotal ?? (it.kuantitas || it.qty || 0) * (it.harga || it.transactionPrice || 0));
                    doc.text(currency(subtotal), 160, y);
                    y += 6;
                    if (y > 270) { doc.addPage(); y = 20; }
                });

                y += 8;
                doc.text('------------------------------------------------------------', 14, y);
                y += 8;
                doc.setFontSize(12);
                doc.text(`Total: Rp ${currency(Number(invoiceData.total || 0))}`, 14, y);

                doc.save(`${invoiceNumber}.pdf`);
            } catch (err) {
                console.error('PDF generation error', err);
                toast.error('Gagal membuat invoice PDF.');
            }
        };

    const [isItemModalOpen, setIsItemModalOpen] = useState(false);

    const getSelectedItemLabel = () => {
        if (!selectedItemId) return "";
        const item = formResource?.items.find(i => i.id.toString() === selectedItemId);
        return item ? `${item.nama} - Rp ${parseFloat(item.harga).toLocaleString('id-ID')}` : "";
    };

    return {
        formResource,
        isLoading,
        isError,
        formData, handleHeaderChange,
        cart, handleAddItem, handleRemoveItem,
        selectedItemId, setSelectedItemId,
        inputQty, setInputQty,
        grandTotal,
        handleSubmit,
        isSubmitting,
        handleUpdateItemPrice,
        handleUpdateItemQty,
        isItemModalOpen, setIsItemModalOpen,
        getSelectedItemLabel
    };
};