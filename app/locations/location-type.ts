import type { Tenant } from "@/app/tenants/tenant-type";
import type { RoomType } from "../rooms/room-type";

export type Invoicexx = {
    id: string;
    penyewa: string;
    kamar: string;
    periode: string; // "2025-09"
    jumlah: number;
    status: "menunggu" | "lunas";
    Customer: Tenant[];
};

export type LocationType = {
    id_key: string;
    name: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    contactPerson: string;
    phone: string;
    email?: string;
    totalRooms: number;
    availableRooms: number;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    room?: RoomType[];
};
