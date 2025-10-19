"use client";
import { Eye } from "lucide-react";
import Link from "next/link";
import { LocationDialogForm } from "@/app/locations/location-form-dialog";
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
import { formatPrice } from "@/lib/format";
import { useLocationStore } from "@/store/useLocationStore";


export function LocationTable() {
    const { addLocation, locations } = useLocationStore();
    return (
        <Card>
            <CardHeader className="flex justify-between">
                <CardTitle>Location</CardTitle>
                <LocationDialogForm saveData={ addLocation }/>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>Daftar lokasi kos yang tersedia</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[10rem]">Nama</TableHead>
                            <TableHead>Total Kamar</TableHead>
                            <TableHead>Kontak</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { locations.map((loc) => (
                            <TableRow key={ loc.id + loc.key }>
                                <TableCell className="font-medium">
                                    <p className={ "font-bold" }>{ loc.name }</p>
                                    <p className={ "text-primary/70" }>
                                        { loc.address }
                                    </p>
                                    <p>{ loc.city }</p>
                                </TableCell>
                                <TableCell>
                                    <p>
                                        { loc.totalRooms }/{ loc.availableRooms }
                                    </p>

                                    {/*{loc.room?.map((item) => (
                                        <p key={item.id}>
                                            {item.nomor}-{item.status}
                                        </p>
                                    ))}*/ }
                                </TableCell>
                                <TableCell>
                                    <p className={ "font-bold" }>
                                        { loc.contactPerson } ({ loc.phone })
                                    </p>
                                    <p>
                                        Bulan:
                                        { formatPrice(
                                            loc.room?.[0].hargaBulanan ?? 0,
                                        ) }
                                    </p>
                                    <p>
                                        Tahun:
                                        { formatPrice(
                                            loc.room?.[0].hargaTahunan ?? 0,
                                        ) }
                                    </p>
                                </TableCell>

                                <TableCell>
                                    { loc.room?.[0].fasilitas.map((item) => (
                                        <p key={ item }>{ item },</p>
                                    )) }
                                </TableCell>
                                <TableCell>
                                    <Button
                                        asChild
                                        // size={ "icon" }
                                        variant="outline"
                                    >
                                        <Link href={ `/locations/${ loc.id }` }>
                                            <Eye/> Detail Kos
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
