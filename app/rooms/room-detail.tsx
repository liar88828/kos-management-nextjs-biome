"use client";

import { PaymentPage } from "@/app/payments/payment-page";
import type { RoomType } from "@/app/rooms/room-type";
import { NotFoundPage } from "@/components/mini/notFoundPage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


interface RoomDetailProps {
    room?: RoomType;
}


export default function RoomDetailPage({ room }: RoomDetailProps) {
    if (!room) {
        return <NotFoundPage/>;
    }

    return (
        <>
            <RoomDetail room={ room }/>
            <PaymentPage
                // invoices={room.historyInvoice}
            />
        </>
    );
}


export function RoomDetail({ room }: Required<RoomDetailProps>) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Kamar { room.nomor }</span>
                    <Badge
                        variant={
                            room.status === "kosong"
                                ? "default"
                                : room.status === "terisi"
                                    ? "secondary"
                                    : "destructive"
                        }
                    >
                        { room.status }
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                { room.foto && (
                    <picture>
                        <img
                            alt={ `Kamar ${ room.nomor }` }
                            className="w-full rounded-lg object-cover"
                            src={ room.foto }
                        />
                    </picture>
                ) }

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="font-medium">Harga Bulanan</p>
                        <p>Rp { room.hargaBulanan.toLocaleString("id-ID") }</p>
                    </div>
                    <div>
                        <p className="font-medium">Harga Tahunan</p>
                        <p>Rp { room.hargaTahunan.toLocaleString("id-ID") }</p>
                    </div>
                    <div>
                        <p className="font-medium">Lantai</p>
                        <p>{ room.lantai }</p>
                    </div>
                    <div>
                        <p className="font-medium">Luas</p>
                        <p>{ room.luas } m²</p>
                    </div>
                    <div>
                        <p className="font-medium">Maks. Penghuni</p>
                        <p>{ room.maxPenghuni } orang</p>
                    </div>
                    { room.deposit && (
                        <div>
                            <p className="font-medium">Deposit</p>
                            <p>Rp { room.deposit.toLocaleString("id-ID") }</p>
                        </div>
                    ) }
                </div>

                <Separator/>

                <div>
                    <p className="mb-1 font-medium">Fasilitas</p>
                    <div className="flex flex-wrap gap-2">
                        { room.fasilitas.map((f) => (
                            <Badge key={ f } variant="outline">
                                { f }
                            </Badge>
                        )) }
                    </div>
                </div>

                { room.deskripsi && (
                    <div>
                        <p className="mb-1 font-medium">Deskripsi</p>
                        <p className="text-muted-foreground">
                            { room.deskripsi }
                        </p>
                    </div>
                ) }
            </CardContent>
        </Card>
    );
}
