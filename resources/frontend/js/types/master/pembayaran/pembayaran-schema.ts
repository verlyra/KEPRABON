import { z } from 'zod';

export const pembayaranFormSchema = z.object({
    nama_pembayaran: z.string()
        .min(1, { message: "Nama pembayaran wajib diisi." })
        .max(255, { message: "Nama pembayaran maksimal 255 karakter." }),
});

export type PembayaranFormValues = z.infer<typeof pembayaranFormSchema>;