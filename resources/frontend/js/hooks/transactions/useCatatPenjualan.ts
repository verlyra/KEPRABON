import { useState } from 'react';
import { toast } from '@/lib/swal';
import { format } from 'date-fns';
import { useGetTransactionForm, useStoreTransaction } from '@/api/transaction/hooks';
import { CartItem } from '@/types/transactions/penjualan';
import { jsPDF } from 'jspdf';
import Logo from '@/assets/images/logo.png';``

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
        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

        const pageW = doc.internal.pageSize.getWidth();
        const pageH = doc.internal.pageSize.getHeight();
        const mL    = 14;
        const mR    = 14;
        const cW    = pageW - mL - mR;

        const fmt = (v: number) =>
            new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);

        const BLACK: [number,number,number] = [0, 0, 0];
        const GRAY:  [number,number,number] = [80, 80, 80];

        let logoDataUrl: string | null = null;
        try {
            const img = new Image();
            img.src = Logo;
            await new Promise<void>((resolve) => {
                img.onload  = () => resolve();
                img.onerror = () => resolve();
                setTimeout(resolve, 3000);
            });
            if (img.naturalWidth > 0) {
                const canvas = document.createElement('canvas');
                canvas.width  = img.naturalWidth;
                canvas.height = img.naturalHeight;
                canvas.getContext('2d')!.drawImage(img, 0, 0);
                logoDataUrl = canvas.toDataURL('image/png');
            }
        } catch {}

        const LOGO_SIZE  = 22;   
        const LOGO_GAP   = 4;    
        const headerTopY = 12;
        let logoW = 0;
        if (logoDataUrl) {
            try {
                const tmpImg = new Image();
                tmpImg.src = logoDataUrl;
                await new Promise<void>(res => {
                    tmpImg.onload  = () => res();
                    tmpImg.onerror = () => res();
                });
                const ratio = tmpImg.naturalWidth / tmpImg.naturalHeight;
                logoW = Math.min(LOGO_SIZE * ratio, 30); // max 30mm lebar
                doc.addImage(logoDataUrl, 'PNG', mL, headerTopY, logoW, LOGO_SIZE);
            } catch { logoW = 0; }
        }

        const companyX = logoW > 0 ? mL + logoW + LOGO_GAP : mL;

        let y = headerTopY + 2;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(...BLACK);
        doc.text('Nasi Liwet Keprabon Bu Darmi', companyX, y);
        y += 5.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...GRAY);
        doc.text('CV. Yasa Piranti Dalem', companyX, y);       y += 5;
        doc.text('Phone : +62217410689 and 7401966', companyX, y); y += 5;
        doc.text('WA : +6281806306106 and +6281212735051', companyX, y); y += 5;

        y = y + 2;

        doc.setDrawColor(...GRAY);
        doc.setLineWidth(0.2);
        doc.setLineDashPattern([1, 1], 0);
        doc.line(mL, y, pageW - mR, y);
        doc.setLineDashPattern([], 0);
        y += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...GRAY);
        doc.text('Customer', mL, y);
        doc.text(':', mL + 22, y);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...BLACK);
        doc.text(invoiceData.nama_pembeli || '-', mL + 25, y);

        y += 5;

        if (invoiceData.telp_pembeli || invoiceData.alamat) {
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...GRAY);

            const maxContactW = cW - 25;

            if (invoiceData.telp_pembeli) {
                doc.text(`${invoiceData.telp_pembeli}`, mL + 25, y);
                y += 5;
            }

            if (invoiceData.alamat) {
                const alamatLines: string[] = doc.splitTextToSize(
                    invoiceData.alamat,
                    maxContactW
                );
                alamatLines.forEach((line: string) => {
                    doc.text(line, mL + 25, y);
                    y += 5;
                });
            }
        }

        y += 5;

        doc.setDrawColor(...GRAY);
        doc.setLineWidth(0.2);
        doc.setLineDashPattern([1, 1], 0);
        doc.line(mL, y, pageW - mR, y);
        doc.setLineDashPattern([], 0);
        y += 6;

        type Align = 'left' | 'center' | 'right';
        interface ColDef { x: number; w: number; label: string; align: Align }

        const cols: Record<string, ColDef> = {
            no:       { x: mL,       w: 9,        label: 'No.',          align: 'center' },
            nama:     { x: mL + 9,   w: 80,       label: 'Product',      align: 'left'   },
            qty:      { x: mL + 89,  w: 18,       label: 'Jumlah',       align: 'center' },
            harga:    { x: mL + 107, w: 38,       label: 'Harga Satuan', align: 'right'  },
            subtotal: { x: mL + 145, w: cW - 145, label: 'Subtotal',     align: 'right'  },
        };

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(...BLACK);

        Object.values(cols).forEach(col => {
            const tx =
                col.align === 'right'  ? col.x + col.w - 1 :
                col.align === 'center' ? col.x + col.w / 2 :
                col.x;
            doc.text(col.label, tx, y, { align: col.align });
        });

        y += 2;

        doc.setDrawColor(...BLACK);
        doc.setLineWidth(0.4);
        doc.line(mL, y, pageW - mR, y);
        y += 5;

        const rowH = 6.5;

        invoiceData.items.forEach((item: any, idx: number) => {
            if (y + rowH > pageH - 40) {
                doc.addPage();
                y = 16;
            }

            const qty      = Number(item.kuantitas ?? item.qty ?? 0);
            const harga    = Number(item.harga ?? item.transactionPrice ?? 0);
            const subtotal = Number(item.subtotal ?? qty * harga);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8.5);
            doc.setTextColor(...BLACK);

            doc.text(String(idx + 1),
                cols.no.x + cols.no.w / 2, y, { align: 'center' });
            doc.text(
                doc.splitTextToSize(item.nama || '-', cols.nama.w - 2)[0],
                cols.nama.x, y);
            doc.text(String(qty),
                cols.qty.x + cols.qty.w / 2, y, { align: 'center' });
            doc.text(fmt(harga),
                cols.harga.x + cols.harga.w - 1, y, { align: 'right' });
            doc.text(fmt(subtotal),
                cols.subtotal.x + cols.subtotal.w - 1, y, { align: 'right' });

            y += rowH;
        });

        doc.setDrawColor(...GRAY);
        doc.setLineWidth(0.3);
        doc.setLineDashPattern([1, 1], 0);
        doc.line(mL, y, pageW - mR, y);
        doc.setLineDashPattern([], 0);
        y += 6;

        const grandTotal  = Number(invoiceData.total || 0);
        const sumLabelX   = pageW - mR - 60;
        const sumValX     = pageW - mR;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(...BLACK);
        doc.text('Total', sumLabelX, y);
        doc.text(fmt(grandTotal), sumValX, y, { align: 'right' });

        doc.setDrawColor(...BLACK);
        doc.setLineWidth(0.5);
        doc.line(sumLabelX, y + 3,   sumValX, y + 3);
        doc.line(sumLabelX, y + 4.5, sumValX, y + 4.5);

        doc.save(`${invoiceData.invoiceNumber}.pdf`);

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