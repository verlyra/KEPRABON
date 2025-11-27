import { z } from 'zod';

export const tipePenjualanFormSchema = z.object({
    nama_tipe_penjualan: z.string()
        .min(1, { message: "Nama tipe penjualan wajib diisi." })
        .max(255, { message: "Nama tipe penjualan maksimal 255 karakter." }),
});

export type TipePenjualanFormValues = z.infer<typeof tipePenjualanFormSchema>;