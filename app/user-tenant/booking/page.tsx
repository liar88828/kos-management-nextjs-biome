"use client";

import { useState } from "react";
import { BookingDialog } from "@/app/user-tenant/booking/booking-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/lib/format";
import { useRoomStore } from "@/store/useRoomStore";


export default function TravelRoomSelector() {
    const { rooms, selectedRoom, selectRoom, clearSelection } = useRoomStore();

    // Local filters
    const [ search, setSearch ] = useState("");
    const [ statusFilter, setStatusFilter ] = useState("semua");

    // Apply filters
    const filteredRooms = rooms.filter((room) => {
        const matchStatus =
            statusFilter === "semua" ? true : room.status === statusFilter;
        const matchSearch = room.nomor
        .toLowerCase()
        .includes(search.toLowerCase());
        return matchStatus && matchSearch;
    });

    return (
        <div>
            <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="font-semibold text-2xl">
                        Pilih Kamar — Travel
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Pilih kamar yang cocok untuk perjalananmu
                    </p>
                </div>

                {/* Filter Bar */ }
                <div className="mt-3 flex flex-col gap-3 sm:mt-0 sm:flex-row">
                    <Input
                        className="w-full sm:w-[220px]"
                        onChange={ (e) => setSearch(e.target.value) }
                        placeholder="Cari berdasarkan nomor kamar..."
                        value={ search }
                    />
                    <Select
                        onValueChange={ (value) => setStatusFilter(value) }
                        value={ statusFilter }
                    >
                        <SelectTrigger className="w-full sm:w-[150px]">
                            <SelectValue placeholder="Filter status"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="semua">Semua</SelectItem>
                            <SelectItem value="kosong">Kosong</SelectItem>
                            <SelectItem value="terisi">Terisi</SelectItem>
                            <SelectItem value="renovasi">Renovasi</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </header>

            {/* Room Cards */ }
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                { filteredRooms.length > 0 ? (
                    filteredRooms.map((room) => (
                        <Card
                            className={ `${
                                room.status !== "kosong" ? "opacity-60" : ""
                            }` }
                            key={ room.id }
                        >
                            <CardHeader className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-lg">
                                        { room.nomor }
                                    </CardTitle>
                                    <div className="mt-1 flex items-center gap-3">
                                        <Badge>
                                            { room.beds } bed
                                            { room.beds > 1 ? "s" : "" }
                                        </Badge>
                                        <div className="font-medium text-sm">
                                            <p>
                                                { formatPrice(room.hargaTahunan) }{ " " }
                                                / Tahun
                                            </p>
                                            <p>
                                                { formatPrice(room.hargaBulanan) }{ " " }
                                                / Bulan
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end">
                                    { room.status !== "kosong" ? (
                                        <Badge variant="destructive">
                                            Penuh
                                        </Badge>
                                    ) : (
                                        <Button
                                            onClick={ () => selectRoom(room.id) }
                                            size="sm"
                                        >
                                            Pilih
                                        </Button>
                                    ) }
                                </div>
                            </CardHeader>

                            <CardContent>
                                <p className="text-muted-foreground text-sm">
                                    Deskripsi singkat kamar. Cocok untuk
                                    wisatawan yang ingin nyaman.
                                </p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div
                        className="col-span-full flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                        <p className="font-medium text-lg">
                            Tidak ada kamar ditemukan
                        </p>
                        <p className="text-sm">
                            Coba ubah pencarian atau filter status
                        </p>
                    </div>
                ) }
            </div>

            <BookingDialog/>

            {/* Mobile quick bar */ }
            { selectedRoom && (
                <div className="-translate-x-1/2 fixed bottom-6 left-1/2 w-[90%] transform md:hidden">
                    <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-lg">
                        <div>
                            <div className="font-medium text-sm">
                                { selectedRoom.nomor }
                            </div>
                            <div className="text-muted-foreground text-xs">
                                Tahun: { formatPrice(selectedRoom.hargaTahunan) }{ " " }
                                • Bulan:{ " " }
                                { formatPrice(selectedRoom.hargaBulanan) }
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={ () => clearSelection() } size="sm">
                                Tutup
                            </Button>
                            <Button
                                onClick={ () =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    })
                                }
                                size="sm"
                            >
                                Buka
                            </Button>
                        </div>
                    </div>
                </div>
            ) }
        </div>
    );
}
