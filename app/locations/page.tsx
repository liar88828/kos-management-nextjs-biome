"use client";

import { Eye } from "lucide-react";
import React, { useState } from "react";
import { formatPrice } from "@/app/rooms/format";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export type Room = {
    id: string;
    nomor: string;
    status: "kosong" | "terisi" | "renovasi";
    hargaTahunan: number;
    fasilitas: string[];
    foto?: string;
    hargaBulanan: number;
};

export type Location = {
    key: string;
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
    room: Room[];
};

const locations: Location[] = [
    {
        address: "Jl. Melati No. 10",
        availableRooms: 5,
        city: "Bandung",
        contactPerson: "Ibu Sari",
        createdAt: new Date(),
        description: "Kos nyaman dekat kampus dengan fasilitas lengkap.",
        email: "kosmawar@example.com",
        key: "loc-001",
        name: "Kos Mawar Indah",
        phone: "081234567890",
        postalCode: "40123",
        province: "Jawa Barat",
        room: [
            {
                fasilitas: [ "AC", "WiFi", "Kasur" ],
                foto: "https://example.com/foto-a1.jpg",
                hargaBulanan: 1500000,
                hargaTahunan: 15000000,
                id: "room-001",
                nomor: "A1",
                status: "kosong",
            },
        ],
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
        key: "loc-002",
        name: "Kos Anggrek Asri",
        phone: "082198765432",
        postalCode: "10310",
        province: "DKI Jakarta",
        room: [
            {
                fasilitas: [ "Kasur", "Lemari" ],
                hargaBulanan: 1200000,
                hargaTahunan: 15000000,
                id: "room-002",
                nomor: "B2",
                status: "terisi",
            },
        ],
        totalRooms: 15,
        updatedAt: new Date(),
    },
];

export default function LocationTable() {
    const [ data ] = useState<Location[]>(locations);

    return (
        <div className="mx-auto space-y-6 px-4 py-6">
            <Card>
                <CardHeader>
                    <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>
                            Daftar lokasi kos yang tersedia
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[10rem]">
                                    Nama
                                </TableHead>
                                <TableHead>Total Kamar</TableHead>
                                <TableHead>Kontak</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { data.map((loc) => (
                                <TableRow key={ loc.key }>
                                    <TableCell className="font-medium">
                                        <p className={ "font-bold" }>
                                            { loc.name }
                                        </p>
                                        <p className={ "text-primary/70" }>
                                            { loc.address }
                                        </p>
                                        <p>{ loc.city }</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>
                                            { loc.totalRooms }/
                                            { loc.availableRooms }
                                        </p>

                                        { loc.room.map((item) => (
                                            <p key={ item.id }>
                                                { item.nomor }-{ item.status }
                                            </p>
                                        )) }
                                    </TableCell>
                                    <TableCell>
                                        <p className={ "font-bold" }>
                                            { loc.contactPerson } ({ loc.phone })
                                        </p>
                                        <p>
                                            Bulan:{ " " }
                                            { formatPrice(
                                                loc.room[0].hargaBulanan,
                                            ) }
                                        </p>
                                        <p>
                                            Tahun:{ " " }
                                            { formatPrice(
                                                loc.room[0].hargaTahunan,
                                            ) }
                                        </p>
                                    </TableCell>

                                    <TableCell>
                                        { loc.room[0].fasilitas.map((item) => (
                                            <p key={ item }>{ item },</p>
                                        )) }
                                    </TableCell>
                                    <TableCell>
                                        <Button size={ "icon" } variant="outline">
                                            <Eye/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
