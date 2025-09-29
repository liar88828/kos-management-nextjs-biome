"use client";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { LocationDelete } from "@/app/locations/location-delete";
import type { Room } from "@/app/rooms/room-type";
import { RoomForm } from "@/components/room-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/format";
import { useRoomStore } from "@/store/useRoomStore";


export function RoomPage({ roomsProps }: { roomsProps: Room[] }) {
    const params = useParams<{ id_location: string }>();
    console.log(params);
    const {
        setQuery,
        updateRoom,
        addRoom,
        deleteRoom,
        query,
        rooms,
        setRooms,
    } = useRoomStore();

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

    useEffect(() => {
        setRooms(roomsProps);
    }, [ roomsProps, setRooms ]);

    return (
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
                    <RoomForm onSubmitAction={ addRoom }/>
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
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { filtered.map((r) => (
                            <TableRow key={ r.id }>
                                <TableCell className="font-medium">
                                    { r.nomor }
                                </TableCell>
                                <TableCell className="capitalize">
                                    <Badge
                                        variant={
                                            r.status === "kosong"
                                                ? "default"
                                                : r.status === "terisi"
                                                    ? "secondary"
                                                    : "destructive"
                                        }
                                    >
                                        { r.status }
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        Bulanan: { formatPrice(r.hargaBulanan) }
                                    </div>
                                    { r.hargaTahunan ? (
                                        <div className="text-muted-foreground text-xs">
                                            Tahunan:{ " " }
                                            { formatPrice(r.hargaTahunan) }
                                        </div>
                                    ) : null }
                                </TableCell>
                                <TableCell className="text-pretty">
                                    { r.fasilitas.join(", ") }
                                </TableCell>

                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button asChild variant={ "outline" }>
                                            <Link href={ `/rooms/${ r.id }` }>
                                                <Eye/> Detail Room
                                            </Link>
                                        </Button>
                                        <RoomForm
                                            defaultValue={ r }
                                            onSubmitAction={ updateRoom }
                                            triggerLabel="Edit"
                                        />
                                        <LocationDelete
                                            onDeleteAction={ () =>
                                                deleteRoom(r.id)
                                            }
                                        />
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
    );
}
