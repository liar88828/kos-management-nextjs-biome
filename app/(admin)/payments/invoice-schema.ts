import { z } from "zod";
import { TenantSchema } from "../tenants/tenant-schema";


export const InvoiceSchema = z.object({
    id: z.string(),
    nomorInvoice: z.string(),
    penyewa: z.string(),
    kamar: z.string(),
    periode: z.string(),
    tanggalTerbit: z.string(),
    jatuhTempo: z.string(),
    jumlah: z.number(),
    denda: z.number().optional(),
    diskon: z.number().optional(),
    status: z.enum([ "menunggu", "lunas", "tertunda", "batal" ]),
    metodePembayaran: z
    .enum([ "cash", "transfer", "ewallet", "lainnya" ])
    .optional(),
    catatan: z.string().optional(),
    Customer: z.array(TenantSchema),
    dibuatOleh: z.string(),
    dibuatPada: z.date(),
    diperbaruiPada: z.date(),
});

export type InvoiceType = z.infer<typeof InvoiceSchema>;
