"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import type React from "react";
import { useState } from "react";

type Tenant = {
    id: string;
    nama: string;
    kontak: string;
    pekerjaan?: string;
    ktp?: string;
    kamar: string;
    masuk: string;
    keluar?: string;
    statusPembayaran: "lunas" | "tertunggak";
};

const sampleTenants: Tenant[] = [
    {
        id: "t1",
        nama: "Andi",
        kontak: "0812-xxxx",
        pekerjaan: "Karyawan",
        ktp: "3275xxxxxxxxx",
        kamar: "A-01",
        masuk: "2025-01-05",
        statusPembayaran: "tertunggak",
    },
    {
        id: "t2",
        nama: "Siti",
        kontak: "0821-xxxx",
        pekerjaan: "Mahasiswa",
        kamar: "B-03",
        masuk: "2025-03-12",
        statusPembayaran: "lunas",
    },
];

export default function TenantsPage() {
    const [ tenants, setTenants ] = useState(sampleTenants);

    const [ open, setOpen ] = useState(false);
    const [ form, setForm ] = useState({
        nama: "",
        kontak: "",
        pekerjaan: "",
        ktp: "",
        kamar: "",
        masuk: "",
        statusPembayaran: "tertunggak" as "lunas" | "tertunggak",
    });


    function resetForm() {
        setForm({
            nama: "",
            kontak: "",
            pekerjaan: "",
            ktp: "",
            kamar: "",
            masuk: "",
            statusPembayaran: "tertunggak",
        });
    }


    function addTenant(e: React.FormEvent) {
        e.preventDefault();
        if (!form.nama || !form.kamar || !form.masuk) return;
        const newTenant: Tenant = {
            id: `t-${ Date.now() }`,
            nama: form.nama,
            kontak: form.kontak,
            pekerjaan: form.pekerjaan,
            ktp: form.ktp,
            kamar: form.kamar,
            masuk: form.masuk,
            statusPembayaran:
                form.statusPembayaran === "lunas" ? "lunas" : "tertunggak",
        };
        setTenants((prev) => [ newTenant, ...prev ]);
        setOpen(false);
        resetForm();
    }


    return (

        <div className='mx-auto max-w-6xl space-y-6 px-4 py-6'>
            <Card>
                <CardHeader className='flex items-center justify-between'>
                    <CardTitle>Penyewa</CardTitle>
                    <Dialog onOpenChange={ setOpen } open={ open }>
                        <DialogTrigger asChild>
                            <Button
                                className='bg-primary text-primary-foreground'
                                size='sm'
                            >
                                Tambah Penyewa
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='max-w-lg'>
                            <DialogHeader>
                                <DialogTitle>Tambah Penyewa</DialogTitle>
                            </DialogHeader>
                            <form
                                className='space-y-4'
                                onSubmit={ addTenant }
                            >
                                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                    <div>
                                        <Label htmlFor='nama'>Nama</Label>
                                        <Input
                                            id='nama'
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
                                        <Label htmlFor='kontak'>
                                            Kontak
                                        </Label>
                                        <Input
                                            id='kontak'
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
                                        <Label htmlFor='pekerjaan'>
                                            Pekerjaan
                                        </Label>
                                        <Input
                                            id='pekerjaan'
                                            onChange={ (e) =>
                                                setForm({
                                                    ...form,
                                                    pekerjaan:
                                                    e.target.value,
                                                })
                                            }
                                            value={ form.pekerjaan }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor='ktp'>No. KTP</Label>
                                        <Input
                                            id='ktp'
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
                                        <Label htmlFor='kamar'>Kamar</Label>
                                        <Input
                                            id='kamar'
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
                                        <Label htmlFor='masuk'>
                                            Tanggal Masuk
                                        </Label>
                                        <Input
                                            id='masuk'
                                            onChange={ (e) =>
                                                setForm({
                                                    ...form,
                                                    masuk: e.target.value,
                                                })
                                            }
                                            required
                                            type='date'
                                            value={ form.masuk }
                                        />
                                    </div>
                                    <div className='md:col-span-2'>
                                        <Label>Status Pembayaran</Label>
                                        <Select
                                            onValueChange={ (v) =>
                                                setForm({
                                                    ...form,
                                                    statusPembayaran:
                                                        v as any,
                                                })
                                            }
                                            value={ form.statusPembayaran }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder='Pilih status'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='lunas'>
                                                    Lunas
                                                </SelectItem>
                                                <SelectItem value='tertunggak'>
                                                    Tertunggak
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className='flex justify-end gap-2'>
                                    <Button
                                        onClick={ () => setOpen(false) }
                                        type='button'
                                        variant='outline'
                                    >
                                        Batal
                                    </Button>
                                    <Button type='submit'>Simpan</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Kontak</TableHead>
                                <TableHead>Pekerjaan</TableHead>
                                <TableHead>Kamar</TableHead>
                                <TableHead>Masuk</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { tenants.map((t) => (
                                <TableRow key={ t.id }>
                                    <TableCell className='font-medium'>
                                        { t.nama }
                                    </TableCell>
                                    <TableCell>{ t.kontak }</TableCell>
                                    <TableCell>
                                        { t.pekerjaan || "-" }
                                    </TableCell>
                                    <TableCell>{ t.kamar }</TableCell>
                                    <TableCell>
                                        { new Date(
                                            t.masuk,
                                        ).toLocaleDateString("id-ID") }
                                    </TableCell>
                                    <TableCell
                                        className={
                                            t.statusPembayaran === "lunas"
                                                ? "text-emerald-600"
                                                : "text-amber-600"
                                        }
                                    >
                                        { t.statusPembayaran === "lunas"
                                            ? "Lunas"
                                            : "Tertunggak" }
                                    </TableCell>
                                </TableRow>
                            )) }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
