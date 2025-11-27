import { z } from 'zod';

export const cabangFormSchema = z.object({
    nama_cabang: z.string()
        .min(1, { message: "Nama cabang wajib diisi." })
        .max(255, { message: "Nama cabang maksimal 255 karakter." }),
});

export type CabangFormValues = z.infer<typeof cabangFormSchema>;