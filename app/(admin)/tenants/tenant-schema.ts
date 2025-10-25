import z from "zod";


export const TenantSchema = z.object({
    id: z.string().optional(),
    nama: z.string(),
    email: z.string().optional(),
    kontak: z.string(),
    pekerjaan: z.string().optional(),
    ktp: z.string().optional(),
    jenisKelamin: z.enum([ "pria", "wanita", "lainnya" ]).optional(),
    tanggalLahir: z.string().optional(),
    kamar: z.string(),
    masuk: z.string(),
    keluar: z.string().optional(),
    deposit: z.number().optional(),
    statusPembayaran: z.enum([ "lunas", "tertunggak" ]),
    catatan: z.string().optional(),
    kontakDarurat: z.string().optional(),
});

export type TenantType = z.infer<typeof TenantSchema>;
