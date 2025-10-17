"use client";

import { useEffect, useState } from "react";
import type { RoomType } from "@/app/rooms/room-type";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import MyToolTip from "@/components/mini/my-tooltip";
import { EditIcon } from "lucide-react";

type Props = {
    defaultValue?: Partial<RoomType>;
    onSubmitAction: (room: RoomType) => void;
    triggerLabel?: string;
};

export function RoomForm({
    onSubmitAction,
    defaultValue,
    triggerLabel = "Tambah Kamar",
}: Props) {
    const [open, setOpen] = useState(false);
    const [nomor, setNomor] = useState(defaultValue?.nomor ?? "");
    const [status, setStatus] = useState<RoomType["status"]>(
        defaultValue?.status ?? "kosong",
    );
    const [hargaBulanan, setHargaBulanan] = useState(
        defaultValue?.hargaBulanan?.toString() ?? "",
    );
    const [hargaTahunan, setHargaTahunan] = useState(
        defaultValue?.hargaTahunan?.toString() ?? "",
    );
    const [fasilitas, setFasilitas] = useState(
        (defaultValue?.fasilitas ?? []).join(", "),
    );
    const [foto, setFoto] = useState(defaultValue?.foto ?? "");

    useEffect(() => {
        setNomor(defaultValue?.nomor ?? "");
        setStatus((defaultValue?.status as RoomType["status"]) ?? "kosong");
        setHargaBulanan(defaultValue?.hargaBulanan?.toString() ?? "");
        setHargaTahunan(defaultValue?.hargaTahunan?.toString() ?? "");
        setFasilitas((defaultValue?.fasilitas ?? []).join(", "));
        setFoto(defaultValue?.foto ?? "");
    }, [defaultValue]);

    function handleSubmit() {
        if (!nomor || !hargaBulanan) return;
        const r: RoomType = {
            createdAt: new Date(),
            fasilitas: fasilitas
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            foto: foto || undefined,
            hargaBulanan: Number(hargaBulanan),
            hargaTahunan: hargaTahunan ? Number(hargaTahunan) : 0,
            historyInvoice: [],
            id: defaultValue?.id ?? crypto.randomUUID(),
            lantai: 0,
            maxPenghuni: 0,
            nomor,
            status,
            updatedAt: new Date(),
        };
        onSubmitAction(r);
        setOpen(false);
    }

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                <MyToolTip text={triggerLabel}>
                    <Button size="sm">
                        <EditIcon />
                    </Button>
                </MyToolTip>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {defaultValue?.id ? "Edit Kamar" : "Tambah Kamar"}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="nomor">Nomor Kamar</Label>
                        <Input
                            id="nomor"
                            onChange={(e) => setNomor(e.target.value)}
                            placeholder="Contoh: A-01"
                            value={nomor}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Status</Label>
                        <Select
                            onValueChange={(v) =>
                                setStatus(v as RoomType["status"])
                            }
                            value={status}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="kosong">Kosong</SelectItem>
                                <SelectItem value="terisi">Terisi</SelectItem>
                                <SelectItem value="renovasi">
                                    Renovasi
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="hargaBulanan">
                                Harga Bulanan (Rp)
                            </Label>
                            <Input
                                id="hargaBulanan"
                                inputMode="numeric"
                                onChange={(e) =>
                                    setHargaBulanan(e.target.value)
                                }
                                type="number"
                                value={hargaBulanan}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="hargaTahunan">
                                Harga Tahunan (Rp)
                            </Label>
                            <Input
                                id="hargaTahunan"
                                inputMode="numeric"
                                onChange={(e) =>
                                    setHargaTahunan(e.target.value)
                                }
                                type="number"
                                value={hargaTahunan}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="fasilitas">
                            Fasilitas (pisahkan dengan koma)
                        </Label>
                        <Textarea
                            id="fasilitas"
                            onChange={(e) => setFasilitas(e.target.value)}
                            placeholder="AC, Kamar mandi dalam, WiFi"
                            value={fasilitas}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="foto">Foto (URL opsional)</Label>
                        <Input
                            id="foto"
                            onChange={(e) => setFoto(e.target.value)}
                            placeholder="/placeholder.jpg"
                            value={foto}
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            onClick={() => setOpen(false)}
                            variant="secondary"
                        >
                            Batal
                        </Button>
                        <Button
                            className="bg-primary text-primary-foreground hover:opacity-90"
                            onClick={handleSubmit}
                        >
                            {defaultValue?.id ? "Simpan Perubahan" : "Tambah"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
