"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


export type Expense = {
    id: string;
    kategori:
        | "listrik"
        | "air"
        | "internet"
        | "kebersihan"
        | "perbaikan"
        | "lainnya";
    keterangan: string;
    tanggal: string;
    jumlah: number;
};


export function ExpensesPage({ expense }: { expense: Expense[] }) {
    const [ items, setItems ] = useState<Expense[]>(expense);
    const [ open, setOpen ] = useState(false);
    const [ form, setForm ] = useState<Partial<Expense>>({
        jumlah: undefined,
        kategori: "listrik",
        keterangan: "",
        tanggal: "",
    });
    const total = items.reduce((acc, i) => acc + i.jumlah, 0);

    // Pendapatan bulan ini (manual input for now). Profit Bersih = pendapatan - total pengeluaran
    const [ pendapatan, setPendapatan ] = useState<number | string>("");
    const profitBersih = (Number(pendapatan) || 0) - total;


    function addExpense(e: React.FormEvent) {
        e.preventDefault();
        if (!form.kategori || !form.tanggal || !form.jumlah || !form.keterangan)
            return;
        const newItem: Expense = {
            id: `e-${ Date.now() }`,
            jumlah: Number(form.jumlah),
            kategori: form.kategori,
            keterangan: form.keterangan,
            tanggal: form.tanggal,
        };
        setItems((prev) => [ newItem, ...prev ]);
        setOpen(false);
        setForm({
            jumlah: undefined,
            kategori: "listrik",
            keterangan: "",
            tanggal: "",
        });
    }


    return (
        <>
            <Card>
                <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <CardTitle>Biaya Operasional</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Keterangan</TableHead>
                                <TableHead className="text-right">
                                    Jumlah
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { items.map((i) => (
                                <TableRow key={ i.id }>
                                    <TableCell>
                                        { new Date(i.tanggal).toLocaleDateString(
                                            "id-ID",
                                        ) }
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        { i.kategori }
                                    </TableCell>
                                    <TableCell>{ i.keterangan }</TableCell>
                                    <TableCell className="text-right">
                                        Rp { i.jumlah.toLocaleString("id-ID") }
                                    </TableCell>
                                </TableRow>
                            )) }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="flex items-end justify-between">
                    <div className="space-y-2">
                        <div className="text-sm">
                            Total pengeluaran bulan ini:{ " " }
                            <span className="font-medium">
                                Rp { total.toLocaleString("id-ID") }
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label className="text-sm" htmlFor="pendapatan">
                                Pendapatan (bulan ini)
                            </Label>
                            <Input
                                className="w-40"
                                id="pendapatan"
                                min={ 0 }
                                onChange={ (e) => setPendapatan(e.target.value) }
                                placeholder="0"
                                type="number"
                                value={ pendapatan }
                            />
                            xxx is must be integration
                        </div>
                        <div className="text-sm">
                            Profit Bersih:
                            <span
                                className={ `font-medium ${ profitBersih >= 0 ? "text-emerald-600" : "text-rose-600" }` }
                            >
                                Rp { profitBersih.toLocaleString("id-ID") }
                            </span>
                        </div>
                    </div>

                    <Dialog onOpenChange={ setOpen } open={ open }>
                        <DialogTrigger asChild>
                            <Button
                                className="bg-primary text-primary-foreground"
                                size="sm"
                            >
                                Catat Biaya
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Catat Biaya</DialogTitle>
                            </DialogHeader>
                            <form className="space-y-4" onSubmit={ addExpense }>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="md:col-span-1">
                                        <Label htmlFor="tanggal">Tanggal</Label>
                                        <Input
                                            id="tanggal"
                                            onChange={ (e) =>
                                                setForm({
                                                    ...form,
                                                    tanggal: e.target.value,
                                                })
                                            }
                                            required
                                            type="date"
                                            value={ form.tanggal || "" }
                                        />
                                    </div>
                                    <div className="md:col-span-1">
                                        <Label htmlFor="kategori">
                                            Kategori
                                        </Label>
                                        <Input
                                            id="kategori"
                                            list="kategori-list"
                                            onChange={ (e) =>
                                                setForm({
                                                    ...form,
                                                    kategori: e.target
                                                        .value as Expense["kategori"],
                                                })
                                            }
                                            required
                                            value={ form.kategori || "" }
                                        />
                                        <datalist id="kategori-list">
                                            <option value="listrik"/>
                                            <option value="air"/>
                                            <option value="internet"/>
                                            <option value="kebersihan"/>
                                            <option value="perbaikan"/>
                                            <option value="lainnya"/>
                                        </datalist>
                                    </div>
                                    <div className="md:col-span-2">
                                        <Label htmlFor="keterangan">
                                            Keterangan
                                        </Label>
                                        <Input
                                            id="keterangan"
                                            onChange={ (e) =>
                                                setForm({
                                                    ...form,
                                                    keterangan: e.target.value,
                                                })
                                            }
                                            required
                                            value={ form.keterangan || "" }
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Label htmlFor="jumlah">
                                            Jumlah (Rp)
                                        </Label>
                                        <Input
                                            id="jumlah"
                                            min={ 0 }
                                            onChange={ (e) =>
                                                setForm({
                                                    ...form,
                                                    jumlah: Number(
                                                        e.target.value,
                                                    ),
                                                })
                                            }
                                            required
                                            type="number"
                                            value={ form.jumlah || "" }
                                        />
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
                </CardContent>
            </Card>
        </>
    );
}
