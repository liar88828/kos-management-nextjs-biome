"use client";
import type { Invoice } from "@/app/(admin)/payments/invoice-type";
import { ButtonToolTip } from "@/components/mini/my-tooltip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";
import type { InvoiceType } from "./invoice-schema";


export function PaymentsForm({ saveFormAction }: { saveFormAction: (data: InvoiceType) => void }) {
    const [ form, setForm ] = useState({
        jumlah: "" as unknown as number | string,
        kamar: "",
        penyewa: "",
        periode: "",
    });

    // function markPaid(id: string) {
    //     setInvoices((prev) =>
    //         prev.map((inv) =>
    //             inv.id === id ? { ...inv, status: "lunas" } : inv,
    //         ),
    //     );
    // }

    function addInvoice(e: React.FormEvent) {
        e.preventDefault();
        if (!form.penyewa || !form.kamar || !form.periode || !form.jumlah) return;
        const newInvoice: Invoice = {
            Customer: [],
            dibuatOleh: "",
            dibuatPada: new Date(),
            diperbaruiPada: new Date(),
            id: `i-${ Date.now() }`,
            jatuhTempo: "",
            jumlah: Number(form.jumlah),
            kamar: form.kamar,
            nomorInvoice: "",
            penyewa: form.penyewa,
            periode: form.periode, // expect YYYY-MM
            status: "menunggu",
            tanggalTerbit: "",
        };
        // // setInvoices((prev) => [ newInvoice, ...prev ]);
        // setForm({
        //     jumlah: "" as any,
        //     kamar: "",
        //     penyewa: "",
        //     periode: "",
        // });
        //
        saveFormAction(newInvoice);
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <ButtonToolTip className="bg-primary text-primary-foreground" size="sm" text={ "Tambah Tagihan" }>
                    <PlusIcon/>
                </ButtonToolTip>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Tambah Tagihan</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={ addInvoice }>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="penyewa">Penyewa</Label>
                            <Input
                                id="penyewa"
                                onChange={ (e) =>
                                    setForm({
                                        ...form,
                                        penyewa: e.target.value,
                                    })
                                }
                                required
                                value={ form.penyewa }
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
                            <Label htmlFor="periode">Periode (YYYY-MM)</Label>
                            <Input
                                id="periode"
                                onChange={ (e) =>
                                    setForm({
                                        ...form,
                                        periode: e.target.value,
                                    })
                                }
                                placeholder="2025-09"
                                required
                                value={ form.periode }
                            />
                        </div>
                        <div>
                            <Label htmlFor="jumlah">Jumlah (Rp)</Label>
                            <Input
                                id="jumlah"
                                min={ 0 }
                                onChange={ (e) =>
                                    setForm({
                                        ...form,
                                        jumlah: e.target.value,
                                    })
                                }
                                required
                                type="number"
                                value={ form.jumlah as any }
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            // onClick={ () => setOpen(false) }
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
