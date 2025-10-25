import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/format";
import { useHistoryStore } from "@/store/useHistoryStore";
import { useRoomStore } from "@/store/useRoomStore";
import { useTenantStore } from "@/store/useTenantStore";
import { useState, useTransition } from "react";


export function BookingDialog() {
    const { selectedRoom, clearSelection } = useRoomStore();
    const { addHistory } = useHistoryStore();
    const { tenants } = useTenantStore();
    const [ isPending, startTransition ] = useTransition();
    const tenant = tenants[0];
    const [ priceRoom, setPriceRoom ] = useState<number | null>(null);
    const onSubmitNow = () => {
        startTransition(() => {
            if (!selectedRoom) {
                alert("Silahkan Pilih Room Terlebih Dahulu ");
                return;
            }
            if (!priceRoom) {
                alert("Silahkan Pilih harga Terlebih Dahulu ");
                return;
            }

            addHistory({
                idRoom: selectedRoom.id ?? "",
                guests: tenant.id ?? "",
                price: priceRoom,
                roomName: selectedRoom.nomor,
                date: new Date().toLocaleDateString(),
                status: "Diproses",
            });
            clearSelection();
        });
    };
    const onSubmitLatter = async () => {
        startTransition(() => {
            if (!selectedRoom) {
                alert("Silahkan Pilih Room Terlebih Dahulu ");
                return;
            }
            if (!priceRoom) {
                alert("Silahkan Pilih harga Terlebih Dahulu ");
                return;
            }

            addHistory({
                guests: tenant.id ?? "",
                price: priceRoom,
                roomName: selectedRoom.nomor,
                idRoom: selectedRoom.id ?? "",
                date: new Date().toLocaleDateString(),
                status: "Diproses",
            });
            clearSelection();
        });
    };

    return (
        <Dialog modal onOpenChange={ clearSelection } open={ !!selectedRoom }>
            <DialogTrigger asChild>
                {/* Invisible trigger — we render dialog open based on state */ }
                <div/>
            </DialogTrigger>
            { selectedRoom && (
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>
                            Pemesanan: { selectedRoom.nomor }
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="mb-2 block">Harga</Label>
                                <div className="flex grid grid-cols-1 gap-2 font-semibold text-lg">
                                    <Button
                                        onClick={ () =>
                                            setPriceRoom(
                                                selectedRoom.hargaTahunan,
                                            )
                                        }
                                        variant={
                                            selectedRoom.hargaTahunan ===
                                            priceRoom
                                                ? "default"
                                                : "outline"
                                        }
                                    >
                                        { formatPrice(selectedRoom.hargaTahunan) }
                                        /Tahun
                                    </Button>
                                    <Button
                                        onClick={ () =>
                                            setPriceRoom(
                                                selectedRoom.hargaBulanan,
                                            )
                                        }
                                        variant={
                                            selectedRoom.hargaBulanan ===
                                            priceRoom
                                                ? "default"
                                                : "outline"
                                        }
                                    >
                                        { formatPrice(selectedRoom.hargaBulanan) }
                                        /Bulan
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <Label className="mb-2 block">
                                    Ketersediaan
                                </Label>
                                <Badge
                                    variant={
                                        selectedRoom.status === "kosong"
                                            ? "default"
                                            : "destructive"
                                    }
                                >
                                    { selectedRoom.status === "kosong"
                                        ? "Tersedia"
                                        : "Tidak Tersedia" }
                                </Badge>
                            </div>
                        </div>

                        <div>
                            <DialogFooter className="flex items-center justify-between">
                                <Button
                                    onClick={ () => clearSelection() }
                                    type="button"
                                    variant="ghost"
                                >
                                    Batal
                                </Button>
                                <div className="flex gap-2">
                                    <Button
                                        disabled={ isPending }
                                        onClick={ onSubmitLatter }
                                    >
                                        Bayar nanti
                                    </Button>
                                    <Button
                                        disabled={ isPending }
                                        onClick={ onSubmitNow }
                                    >
                                        { isPending
                                            ? "Memesan..."
                                            : `Pesan — ${ formatPrice(selectedRoom.hargaTahunan) }` }
                                    </Button>
                                </div>
                            </DialogFooter>
                        </div>
                    </div>
                </DialogContent>
            ) }
        </Dialog>
    );
}
