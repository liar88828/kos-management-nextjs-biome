import type { Invoice } from "@/app/payments/invoice-type";

export type Room = {
    id: string;
    nomor: string; // nomor kamar
    status: "kosong" | "terisi" | "renovasi";
    hargaTahunan: number;
    hargaBulanan: number;
    fasilitas: string[]; // contoh: ["AC", "Kasur", "Lemari"]
    foto?: string;

    // relations
    historyInvoice: Invoice[];

    // tambahan properti
    luas?: number; // ukuran kamar dalam m²
    lantai: number; // lantai ke berapa
    maxPenghuni: number; // batas maksimal penghuni
    deskripsi?: string; // deskripsi tambahan
    createdAt: Date;
    updatedAt: Date;

    // opsional
    deposit?: number; // uang jaminan
    isAvailableOnline?: boolean; // apakah bisa booking online
};
