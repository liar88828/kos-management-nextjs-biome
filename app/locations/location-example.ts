import type { LocationType } from "@/app/locations/location-type";
import type { Invoice } from "@/app/payments/invoice-type";
import { exampleRooms } from "@/app/rooms/room-example";
import type { Tenant } from "@/app/tenants/tenant-type";

export const tenantExample: Tenant = {
    id: "t1",
    kamar: "A-01",
    kontak: "0812-xxxx",
    ktp: "3275xxxxxxxxx",
    masuk: "2025-01-05",
    nama: "Andi",
    pekerjaan: "Karyawan",
    statusPembayaran: "tertunggak",
};

export const historyExample: Invoice = {
    Customer: [ tenantExample ],
    dibuatOleh: "",
    dibuatPada: new Date(),
    diperbaruiPada: new Date(),
    id: "i1",
    jatuhTempo: "",
    jumlah: 1500000,
    kamar: "A-01",
    nomorInvoice: "",
    penyewa: "Andi",
    periode: "2025-09",
    status: "menunggu",
    tanggalTerbit: "",
};

export const locations: LocationType[] = [
    {

        address: "Jl. Melati No. 10",
        availableRooms: 5,
        city: "Bandung",
        contactPerson: "Ibu Sari",
        createdAt: new Date(),
        description: "Kos nyaman dekat kampus dengan fasilitas lengkap.",
        email: "kosmawar@example.com",
        id_key: "loc-001",
        name: "Kos Mawar Indah",
        phone: "081234567890",
        postalCode: "40123",
        province: "Jawa Barat",
        room: exampleRooms,
        totalRooms: 20,
        updatedAt: new Date(),
    },
    {
        address: "Jl. Kenanga No. 21",
        availableRooms: 3,
        city: "Jakarta",
        contactPerson: "Bapak Joko",
        createdAt: new Date(),
        description: "Kos murah meriah dengan fasilitas standar.",
        email: "kosanggrek@example.com",
        id_key: "loc-002",
        name: "Kos Anggrek Asri",
        phone: "082198765432",
        postalCode: "10310",
        province: "DKI Jakarta",
        room: exampleRooms,
        totalRooms: 15,
        updatedAt: new Date(),
    },
];
