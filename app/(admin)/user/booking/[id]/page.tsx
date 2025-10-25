"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";
import { useRoomStore } from "@/store/useRoomStore";
import { useParams, useRouter } from "next/navigation";


export default function TravelRoomDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { getRoomById } = useRoomStore();
    const room = getRoomById(id);

    if (!room) {
        return (
            <div>
                <p className="text-lg">Kamar tidak ditemukan</p>
                <Button className="mt-4" onClick={ () => router.back() }>
                    Kembali
                </Button>
            </div>
        );
    }

    return (
        <div>
            <Card className="p-4">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="font-semibold text-2xl">
                            { room.nomor }
                        </CardTitle>
                        <Badge
                            variant={
                                room.status !== "kosong"
                                    ? "default"
                                    : "destructive"
                            }
                        >
                            { room.status !== "kosong" ? "Tersedia" : "Penuh" }
                        </Badge>
                    </div>
                    <p className="mt-1 flex flex-col text-muted-foreground text-sm">
                        <span>{ formatPrice(room.hargaBulanan) }/Bulan</span>
                        <span>{ formatPrice(room.hargaTahunan) }/Tahun</span>
                    </p>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <h3 className="mb-1 font-medium text-lg">Deskripsi</h3>
                        <p className="text-muted-foreground text-sm">
                            { room.deskripsi }
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-1 font-medium text-lg">Fasilitas</h3>
                        <ul className="list-inside list-disc text-muted-foreground text-sm">
                            { room.fasilitas.map((item) => (
                                <li key={ item }>{ item }</li>
                            )) }
                        </ul>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button onClick={ () => router.back() } variant="outline">
                            Kembali
                        </Button>
                        { room.status !== "kosong" ? null : (
                            <Button
                                // onClick={ () => router.push(`/booking/${ room.id }`) }
                            >
                                Pesan Sekarang
                            </Button>
                        ) }
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
