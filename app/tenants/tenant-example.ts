import type { Tenant } from "@/app/tenants/tenant-type";

export const exampleTenant: Tenant = {
    catatan: "Tenant sangat tertib dan selalu membayar tepat waktu.",
    deposit: 1500000,
    email: "jonedoe@example.com",
    id: "t001",
    jenisKelamin: "pria",
    kamar: "A101",
    keluar: undefined, // still staying
    kontak: "08123456789",
    kontakDarurat: "081298765432",
    ktp: "1234567890123456",
    masuk: "2025-09-01",
    nama: "jone jow",
    pekerjaan: "Software Engineer",
    statusPembayaran: "lunas",
    tanggalLahir: "1995-03-15",
};
