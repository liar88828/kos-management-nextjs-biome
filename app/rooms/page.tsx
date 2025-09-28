"use client";

import { formatPrice } from "@/app/rooms/format";
import { RoomForm } from "@/components/room-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useRoomStore } from "@/store/useRoomStore";


export function formatDate(rawDate: string | number) {
    return new Date(rawDate).toLocaleString("id-ID");
}


export default function RoomsPage() {
    const { setQuery, addRoom, updateRoom, deleteRoom, query, rooms } =
        useRoomStore();
    const filtered = rooms.filter((r) => {
        const q = query.toLowerCase();
        return (
            r.nomor.toLowerCase().includes(q) ||
            r.status.toLowerCase().includes(q) ||
            r.fasilitas.join(", ").toLowerCase().includes(q)
            // r.hargaBulanan.toString().includes(q)
            // (r.hargaTahunan?.toString().includes(q) ?? false)
        );
    });

    return (
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Kamar</CardTitle>
                    <div className="flex items-center gap-2">
                        <Input
                            className="w-56"
                            onChange={ (e) => setQuery(e.target.value) }
                            placeholder="Cari kamar, status, fasilitas..."
                            type="search"
                            value={ query }
                        />
                        <RoomForm onSubmit={ addRoom }/>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Kamar</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Harga</TableHead>
                                <TableHead>Fasilitas</TableHead>
                                {/*<TableHead>Foto</TableHead>*/ }
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { filtered.map((r) => (
                                <TableRow key={ r.id }>
                                    <TableCell className="font-medium">
                                        { r.nomor }
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        { r.status }
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            Bulanan: { formatPrice(r.hargaBulanan) }
                                        </div>
                                        { r.hargaTahunan ? (
                                            <div className="text-muted-foreground text-xs">
                                                Tahunan: { formatPrice(r.hargaTahunan) }
                                            </div>
                                        ) : null }
                                    </TableCell>
                                    <TableCell className="text-pretty">
                                        { r.fasilitas.join(", ") }
                                    </TableCell>
                                    {/*<TableCell>*/ }
                                    {/*    <div className="h-12 w-16 overflow-hidden rounded border bg-muted">*/ }
                                    {/*        <picture>*/ }
                                    {/*            <img*/ }
                                    {/*                alt={ `Foto kamar ${ r.nomor }` }*/ }
                                    {/*                className="h-full w-full object-cover"*/ }
                                    {/*                height={ 48 }*/ }
                                    {/*                src={*/ }
                                    {/*                    r.foto ||*/ }
                                    {/*                    "/placeholder.jpg"*/ }
                                    {/*                }*/ }
                                    {/*                width={ 64 }*/ }
                                    {/*            />*/ }
                                    {/*        </picture>*/ }
                                    {/*    </div>*/ }
                                    {/*</TableCell>*/ }
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <RoomForm
                                                defaultValue={ r }
                                                onSubmit={ updateRoom }
                                                triggerLabel="Edit"
                                            />
                                            <Button
                                                onClick={ () => deleteRoom(r.id) }
                                                size="sm"
                                                variant="destructive"
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) }
                            { filtered.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        className="py-10 text-center text-muted-foreground"
                                        colSpan={ 6 }
                                    >
                                        Tidak ada data.
                                    </TableCell>
                                </TableRow>
                            ) }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
