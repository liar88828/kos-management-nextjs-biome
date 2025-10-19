import { z } from "zod";


export const RoomSchema = z.object({
    id: z.string().optional(),
    nomor: z.string().min(1, "Nomor kamar wajib diisi"),
    status: z.enum([ "kosong", "terisi", "renovasi" ], {
        message: "Status kamar wajib dipilih",
    }),
    hargaTahunan: z.number(),
    hargaBulanan: z.number(),
    fasilitas: z.array(z.string()),
    foto: z.url("Masukkan URL foto yang valid").optional(),
    beds: z.number(),

    // jika historyInvoice berisi array of objects, ubah definisinya
    historyInvoice: z
    .array(
        z.object({
            id: z.string().optional(),
            total: z.number().optional(),
            tanggal: z.string().optional(),
        }),
    )
    .default([]),

    // tambahan properti
    luas: z.number(),
    lantai: z.number(),
    maxPenghuni: z.number(),
    deskripsi: z.string().optional(),

    // parse date string menjadi Date
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    // opsional
    deposit: z.number(),
    isAvailableOnline: z.boolean(),
});
export type RoomType = z.infer<typeof RoomSchema>;
