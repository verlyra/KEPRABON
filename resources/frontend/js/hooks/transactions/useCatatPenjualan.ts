import { useState } from 'react';
import { toast } from '@/lib/swal';
import { format } from 'date-fns';
import { useGetTransactionForm, useStoreTransaction } from '@/api/transaction/hooks';
import { CartItem } from '@/types/transactions/penjualan';

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
            await storeMutation.mutateAsync({
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