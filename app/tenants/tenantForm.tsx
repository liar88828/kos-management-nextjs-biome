import type React from "react";
import { useState } from "react";
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


export function TenantForm() {
    const [ open, setOpen ] = useState(false);
    const [ form, setForm ] = useState({
        kamar: "",
        kontak: "",
        ktp: "",
        masuk: "",
        nama: "",
        pekerjaan: "",
        statusPembayaran: "tertunggak" as "lunas" | "tertunggak",
    });


    function resetForm() {
        setForm({
            kamar: "",
            kontak: "",
            ktp: "",
            masuk: "",
            nama: "",
            pekerjaan: "",
            statusPembayaran: "tertunggak",
        });
    }


    function addTenant(e: React.FormEvent) {
        e.preventDefault();
        if (!form.nama || !form.kamar || !form.masuk) return;
        `t-${ Date.now() }`;
        setOpen(false);
        resetForm();
    }


    return (
        <Dialog onOpenChange={ setOpen } open={ open }>
            <DialogTrigger asChild>
                <Button
                    className="bg-primary text-primary-foreground"
                    size="sm"
                >
                    Tambah Penyewa
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Tambah Penyewa</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={ addTenant }>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="nama">Nama</Label>
                            <Input
                                id="nama"
                                onChange={ (e) =>
                                    setForm({
                                        ...form,
                                        nama: e.target.value,
                                    })
                                }
                                required
                                value={ form.nama }
                            />
                        </div>
                        <div>
                            <Label htmlFor="kontak">Kontak</Label>
                            <Input
                                id="kontak"
                                onChange={ (e) =>
                                    setForm({
                                        ...form,
                                        kontak: e.target.value,
                                    })
                                }
                                value={ form.kontak }
                            />
                        </div>
                        <div>
                            <Label htmlFor="pekerjaan">Pekerjaan</Label>
                            <Input
                                id="pekerjaan"
                                onChange={ (e) =>
                                    setForm({
                                        ...form,
                                        pekerjaan: e.target.value,
                                    })
                                }
                                value={ form.pekerjaan }
                            />
                        </div>
                        <div>
                            <Label htmlFor="ktp">No. KTP</Label>
                            <Input
                                id="ktp"
                                onChange={ (e) =>
                                    setForm({
                                        ...form,
                                        ktp: e.target.value,
                                    })
                                }
                                value={ form.ktp }
                            />
                        </div>
                        <div>
                            <Label htmlFor="kamar">Kamar</Label>
                            <Input
                                id="kamar"
                                onChange={ (e) =>
                                    setForm({
                                        ...form,
                                        kamar: e.target.value,
                                    })
                                }
                                required
                                value={ form.kamar }
                            />
                        </div>
                        <div>
                            <Label htmlFor="masuk">Tanggal Masuk</Label>
                            <Input
                                id="masuk"
                                onChange={ (e) =>
                                    setForm({
                                        ...form,
                                        masuk: e.target.value,
                                    })
                                }
                                required
                                type="date"
                                value={ form.masuk }
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Label>Status Pembayaran</Label>
                            <Select
                                onValueChange={ (v) =>
                                    setForm({
                                        ...form,
                                        statusPembayaran: v as any,
                                    })
                                }
                                value={ form.statusPembayaran }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih status"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="lunas">Lunas</SelectItem>
                                    <SelectItem value="tertunggak">
                                        Tertunggak
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            onClick={ () => setOpen(false) }
                            type="button"
                            variant="outline"
                        >
                            Batal
                        </Button>
                        <Button type="submit">Simpan</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
