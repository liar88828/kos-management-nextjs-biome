"use client";
import { EditIcon, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LocationDelete } from "@/app/locations/location-delete";
import { RoomForm } from "@/app/rooms/room-form";
import type { RoomType } from "@/app/rooms/room-schema";
import { ButtonToolTip } from "@/components/mini/my-tooltip";
import { PageNotFound } from "@/components/mini/pageNotFound";
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


export function RoomPage() {
    const { setQuery, updateRoom, addRoom, deleteRoom, query, filterRoom } =
        useRoomStore();

    const [ openCreate, setOpenCreate ] = useState(false);
    const [ openEdit, setOpenEdit ] = useState(false);
    const [ selectedRoom, setSelectedRoom ] = useState<RoomType | null>(null);

    // ✅ Prevent hydration mismatch
    const [ mounted, setMounted ] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // 🧠 Render nothing until client-side mount
        return null;
    }

    const filtered = filterRoom();

    if (!filtered) {
        return <PageNotFound/>;
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Kamar</CardTitle>
                <div className="flex items-center gap-2">
                    <Input
                        className="w-56"
                        defaultValue={ query === "" ? undefined : query }
                        onChange={ (e) => setQuery(e.target.value) }
                        placeholder="Cari kamar, status, fasilitas..."
                        type="search"
                    />
                    {/* ✅ Create Room Form */ }
                    <RoomForm
                        onSubmitAction={ addRoom }
                        open={ openCreate }
                        setOpen={ setOpenCreate }
                        triggerLabel="Create"
                    />

                    {/* ✅ Edit Room Form (only one at a time) */ }
                    { selectedRoom && (
                        <RoomForm
                            defaultValue={ selectedRoom }
                            onSubmitAction={ updateRoom }
                            open={ openEdit }
                            setOpen={ setOpenEdit }
                            triggerLabel="Edit"
                        />
                    ) }
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
                        { !filtered ? null : filtered.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    className="py-10 text-center text-muted-foreground"
                                    colSpan={ 6 }
                                >
                                    Tidak ada data.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((r) => (
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
                                            Bulanan:{ " " }
                                            { formatPrice(r.hargaBulanan) }
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
                                            <ButtonToolTip
                                                asChild
                                                size="sm"
                                                text="Detail Room"
                                                variant={ "outline" }
                                            >
                                                <Link href={ `/rooms/${ r.id }` }>
                                                    <Eye/>
                                                </Link>
                                            </ButtonToolTip>

                                            <Button
                                                onClick={ () => {
                                                    setSelectedRoom(r);
                                                    setOpenEdit(true);
                                                } }
                                                size="sm"
                                                variant="default"
                                            >
                                                <EditIcon/>
                                            </Button>

                                            <LocationDelete
                                                onDeleteAction={ () =>
                                                    deleteRoom(r.id)
                                                }
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
