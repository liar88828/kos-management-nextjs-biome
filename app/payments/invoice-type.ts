import type { Tenant } from "@/app/tenants/tenant-type";

export type Invoice = {
    id: string;
    nomorInvoice: string; // e.g., "INV-2025-001"
    penyewa: string; // nama tenant
    kamar: string; // nomor/ID kamar
    periode: string; // e.g., "2025-09"
    tanggalTerbit: string; // "2025-09-01"
    jatuhTempo: string; // "2025-09-10"
    jumlah: number; // total tagihan
    denda?: number; // jika ada keterlambatan
    diskon?: number; // jika ada potongan
    status: "menunggu" | "lunas" | "tertunda" | "batal";
    metodePembayaran?: "cash" | "transfer" | "ewallet" | "lainnya";
    catatan?: string; // catatan tambahan
    Customer: Tenant[]; // daftar penyewa terkait
    dibuatOleh: string; // admin yang membuat invoice
    dibuatPada: Date;
    diperbaruiPada: Date;
};
