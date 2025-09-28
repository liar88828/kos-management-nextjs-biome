"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import type React from "react";
import { useState } from "react";

type Invoice = {
    id: string;
    penyewa: string;
    kamar: string;
    periode: string; // "2025-09"
    jumlah: number;
    status: "menunggu" | "lunas";
};

const initialInvoices: Invoice[] = [
    {
        id: "i1",
        penyewa: "Andi",
        kamar: "A-01",
        periode: "2025-09",
        jumlah: 1500000,
        status: "menunggu",
    },
    {
        id: "i2",
        penyewa: "Siti",
        kamar: "B-03",
        periode: "2025-09",
        jumlah: 1400000,
        status: "lunas",
    },
];

export default function PaymentsPage() {
    const [ invoices, setInvoices ] = useState(initialInvoices);
    const [ open, setOpen ] = useState(false);
    const [ form, setForm ] = useState({
        penyewa: "",
        kamar: "",
        periode: "",
        jumlah: "" as unknown as number | string,
    });


    function markPaid(id: string) {
        setInvoices((prev) =>
            prev.map((inv) =>
                inv.id === id ? { ...inv, status: "lunas" } : inv,
            ),
        );
    }


    function addInvoice(e: React.FormEvent) {
        e.preventDefault();
        if (!form.penyewa || !form.kamar || !form.periode || !form.jumlah)
            return;
        const newInvoice: Invoice = {
            id: `i-${ Date.now() }`,
            penyewa: form.penyewa,
            kamar: form.kamar,
            periode: form.periode, // expect YYYY-MM
            jumlah: Number(form.jumlah),
            status: "menunggu",
        };
        setInvoices((prev) => [ newInvoice, ...prev ]);
        setOpen(false);
        setForm({
            penyewa: "",
            kamar: "",
            periode: "",
            jumlah: "" as any,
        });
    }


    return (
        <div className='mx-auto max-w-6xl space-y-6 px-4 py-6'>
            <Card>
                <CardHeader className='flex items-center justify-between'>
                    <CardTitle>Pembayaran</CardTitle>
                    <div className='flex items-center gap-3'>
                        <div className='text-muted-foreground text-sm'>
                            Tagihan otomatis akan diintegrasikan kemudian
                        </div>
                        <Dialog onOpenChange={ setOpen } open={ open }>
                            <DialogTrigger asChild>
                                <Button
                                    className='bg-primary text-primary-foreground'
                                    size='sm'
                                >
                                    Tambah Tagihan
                                </Button>
                            </DialogTrigger>
                            <DialogContent className='max-w-lg'>
                                <DialogHeader>
                                    <DialogTitle>
                                        Tambah Tagihan
                                    </DialogTitle>
                                </DialogHeader>
                                <form
                                    className='space-y-4'
                                    onSubmit={ addInvoice }
                                >
                                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                        <div>
                                            <Label htmlFor='penyewa'>
                                                Penyewa
                                            </Label>
                                            <Input
                                                id='penyewa'
                                                onChange={ (e) =>
                                                    setForm({
                                                        ...form,
                                                        penyewa:
                                                        e.target.value,
                                                    })
                                                }
                                                required
                                                value={ form.penyewa }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor='kamar'>
                                                Kamar
                                            </Label>
                                            <Input
                                                id='kamar'
                                                onChange={ (e) =>
                                                    setForm({
                                                        ...form,
                                                        kamar: e.target
                                                            .value,
                                                    })
                                                }
                                                required
                                                value={ form.kamar }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor='periode'>
                                                Periode (YYYY-MM)
                                            </Label>
                                            <Input
                                                id='periode'
                                                onChange={ (e) =>
                                                    setForm({
                                                        ...form,
                                                        periode:
                                                        e.target.value,
                                                    })
                                                }
                                                placeholder='2025-09'
                                                required
                                                value={ form.periode }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor='jumlah'>
                                                Jumlah (Rp)
                                            </Label>
                                            <Input
                                                id='jumlah'
                                                min={ 0 }
                                                onChange={ (e) =>
                                                    setForm({
                                                        ...form,
                                                        jumlah: e.target
                                                            .value,
                                                    })
                                                }
                                                required
                                                type='number'
                                                value={ form.jumlah as any }
                                            />
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
                                        <Button type='submit'>
                                            Simpan
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Penyewa</TableHead>
                                <TableHead>Kamar</TableHead>
                                <TableHead>Periode</TableHead>
                                <TableHead>Jumlah</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className='text-right'>
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { invoices.map((inv) => (
                                <TableRow key={ inv.id }>
                                    <TableCell>{ inv.penyewa }</TableCell>
                                    <TableCell>{ inv.kamar }</TableCell>
                                    <TableCell>{ inv.periode }</TableCell>
                                    <TableCell>
                                        Rp{ " " }
                                        { inv.jumlah.toLocaleString("id-ID") }
                                    </TableCell>
                                    <TableCell
                                        className={
                                            inv.status === "lunas"
                                                ? "text-emerald-600"
                                                : "text-amber-600"
                                        }
                                    >
                                        { inv.status === "lunas"
                                            ? "Lunas"
                                            : "Menunggu" }
                                    </TableCell>
                                    <TableCell className='text-right'>
                                        { inv.status === "menunggu" ? (
                                            <Button
                                                onClick={ () =>
                                                    markPaid(inv.id)
                                                }
                                                size='sm'
                                            >
                                                Tandai Lunas
                                            </Button>
                                        ) : (
                                            <span className='text-muted-foreground text-sm'>
                                                    —
                                                </span>
                                        ) }
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
