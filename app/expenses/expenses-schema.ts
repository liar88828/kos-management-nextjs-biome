import { z } from "zod";


/**
 * Schema untuk satu item tagihan / pembayaran
 */
export const BillSchema = z.object({
    id: z.string().min(1, "id tidak boleh kosong"),
    jumlah: z
    .number()
    .int()
    .nonnegative()
    .refine((v) => v > 0, {
        message: "jumlah harus lebih dari 0",
    }),
    kategori: z.string().min(1, "kategori tidak boleh kosong"),
    keterangan: z.string().min(1, "keterangan tidak boleh kosong"),
    tanggal: z.preprocess(
        (arg) => {
            if (typeof arg === "string" || arg instanceof Date)
                return new Date(arg);
            return arg;
        },
        z.date({ error: "tanggal harus sebuah tanggal yang valid" }),
    ),
});

export type Bill = z.infer<typeof BillSchema>;
