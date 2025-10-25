"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatPrice } from "@/lib/format";
import { useHistoryStore } from "@/store/useHistoryStore";
import { CalendarDays } from "lucide-react";
import Link from "next/link";


export default function TravelHistoryPage() {
    const { histories } = useHistoryStore();

    return (
        <div className="space-y-6">
            {/* Header */ }
            <header className="mb-6">
                <h2 className="font-semibold text-2xl">Riwayat Pemesanan</h2>
                <p className="text-muted-foreground text-sm">
                    Lihat semua kamar yang pernah kamu pesan
                </p>
            </header>

            {/* Jika kosong tampilkan alert */ }
            { histories.length === 0 ? (
                <Alert className="border-primary">
                    <CalendarDays className="h-5 w-5 text-primary"/>
                    <AlertTitle className="font-semibold text-primary">
                        Belum ada pemesanan
                    </AlertTitle>
                    <AlertDescription className="text-primary text-sm">
                        Kamu belum memiliki riwayat pemesanan kamar. Yuk,{ " " }
                        <Link
                            className="font-semibold text-primary underline"
                            href="/user-tenant/booking"
                        >
                            pesan kamar sekarang!
                        </Link>
                    </AlertDescription>
                </Alert>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    { histories.map((item) => (
                        <Card
                            className="border-primary shadow-sm transition hover:shadow-md"
                            key={ item.id }
                        >
                            <CardHeader className="flex items-center justify-between">
                                <CardTitle className="text-lg">
                                    { item.roomName }
                                </CardTitle>
                                <Badge
                                    variant={
                                        item.status === "Selesai"
                                            ? "default"
                                            : item.status === "Dibatalkan"
                                                ? "destructive"
                                                : "secondary"
                                    }
                                >
                                    { item.status }
                                </Badge>
                            </CardHeader>

                            <CardContent className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Tanggal</span>
                                    <span>{ formatDate(item.date) }</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Jumlah Tamu</span>
                                    <span>
                                        {/*{ item.guests }*/ }
                                        xxx
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Harga</span>
                                    <span className="font-semibold">
                                        { formatPrice(item.price) }
                                    </span>
                                </div>

                                <div className="flex justify-end gap-2 pt-3">
                                    <Button asChild size="sm" variant="outline">
                                        <Link
                                            href={ `/user-tenant/booking/${ item.idRoom }` }
                                        >
                                            Lihat Detail
                                        </Link>
                                    </Button>
                                    { item.status === "Selesai" && (
                                        <Button size="sm" variant="secondary">
                                            Pesan Lagi
                                        </Button>
                                    ) }
                                </div>
                            </CardContent>
                        </Card>
                    )) }
                </div>
            ) }
        </div>
    );
}
