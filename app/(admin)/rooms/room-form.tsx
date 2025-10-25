"use client";

import { RoomSchema, type RoomType } from "@/app/(admin)/rooms/room-schema";
import { ButtonToolTip } from "@/components/mini/my-tooltip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from "lucide-react";
import { useForm } from "react-hook-form";


type Props = {
    defaultValue?: Partial<RoomType>;
    onSubmitAction: (r: RoomType) => void;
    open: boolean;
    setOpenAction: (open: boolean) => void;
    triggerLabel?: string;
};


export function RoomForm({ open, setOpenAction, onSubmitAction, defaultValue, triggerLabel = "Tambah Kamar" }: Props) {
    const form = useForm<RoomType>({
        // @ts-expect-error
        resolver: zodResolver(RoomSchema),
        defaultValues: defaultValue,
        mode: "onSubmit",
    });

    const onSubmit = (data: RoomType) => {
        const room: RoomType = {
            ...data,
            id: defaultValue?.id ?? crypto.randomUUID(),
            hargaBulanan: Number(data.hargaBulanan),
            hargaTahunan: Number(data.hargaTahunan),
        };

        onSubmitAction(room);
        setOpenAction(false);
    };

    console.log(form.formState.errors);
    return (
        <Dialog onOpenChange={ setOpenAction } open={ open }>
            { defaultValue ? null : (
                <DialogTrigger asChild>
                    <ButtonToolTip size="sm" text={ triggerLabel }>
                        <EditIcon/>
                    </ButtonToolTip>
                </DialogTrigger>
            ) }

            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{ defaultValue?.id ? "Edit Kamar" : "Tambah Kamar" }</DialogTitle>
                </DialogHeader>

                <form className="grid gap-4" onSubmit={ form.handleSubmit(
                    // @ts-expect-error
                    onSubmit) }>
                    {/* Nomor Kamar */ }
                    <div className="grid gap-2">
                        <Label htmlFor="nomor">Nomor Kamar</Label>
                        <Input id="nomor" placeholder="Contoh: A-01" { ...form.register("nomor") } />
                        { form.formState.errors.nomor && <p className="text-red-500 text-sm">{ form.formState.errors.nomor.message }</p> }
                    </div>

                    {/* Status */ }
                    <div className="grid gap-2">
                        <Label>Status</Label>
                        <Select onValueChange={ (v) => form.setValue("status", v as any) } value={ form.watch("status") }>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih status"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="kosong">Kosong</SelectItem>
                                <SelectItem value="terisi">Terisi</SelectItem>
                                <SelectItem value="renovasi">Renovasi</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Harga Bulanan & Tahunan */ }
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="hargaBulanan">Harga Bulanan (Rp)</Label>
                            <Input
                                id="hargaBulanan"
                                inputMode="numeric"
                                type="number"
                                { ...form.register("hargaBulanan", {
                                    valueAsNumber: true,
                                }) }
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="hargaTahunan">Harga Tahunan (Rp)</Label>
                            <Input
                                id="hargaTahunan"
                                inputMode="numeric"
                                type="number"
                                { ...form.register("hargaTahunan", {
                                    valueAsNumber: true,
                                }) }
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Jumlah Kamar</Label>
                        <Input
                            inputMode="numeric"
                            type="number"
                            { ...form.register("beds", {
                                valueAsNumber: true,
                            }) }
                        />
                    </div>

                    {/* Fasilitas */ }
                    <div className="grid gap-2">
                        <Label>Fasilitas</Label>
                        <div className="flex flex-wrap gap-2 rounded-md border p-3">
                            { fasilitasList.map((item) => {
                                const selected = form.watch("fasilitas") ?? [];
                                const isSelected = selected.includes(item);

                                const toggleItem = () => {
                                    if (isSelected) {
                                        form.setValue(
                                            "fasilitas",
                                            selected.filter((i: string) => i !== item),
                                        );
                                    } else {
                                        form.setValue("fasilitas", [ ...selected, item ]);
                                    }
                                };

                                return (
                                    <button
                                        className={ `rounded-full border px-3 py-1.5 text-sm transition ${
                                            isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-muted text-muted-foreground hover:bg-blue-50"
                                        }
          ` }
                                        key={ item }
                                        onClick={ toggleItem }
                                        type="button"
                                    >
                                        { item }
                                    </button>
                                );
                            }) }
                        </div>

                        { form.formState.errors.fasilitas && <p className="text-red-500 text-sm">{ form.formState.errors.fasilitas.message as string }</p> }
                    </div>
                    {/* Foto */ }
                    <div className="grid gap-2">
                        <Label htmlFor="foto">Foto (URL opsional)</Label>
                        <Input id="foto" placeholder="/placeholder.jpg" { ...form.register("foto") } />
                    </div>

                    {/* Tombol Aksi */ }
                    <div className="flex justify-end gap-2 pt-2">
                        <Button onClick={ () => setOpenAction(false) } type="button" variant="secondary">
                            Batal
                        </Button>
                        <Button className="bg-primary text-primary-foreground hover:opacity-90" type="submit">
                            { defaultValue?.id ? "Simpan Perubahan" : "Tambah" }
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}


const fasilitasList = [ "AC", "Kamar mandi dalam", "WiFi", "Kasur", "Lemari", "Meja belajar", "TV", "Kipas angin" ];
