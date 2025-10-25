"use client";
import { TenantSchema, type TenantType } from "@/app/(admin)/tenants/tenant-schema";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTenantStore } from "@/store/useTenantStore";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";


export function EditProfileDialog() {
    const { tenants, updateTenant } = useTenantStore();
    const tenant = tenants?.[0];

    const [ open, setOpen ] = React.useState(false);

    const form = useForm<TenantType>({
        resolver: zodResolver(TenantSchema),
        defaultValues: tenant ?? {
            nama: "",
            kontak: "",
            kamar: "",
            masuk: "",
            statusPembayaran: "tertunggak",
        },
    });

    const { register, handleSubmit, formState } = form;

    const onSubmit = (data: TenantType) => {
        updateTenant(data);
        setOpen(false);
    };

    return (
        <Dialog onOpenChange={ setOpen } open={ open }>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profil</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Profil Pengguna</DialogTitle>
                </DialogHeader>

                <form className="space-y-4" onSubmit={ handleSubmit(onSubmit) }>
                    {/* 2 kolom grid */ }
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Nama Lengkap</Label>
                            <Input
                                { ...register("nama") }
                                placeholder="Nama lengkap"
                            />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input
                                { ...register("email") }
                                placeholder="email@domain.com"
                            />
                        </div>

                        <div>
                            <Label>Nomor HP</Label>
                            <Input
                                { ...register("kontak") }
                                placeholder="08xxxxxxxxxx"
                            />
                        </div>
                        <div>
                            <Label>Pekerjaan</Label>
                            <Input
                                { ...register("pekerjaan") }
                                placeholder="Pekerjaan Anda"
                            />
                        </div>

                        <div>
                            <Label>Nomor KTP</Label>
                            <Input
                                { ...register("ktp") }
                                placeholder="Nomor KTP"
                            />
                        </div>

                        <div>
                            <Label>Jenis Kelamin</Label>
                            <select
                                { ...register("jenisKelamin") }
                                className="w-full rounded-md border bg-background px-2 py-2"
                            >
                                <option value="pria">Pria</option>
                                <option value="wanita">Wanita</option>
                                <option value="lainnya">Lainnya</option>
                            </select>
                        </div>

                        <div>
                            <Label>Tanggal Lahir</Label>
                            <Input type="date" { ...register("tanggalLahir") } />
                        </div>

                        <div>
                            <Label>Nomor Kamar</Label>
                            <Input
                                { ...register("kamar") }
                                placeholder="Nomor kamar"
                            />
                        </div>

                        <div>
                            <Label>Tanggal Masuk</Label>
                            <Input type="date" { ...register("masuk") } />
                        </div>

                        <div>
                            <Label>Tanggal Keluar</Label>
                            <Input type="date" { ...register("keluar") } />
                        </div>

                        <div>
                            <Label>Deposit</Label>
                            <Input
                                type="number"
                                { ...register("deposit", {
                                    valueAsNumber: true,
                                }) }
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <Label>Status Pembayaran</Label>
                            <select
                                { ...register("statusPembayaran") }
                                className="w-full rounded-md border bg-background px-2 py-2"
                            >
                                <option value="lunas">Lunas</option>
                                <option value="tertunggak">Tertunggak</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <Label>Kontak Darurat</Label>
                        <Input
                            { ...register("kontakDarurat") }
                            placeholder="Nomor kontak darurat"
                        />
                    </div>

                    <div>
                        <Label>Catatan</Label>
                        <Textarea
                            { ...register("catatan") }
                            placeholder="Catatan tambahan..."
                        />
                    </div>

                    <DialogFooter className="pt-4">
                        <Button
                            onClick={ () => setOpen(false) }
                            type="button"
                            variant="outline"
                        >
                            Batal
                        </Button>
                        <Button disabled={ formState.isSubmitting } type="submit">
                            { formState.isSubmitting
                                ? "Menyimpan..."
                                : "Simpan Perubahan" }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
