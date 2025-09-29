export type Tenant = {
    id: string;
    nama: string;
    email?: string; // optional email
    kontak: string; // phone number
    pekerjaan?: string; // occupation
    ktp?: string; // national ID
    jenisKelamin?: "pria" | "wanita" | "lainnya"; // gender
    tanggalLahir?: string; // birth date
    kamar: string; // room id or number
    masuk: string; // move-in date
    keluar?: string; // move-out date
    deposit?: number; // deposit amount
    statusPembayaran: "lunas" | "tertunggak"; // payment status
    catatan?: string; // notes
    kontakDarurat?: string; // emergency contact
};